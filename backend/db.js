import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'contacts.json');

// Ensure directory and file exist
function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

// Read all contacts from file
export function readContacts() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading contacts file:', err);
    return [];
  }
}

// Atomic write to file
export function writeContacts(contacts) {
  ensureDataFile();
  const tempFile = `${DATA_FILE}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(contacts, null, 2), 'utf-8');
  fs.renameSync(tempFile, DATA_FILE);
}

// Get contacts with optional filters
export function getContacts({ status, search, tag, starred } = {}) {
  let list = readContacts();

  if (status && status !== 'all') {
    list = list.filter((c) => c.status === status);
  }

  if (tag && tag !== 'all') {
    list = list.filter((c) => c.topic === tag);
  }

  if (starred === 'true' || starred === true) {
    list = list.filter((c) => c.isStarred === true);
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.company && c.company.toLowerCase().includes(q)) ||
        (c.message && c.message.toLowerCase().includes(q)) ||
        (c.topic && c.topic.toLowerCase().includes(q))
    );
  }

  // Sort descending by created/updated time
  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return list;
}

// Get single contact by ID
export function getContactById(id) {
  const list = readContacts();
  return list.find((c) => c.id === id) || null;
}

// Find contacts by email
export function getContactsByEmail(email) {
  if (!email) return [];
  const list = readContacts();
  const q = email.trim().toLowerCase();
  return list.filter((c) => c.email && c.email.toLowerCase() === q);
}

// Create new contact
export function createContact({ name, email, phone, company, topic, message }) {
  if (!name || !name.trim()) {
    throw new Error('Vui lòng nhập Họ và tên.');
  }
  if (!email || !email.trim()) {
    throw new Error('Vui lòng nhập Địa chỉ Email.');
  }
  if (!phone || !phone.trim()) {
    throw new Error('Vui lòng nhập Số điện thoại liên hệ.');
  }
  if (!company || !company.trim()) {
    throw new Error('Vui lòng nhập Đơn vị / Doanh nghiệp / Agency.');
  }
  if (!topic || !topic.trim()) {
    throw new Error('Vui lòng chọn Chủ đề / Nhu cầu hợp tác.');
  }
  if (!message || !message.trim()) {
    throw new Error('Vui lòng nhập Nội dung trao đổi / Lời mời làm việc.');
  }

  const list = readContacts();
  const id = `ct_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const now = new Date().toISOString();

  const newContact = {
    id,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    company: company.trim(),
    topic: topic.trim(),
    message: message.trim(),
    status: 'new',
    isStarred: false,
    notes: '',
    replies: [],
    createdAt: now,
    updatedAt: now
  };

  list.unshift(newContact);
  writeContacts(list);
  return newContact;
}

// Add reply to a contact
export function addReply(contactId, { sender = 'owner', senderName, message }) {
  if (!message || !message.trim()) {
    throw new Error('Nội dung phản hồi không được để trống.');
  }

  const list = readContacts();
  const index = list.findIndex((c) => c.id === contactId);
  if (index === -1) {
    throw new Error('Không tìm thấy cuộc hội thoại liên hệ.');
  }

  const contact = list[index];
  const now = new Date().toISOString();
  const replyId = `rep_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

  const replyObj = {
    id: replyId,
    sender: sender === 'visitor' ? 'visitor' : 'owner',
    senderName: senderName || (sender === 'visitor' ? contact.name : 'Phạm Minh Chiến'),
    message: message.trim(),
    createdAt: now
  };

  contact.replies.push(replyObj);
  contact.updatedAt = now;

  if (sender === 'owner') {
    contact.status = 'replied';
  } else if (sender === 'visitor' && contact.status === 'replied') {
    contact.status = 'in_progress';
  }

  writeContacts(list);
  return { contact, reply: replyObj };
}

// Update status
export function updateContactStatus(contactId, status) {
  const allowed = ['new', 'in_progress', 'replied', 'closed'];
  if (!allowed.includes(status)) {
    throw new Error('Trạng thái không hợp lệ.');
  }

  const list = readContacts();
  const contact = list.find((c) => c.id === contactId);
  if (!contact) {
    throw new Error('Không tìm thấy liên hệ.');
  }

  contact.status = status;
  contact.updatedAt = new Date().toISOString();
  writeContacts(list);
  return contact;
}

// Toggle star / favorite
export function toggleStar(contactId) {
  const list = readContacts();
  const contact = list.find((c) => c.id === contactId);
  if (!contact) {
    throw new Error('Không tìm thấy liên hệ.');
  }

  contact.isStarred = !contact.isStarred;
  writeContacts(list);
  return contact;
}

// Update candidate notes
export function updateNotes(contactId, notes) {
  const list = readContacts();
  const contact = list.find((c) => c.id === contactId);
  if (!contact) {
    throw new Error('Không tìm thấy liên hệ.');
  }

  contact.notes = typeof notes === 'string' ? notes.trim() : '';
  contact.updatedAt = new Date().toISOString();
  writeContacts(list);
  return contact;
}

// Delete contact
export function deleteContact(contactId) {
  const list = readContacts();
  const nextList = list.filter((c) => c.id !== contactId);
  if (nextList.length === list.length) {
    throw new Error('Không tìm thấy liên hệ để xoá.');
  }
  writeContacts(nextList);
  return true;
}

// Clear all contacts
export function clearAllContacts() {
  writeContacts([]);
  return true;
}

// Get statistics
export function getStats() {
  const list = readContacts();
  const total = list.length;
  const newCount = list.filter((c) => c.status === 'new').length;
  const inProgressCount = list.filter((c) => c.status === 'in_progress').length;
  const repliedCount = list.filter((c) => c.status === 'replied').length;
  const closedCount = list.filter((c) => c.status === 'closed').length;
  const starredCount = list.filter((c) => c.isStarred).length;

  const topicsMap = {};
  list.forEach((c) => {
    const t = c.topic || 'Khác';
    topicsMap[t] = (topicsMap[t] || 0) + 1;
  });

  return {
    total,
    newCount,
    inProgressCount,
    repliedCount,
    closedCount,
    starredCount,
    topicsMap
  };
}
