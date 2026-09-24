import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Calendar, 
  Sparkles, 
  Eye, 
  X, 
  CheckCircle2, 
  Share2,
  Bookmark,
  TrendingUp,
  Award
} from 'lucide-react';

export interface ArticleItem {
  id: string;
  indexStr: string;
  date: string;
  category: string;
  title: string;
  hook: string;
  contentSnippet: string[];
  callToAction: string;
  brand: string;
  highlights: string[];
}

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: "content-1",
    indexStr: "01",
    date: "24/06/2025",
    category: "Product Storytelling",
    title: "Sữa Mát, Não Sáng, Bé Lớn Nhanh — Có Blackmores Là Đủ",
    hook: "Bé táo bón, chậm lớn, kém tập trung? Mỗi lần bé quấy khóc là mỗi lần mẹ lo lắng...",
    contentSnippet: [
      "INFAT: Chất béo cấu trúc gần giống sữa mẹ, hỗ trợ hấp thu tốt, giảm táo bón.",
      "DHA, ARA: Tăng cường phát triển trí não, thị lực nhanh nhẹn, thông minh.",
      "Canxi, Vitamin D: Hỗ trợ phát triển chiều cao, xương chắc khỏe.",
      "Prebiotics GOS: Tăng đề kháng tự nhiên cho hệ tiêu hóa khỏe mạnh."
    ],
    highlights: ["4 Thành phần khoa học", "Call to Engage: Review", "Đánh trúng nỗi lo táo bón"],
    callToAction: "Điểm danh review sữa ở dưới bình luận cho các mẹ khác tham khảo nhé!",
    brand: "Ozzies Marts"
  },
  {
    id: "content-2",
    indexStr: "02",
    date: "17/06/2025",
    category: "Nutritional Angle",
    title: "Thể Thao Là Chưa Đủ — Mẹ Cần Bổ Sung Dinh Dưỡng Để Bé Cao Vượt Trội",
    hook: "Mẹ có thấy bé nhà mình chạy nhảy siêu giỏi nhưng lúc nào cũng thấp hơn bạn cùng tuổi?",
    contentSnippet: [
      "Chiều cao lý tưởng chính là lợi thế lớn để bé tỏa sáng trong tương lai.",
      "Siêu sao Bubs Supreme từ Úc: Bước đệm vững chắc cho các nhà vô địch.",
      "Bộ ba dưỡng chất vàng Canxi - Vitamin D3 - Phospho theo tỷ lệ khoa học.",
      "Tăng mật độ xương, xây dựng nền tảng cao lớn và bổ sung DHA, Kẽm."
    ],
    highlights: ["Bẻ gãy định kiến thể thao", "Dòng sữa Bubs Supreme Úc", "Bộ ba Canxi - D3 - Phospho"],
    callToAction: "Inbox Ozzies Mart ngay để con bùng nổ năng lượng, vươn mình thành siêu sao!",
    brand: "Ozzies Marts"
  },
  {
    id: "content-3",
    indexStr: "03",
    date: "28/06/2025",
    category: "Brand PR & Emotional",
    title: "Chúc Mừng Ngày Gia Đình Việt Nam 28/06",
    hook: "Gia đình không chỉ là nơi để trở về, mà còn là chốn tiếp thêm động lực yêu thương...",
    contentSnippet: [
      "Tạm gác lại bộn bề thường nhật để dành trọn vẹn thời gian bên người thân yêu.",
      "Đồng hành trong hành trình vun đắp sức khỏe và hạnh phúc cho cả gia đình.",
      "Tự hào mang đến các dòng sản phẩm sữa uy tín giúp bữa ăn của bé trọn vẹn niềm vui.",
      "Gia đình hạnh phúc là nền tảng cho một cuộc sống ý nghĩa."
    ],
    highlights: ["Emotional Storytelling", "Định vị bạn đồng hành", "PR thương hiệu cảm xúc"],
    callToAction: "Gửi lời chúc ấm áp và an yên đến tất cả gia đình Việt Nam!",
    brand: "Ozzies Marts"
  },
  {
    id: "content-4",
    indexStr: "04",
    date: "04/07/2025",
    category: "Creative Seasonal Hook",
    title: "Cẩn Thận Các Mẹ Bỉm Sữa Ơi — Không Là Bị 'Phỏng Lài' Đó Nha!",
    hook: "Thời tiết hè này đúng nghĩa 'nóng như chảo lửa', bé yêu dễ mất nước, biếng ăn...",
    contentSnippet: [
      "Không phải sữa nào cũng hợp với khí hậu oi bức, cần chọn dòng sữa mát lành.",
      "Nguồn gốc rõ ràng, kiểm định chất lượng chặt chẽ từ các thương hiệu quốc tế.",
      "Mách mẹ công thức Bingsu sữa mát lạnh: Quậy sữa xong xay cùng đá nhuyễn.",
      "Vừa bổ sung dinh dưỡng đủ đầy, vừa giúp bé hào hứng uống sữa không lo nóng nực."
    ],
    highlights: ["Biệt ngữ mẹ bỉm", "Bắt trend nắng nóng mùa hè", "Creative Tip: Bingsu sữa"],
    callToAction: "Ozzies Marts - Nơi mẹ tin tưởng, bé yêu thương!",
    brand: "Ozzies Marts"
  },
  {
    id: "content-5",
    indexStr: "05",
    date: "08/07/2025",
    category: "Comparison & Solution",
    title: "Bé Yêu Kén Vị Sữa? Có Ngay Giải Pháp Nhẹ Nhàng 'Hợp Gu' Cho Cả Mẹ Và Bé",
    hook: "Nhiều bé không chịu uống sữa vì vị ngọt gắt hoặc quá nồng khiến mẹ lo lắng...",
    contentSnippet: [
      "Aptamilk: Vị thanh mát, gần giống sữa mẹ, công thức GOS/FOS và Omega-3 phát triển trí não.",
      "NAN Nga: Vị nhạt nhẹ, đạm Optipro và lợi khuẩn Bifidus BL tăng cường hệ miễn dịch.",
      "Austramilk: Nguồn sữa tươi nguyên chất từ Úc, công thức 6 trong 1 giàu vi chất thiết yếu.",
      "Ba trợ thủ đắc lực giúp việc uống sữa mỗi ngày của con không còn là 'cuộc chiến'."
    ],
    highlights: ["Insight bé kén vị ngọt", "So sánh 3 dòng sữa mát", "Tư vấn chọn sữa theo gu"],
    callToAction: "Giúp mẹ an tâm lựa chọn, giúp bé uống ngon và lớn khỏe mỗi ngày!",
    brand: "Ozzies Marts"
  }
];

export function ContentFilmstripCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? ARTICLES_DATA.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === ARTICLES_DATA.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartXRef.current = null;
  };

  return (
    <section id="content-showcase" className="py-20 relative z-10 px-4 sm:px-6 border-t border-rose-100/80">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header Phân đoạn */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rose-600 mb-2 font-semibold">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Copywriting & Social Content Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-heading">
              Kho Bài Viết Tư Liệu Thực Chiến
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
              Tuyển tập 5 bài viết thực chiến cho nhãn hàng <strong>Ozzies Marts</strong> do <strong>Phạm Minh Chiến</strong> trực tiếp sáng tạo nội dung: Thấu hiểu insight phụ huynh, phân tích thành phần dinh dưỡng và tối ưu chuyển đổi tương tác.
            </p>
          </div>

          {/* Điều khiển lướt trái / phải (Touch target >= 44px) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={prevSlide}
              className="p-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 hover:border-rose-300 text-stone-700 hover:text-stone-900 transition-all shadow-sm min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
              aria-label="Xem bài viết trước"
            >
              <ChevronLeft className="w-5 h-5 text-stone-700" aria-hidden="true" />
            </button>
            <span className="text-xs font-mono text-stone-500 font-semibold px-2">
              <strong className="text-stone-900">{currentIndex + 1}</strong> / {ARTICLES_DATA.length}
            </span>
            <button
              type="button"
              onClick={nextSlide}
              className="p-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 hover:border-rose-300 text-stone-700 hover:text-stone-900 transition-all shadow-sm min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
              aria-label="Xem bài viết tiếp theo"
            >
              <ChevronRight className="w-5 h-5 text-stone-700" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 3D Perspective Filmstrip Rail */}
        <div 
          className="relative w-full overflow-hidden py-3"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Rail Track with Smooth Animation */}
          <div 
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {ARTICLES_DATA.map((article) => (
              <div
                key={article.id}
                className="w-full shrink-0 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch"
              >
                {/* Main Card (Editorial Presentation) */}
                <div 
                  onClick={() => setSelectedArticle(article)}
                  className="md:col-span-8 rounded-3xl bg-white/95 border border-stone-200/90 hover:border-rose-300 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 shadow-xl shadow-rose-950/5 group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Top Identifiers: Big Index & Badge */}
                    <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500">
                          {article.indexStr}
                        </span>
                        <span className="text-xs font-mono text-stone-400">/ 05</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-semibold uppercase px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700">
                          {article.category}
                        </span>
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 hidden sm:inline-block">
                          {article.brand}
                        </span>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-3">
                      <Calendar className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" />
                      <span>Ngày đăng: {article.date}</span>
                      <span>•</span>
                      <span className="text-stone-600 font-semibold">{article.brand}</span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 group-hover:text-rose-600 transition-colors leading-snug font-heading mb-3">
                      {article.title}
                    </h3>

                    {/* Hook Callout Box */}
                    <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 mb-5">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-rose-700 font-bold mb-1 uppercase tracking-wider">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>Visual Hook & Đặt vấn đề</span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                        "{article.hook}"
                      </p>
                    </div>

                    {/* Content bullet preview */}
                    <div className="space-y-2 mb-4">
                      {article.contentSnippet.slice(0, 2).map((snip, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-xs text-stone-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{snip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-4">
                    <span className="text-xs font-mono text-stone-400">Facebook Media Post</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedArticle(article);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs font-semibold shadow-md shadow-rose-500/20 transition active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Đọc Toàn Văn Bài Viết</span>
                    </button>
                  </div>
                </div>

                {/* Right Side: Key Highlights & Takeaways */}
                <div className="md:col-span-4 rounded-3xl bg-stone-900 text-stone-100 p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-stone-950/10">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-4 pb-3 border-b border-stone-800">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span className="uppercase tracking-wider font-bold">Góc Tiếp Cận & Kỹ Năng</span>
                    </div>

                    <div className="space-y-3">
                      {article.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/80 text-xs text-stone-200 flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                          <span className="font-medium leading-snug">{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200">
                      <span className="font-bold block mb-1 font-mono text-[11px] uppercase tracking-wider text-rose-300">
                        CTA Chốt đơn:
                      </span>
                      <p className="italic text-[11px] leading-relaxed">
                        "{article.callToAction}"
                      </p>
                    </div>
                  </div>

                  {/* Thumbnail indicator strip */}
                  <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400 mt-4">
                    <span>Hapi Ecommerce</span>
                    <span className="text-amber-400 font-semibold">{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Progress Dots & Navigation Strip */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {ARTICLES_DATA.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === dotIdx 
                  ? 'w-8 bg-gradient-to-r from-rose-600 to-amber-500' 
                  : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Chuyển đến bài viết ${dotIdx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* MODAL XEM CHI TIẾT TOÀN VĂN BÀI CONTENT (QUICK READER) */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 text-stone-900 max-h-[90vh] overflow-y-auto shadow-2xl">
            
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-2xl bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Đóng bài viết"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Header Modal */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-rose-700 mb-3">
              <span className="font-bold px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200">
                BÀI VIẾT THỰC CHIẾN #{selectedArticle.indexStr}
              </span>
              <span>•</span>
              <span className="text-stone-500">{selectedArticle.date}</span>
              <span>•</span>
              <span className="font-semibold text-stone-800">{selectedArticle.brand}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mb-4 leading-tight font-heading">
              {selectedArticle.title}
            </h3>

            {/* Hook Highlight */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-stone-800 text-xs sm:text-sm italic mb-6 leading-relaxed">
              <span className="text-[10px] font-mono text-rose-700 font-bold block mb-1 uppercase tracking-wider not-italic">
                Hook tiếp cận (3 giây đầu):
              </span>
              "{selectedArticle.hook}"
            </div>

            {/* Content Breakdown */}
            <div className="space-y-3 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold block">
                Luận Điểm & Dưỡng Chất Chính Trong Bài:
              </span>
              {selectedArticle.contentSnippet.map((line, lIdx) => (
                <div key={lIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-relaxed">{line}</span>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-stone-800 flex items-start gap-2.5 mb-6">
              <Share2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong className="text-amber-900 block text-[11px] font-mono uppercase tracking-wider mb-0.5">Kêu gọi hành động (Call to Action):</strong>
                <span>{selectedArticle.callToAction}</span>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-mono text-stone-400">Tác giả: Phạm Minh Chiến</span>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition min-h-[44px]"
              >
                Đóng Cửa Sổ
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
