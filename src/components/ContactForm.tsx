import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Phone, Building, Mail, User, FileText } from 'lucide-react';
import { submitContact, ContactItem } from '../services/api';

const TOPIC_PRESETS = [
  'Tuyển dụng PR & Media',
  'Booking Video Ngắn TikTok',
  'Hợp tác sự kiện & Talent',
  'Tư vấn chiến lược truyền thông',
  'Khác'
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    topic: 'Tuyển dụng PR & Media',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submittedContact, setSubmittedContact] = useState<ContactItem | null>(null);

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Vui lòng nhập Họ và tên';
    }

    if (!formData.email.trim()) {
      errors.email = 'Vui lòng nhập Địa chỉ Email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Địa chỉ Email không hợp lệ (ví dụ: name@company.com)';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Vui lòng nhập Số điện thoại liên hệ';
    } else {
      const cleanPhone = formData.phone.replace(/[\s.-]/g, '');
      if (!/^(0|\+84)[0-9]{8,10}$/.test(cleanPhone)) {
        errors.phone = 'Số điện thoại không hợp lệ (10 chữ số, ví dụ: 0912345678)';
      }
    }

    if (!formData.company.trim()) {
      errors.company = 'Vui lòng nhập Đơn vị / Doanh nghiệp / Agency';
    }

    if (!formData.topic.trim()) {
      errors.topic = 'Vui lòng chọn Chủ đề / Nhu cầu hợp tác';
    }

    if (!formData.message.trim()) {
      errors.message = 'Vui lòng nhập Nội dung trao đổi / Lời mời làm việc';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Nội dung trao đổi tối thiểu 10 ký tự';
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setError('Vui lòng điền đầy đủ và chính xác tất cả các thông tin bắt buộc bên dưới.');
      return;
    }

    setLoading(true);
    try {
      const created = await submitContact(formData);
      setSubmittedContact(created);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedContact(null);
    setFieldErrors({});
    setError(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      topic: 'Tuyển dụng PR & Media',
      message: ''
    });
  };

  if (submittedContact) {
    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-emerald-200/90 shadow-xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
            Gửi liên hệ thành công!
          </span>
          <h3 className="text-2xl font-extrabold text-stone-900 font-heading">
            Cảm ơn bạn, {submittedContact.name}!
          </h3>
          <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            Lời nhắn của bạn đã được chuyển đến hệ thống của Phạm Minh Chiến. Tôi sẽ liên hệ lại trực tiếp qua Email hoặc Số điện thoại trong thời gian sớm nhất.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 inline-block text-left text-xs font-mono text-stone-600 max-w-sm w-full space-y-2">
          <div className="flex justify-between">
            <span className="text-stone-400">Mã yêu cầu:</span>
            <span className="font-bold text-stone-900">{submittedContact.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-400">Doanh nghiệp:</span>
            <span className="font-semibold text-stone-800">{submittedContact.company}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-400">Số điện thoại:</span>
            <span className="font-semibold text-stone-800">{submittedContact.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-400">Chủ đề:</span>
            <span className="font-semibold text-rose-600">{submittedContact.topic}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-400">Email:</span>
            <span className="font-medium text-stone-800">{submittedContact.email}</span>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm border border-stone-200 transition active:scale-95 cursor-pointer"
          >
            Gửi thêm lời nhắn khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
          <div>
            <span className="font-bold block">Chưa thể gửi thông tin:</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Preset Topics */}
      <div>
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-2">
          1. Chọn Chủ đề / Nhu cầu hợp tác <span className="text-rose-500">*</span>:
        </label>
        <div className="flex flex-wrap gap-2">
          {TOPIC_PRESETS.map((t) => {
            const isSelected = formData.topic === t;
            return (
              <button
                type="button"
                key={t}
                onClick={() => {
                  setFormData({ ...formData, topic: t });
                  if (fieldErrors.topic) {
                    setFieldErrors({ ...fieldErrors, topic: '' });
                  }
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20 font-bold border border-rose-600 scale-[1.02]'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/90'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
        {fieldErrors.topic && (
          <p className="mt-1.5 text-xs text-rose-600 font-medium">{fieldErrors.topic}</p>
        )}
      </div>

      {/* Group 2: Họ và tên & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-stone-400" />
              <span>Họ và tên</span>
              <span className="text-rose-500">*</span>
            </span>
          </label>
          <input
            type="text"
            required
            placeholder="Ví dụ: Nguyễn Văn An"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
            }}
            className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-stone-900 focus:outline-none focus:ring-2 shadow-xs transition-colors ${
              fieldErrors.name
                ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30'
                : 'border-stone-200/90 focus:ring-rose-500 focus:border-rose-500'
            }`}
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{fieldErrors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              <span>Địa chỉ Email</span>
              <span className="text-rose-500">*</span>
            </span>
          </label>
          <input
            type="email"
            required
            placeholder="tenban@company.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
            }}
            className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-stone-900 focus:outline-none focus:ring-2 shadow-xs transition-colors ${
              fieldErrors.email
                ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30'
                : 'border-stone-200/90 focus:ring-rose-500 focus:border-rose-500'
            }`}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      {/* Group 3: Số điện thoại & Đơn vị / Công ty */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              <span>Số điện thoại liên hệ</span>
              <span className="text-rose-500">*</span>
            </span>
          </label>
          <input
            type="tel"
            required
            placeholder="Ví dụ: 0912 345 678"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: '' });
            }}
            className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-stone-900 focus:outline-none focus:ring-2 shadow-xs transition-colors ${
              fieldErrors.phone
                ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30'
                : 'border-stone-200/90 focus:ring-rose-500 focus:border-rose-500'
            }`}
          />
          {fieldErrors.phone && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{fieldErrors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-stone-400" />
              <span>Đơn vị / Doanh nghiệp / Agency</span>
              <span className="text-rose-500">*</span>
            </span>
          </label>
          <input
            type="text"
            required
            placeholder="Ví dụ: Hapi Ecommerce / V-Next Media"
            value={formData.company}
            onChange={(e) => {
              setFormData({ ...formData, company: e.target.value });
              if (fieldErrors.company) setFieldErrors({ ...fieldErrors, company: '' });
            }}
            className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-stone-900 focus:outline-none focus:ring-2 shadow-xs transition-colors ${
              fieldErrors.company
                ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30'
                : 'border-stone-200/90 focus:ring-rose-500 focus:border-rose-500'
            }`}
          />
          {fieldErrors.company && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{fieldErrors.company}</p>
          )}
        </div>
      </div>

      {/* Group 4: Nội dung trao đổi */}
      <div>
        <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-stone-400" />
            <span>Nội dung trao đổi / Lời mời làm việc</span>
            <span className="text-rose-500">*</span>
          </span>
          <span className="text-[11px] font-mono text-stone-400 font-normal">
            (Bắt buộc tối thiểu 10 ký tự)
          </span>
        </label>
        <textarea
          required
          rows={4}
          placeholder="Mô tả chi tiết về vị trí tuyển dụng, đề xuất dự án hoặc yêu cầu booking sản xuất video ngắn..."
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: '' });
          }}
          className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-stone-900 focus:outline-none focus:ring-2 shadow-xs resize-none transition-colors ${
            fieldErrors.message
              ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/30'
              : 'border-stone-200/90 focus:ring-rose-500 focus:border-rose-500'
          }`}
        />
        {fieldErrors.message && (
          <p className="mt-1 text-xs text-rose-600 font-medium">{fieldErrors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2.5 active:scale-95 disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Đang kiểm tra & gửi thông tin...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Gửi lời mời & Kết nối ngay</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
