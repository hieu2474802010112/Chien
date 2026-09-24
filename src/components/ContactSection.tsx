import { motion } from 'framer-motion';
import { Mail, Phone, Download, Clock, MapPin, Send } from 'lucide-react';

interface ContactProps {
  cvUrl: string;
}

export function ContactSection({ cvUrl }: ContactProps) {
  return (
    <footer id="contact" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center border-t border-[#1F2937]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Launch Date Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-slate-300 text-xs font-medium mb-6 border border-slate-700">
          <Clock className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
          <span>Kế hoạch ra mắt: 27/09/2026</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
          Người liên hệ và kênh trao đổi: PHẠM MINH CHIẾN
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Quý nhà tuyển dụng và đối tác có thể tải CV hoặc hồ sơ năng lực trực tiếp, hoặc kết nối qua thông tin liên hệ bên dưới để trao đổi cơ hội hợp tác.
        </p>

        {/* Address Card */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs sm:text-sm">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
          <span>Địa chỉ: <strong>113/19/1 Trần Văn Đang, Phường 11, Quận 3, TP. Hồ Chí Minh</strong></span>
        </div>

        {/* Contact Actions Buttons (Min touch target >= 48px) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:Phamminhchien2017@gmail.com"
            className="inline-flex items-center gap-2.5 text-sm font-medium text-slate-200 hover:text-white bg-[#111827] border border-[#1F2937] hover:border-blue-500/50 min-h-[48px] px-5 py-3 rounded-xl transition-all focus-visible:outline-2 focus-visible:outline-blue-500 shadow-md shadow-black/20 active:scale-[0.98]"
            aria-label="Gửi email đến Phạm Minh Chiến"
          >
            <Mail className="w-4 h-4 text-blue-400" aria-hidden="true" />
            <span>Phamminhchien2017@gmail.com</span>
          </a>

          <a
            href="tel:0566045020"
            className="inline-flex items-center gap-2.5 text-sm font-medium text-slate-200 hover:text-white bg-[#111827] border border-[#1F2937] hover:border-emerald-500/50 min-h-[48px] px-5 py-3 rounded-xl transition-all focus-visible:outline-2 focus-visible:outline-blue-500 shadow-md shadow-black/20 active:scale-[0.98]"
            aria-label="Gọi điện thoại cho Phạm Minh Chiến"
          >
            <Phone className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>0566 045 020</span>
          </a>

          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] min-h-[48px] px-6 py-3 rounded-xl transition-all focus-visible:outline-2 focus-visible:outline-blue-400 shadow-lg shadow-blue-600/25"
            aria-label="Tải CV hoặc hồ sơ Phạm Minh Chiến"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Tải CV hoặc hồ sơ</span>
          </a>
        </div>

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-[#1F2937] text-center text-xs text-slate-500 space-y-1">
          <p>© 2026 PHẠM MINH CHIẾN. Chuyên ngành Quan hệ công chúng (PR) – Trường Đại học Gia Định.</p>
          <p className="text-[11px] text-slate-600">Loại portfolio: Cá nhân. Mục tiêu: Ứng tuyển & Giới thiệu năng lực.</p>
        </div>
      </motion.div>
    </footer>
  );
}
