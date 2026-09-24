import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Maximize2, 
  X, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface ArticleItem {
  id: string;
  tabLabel: string;
  indexStr: string;
  date: string;
  category: string;
  title: string;
  subtitle: string;
  hook: string;
  contentSnippet: string[];
  callToAction: string;
  brand: string;
  imgSrc: string;
}

const ARTICLES_DATA: ArticleItem[] = [
  {
    id: "content-1",
    tabLabel: "01  Storytelling & Review",
    indexStr: "01",
    date: "24/06/2025",
    category: "Storytelling & Review",
    title: "BLACKMORES — SỮA MÁT NÃO SÁNG",
    subtitle: "Dinh Dưỡng Toàn Diện Cho Bé",
    hook: "Bé táo bón, chậm lớn, kém tập trung? Mỗi lần bé quấy khóc là mỗi lần mẹ lo lắng, bối rối không biết nên chọn sữa gì cho con...",
    contentSnippet: [
      "INFAT: Chất béo cấu trúc gần giống sữa mẹ, hỗ trợ hấp thu tốt, giảm táo bón rõ rệt.",
      "DHA, ARA: Tăng cường phát triển trí não, thị lực giúp bé nhanh nhẹn, thông minh.",
      "Canxi, Vitamin D: Hỗ trợ phát triển chiều cao, xương chắc khỏe.",
      "Prebiotics GOS: Tăng cường đề kháng, cho hệ tiêu hóa khỏe mạnh tự nhiên."
    ],
    callToAction: "Alo alo mẹ nào đang cho con dùng sữa BLACKMORES, điểm danh review sữa ở dưới bình luận nhé!",
    brand: "Ozzies Marts",
    imgSrc: "/images/bai-content-1.jpg"
  },
  {
    id: "content-2",
    tabLabel: "02  Insight Dinh Dưỡng",
    indexStr: "02",
    date: "17/06/2025",
    category: "Insight Dinh Dưỡng",
    title: "BUBS SUPREME — CHIỀU CAO VƯỢT TRỘI",
    subtitle: "Bứt Phá Tiềm Năng Thể Chất",
    hook: "Mẹ có thấy bé nhà mình chạy nhảy siêu giỏi nhưng lúc nào cũng thấp hơn bạn cùng tuổi không? Thể thao là chưa đủ...",
    contentSnippet: [
      "Chiều cao lý tưởng chính là lợi thế lớn để bé tự tin tỏa sáng!",
      "Siêu sao Bubs Supreme từ Úc: Bước đệm vững chắc cho các nhà vô địch tương lai.",
      "Bộ ba dưỡng chất vàng Canxi - Vitamin D3 - Phospho với tỷ lệ khoa học tối ưu.",
      "Hấp thu hoàn hảo nhờ công thức đạm dễ tiêu hóa, bổ sung DHA và Kẽm."
    ],
    callToAction: "Inbox Ozzies Mart ngay để con bùng nổ năng lượng, vươn mình thành siêu sao!",
    brand: "Ozzies Marts",
    imgSrc: "/images/bai-content-2.jpg"
  },
  {
    id: "content-3",
    tabLabel: "03  Thông Điệp Cảm Xúc",
    indexStr: "03",
    date: "28/06/2025",
    category: "Thông Điệp Cảm Xúc",
    title: "CHÚC MỪNG NGÀY GIA ĐÌNH VIỆT NAM",
    subtitle: "Gắn Kết & Lan Tỏa Yêu Thương",
    hook: "Gia đình không chỉ là nơi để trở về, mà còn là chốn tiếp thêm động lực, là nguồn yêu thương nuôi dưỡng ta tốt đẹp nhất mỗi ngày.",
    contentSnippet: [
      "Dịp để mỗi chúng ta tạm gác lại bộn bề thường nhật, trọn vẹn bên người thân yêu.",
      "Ozzies Marts tự hào là người bạn đồng hành trong hành trình vun đắp sức khỏe gia đình.",
      "Mang đến những dòng sản phẩm sữa uy tín, chất lượng cao giúp bữa ăn ngập tràn niềm vui.",
      "Gia đình hạnh phúc là nền tảng vững chắc cho một cuộc sống ý nghĩa."
    ],
    callToAction: "Gửi lời chúc ấm áp, an yên và tiếng cười rộn rã đến tất cả các gia đình Việt Nam!",
    brand: "Ozzies Marts",
    imgSrc: "/images/bai-content-3.jpg"
  },
  {
    id: "content-4",
    tabLabel: "04  Mẹo Theo Mùa",
    indexStr: "04",
    date: "04/07/2025",
    category: "Mẹo Theo Mùa",
    title: "MÙA HÈ OI BỨC — BINGSU SỮA GIẢI NHIỆT",
    subtitle: "Bí Quyết Chăm Bé Ngày Nóng",
    hook: "Cẩn thận các mẹ bỉm sữa ơi - Không là bị 'phỏng lài' đó nha! Thời tiết hè oi bức khiến bé biếng ăn, dễ mất nước...",
    contentSnippet: [
      "Tuyển chọn kỹ lưỡng các dòng sữa mát, dễ hấp thu, phù hợp thể trạng mùa hè.",
      "Nguồn gốc rõ ràng, kiểm định chất lượng chặt chẽ từ các thương hiệu quốc tế.",
      "Mẹo hay: Quậy sữa cho bé xong, để tủ lạnh rồi xay cùng đá nhuyễn làm bingsu mát lạnh!",
      "Vừa bổ sung đủ dưỡng chất, vừa giúp bé hào hứng uống sữa không lo nóng nực."
    ],
    callToAction: "Ozzies Marts - Nơi mẹ tin tưởng, bé yêu thương!",
    brand: "Ozzies Marts",
    imgSrc: "/images/bai-content-4.jpg"
  },
  {
    id: "content-5",
    tabLabel: "05  So Sánh & Cố Vấn",
    indexStr: "05",
    date: "08/07/2025",
    category: "So Sánh & Cố Vấn",
    title: "GIẢI PHÁP CHO BÉ KÉN VỊ SỮA",
    subtitle: "Tư Vấn Chọn Sữa Đúng Gu",
    hook: "Bé yêu kén vị sữa? Mẹ đừng lo, Ozzies Marts có ngay giải pháp thanh nhạt, nhẹ nhàng mà 'hợp gu' cho cả mẹ lẫn bé!",
    contentSnippet: [
      "Aptamilk: Vị thanh mát tự nhiên, công thức GOS/FOS và Omega-3 phát triển trí não.",
      "NAN Nga: Vị nhạt nhẹ dễ chịu, đạm Optipro và Bifidus BL hỗ trợ đường ruột khỏe mạnh.",
      "Austramilk: Sữa bò tươi nguyên chất từ Úc, công thức 6-trong-1 phát triển toàn diện.",
      "Ba trợ thủ đắc lực giúp việc uống sữa mỗi ngày không còn là 'cuộc chiến'."
    ],
    callToAction: "Ba dòng sữa - ba trợ thủ đắc lực giúp bé uống ngon, lớn khỏe mỗi ngày!",
    brand: "Ozzies Marts",
    imgSrc: "/images/bai-content-5.jpg"
  }
];

export function EditorialContentRailDirectional() {
  const [activeIndex, setActiveIndex] = useState(2); // Mặc định hiển thị bài 03 ở giữa
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const touchStartXRef = useRef<number | null>(null);

  const total = ARTICLES_DATA.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Hỗ trợ phím mũi tên bàn phím
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedArticle(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Hỗ trợ vuốt cảm ứng (touch swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 45) handleNext();
    else if (diff < -45) handlePrev();
    touchStartXRef.current = null;
  };

  // XỬ LÝ CLICK ĐIỀU HƯỚNG TRỰC TIẾP
  const handleCardClick = (e: React.MouseEvent, index: number, offset: number) => {
    e.stopPropagation();

    if (offset === 0) {
      // Bấm vào thẻ chính giữa -> Mở xem chi tiết
      setSelectedArticle(ARTICLES_DATA[index]);
    } else {
      // Bấm vào thẻ bên trái hoặc bên phải -> Lập tức xoay thẻ đó ra giữa
      setActiveIndex(index);
    }
  };

  return (
    <section 
      id="content-showcase"
      className="relative py-12 sm:py-16 bg-[#FAF7F2] text-stone-800 overflow-hidden select-none border-t border-rose-100/80 scroll-mt-16"
    >
      {/* Vệt sáng ấm lan tỏa tạo chiều sâu không gian */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-rose-200/35 via-amber-200/30 to-rose-100/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Phân đoạn với hiệu ứng Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 sm:mb-8 text-center sm:text-left"
        >
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-heading">
            Kho Bài Viết Content Thực Chiến
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
            Các ấn phẩm nội dung truyền thông do <strong className="text-rose-600 font-semibold">Phạm Minh Chiến</strong> trực tiếp lên ý tưởng, nghiên cứu insight và biên soạn cho thương hiệu <strong>Ozzies Marts</strong>.
          </p>
        </motion.div>

        {/* 1. THANH TABS ĐỒNG BỘ Ở PHÍA TRÊN VỚI ANIMATION HOVER & SPRING */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap mb-6 sm:mb-8"
        >
          {ARTICLES_DATA.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <motion.button
                key={item.id}
                type="button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 min-h-[36px] flex items-center gap-1.5 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold border-transparent shadow-md shadow-rose-500/25 scale-105'
                    : 'bg-white/90 hover:bg-white text-stone-600 hover:text-stone-900 border-stone-200 shadow-sm'
                }`}
              >
                <span>{item.tabLabel}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </motion.button>
            );
          })}
        </motion.div>

        {/* 2. KHÔNG GIAN 3D CAROUSEL BẤM TRÁI / PHẢI VỚI HIỆU ỨNG PERSPECTIVE & FLOATING */}
        <div 
          className="relative h-[430px] sm:h-[480px] flex items-center justify-center [perspective:1400px] overflow-visible"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Sàn sân khấu phản chiếu ánh sáng (Stage Platform) */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[70%] h-12 bg-gradient-to-t from-rose-500/20 via-amber-400/15 to-transparent rounded-full blur-2xl pointer-events-none animate-pulse" />

          <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d] pointer-events-auto">
            {ARTICLES_DATA.map((card, idx) => {
              let offset = idx - activeIndex;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isCenter = offset === 0;
              const isLeft = offset < 0;
              const isRight = offset > 0;
              const absOffset = Math.abs(offset);

              if (absOffset > 2) return null;

              // Bước nhảy khoảng cách cân bằng giữa hitbox và tầm nhìn
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
              const translateX = offset * (isMobile ? 150 : 260);
              const translateZ = -absOffset * 130;
              const rotateY = -offset * 24;
              const scale = 1 - absOffset * 0.12;
              const opacity = 1 - absOffset * 0.28;
              const zIndex = 50 - absOffset * 10;

              const hasImgError = imageErrors[card.id];

              return (
                <div
                  key={card.id}
                  className={`absolute w-[240px] sm:w-[285px] aspect-[1/1.42] rounded-3xl transition-all duration-500 ease-out flex flex-col justify-between group select-none pointer-events-auto ${
                    isCenter ? 'ring-4 ring-rose-500/25 shadow-2xl scale-[1.02]' : 'hover:scale-[1.04]'
                  }`}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transformStyle: 'preserve-3d',
                    filter: isCenter 
                      ? 'drop-shadow(0 20px 35px rgba(225,29,72,0.18)) drop-shadow(0 8px 16px rgba(0,0,0,0.1))' 
                      : 'brightness(0.85) blur(0.3px)'
                  }}
                >
                  {/* LỚP NÚT BẤM TOÀN BỘ BỀ MẶT THẺ PHỤ (CLICK LÀ CHUYỂN TRANG NGAY) */}
                  {!isCenter && (
                    <button
                      type="button"
                      onClick={(e) => handleCardClick(e, idx, offset)}
                      className="absolute inset-0 z-50 w-full h-full cursor-pointer bg-transparent rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 group pointer-events-auto"
                      aria-label={`Chuyển sang bài viết ${card.indexStr}`}
                    >
                      {/* Gợi ý mũi tên khi rê chuột vào thẻ bên trái/phải */}
                      <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center backdrop-blur-xs">
                        <div className="px-3.5 py-1.5 rounded-full bg-stone-900/90 text-white text-[11px] font-mono font-bold flex items-center gap-1.5 border border-stone-700 shadow-xl">
                          {isLeft && <ArrowLeft className="w-3.5 h-3.5 text-amber-400 animate-pulse" aria-hidden="true" />}
                          <span>{isLeft ? "Trở về bài này" : "Xem bài này"}</span>
                          {isRight && <ArrowRight className="w-3.5 h-3.5 text-amber-400 animate-pulse" aria-hidden="true" />}
                        </div>
                      </div>
                    </button>
                  )}

                  {/* KHUNG HIỂN THỊ NỘI DUNG THẺ BÀI */}
                  <div className={`w-full h-full p-2.5 sm:p-3 rounded-3xl flex flex-col justify-between shadow-xl relative overflow-hidden transition-all ${
                    isCenter 
                      ? 'bg-white border-2 border-rose-300 pointer-events-auto' 
                      : 'bg-[#F4EFE6] border-2 border-stone-300 pointer-events-none'
                  }`}>
                    
                    {/* Header bài viết */}
                    <div className="flex items-center justify-between px-1.5 pb-1.5 text-[9px] font-mono text-stone-600 border-b border-stone-200">
                      <span className="font-bold text-stone-800 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {card.brand}
                      </span>
                      <span className="text-stone-500 font-semibold">{card.date}</span>
                    </div>

                    {/* Vùng ảnh chụp thực tế */}
                    <div className="relative w-full flex-1 rounded-2xl overflow-hidden bg-white my-1.5 border border-stone-200 flex items-center justify-center group/img">
                      {!hasImgError ? (
                        <img 
                          src={card.imgSrc} 
                          alt={card.title} 
                          onError={() => setImageErrors(prev => ({ ...prev, [card.id]: true }))}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-stone-900 p-3 flex flex-col justify-between text-left text-white">
                          <div>
                            <span className="text-[9px] font-mono text-amber-300">{card.brand} • {card.date}</span>
                            <h4 className="text-[11px] font-bold mt-1.5 leading-snug">{card.title}</h4>
                            <p className="text-[9px] text-stone-300 italic mt-1.5 line-clamp-3 leading-relaxed">"{card.hook}"</p>
                          </div>
                          <span className="text-[8px] font-mono text-amber-400 bg-black/40 px-1.5 py-0.5 rounded self-start">{card.subtitle}</span>
                        </div>
                      )}

                      {/* Nút bấm đọc toàn văn trên thẻ chính giữa */}
                      {isCenter && (
                        <button
                          type="button"
                          onClick={(e) => handleCardClick(e, idx, 0)}
                          className="absolute inset-0 z-40 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs cursor-pointer pointer-events-auto"
                          aria-label="Mở đọc toàn văn bài viết"
                        >
                          <div className="px-4 py-2 rounded-full bg-white/95 text-rose-700 border border-rose-300 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-xl transform hover:scale-110 transition active:scale-95">
                            <Maximize2 className="w-3.5 h-3.5 text-rose-600" aria-hidden="true" />
                            <span>Đọc Toàn Văn</span>
                          </div>
                        </button>
                      )}
                    </div>

                    {/* Footer nhận diện bài viết */}
                    <div className="p-2 sm:p-2.5 rounded-2xl bg-stone-900 text-stone-100 flex items-center justify-between shadow-md pointer-events-auto">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-6 h-6 rounded-lg bg-stone-800 border border-amber-400/60 text-amber-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 shadow-inner">
                          {card.indexStr}
                        </div>
                        <div className="text-left overflow-hidden">
                          <h4 className="text-[10px] sm:text-[11px] font-extrabold text-white truncate tracking-tight uppercase font-heading">
                            {card.title}
                          </h4>
                          <p className="text-[8px] sm:text-[9px] font-mono text-amber-300 truncate">
                            {card.category}
                          </p>
                        </div>
                      </div>

                      {isCenter && (
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-rose-500/30 text-rose-300 border border-rose-400/30 shrink-0">
                          Active
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. NÚT ĐIỀU HƯỚNG DƯỚI CÙNG VỚI ANIMATION */}
        <div className="flex items-center justify-center gap-4 mt-5 sm:mt-6">
          <motion.button
            type="button"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 hover:border-rose-300 text-stone-700 hover:text-rose-600 transition shadow-sm min-h-[40px] min-w-[40px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer active:scale-95"
            aria-label="Xem bài viết trước"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </motion.button>

          {/* Thanh chấm chỉ thị vị trí (Dot Indicators) */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-200/60 backdrop-blur-sm">
            {ARTICLES_DATA.map((_, dotIdx) => {
              const isDotActive = dotIdx === activeIndex;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setActiveIndex(dotIdx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none ${
                    isDotActive 
                      ? 'w-7 bg-gradient-to-r from-rose-600 to-amber-500 shadow-sm' 
                      : 'w-2 bg-stone-400/60 hover:bg-stone-500'
                  }`}
                  aria-label={`Chuyển tới bài ${dotIdx + 1}`}
                />
              );
            })}
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 hover:border-rose-300 text-stone-700 hover:text-rose-600 transition shadow-sm min-h-[40px] min-w-[40px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer active:scale-95"
            aria-label="Xem bài viết tiếp theo"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        </div>

      </div>

      {/* 4. MODAL XEM TOÀN VĂN KHI BẤM THẺ CHÍNH GIỮA VỚI ANIMATE PRESENCE */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div 
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-white border border-stone-300 rounded-3xl p-6 sm:p-8 text-stone-800 max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 p-2.5 rounded-xl bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer"
                aria-label="Đóng cửa sổ bài viết"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-6 rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 flex items-center justify-center shadow-inner">
                  <img 
                    src={selectedArticle.imgSrc} 
                    alt={selectedArticle.title}
                    className="w-full h-auto object-contain max-h-[500px]"
                  />
                </div>

                <div className="md:col-span-6 space-y-4 text-left">
                  <div className="flex items-center gap-2 text-xs font-mono text-rose-700">
                    <span className="font-bold px-2 py-0.5 rounded bg-rose-50 border border-rose-200">
                      BÀI VIẾT {selectedArticle.indexStr}
                    </span>
                    <span>•</span>
                    <span>{selectedArticle.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 leading-snug font-heading">
                    {selectedArticle.title}
                  </h3>

                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                    "{selectedArticle.hook}"
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-stone-700 font-bold block">
                      Luận Điểm Trọng Tâm:
                    </span>
                    {selectedArticle.contentSnippet.map((line, lIdx) => (
                      <div key={lIdx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-stone-200 text-xs text-stone-600">
                    <strong className="text-rose-600 block mb-0.5">Kêu gọi hành động:</strong> 
                    {selectedArticle.callToAction}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

// Aliases for compatibility
export { EditorialContentRailDirectional as EditorialContentRail, EditorialContentRailDirectional as ContentCharacterCarousel };
