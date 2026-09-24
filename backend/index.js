import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import {
  getContacts,
  getContactById,
  getContactsByEmail,
  createContact,
  addReply,
  updateContactStatus,
  toggleStar,
  updateNotes,
  deleteContact,
  getStats,
  clearAllContacts
} from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PIN = process.env.ADMIN_PIN;
if (!ADMIN_PIN) throw new Error('ADMIN_PIN must be configured');
const production = process.env.NODE_ENV === 'production';
const sessions = new Map();
const attempts = new Map();
const sessionLifetime = 8 * 60 * 60 * 1000;
const cookieOptions = { httpOnly: true, secure: production, sameSite: 'strict', path: '/api' };
const sessionToken = (req) => req.headers.cookie?.split(';').map(v => v.trim()).find(v => v.startsWith('pmc_session='))?.slice(12);
app.set('trust proxy', 1);
const cleanup = setInterval(() => {
  const now = Date.now();
  for (const [token, expiry] of sessions) if (expiry <= now) sessions.delete(token);
  for (const [ip, attempt] of attempts) if (attempt.until <= now) attempts.delete(ip);
}, 60000);
cleanup.unref();

// Middleware
if (!production) app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Ensure all responses are explicitly UTF-8 encoded
app.use('/api', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use('/api', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.headers.origin && !['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    if (req.headers.origin !== `${req.protocol}://${req.get('host')}` && production) {
      return res.status(403).json({ success: false, message: 'Origin not allowed' });
    }
  }
  if ((req.method === 'GET' && req.path === '/health') ||
      (req.method === 'POST' && ['/contacts', '/auth/verify-pin'].includes(req.path))) return next();
  const token = sessionToken(req);
  const expiry = sessions.get(token);
  if (!expiry || expiry <= Date.now()) return res.status(401).json({ success: false, message: 'Vui lòng đăng nhập quản trị' });
  req.sessionExpiry = expiry;
  next();
});

app.get('/api/auth/session', (req, res) => res.json({ success: true }));
app.post('/api/auth/logout', (req, res) => {
  sessions.delete(sessionToken(req));
  res.clearCookie('pmc_session', cookieOptions);
  res.json({ success: true });
});

// SSE Clients List for real-time updates
const sseClients = new Set();

function broadcastEvent(eventType, data) {
  const message = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of sseClients) {
    try {
      res.write(message);
    } catch {
      sseClients.delete(res);
    }
  }
}

// 1. Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Pham Minh Chien Portfolio Backend API'
  });
});

// 2. Real-time SSE Stream
app.get('/api/contacts/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  sseClients.add(res);
  res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);
  const heartbeat = setInterval(() => {
    if (!sessions.has(sessionToken(req)) || Date.now() >= req.sessionExpiry) return res.end();
    res.write(': heartbeat\n\n');
  }, 15000);

  req.on('close', () => {
    clearInterval(heartbeat);
    sseClients.delete(res);
  });
});

// 3. Verify Admin PIN
app.post('/api/auth/verify-pin', (req, res) => {
  const { pin } = req.body || {};
  const now = Date.now();
  const attempt = attempts.get(req.ip) || { count: 0, until: now + 15 * 60 * 1000 };
  if (attempt.until <= now) { attempt.count = 0; attempt.until = now + 15 * 60 * 1000; }
  if (attempt.count >= 10) return res.status(429).json({ success: false, message: 'Thử lại sau 15 phút' });
  attempt.count += 1;
  attempts.set(req.ip, attempt);
  const supplied = Buffer.from(typeof pin === 'string' ? pin : '');
  const expected = Buffer.from(ADMIN_PIN);
  if (supplied.length === expected.length && timingSafeEqual(supplied, expected)) {
    attempts.delete(req.ip);
    sessions.delete(sessionToken(req));
    const token = randomBytes(32).toString('hex');
    sessions.set(token, now + sessionLifetime);
    res.cookie('pmc_session', token, { ...cookieOptions, maxAge: sessionLifetime });
    return res.json({ success: true, message: 'Xác thực thành công' });
  }
  return res.status(401).json({ success: false, message: 'Mã PIN quản trị không chính xác' });
});

// 4. Get Statistics
app.get('/api/stats', (req, res) => {
  try {
    const stats = getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Get Contacts List (With query filters)
app.get('/api/contacts', (req, res) => {
  try {
    const { status, search, tag, starred } = req.query;
    const contacts = getContacts({ status, search, tag, starred });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Get Contact by ID
app.get('/api/contacts/:id', (req, res) => {
  try {
    const contact = getContactById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy liên hệ' });
    }
    res.json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Get Contacts by Visitor Email (Track conversation history)
app.get('/api/contacts/by-email/:email', (req, res) => {
  try {
    const contacts = getContactsByEmail(req.params.email);
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Submit New Contact (Public for visitors/recruiters)
app.post('/api/contacts', (req, res) => {
  try {
    const { name, email, phone, company, topic, message } = req.body;
    const newContact = createContact({ name, email, phone, company, topic, message });

    // Notify connected SSE clients
    broadcastEvent('contact:new', newContact);

    res.status(201).json({
      success: true,
      message: 'Gửi thông tin liên hệ thành công! Phạm Minh Chiến sẽ sớm phản hồi.',
      data: newContact
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 9. Send Reply to a Contact Thread (Interactive back-and-forth)
app.post('/api/contacts/:id/reply', (req, res) => {
  try {
    const { sender, senderName, message } = req.body;
    const result = addReply(req.params.id, { sender, senderName, message });

    // Notify connected SSE clients
    broadcastEvent('contact:reply', {
      contactId: req.params.id,
      reply: result.reply,
      contact: result.contact
    });

    res.json({
      success: true,
      message: 'Gửi phản hồi thành công!',
      data: result
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 10. Update Status
app.patch('/api/contacts/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const updated = updateContactStatus(req.params.id, status);

    broadcastEvent('contact:updated', updated);

    res.json({ success: true, message: 'Đã cập nhật trạng thái', data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 11. Toggle Star
app.patch('/api/contacts/:id/star', (req, res) => {
  try {
    const updated = toggleStar(req.params.id);
    broadcastEvent('contact:updated', updated);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 12. Update Candidate Notes
app.patch('/api/contacts/:id/notes', (req, res) => {
  try {
    const { notes } = req.body;
    const updated = updateNotes(req.params.id, notes);
    broadcastEvent('contact:updated', updated);
    res.json({ success: true, message: 'Đã lưu ghi chú', data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 13. Delete Contact
app.delete('/api/contacts/:id', (req, res) => {
  try {
    deleteContact(req.params.id);
    broadcastEvent('contact:deleted', { id: req.params.id });
    res.json({ success: true, message: 'Đã xoá liên hệ thành công' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 14. Clear All Contacts
app.post('/api/contacts/clear', (req, res) => {
  try {
      clearAllContacts();
      broadcastEvent('contact:cleared', {});
      res.json({ success: true, message: 'Đã xoá toàn bộ danh sách liên hệ' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 15. Reset Sample Contacts
app.post('/api/contacts/reset-samples', (req, res) => {
  res.status(410).json({ success: false, message: 'Dữ liệu mẫu không khả dụng trên bản triển khai' });
});

app.use('/api', (req, res) => res.status(404).json({ success: false, message: 'API not found' }));
if (production) {
  const dist = fileURLToPath(new URL('../dist/', import.meta.url));
  app.use(express.static(dist));
  app.get(['/', '/admin'], (req, res) => res.sendFile(path.join(dist, 'index.html')));
}

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Backend Server] Đang chạy tại http://localhost:${PORT}`);
  console.log(`[Backend Server] API Contacts sẵn sàng: http://localhost:${PORT}/api/contacts`);
});
