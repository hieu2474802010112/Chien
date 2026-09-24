import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Flame, 
  Mic2, 
  Sliders, 
  Compass, 
  Layers,
  Share2,
  Award,
  CheckCircle2
} from 'lucide-react';

export function ExperienceSection() {
  const skills = [
    {
      category: "Lĩnh Vực Chuyên Môn",
      badge: "PR & Media Strategy",
      count: "5 Năng Lực Cốt Lõi",
      icon: Share2,
      border: "border-rose-200/90 hover:border-rose-400",
      accent: "from-rose-50/90 via-white to-amber-50/30",
      iconBg: "bg-rose-50 border-rose-200 text-rose-600 shadow-rose-200/50",
      tagColor: "bg-rose-50/90 text-rose-700 border-rose-200",
      badgeColor: "bg-rose-100/80 text-rose-800",
      dotColor: "bg-rose-500",
      items: [
        {
          title: "Social Media & Kênh Truyền Thông",
          desc: "Phát triển kênh TikTok, Fanpage đa nền tảng",
          tag: "Tăng Trưởng"
        },
        {
          title: "Sáng Tạo Nội Dung Đa Định Dạng",
          desc: "Kịch bản Video ngắn & bài viết định hướng Viral",
          tag: "Content"
        },
        {
          title: "Viết Bài PR & Báo Chí",
          desc: "Thông điệp chuẩn mực, nâng tầm uy tín thương hiệu",
          tag: "Copywriting"
        },
        {
          title: "Lập Kế Hoạch & Sự Kiện",
          desc: "Quản trị timeline, điều phối nhân sự hiện trường",
          tag: "Event Ops"
        },
        {
          title: "Giao Tiếp & Xử Lý Tình Huống",
          desc: "Phản xạ linh hoạt, bảo vệ hình ảnh thương hiệu",
          tag: "Field PR"
        }
      ]
    },
    {
      category: "Công Cụ & Kỹ Thuật",
      badge: "Production Suite",
      count: "4 Nền Tảng Thành Thạo",
      icon: Layers,
      border: "border-amber-200/90 hover:border-amber-400",
      accent: "from-amber-50/90 via-white to-rose-50/30",
      iconBg: "bg-amber-50 border-amber-200 text-amber-600 shadow-amber-200/50",
      tagColor: "bg-amber-50/90 text-amber-700 border-amber-200",
      badgeColor: "bg-amber-100/80 text-amber-800",
      dotColor: "bg-amber-500",
      items: [
        {
          title: "CapCut Pro",
          desc: "Dựng video, bắt nhịp pacing giữ chân người xem",
          tag: "Video Editor"
        },
        {
          title: "Adobe Photoshop",
          desc: "Thiết kế poster, banner và đồ họa truyền thông",
          tag: "Graphic Design"
        },
        {
          title: "Canva Pro",
          desc: "Đóng gói ấn phẩm nhanh, đồng bộ nhận diện số",
          tag: "Media Kit"
        },
        {
          title: "TikTok Creator Tools",
          desc: "Nghiên cứu xu hướng, phân tích số liệu & SEO",
          tag: "Analytics"
        }
      ]
    },
    {
      category: "Tác Phong & Phẩm Chất",
      badge: "Work Ethic & Mindset",
      count: "4 Tiêu Chuẩn Nghề",
      icon: Award,
      border: "border-emerald-200/90 hover:border-emerald-400",
      accent: "from-emerald-50/90 via-white to-teal-50/30",
      iconBg: "bg-emerald-50 border-emerald-200 text-emerald-600 shadow-emerald-200/50",
      tagColor: "bg-emerald-50/90 text-emerald-700 border-emerald-200",
      badgeColor: "bg-emerald-100/80 text-emerald-800",
      dotColor: "bg-emerald-500",
      items: [
        {
          title: "Chăm Chỉ & Tỉ Mỉ",
          desc: "Chăm chút từng khung hình, câu từ và hình ảnh",
          tag: "Chi Tiết"
        },
        {
          title: "Kỷ Luật Cao Vì KPI",
          desc: "Kiên trì theo đuổi và cam kết mục tiêu hiệu suất",
          tag: "Mục Tiêu"
        },
        {
          title: "Tác Phong Hòa Nhã",
          desc: "Lịch thiệp, cởi mở và dễ tạo thiện cảm khi cộng tác",
          tag: "Đồng Đội"
        },
        {
          title: "Cầu Thị & Học Hỏi",
          desc: "Lắng nghe phản hồi tích cực để hoàn thiện sản phẩm",
          tag: "Phát Triển"
        }
      ]
    }
  ];

  return (
    <section 
      id="experience" 
      className="py-24 sm:py-28 bg-[#FAF7F2] text-stone-800 relative overflow-hidden select-none border-t border-rose-100/80"
    >
      {/* Vệt sáng nghệ thuật ấm áp đồng bộ toàn trang */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-gradient-to-br from-amber-200/30 via-rose-200/30 to-transparent blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-rose-200/20 blur-3xl pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* TIÊU ĐỀ PHÂN ĐOẠN VỚI SCROLL REVEAL ANIMATION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-stone-200 pb-10"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight font-heading space-y-1.5 sm:space-y-2">
              <span className="block uppercase leading-[1.25]">
                Hành Trình Nghề Nghiệp &
              </span>
              <span className="block uppercase leading-[1.25] text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 pt-0.5">
                Sân Khấu Sự Kiện
              </span>
            </h2>
          </div>
          <p className="text-stone-600 text-sm max-w-sm leading-relaxed text-left md:text-right">
            Dấu ấn sáng tạo nội dung đa kênh kết hợp năng lực điều phối, kịch bản sân khấu trực tiếp tại hiện trường.
          </p>
        </motion.div>

        {/* BỐ CỤC NGHỆ THUẬT 2 CỘT MỞ (EDITORIAL STYLE - LIGHT WARM PALETTE) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* ========================================================
              CỘT TRÁI (7 CỘT): CHIẾN DỊCH & VỊ TRÍ TRUYỀN THÔNG (EDITORIAL STYLE)
              ======================================================== */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* CHIẾN DỊCH 01: HAPI ECOMMERCE */}
            <motion.div 
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Số thứ tự nghệ thuật phóng lớn chạy ngầm */}
              <span 
                className="absolute -top-10 -left-4 text-7xl sm:text-8xl font-black text-stone-300/40 select-none pointer-events-none group-hover:text-rose-500/20 group-hover:translate-x-1 transition-all duration-500 font-heading"
                aria-hidden="true"
              >
                01
              </span>

              <div className="relative z-10 pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-rose-600 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    Tháng 06/2025 — Tháng 05/2026 • HAPI ECOMMERCE
                  </span>
                  <span className="text-[11px] font-mono text-stone-500">11 Tháng Thực Chiến</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight group-hover:text-rose-600 transition-colors font-heading">
                  Social Media & Thương Mại Sản Phẩm
                </h3>

                {/* Tóm tắt luận điểm giá trị */}
                <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
                  Đảm nhận toàn bộ quy trình phát triển kênh TikTok từ khâu <strong className="text-stone-900 font-semibold">lên ý tưởng, kịch bản đến trực tiếp quay dựng video ngắn</strong>. Trực tiếp thực hiện hình ảnh sản phẩm cho các bộ sưu tập thời trang (áo thun, áo khoác), mỹ phẩm và ấn phẩm quà tặng.
                </p>

                {/* Điểm nhấn thành tựu số (Highlight KPI Box) */}
                <motion.div 
                  whileHover={{ scale: 1.015, y: -2 }}
                  className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-transparent border-l-4 border-amber-500 text-xs sm:text-sm text-stone-800 shadow-sm hover:shadow-md transition-all"
                >
                  <span className="text-amber-800 font-bold block mb-1 font-mono uppercase text-[11px] tracking-wider">KẾT QUẢ ĐẦU RA & DOANH SỐ:</span>
                  Nghiên cứu thị hiếu tiêu dùng, kết hợp nội dung đánh trúng tâm lý để trực tiếp chốt đơn và hoàn thành chỉ tiêu doanh số <strong className="text-emerald-600 font-mono font-bold text-base">60 sản phẩm / tháng</strong>.
                </motion.div>

                {/* Nhãn kỹ năng chuyên môn */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {['Quản Trị TikTok', 'Quay Dựng CapCut', 'Sản Xuất Hình Ảnh', 'Tư Duy Bán Hàng'].map((tag, tIdx) => (
                    <motion.span 
                      key={tIdx} 
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-white text-stone-700 border border-stone-200 shadow-xs hover:border-rose-300 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Đường ngăn cách phong cách tạp chí */}
            <div className="w-full h-px bg-gradient-to-r from-stone-300 via-stone-200 to-transparent" />

            {/* CHIẾN DỊCH 02: KHÁC BIỆT LÀ TẤT CẢ */}
            <motion.div 
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Số thứ tự nghệ thuật */}
              <span 
                className="absolute -top-10 -left-4 text-7xl sm:text-8xl font-black text-stone-300/40 select-none pointer-events-none group-hover:text-amber-500/20 group-hover:translate-x-1 transition-all duration-500 font-heading"
                aria-hidden="true"
              >
                02
              </span>

              <div className="relative z-10 pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Tháng 05/2024 — Tháng 04/2025 • KHÁC BIỆT LÀ TẤT CẢ
                  </span>
                  <span className="text-[11px] font-mono text-stone-500">11 Tháng Thực Chiến</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight group-hover:text-amber-600 transition-colors font-heading">
                  Chiến Lược Content Marketing Đa Kênh
                </h3>

                {/* Tóm tắt luận điểm giá trị */}
                <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
                  Lập kế hoạch và biên soạn nội dung truyền thông quảng bá trên <strong className="text-stone-900 font-semibold">Facebook và TikTok</strong>. Phụ trách chắp bút các bài viết PR giới thiệu thương hiệu, biên soạn kịch bản video quảng cáo và hỗ trợ thiết kế ấn phẩm đồ họa cơ bản.
                </p>

                {/* Điểm nhấn thành tựu */}
                <motion.div 
                  whileHover={{ scale: 1.015, y: -2 }}
                  className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-white to-transparent border-l-4 border-rose-500 text-xs sm:text-sm text-stone-800 shadow-sm hover:shadow-md transition-all"
                >
                  <span className="text-rose-700 font-bold block mb-1 font-mono uppercase text-[11px] tracking-wider">NĂNG LỰC BỀN BỈ & ĐÚNG HẠN:</span>
                  Theo dõi số liệu đo lường tương tác định kỳ, chủ động đưa ra các phương án tối ưu nhịp tương tác và hoàn thành đúng tiến độ mọi chiến dịch được giao.
                </motion.div>

                {/* Nhãn kỹ năng chuyên môn */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {['Bài Viết PR Báo Chí', 'Kịch Bản TVC/Quảng Cáo', 'Thiết Kế Đồ Họa', 'Đo Lường Tương Tác'].map((tag, tIdx) => (
                    <motion.span 
                      key={tIdx} 
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-white text-stone-700 border border-stone-200 shadow-xs hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

          {/* ========================================================
              CỘT PHẢI (5 CỘT): SỰ KIỆN SÂN KHẤU (VIP EVENT PASSES - LIGHT WARM)
              ======================================================== */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rose-600 font-bold"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>Dấu Ấn Sân Khấu & Điều Phối Sự Kiện</span>
            </motion.div>

            {/* PASS 01: THE MONEYVERSE (THIẾT KẾ THẺ PASS SỰ KIỆN VIP) */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                animate={{ 
                  y: [-3, 3, -3],
                  rotate: [-0.3, 0.3, -0.3]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                whileHover={{ scale: 1.025, y: -6, rotate: 0 }}
                className="relative p-6 sm:p-7 rounded-3xl bg-white/95 border-2 border-amber-300 shadow-xl shadow-amber-950/5 hover:shadow-2xl hover:shadow-amber-950/15 hover:border-amber-400 transition-all duration-300 group cursor-default"
              >
                {/* Lỗ khoét đeo thẻ sự kiện tượng trưng */}
                <div className="w-12 h-1.5 bg-stone-200 border border-stone-300 rounded-full mx-auto mb-5" />

                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-amber-700 tracking-wider font-bold">VIP MEDIA PASS</span>
                  <span className="text-stone-400 font-semibold">EVENT NO. 01</span>
                </div>

                <h4 className="text-2xl font-black text-stone-900 tracking-tight uppercase group-hover:text-amber-600 transition-colors font-heading">
                  THE MONEYVERSE
                </h4>

                <div className="mt-2.5 mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-medium">
                  <Mic2 className="w-3.5 h-3.5 text-amber-600 animate-pulse" aria-hidden="true" />
                  <span>Điều Phối Khách Mời & Talent</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Đảm nhiệm công tác đón tiếp các vị khách quý (VIP), điều hướng lịch trình và chăm sóc chuyên nghiệp cho dàn Talent, diễn giả trong suốt khuôn khổ chương trình.
                </p>

                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span>VAI TRÒ HẬU CẦN & NGOẠI GIAO</span>
                  <span className="text-amber-700 font-semibold">ACCORD APPROVED</span>
                </div>
              </motion.div>
            </motion.div>

            {/* PASS 02: SHOW RAP SPACE (THIẾT KẾ THẺ PASS SÂN KHẤU ÂM NHẠC) */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                animate={{ 
                  y: [3, -3, 3],
                  rotate: [0.3, -0.3, 0.3]
                }}
                transition={{ 
                  duration: 5.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                whileHover={{ scale: 1.025, y: -6, rotate: 0 }}
                className="relative p-6 sm:p-7 rounded-3xl bg-white/95 border-2 border-rose-300 shadow-xl shadow-rose-950/5 hover:shadow-2xl hover:shadow-rose-950/15 hover:border-rose-400 transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-1.5 bg-stone-200 border border-stone-300 rounded-full mx-auto mb-5" />

                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-rose-600 tracking-wider font-bold">STAGE PRODUCTION PASS</span>
                  <span className="text-stone-400 font-semibold">EVENT NO. 02</span>
                </div>

                <h4 className="text-2xl font-black text-stone-900 tracking-tight uppercase group-hover:text-rose-600 transition-colors font-heading">
                  SHOW RAP SPACE
                </h4>

                <div className="mt-2.5 mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono font-medium">
                  <Sliders className="w-3.5 h-3.5 text-rose-500 animate-pulse" aria-hidden="true" />
                  <span>Kịch Bản Âm Thanh & Ánh Sáng</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Xây dựng kịch bản kỹ thuật chi tiết theo nhịp điệu bài hát; đồng bộ nhịp nhàng cùng bộ phận kỹ thuật để tạo nên hiệu ứng thị giác và âm thanh bùng nổ trên sân khấu.
                </p>

                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span>VAI TRÒ ĐẠO DIỄN KỸ THUẬT</span>
                  <span className="text-rose-600 font-semibold">LIVE STAGE CUE</span>
                </div>
              </motion.div>
            </motion.div>

            {/* HỘP ĐÚC KẾT: TÁC PHONG CHUYÊN MÔN (EXECUTIVE STATEMENT) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -3, scale: 1.015 }}
              className="p-6 rounded-3xl bg-white/90 border border-stone-200 text-left shadow-sm hover:shadow-md hover:border-amber-300 transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-bold uppercase mb-2">
                <Flame className="w-4 h-4 text-amber-600 animate-pulse" aria-hidden="true" />
                <span>Thế Mạnh Ngoại Giao & Xử Lý Hiện Trường</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Thái độ hòa nhã, cẩn trọng; phản xạ ứng biến tức thì trước các tình huống phát sinh tại hiện trường và tinh thần làm việc nhóm kỷ luật cao để bảo đảm tiến độ sự kiện.
              </p>
            </motion.div>

          </div>

        </div>

        {/* MA TRẬN NĂNG LỰC & CÔNG CỤ (EXECUTIVE BENTO COMPETENCY MATRIX) */}
        <div className="pt-10 border-t border-stone-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-rose-600 font-bold block mb-1">
                BẢNG NĂNG LỰC TỔNG QUAN
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-heading">
                Ma Trận Kỹ Năng & Phẩm Chất Nghề Nghiệp
              </h3>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono text-stone-500 bg-white px-3 py-1 rounded-full border border-stone-200 shadow-xs">
              3 Khối Năng Lực Toàn Diện
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {skills.map((group, idx) => {
              const IconComp = group.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-b ${group.accent} bg-white/95 border-2 ${group.border} backdrop-blur-xl shadow-xl shadow-rose-950/5 hover:shadow-2xl hover:shadow-rose-950/10 transition-all duration-300 group flex flex-col justify-between`}
                >
                  <div>
                    {/* Header Card với Badge & Icon */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl bg-white border-2 ${group.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${group.tagColor} shadow-xs`}>
                        {group.badge}
                      </span>
                    </div>

                    <div className="mb-5">
                      <h4 className="text-lg sm:text-xl font-extrabold text-stone-900 font-heading group-hover:text-rose-600 transition-colors">
                        {group.category}
                      </h4>
                      <span className="text-xs font-mono text-stone-500 font-medium block mt-0.5">
                        {group.count}
                      </span>
                    </div>

                    {/* Danh sách thẻ năng lực chi tiết */}
                    <div className="space-y-2.5">
                      {group.items.map((item, sIdx) => (
                        <div 
                          key={sIdx}
                          className="p-3 rounded-2xl bg-white/90 border border-stone-200/80 hover:border-rose-300 hover:bg-white hover:shadow-sm transition-all duration-200 group/item flex items-start justify-between gap-3"
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <span className={`w-2 h-2 rounded-full ${group.dotColor} shrink-0 mt-1.5 group-hover/item:scale-125 transition-transform`} />
                            <div className="min-w-0">
                              <span className="text-xs sm:text-[13px] font-bold text-stone-900 block leading-snug tracking-tight">
                                {item.title}
                              </span>
                              <span className="text-[11px] text-stone-500 block leading-tight mt-0.5 font-light">
                                {item.desc}
                              </span>
                            </div>
                          </div>
                          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md shrink-0 self-start border ${group.tagColor}`}>
                            {item.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
