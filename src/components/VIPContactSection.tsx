import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowUpRight, 
  ArrowUp 
} from 'lucide-react';

interface ContactSectionProps {
  cvUrl?: string;
  onScrollToTop?: () => void;
}

export function VIPContactSection({
  cvUrl = "https://drive.google.com/file/d/1uoveqVh_QBdRe41lvxGuBpLjhW4zd_vF/view?usp=drive_link",
  onScrollToTop
}: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = "Phamminhchien2017@gmail.com";
  const phone = "0566045020";
  const address = "113/19/1 Trần Văn Đang, Phường 11, Quận 3, TP. Hồ Chí Minh";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const scrollToTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="relative bg-[#0C0A09] text-stone-100 pt-28 pb-12 overflow-hidden border-t border-stone-800/80 select-none">
      
      {/* Ánh sáng tỏa ấm áp không gian Gala (Warm Amber & Velvet Wine Glow) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-amber-600/10 via-rose-950/15 to-transparent blur-3xl pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* 1. TIÊU ĐỀ KÊU GỌI HỢP TÁC TRANG TRỌNG */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/30 text-amber-400 text-xs font-mono mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>SẴN SÀNG CỐNG HIẾN CHO CƠ HỘI MỚI</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase font-heading">
            Đồng Hành Cùng <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-amber-200">
              Phát Triển Thương Hiệu.
            </span>
          </h2>

          <p className="mt-4 text-stone-400 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            Quý Nhà tuyển dụng và Doanh nghiệp có thể tải toàn bộ hồ sơ năng lực hoặc kết nối trực tiếp với Phạm Minh Chiến qua các kênh liên hệ dưới đây.
          </p>
        </div>

        {/* 2. CỤM DANH THIẾP LIÊN HỆ ĐA NĂNG (3 KHỐI CARD GỌN GÀNG) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          
          {/* HỘP 01: EMAIL TRAO ĐỔI */}
          <div className="p-6 rounded-3xl bg-[#141216]/90 border border-stone-800 hover:border-amber-500/40 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-stone-900 border border-stone-700 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-[11px] font-mono text-stone-300 hover:text-white transition min-h-[36px]"
                  aria-label="Sao chép địa chỉ email"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                      <span className="text-emerald-400">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>

              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block">Thư Điện Tử</span>
              <a 
                href={`mailto:${email}`}
                className="text-sm font-bold text-white hover:text-amber-300 transition-colors break-all mt-1 block"
              >
                {email}
              </a>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-stone-400">
              <span>Phản hồi trong 24h</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
            </div>
          </div>

          {/* HỘP 02: HOTLINE GỌI NGAY */}
          <div className="p-6 rounded-3xl bg-[#141216]/90 border border-stone-800 hover:border-amber-500/40 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-stone-900 border border-stone-700 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-[11px] font-mono text-stone-300 hover:text-white transition min-h-[36px]"
                  aria-label="Sao chép số điện thoại"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                      <span className="text-emerald-400">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>

              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block">Điện Thoại Trực Tiếp</span>
              <a 
                href={`tel:${phone}`}
                className="text-lg font-extrabold text-white font-mono hover:text-emerald-400 transition-colors mt-1 block"
              >
                0566 045 020
              </a>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-stone-400">
              <span>Zalo / Gọi trực tiếp</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
            </div>
          </div>

          {/* HỘP 03: ĐỊA BÀN HOẠT ĐỘNG */}
          <div className="p-6 rounded-3xl bg-[#141216]/90 border border-stone-800 hover:border-amber-500/40 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-stone-900 border border-stone-700 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400">
                  TP.HCM
                </span>
              </div>

              <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block">Khu Vực Làm Việc</span>
              <p className="text-xs sm:text-sm font-semibold text-stone-200 mt-1 leading-snug">
                {address}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-stone-400">
              <span>Quận 3 • Sẵn sàng On-site</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

        </div>

        {/* 3. NÚT HÀNH ĐỘNG CHÍNH (PRIMARY CTA TOÀN DIỆN) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-stone-900/90 to-[#120F14] border border-amber-500/40 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-heading">
              Tải Bản Hồ Sơ Năng Lực Chi Tiết (PDF)
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Bản hồ sơ bao gồm chứng nhận tốt nghiệp Cử nhân PR ĐH Gia Định, số liệu các chiến dịch đạt 1,000,000+ views và kinh nghiệm điều phối sự kiện thực tế.
            </p>

            <div className="pt-3">
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 hover:from-amber-500 hover:to-rose-500 min-h-[52px] px-8 py-3.5 rounded-2xl transition-all shadow-xl shadow-rose-950/60 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                <span>Tải Xuống Bản CV Hoàn Chỉnh</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4. FOOTER BẢN QUYỀN ĐỒNG BỘ */}
        <div className="mt-20 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <p>© 2026 PHẠM MINH CHIẾN. Chuyên ngành Quan hệ công chúng — ĐH Gia Định.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 hover:text-amber-400 transition-colors p-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 rounded-lg cursor-pointer"
          >
            <span>Về Đầu Trang</span>
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

      </div>
    </footer>
  );
}
