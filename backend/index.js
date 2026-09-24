import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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
  getStats
} from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PIN = process.env.ADMIN_PIN || 'ChienPR';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Ensure all responses are explicitly UTF-8 encoded
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
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

  req.on('close', () => {
    sseClients.delete(res);
  });
});

// 3. Verify Admin PIN
app.post('/api/auth/verify-pin', (req, res) => {
  const { pin } = req.body || {};
  if (pin === ADMIN_PIN || pin === 'ChienPR') {
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
    const { clearAllContacts } = require('./db.js') || {};
  } catch {}
  try {
    // import dynamically or call db helper
    import('./db.js').then((db) => {
      db.clearAllContacts();
      broadcastEvent('contact:cleared', {});
      res.json({ success: true, message: 'Đã xoá toàn bộ danh sách liên hệ' });
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 15. Reset Sample Contacts
app.post('/api/contacts/reset-samples', (req, res) => {
  try {
    import('./db.js').then((db) => {
      const samples = db.resetSampleContacts();
      broadcastEvent('contact:reset', samples);
      res.json({ success: true, message: 'Đã nạp lại dữ liệu mẫu', data: samples });
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Backend Server] Đang chạy tại http://localhost:${PORT}`);
  console.log(`[Backend Server] API Contacts sẵn sàng: http://localhost:${PORT}/api/contacts`);
});
