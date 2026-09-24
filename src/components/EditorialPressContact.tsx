import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  ArrowUp,
  Award
} from 'lucide-react';
import { ContactForm } from './ContactForm';

interface ContactProps {
  cvUrl?: string;
  onScrollToTop?: () => void;
}

export function EditorialPressContact({
  cvUrl = "/CV PHẠM MINH CHIẾN (6) (1).pdf",
  onScrollToTop
}: ContactProps) {
  
  const scrollToTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer 
      id="contact" 
      className="relative bg-[#FAF7F2] text-stone-800 pt-20 pb-12 overflow-hidden border-t border-rose-100/80"
    >
      {/* Vệt sáng hội tụ ấm áp phong cách Gala Dinner đồng bộ toàn trang */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-gradient-to-b from-rose-200/40 via-amber-200/30 to-transparent blur-3xl pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* 1. KHỐI BIỂU MẪU LIÊN HỆ CÔNG KHAI (ĐƯA LÊN TRÊN) */}
        <div className="relative rounded-3xl bg-white/95 border-2 border-rose-200/80 p-8 sm:p-12 shadow-xl shadow-rose-950/5 backdrop-blur-xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-600 font-bold block mb-2">
              BIỂU MẪU KẾT NỐI TRỰC TIẾP
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-heading">
              Gửi lời nhắn hoặc đề xuất hợp tác
            </h3>
            <p className="mt-2 text-stone-600 text-xs sm:text-sm leading-relaxed">
              Quý nhà tuyển dụng và đối tác có thể gửi nhanh lời mời làm việc hoặc yêu cầu dự án. Thông tin sẽ được gửi trực tiếp đến hệ thống quản lý của Phạm Minh Chiến.
            </p>
          </div>

          <ContactForm />
        </div>

        {/* 2. KHỐI THIỆP MỜI BÁO CHÍ & DANH THIẾP TRUYỀN THÔNG (ĐƯA XUỐNG DƯỚI CÙNG) */}
        <div className="relative rounded-3xl bg-white/95 border-2 border-rose-200/80 p-8 sm:p-12 shadow-2xl shadow-rose-950/10 backdrop-blur-xl overflow-hidden text-stone-900">
          
          {/* Họa tiết góc mạ vàng viền thiệp sang trọng */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-200/40 via-rose-200/20 to-transparent pointer-events-none" />


          <div className="max-w-3xl">
            {/* Lời ngỏ bế mạc hồ sơ */}
            <div className="mb-6 space-y-3.5 sm:space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-rose-600 font-bold block pb-1">
                KẾT NỐI TRUYỀN THÔNG & PHÁT TRIỂN DỰ ÁN
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight font-heading space-y-2 sm:space-y-2.5">
                <span className="block uppercase leading-[1.25]">
                  Sẵn Sàng Đồng Hành Cùng
                </span>
                <span className="block uppercase leading-[1.25] text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 pt-0.5">
                  Những Chiến Dịch Bùng Nổ.
                </span>
              </h2>
            </div>

            <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              Tôi luôn tìm kiếm cơ hội mang năng lực sáng tạo nội dung đa kênh, kỹ năng quay dựng video giữ chân người xem và tư duy kỷ luật vì KPI để đồng hành tạo nên bước chuyển mình cho thương hiệu.
            </p>
          </div>

          {/* DẢI THÔNG TIN LIÊN HỆ TRỰC DIỆN (CHẠM ĐỂ GỌI / GỬI THƯ TRỰC TIẾP) */}
          <div className="mt-10 pt-8 border-t border-stone-200/90 space-y-6">
            
            {/* Hàng 1: Hai kênh liên lạc Email & Hotline trực tiếp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Thẻ Email */}
              <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80 hover:border-rose-300 transition-colors">
                <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block mb-1.5">
                  Thư điện tử trao đổi công việc
                </span>
                <a 
                  href="mailto:Phamminhchien2017@gmail.com"
                  className="group inline-flex items-center gap-2.5 text-base sm:text-lg font-bold text-stone-900 hover:text-rose-600 transition-colors"
                  aria-label="Gửi thư điện tử tới Phạm Minh Chiến"
                >
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 group-hover:scale-105 transition-all shadow-xs shrink-0">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="truncate group-hover:underline underline-offset-4 decoration-rose-400">Phamminhchien2017@gmail.com</span>
                  <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-rose-600 shrink-0 transition-all" aria-hidden="true" />
                </a>
              </div>

              {/* Thẻ Hotline */}
              <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/80 hover:border-amber-300 transition-colors">
                <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block mb-1.5">
                  Đường dây liên hệ trực tiếp
                </span>
                <a 
                  href="tel:0566045020"
                  className="group inline-flex items-center gap-2.5 text-base sm:text-lg font-extrabold text-stone-900 font-mono hover:text-rose-600 transition-colors"
                  aria-label="Gọi điện thoại trực tiếp tới Phạm Minh Chiến"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-all shadow-xs shrink-0">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="group-hover:underline underline-offset-4 decoration-amber-400">0566 045 020</span>
                  <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-rose-600 shrink-0 transition-all" aria-hidden="true" />
                </a>
              </div>

            </div>

            {/* Hàng 2: Địa bàn làm việc & Định danh nhân hiệu */}
            <div className="pt-4 border-t border-stone-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-600">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>113/19/1 Trần Văn Đang, Phường 11, Quận 3, TP. Hồ Chí Minh</span>
              </div>

              <div className="text-left sm:text-right space-y-0.5 shrink-0">
                <div className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-rose-600 font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>ĐẠI HỌC GIA ĐỊNH</span>
                </div>
                <div className="text-base font-extrabold text-stone-900 tracking-tight font-heading">
                  Phạm Minh Chiến
                </div>
                <div className="text-xs text-stone-500 font-medium">
                  Cử nhân Chuyên ngành Quan hệ công chúng (PR)
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 3. CHÂN TRANG ĐỒNG BỘ TINH TẾ */}
        <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <p>© 2026 Hiếu Đỗ Và JAThong. Thiết kế và xây dựng portfolio.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-stone-600 hover:text-rose-600 transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-xl min-h-[44px] cursor-pointer font-medium"
          >
            <span>Về Đầu Trang</span>
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

      </div>
    </footer>
  );
}
