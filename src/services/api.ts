// API Service for Contact Management & Messaging
const API_BASE = '/api';

async function apiFetch(input: RequestInfo | URL, init?: RequestInit) {
  const response = await window.fetch(input, init);
  if (response.status === 401) window.dispatchEvent(new Event('pmc-auth-expired'));
  return response;
}

export interface Reply {
  id: string;
  sender: 'owner' | 'visitor';
  senderName: string;
  message: string;
  createdAt: string;
}

export interface ContactItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  topic?: string;
  message: string;
  status: 'new' | 'in_progress' | 'replied' | 'closed';
  isStarred?: boolean;
  notes?: string;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}

export interface StatsData {
  total: number;
  newCount: number;
  inProgressCount: number;
  repliedCount: number;
  closedCount: number;
  starredCount: number;
  topicsMap: Record<string, number>;
}

// 1. Fetch contacts list with filters
export async function fetchContacts(params?: {
  status?: string;
  search?: string;
  tag?: string;
  starred?: boolean;
}): Promise<ContactItem[]> {
  const query = new URLSearchParams();
  if (params?.status && params.status !== 'all') query.set('status', params.status);
  if (params?.search) query.set('search', params.search);
  if (params?.tag && params.tag !== 'all') query.set('tag', params.tag);
  if (params?.starred) query.set('starred', 'true');

  const res = await apiFetch(`${API_BASE}/contacts?${query.toString()}`);
  if (!res.ok) throw new Error('Không thể tải danh sách liên hệ');
  const json = await res.json();
  return json.data || [];
}

// 2. Fetch single contact
export async function fetchContactById(id: string): Promise<ContactItem> {
  const res = await apiFetch(`${API_BASE}/contacts/${id}`);
  if (!res.ok) throw new Error('Không tìm thấy liên hệ');
  const json = await res.json();
  return json.data;
}

// 3. Fetch contacts by visitor email
export async function fetchContactsByEmail(email: string): Promise<ContactItem[]> {
  const res = await apiFetch(`${API_BASE}/contacts/by-email/${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error('Không tìm thấy liên hệ nào với email này');
  const json = await res.json();
  return json.data || [];
}

// 4. Submit new contact
export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  topic?: string;
  message: string;
}): Promise<ContactItem> {
  const res = await apiFetch(`${API_BASE}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Lỗi khi gửi thông tin liên hệ');
  return json.data;
}

// 5. Send reply
export async function sendReply(
  contactId: string,
  data: { sender: 'owner' | 'visitor'; senderName?: string; message: string }
): Promise<{ contact: ContactItem; reply: Reply }> {
  const res = await apiFetch(`${API_BASE}/contacts/${contactId}/reply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Lỗi khi gửi phản hồi');
  return json.data;
}

// 6. Update status
export async function updateContactStatus(contactId: string, status: string): Promise<ContactItem> {
  const res = await apiFetch(`${API_BASE}/contacts/${contactId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Lỗi khi cập nhật trạng thái');
  return json.data;
}

// 7. Toggle star
export async function toggleContactStar(contactId: string): Promise<ContactItem> {
  const res = await apiFetch(`${API_BASE}/contacts/${contactId}/star`, {
    method: 'PATCH'
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Lỗi khi lưu đánh dấu sao');
  return json.data;
}

// 8. Update private notes
export async function updateContactNotes(contactId: string, notes: string): Promise<ContactItem> {
  const res = await apiFetch(`${API_BASE}/contacts/${contactId}/notes`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Lỗi khi lưu ghi chú');
  return json.data;
}

// 9. Delete contact
export async function deleteContactItem(contactId: string): Promise<boolean> {
  const res = await apiFetch(`${API_BASE}/contacts/${contactId}`, {
    method: 'DELETE'
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Lỗi khi xoá liên hệ');
  return true;
}

// 10. Fetch stats
export async function fetchStats(): Promise<StatsData> {
  const res = await apiFetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error('Không thể tải thống kê');
  const json = await res.json();
  return json.data;
}

// 11. Verify PIN
export async function verifyAdminPin(pin: string): Promise<boolean> {
  try {
    const res = await apiFetch(`${API_BASE}/auth/verify-pin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin })
    });
    const json = await res.json();
    return json.success === true;
  } catch {
    return false;
  }
}

// 12. Clear all contacts
export async function clearAllContactsApi(): Promise<boolean> {
  const res = await apiFetch(`${API_BASE}/contacts/clear`, {
    method: 'POST'
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Lỗi khi xoá toàn bộ liên hệ');
  return true;
}

// 13. Reset to sample contacts
export async function resetSampleContactsApi(): Promise<ContactItem[]> {
  const res = await apiFetch(`${API_BASE}/contacts/reset-samples`, {
    method: 'POST'
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Lỗi khi nạp lại dữ liệu mẫu');
  return json.data || [];
}
