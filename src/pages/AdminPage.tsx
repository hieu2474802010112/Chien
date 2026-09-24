import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  Star,
  Trash2,
  Send,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Building,
  User,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Bookmark,
  ExternalLink,
  Download,
  BarChart3,
  SlidersHorizontal,
  Calendar,
  Layers,
  Inbox
} from 'lucide-react';
import {
  ContactItem,
  Reply,
  fetchContacts,
  fetchContactById,
  sendReply,
  updateContactStatus,
  toggleContactStar,
  updateContactNotes,
  deleteContactItem,
  clearAllContactsApi,
  fetchStats,
  verifyAdminPin,
  StatsData
} from '../services/api';

const QUICK_REPLIES = [
  'Dạ em chào quý anh/chị! Em rất cảm ơn đã quan tâm đến hồ sơ của em. Em rất sẵn sàng sắp xếp một buổi phỏng vấn trực tiếp hoặc online ạ.',
  'Dạ em chào bạn! Em đã nhận được đề xuất booking video ngắn. Em xin phép gửi kịch bản nháp và bảng báo giá chi tiết qua email nhé!',
  'Dạ em chào anh/chị! Em đã ghi nhận lịch hẹn trao đổi. Em sẽ chuẩn bị kỹ lưỡng các case study truyền thông liên quan để thảo luận cùng team ạ.'
];

export function AdminPage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('pmc_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Contacts list & filters
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [starredOnly, setStarredOnly] = useState<boolean>(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Interaction / Reply state
  const [replyMessage, setReplyMessage] = useState<string>('');
  const [isSendingReply, setIsSendingReply] = useState<boolean>(false);
  const [notesInput, setNotesInput] = useState<string>('');
  const [isSavingNotes, setIsSavingNotes] = useState<boolean>(false);
  const [notesFeedback, setNotesFeedback] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load contacts & stats
  const loadData = async () => {
    setLoading(true);
    try {
      const [list, statsData] = await Promise.all([
        fetchContacts({
          status: statusFilter,
          search: searchQuery,
          starred: starredOnly
        }),
        fetchStats()
      ]);
      setContacts(list);
      setStats(statsData);

      if (list.length > 0) {
        setSelectedContact((prev) => {
          if (!prev) return list[0];
          const found = list.find((c) => c.id === prev.id);
          return found || list[0];
        });
      } else {
        setSelectedContact(null);
      }
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, statusFilter, searchQuery, starredOnly]);

  useEffect(() => {
    if (selectedContact) {
      setNotesInput(selectedContact.notes || '');
      setNotesFeedback(null);
    }
  }, [selectedContact?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedContact?.replies]);

  // Real-time SSE listener
  useEffect(() => {
    if (!isAuthenticated) return;

    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/contacts/stream');

      eventSource.addEventListener('contact:new', () => {
        loadData();
      });

      eventSource.addEventListener('contact:reply', (e: MessageEvent) => {
        try {
          const data = JSON.parse(e.data);
          setSelectedContact((prev) => (prev && prev.id === data.contactId ? data.contact : prev));
          loadData();
        } catch {
          // ignore
        }
      });

      eventSource.addEventListener('contact:updated', (e: MessageEvent) => {
        try {
          const updated = JSON.parse(e.data);
          setSelectedContact((prev) => (prev && prev.id === updated.id ? updated : prev));
        } catch {
          // ignore
        }
      });

      eventSource.addEventListener('contact:cleared', () => {
        setContacts([]);
        setSelectedContact(null);
        fetchStats().then(setStats);
      });
    } catch {
      // SSE fallback
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, [isAuthenticated]);

  // Verify PIN
  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(null);
    const valid = await verifyAdminPin(pinInput);
    if (valid) {
      setIsAuthenticated(true);
      localStorage.setItem('pmc_admin_auth', 'true');
      setPinInput('');
      loadData();
    } else {
      setPinError('Mã PIN không đúng. Vui lòng thử lại.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pmc_admin_auth');
  };

  // Send Reply
  const handleSendReply = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedContact || !replyMessage.trim() || isSendingReply) return;

    setIsSendingReply(true);
    try {
      const res = await sendReply(selectedContact.id, {
        sender: 'owner',
        senderName: 'Phạm Minh Chiến',
        message: replyMessage.trim()
      });
      setSelectedContact(res.contact);
      setReplyMessage('');
      setContacts((prev) => prev.map((c) => (c.id === res.contact.id ? res.contact : c)));
      fetchStats().then(setStats);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi khi gửi phản hồi';
      alert(msg);
    } finally {
      setIsSendingReply(false);
    }
  };

  // Update Status
  const handleUpdateStatus = async (status: string) => {
    if (!selectedContact) return;
    try {
      const updated = await updateContactStatus(selectedContact.id, status);
      setSelectedContact(updated);
      setContacts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      fetchStats().then(setStats);
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Star
  const handleToggleStar = async () => {
    if (!selectedContact) return;
    try {
      const updated = await toggleContactStar(selectedContact.id);
      setSelectedContact(updated);
      setContacts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    } catch (err) {
      console.error(err);
    }
  };

  // Save Notes
  const handleSaveNotes = async () => {
    if (!selectedContact) return;
    setIsSavingNotes(true);
    try {
      const updated = await updateContactNotes(selectedContact.id, notesInput);
      setSelectedContact(updated);
      setContacts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setNotesFeedback('Đã lưu ghi chú thành công!');
      setTimeout(() => setNotesFeedback(null), 2500);
    } catch (err) {
      console.error(err);
      setNotesFeedback('Lỗi khi lưu ghi chú');
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Delete Contact
  const handleDeleteContact = async () => {
    if (!selectedContact) return;
    if (!window.confirm(`Bạn có chắc chắn muốn xoá liên hệ của "${selectedContact.name}"?`)) return;

    try {
      await deleteContactItem(selectedContact.id);
      const remaining = contacts.filter((c) => c.id !== selectedContact.id);
      setContacts(remaining);
      setSelectedContact(remaining.length > 0 ? remaining[0] : null);
      fetchStats().then(setStats);
    } catch (err) {
      console.error(err);
    }
  };

  // Clear All Contacts
  const handleClearAll = async () => {
    if (!window.confirm('CẢNH BÁO: Bạn có chắc chắn muốn xoá toàn bộ danh sách liên hệ?')) return;
    try {
      await clearAllContactsApi();
      setContacts([]);
      setSelectedContact(null);
      fetchStats().then(setStats);
    } catch (err) {
      console.error(err);
    }
  };

  // Helper status badge
  const getStatusBadge = (st: string) => {
    switch (st) {
      case 'new':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-100 text-rose-700 border border-rose-300">
            Mới nhận
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-100 text-amber-700 border border-amber-300">
            Đang trao đổi
          </span>
        );
      case 'replied':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-100 text-emerald-700 border border-emerald-300">
            Đã phản hồi
          </span>
        );
      case 'closed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-stone-100 text-stone-600 border border-stone-300">
            Đã hoàn tất
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return iso;
    }
  };

  // Export JSON
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(contacts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `contacts_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] text-stone-900 flex flex-col justify-center items-center p-4 selection:bg-rose-500 selection:text-white font-sans">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white border-2 border-rose-200/90 shadow-2xl space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-rose-600">
              CỔNG QUẢN TRỊ NỘI BỘ
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-heading">
              Phạm Minh Chiến Portal
            </h1>
            <p className="text-xs text-stone-500 leading-relaxed">
              Trang quản lý danh sách người liên hệ, theo dõi tuyển dụng & trao đổi thông điệp hai chiều.
            </p>
          </div>

          <form onSubmit={handleVerifyPin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 font-mono uppercase tracking-wider">
                Mã PIN Quản Trị
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Nhập mã PIN (Mã PIN: ChienPR)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white shadow-inner"
              />
            </div>

            {pinError && (
              <div className="text-xs text-rose-700 bg-rose-50 p-3 rounded-2xl border border-rose-200">
                {pinError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Đăng Nhập Quản Trị</span>
            </button>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-stone-500">
              <button
                type="button"
                onClick={() => setPinInput('ChienPR')}
                className="text-stone-500 hover:text-rose-600 underline"
              >
                Tự điền PIN (ChienPR)
              </button>

              <a
                href="/"
                className="text-rose-600 hover:underline flex items-center gap-1"
              >
                <span>Về Portfolio công khai</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // MAIN STANDALONE ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#F5F2EB] text-stone-800 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      
      {/* 1. TOP NAVBAR */}
      <header className="bg-white border-b border-stone-200/90 px-6 py-3.5 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-stone-900 tracking-tight font-heading">
                  Hệ Thống Quản Trị Liên Hệ & Tương Tác
                </span>
                <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-mono font-bold">
                  Phạm Minh Chiến
                </span>
              </div>
              <span className="text-[11px] font-mono text-stone-500 block">
                Trang quản lý nội bộ độc lập • Live API REST & SSE Realtime
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-200/80 transition"
              title="Mở portfolio công khai ở tab mới"
            >
              <span>Xem Portfolio Công Khai</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>

            <button
              type="button"
              onClick={handleExportData}
              disabled={contacts.length === 0}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-200/80 transition cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
              title="Xuất toàn bộ dữ liệu ra tệp JSON"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Xuất JSON</span>
            </button>

            {contacts.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition cursor-pointer"
                title="Xoá sạch toàn bộ danh sách liên hệ"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                <span>Xoá Tất Cả</span>
              </button>
            )}

            <button
              type="button"
              onClick={loadData}
              className="p-2 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition cursor-pointer"
              title="Làm mới dữ liệu"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-200 transition active:scale-95 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-3xl bg-white border border-stone-200/90 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
                Tổng liên hệ
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono mt-1">
                {stats?.total || 0}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-white border border-rose-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-600">
                Mới nhận (Chờ xem)
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-mono mt-1">
                {stats?.newCount || 0}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-white border border-amber-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600">
                Đang trao đổi
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono mt-1">
                {stats?.inProgressCount || 0}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-white border border-emerald-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600">
                Đã phản hồi
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono mt-1">
                {stats?.repliedCount || 0}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

        </div>
      </div>

      {/* 3. MAIN WORKSPACE CONTAINER */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col">
        <div className="flex-1 rounded-3xl bg-white border border-stone-200 shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[620px]">
          
          {/* LEFT PANEL: CONTACTS LIST & SEARCH (35-40% width) */}
          <div className="w-full md:w-5/12 lg:w-4/12 border-r border-stone-200 bg-white flex flex-col overflow-hidden">
            
            {/* Search & Filters */}
            <div className="p-4 border-b border-stone-200/80 space-y-3 bg-stone-50/50">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm tên, email, công ty, lời nhắn..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'new', label: 'Mới' },
                  { id: 'in_progress', label: 'Đang trao đổi' },
                  { id: 'replied', label: 'Đã trả lời' }
                ].map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setStatusFilter(t.id)}
                    className={`px-3 py-1.5 rounded-xl transition-all font-medium shrink-0 ${
                      statusFilter === t.id
                        ? 'bg-rose-600 text-white font-bold shadow-sm'
                        : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setStarredOnly(!starredOnly)}
                  className={`p-1.5 px-2.5 rounded-xl transition-all shrink-0 flex items-center gap-1 border ${
                    starredOnly
                      ? 'bg-amber-500 text-white font-bold border-amber-600'
                      : 'bg-white text-stone-500 hover:bg-stone-100 border-stone-200'
                  }`}
                  title="Chỉ lọc liên hệ gắn sao ⭐"
                >
                  <Star className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
              {contacts.length === 0 ? (
                <div className="p-12 text-center text-stone-400 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                    <Inbox className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-stone-600 font-heading">
                      Chưa có liên hệ nào
                    </p>
                    <p className="text-[11px] font-mono text-stone-400 leading-relaxed max-w-[220px] mx-auto">
                      Khi đối tác hoặc nhà tuyển dụng gửi thông tin từ Portfolio, dữ liệu sẽ xuất hiện ngay tại đây.
                    </p>
                  </div>
                </div>
              ) : (
                contacts.map((c) => {
                  const isSelected = selectedContact?.id === c.id;
                  const replyCount = c.replies ? c.replies.length : 0;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedContact(c)}
                      className={`p-4 transition cursor-pointer select-none relative ${
                        isSelected
                          ? 'bg-rose-50/70 border-l-4 border-rose-600'
                          : 'hover:bg-stone-50/80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="font-bold text-sm text-stone-900 truncate">
                          {c.name}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          {c.isStarred && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                          {getStatusBadge(c.status)}
                        </div>
                      </div>

                      {c.company && (
                        <div className="text-xs font-medium text-stone-600 truncate flex items-center gap-1.5 mb-1.5">
                          <Building className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span>{c.company}</span>
                        </div>
                      )}

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {c.message}
                      </p>

                      <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-stone-400">
                        <span className="text-rose-600 font-semibold">{c.topic}</span>
                        <div className="flex items-center gap-1.5">
                          {replyCount > 0 && (
                            <span className="text-stone-700 font-bold bg-stone-100 px-1.5 py-0.5 rounded">
                              💬 {replyCount}
                            </span>
                          )}
                          <span>{formatDate(c.createdAt).split(' ')[0]}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* RIGHT PANEL: CONVERSATION HUB & INTERACTION (60-65% width) */}
          <div className="w-full md:w-7/12 lg:w-8/12 bg-[#FAF7F2] flex flex-col overflow-hidden">
            {selectedContact ? (
              <>
                {/* Contact Profile Header */}
                <div className="p-5 bg-white border-b border-stone-200 shrink-0 flex flex-wrap items-center justify-between gap-4 shadow-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg font-extrabold text-stone-900 font-heading">
                        {selectedContact.name}
                      </h2>
                      <button
                        type="button"
                        onClick={handleToggleStar}
                        className="p-1 text-stone-400 hover:text-amber-500 transition cursor-pointer"
                        title="Đánh dấu sao"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            selectedContact.isStarred ? 'text-amber-500 fill-amber-500' : ''
                          }`}
                        />
                      </button>
                      {getStatusBadge(selectedContact.status)}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600">
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="inline-flex items-center gap-1.5 text-rose-600 hover:underline font-medium"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{selectedContact.email}</span>
                      </a>

                      {selectedContact.phone && (
                        <a
                          href={`tel:${selectedContact.phone}`}
                          className="inline-flex items-center gap-1.5 text-stone-700 hover:text-rose-600 font-mono"
                        >
                          <Phone className="w-3.5 h-3.5 text-stone-400" />
                          <span>{selectedContact.phone}</span>
                        </a>
                      )}

                      {selectedContact.company && (
                        <span className="inline-flex items-center gap-1.5 text-stone-500">
                          <Building className="w-3.5 h-3.5 text-stone-400" />
                          <span>{selectedContact.company}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions (Status dropdown & Delete) */}
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedContact.status}
                      onChange={(e) => handleUpdateStatus(e.target.value)}
                      className="px-3.5 py-2 rounded-2xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer shadow-xs"
                    >
                      <option value="new">Mới nhận</option>
                      <option value="in_progress">Đang trao đổi</option>
                      <option value="replied">Đã phản hồi</option>
                      <option value="closed">Đã hoàn tất / Lưu</option>
                    </select>

                    <button
                      type="button"
                      onClick={handleDeleteContact}
                      className="p-2.5 rounded-2xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition cursor-pointer"
                      title="Xoá liên hệ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Conversation Stream */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  
                  {/* Original message card */}
                  <div className="p-5 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900 flex items-center gap-2">
                        <User className="w-4 h-4 text-stone-500" />
                        <span>Lời nhắn ban đầu từ {selectedContact.name}</span>
                      </span>
                      <span className="text-[11px] font-mono text-stone-400">
                        {formatDate(selectedContact.createdAt)}
                      </span>
                    </div>

                    <div className="inline-block px-3 py-1 rounded-xl bg-rose-50 text-rose-700 text-xs font-mono font-semibold">
                      Chủ đề: {selectedContact.topic}
                    </div>

                    <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap pt-1">
                      {selectedContact.message}
                    </p>
                  </div>

                  {/* Replies thread */}
                  {selectedContact.replies && selectedContact.replies.length > 0 && (
                    <div className="space-y-3.5 pt-2">
                      <div className="text-[11px] font-mono text-stone-400 uppercase tracking-wider text-center">
                        — Lịch sử trao đổi qua lại ({selectedContact.replies.length}) —
                      </div>

                      {selectedContact.replies.map((rep) => {
                        const isOwner = rep.sender === 'owner';
                        return (
                          <div
                            key={rep.id}
                            className={`flex flex-col ${
                              isOwner ? 'items-end' : 'items-start'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-stone-500 mb-1 px-1">
                              <span className="font-bold">
                                {isOwner ? 'Phạm Minh Chiến (Bạn)' : rep.senderName}
                              </span>
                              <span>•</span>
                              <span>{formatDate(rep.createdAt)}</span>
                            </div>

                            <div
                              className={`max-w-[85%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                                isOwner
                                  ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white rounded-tr-sm'
                                  : 'bg-white border border-stone-200 text-stone-800 rounded-tl-sm'
                              }`}
                            >
                              <p className="whitespace-pre-wrap">{rep.message}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Private Candidate Notes */}
                  <div className="p-4 rounded-3xl bg-amber-50/70 border border-amber-200/90 space-y-2.5 mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-900 flex items-center gap-1.5">
                        <Bookmark className="w-3.5 h-3.5 text-amber-600" />
                        <span>Ghi chú nội bộ (Chỉ Chiến thấy)</span>
                      </span>
                      {notesFeedback && (
                        <span className="text-[11px] text-emerald-600 font-semibold">
                          {notesFeedback}
                        </span>
                      )}
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Ghi chú cá nhân về đối tác này (VD: Lịch hẹn cafe 14h thứ Năm, mức lương 25tr, báo giá video 3tr/clip...)"
                      value={notesInput}
                      onChange={(e) => setNotesInput(e.target.value)}
                      className="w-full p-3 rounded-2xl bg-white border border-amber-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none shadow-inner"
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleSaveNotes}
                        disabled={isSavingNotes}
                        className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-sm transition active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        {isSavingNotes ? 'Đang lưu...' : 'Lưu ghi chú'}
                      </button>
                    </div>
                  </div>

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies & Message Composer */}
                <div className="p-4 bg-white border-t border-stone-200 shrink-0 space-y-2.5">
                  {/* Presets */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
                    <span className="text-stone-400 font-mono shrink-0">Mẫu nhanh:</span>
                    {QUICK_REPLIES.map((qr, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setReplyMessage(qr)}
                        className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-600 text-xs truncate max-w-[240px] shrink-0 border border-stone-200/80 transition"
                        title={qr}
                      >
                        {qr}
                      </button>
                    ))}
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleSendReply} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Nhập phản hồi gửi tới ${selectedContact.name}...`}
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white shadow-inner"
                    />

                    <button
                      type="submit"
                      disabled={isSendingReply || !replyMessage.trim()}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-500/20 transition active:scale-95 disabled:opacity-50 flex items-center gap-2 shrink-0 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Gửi phản hồi</span>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-stone-400 space-y-3">
                <div className="w-14 h-14 rounded-3xl bg-stone-100 text-stone-300 flex items-center justify-center mx-auto">
                  <Inbox className="w-7 h-7 stroke-[1.5]" />
                </div>
                <p className="text-xs font-mono text-stone-500">
                  {contacts.length === 0
                    ? 'Hộp thư đang trống. Danh sách liên hệ mới sẽ hiển thị tại đây khi có người liên hệ.'
                    : 'Chọn một liên hệ từ danh sách bên trái để xem chi tiết.'}
                </p>
              </div>
            )}
          </div>

        </div>
      </main>

    </div>
  );
}
