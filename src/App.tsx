import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  Video, 
  ShoppingBag, 
  Award, 
  FileText, 
  Play, 
  Calendar, 
  CheckCircle2, 
  Share2, 
  Layers, 
  Mic, 
  Star,
  Target,
  Compass,
  Heart
} from 'lucide-react';
import { PRVideoShowcase } from './components/PRVideoShowcase';
import { ContentCharacterCarousel } from './components/ContentCharacterCarousel';
import { ExperienceSection } from './components/ExperienceSection';
import { EditorialPressContact } from './components/EditorialPressContact';
import { GlassCvDownloadButton } from './components/GlassCvDownloadButton';
import { LuxuryAmbientBackground } from './components/LuxuryAmbientBackground';

// Lazy load modal để giảm bundle ban đầu và tăng tốc tải trang
const ResumeQuickModal = lazy(() => 
  import('./components/ResumeQuickModal').then(m => ({ default: m.ResumeQuickModal }))
);

const CANDIDATE_DATA = {
  name: "Phạm Minh Chiến",
  role: "Chuyên viên Quan hệ công chúng & Media Creator",
  degree: "Cử nhân Quan hệ công chúng — Trường Đại học Gia Định",
  location: "113/19/1 Trần Văn Đang, Phường 11, Quận 3, TP. Hồ Chí Minh",
  email: "Phamminhchien2017@gmail.com",
  phone: "0566045020",
  cvDriveUrl: "/CV PHẠM MINH CHIẾN (6) (1).pdf",
  cvFileUrl: "/CV PHẠM MINH CHIẾN (6) (1).pdf",
  folderUrl: "https://drive.google.com/drive/folders/1d_kaWQ84p3cwkOYmTfkgLSKcLm93mzJm",
  tiktokUrl: "https://www.tiktok.com/@trendytee62/video/7560685079442377998?_r=1&_t=ZS-99zbpOvv3Wq",
  bio: "Tốt nghiệp chuyên ngành Quan hệ công chúng tại Trường Đại học Gia Định. Chủ động học hỏi, tư duy nhạy bén với xu hướng truyền thông mạng xã hội, làm chủ kỹ năng quay dựng video ngắn giữ chân người xem và luôn kiên trì theo đuổi chỉ số KPI thực tế.",
  objectives: {
    shortTerm: "Phát triển bản thân trong môi trường truyền thông chuyên nghiệp, tích lũy kinh nghiệm thực tế, nâng cao kỹ năng giao tiếp và điều phối xử lý tình huống.",
    longTerm: "Trở thành chuyên viên PR chuyên nghiệp, không ngừng mở rộng năng lực chuyên môn và phấn đấu đảm nhận những vị trí điều phối quan trọng trong 5 năm tới."
  },
  projects: [
    {
      id: "media-viral",
      title: "Chiến Dịch Video Ngắn — Trendy Tee",
      category: "Viral Media & Video Production",
      period: "HAPI ECOMMERCE",
      metrics: "1,000,000+ Lượt Xem trên TikTok",
      tech: ["CapCut Pro", "Photoshop", "TikTok Analytics", "Pacing & Visual Hook"],
      description: "Chịu trách nhiệm lên ý tưởng kịch bản, trực tiếp quay và dựng video ngắn. Tối ưu nhịp cắt dồn dập (pacing) và visual hook 3 giây đầu giúp video viral tự nhiên và giữ chân người xem đến giây cuối.",
      linkText: "Xem Video TikTok Thực Tế",
      demoUrl: "https://www.tiktok.com/@trendytee62/video/7560685079442377998?_r=1&_t=ZS-99zbpOvv3Wq",
      accent: "#E11D48"
    },
    {
      id: "commercial-seller",
      title: "Chuyển Đổi Thương Mại & Chốt Đơn Thực Tế",
      category: "Social Commerce & Sales",
      period: "HAPI ECOMMERCE",
      metrics: "60 Sản Phẩm / Tháng (Vượt Chỉ Tiêu)",
      tech: ["Quay Chụp Sản Phẩm", "Content Bán Hàng", "Nghiên Cứu Insight"],
      description: "Thực hiện quay chụp các bộ sưu tập thời trang (áo thun, áo khoác), mỹ phẩm và quà tặng; kết hợp viết content quảng bá đánh trúng tâm lý để trực tiếp chốt đơn hàng và hoàn thành vượt mức KPI.",
      linkText: "Số liệu KPI đã nghiệm thu",
      demoUrl: null,
      accent: "#059669"
    }
  ],
  experience: [
    {
      role: "Social Media & Seller",
      company: "Công ty TNHH HAPI ECOMMERCE",
      period: "01/06/2025 — 07/05/2026",
      tasks: [
        "Quản lý và phát triển nội dung kênh TikTok, đẩy mạnh lượng tiếp cận tự nhiên.",
        "Lên ý tưởng, trực tiếp quay dựng và hoàn thiện video ngắn bắt xu hướng.",
        "Thực hiện quay chụp hình ảnh sản phẩm thời trang, mỹ phẩm, poster và quà tặng.",
        "Nghiên cứu thị hiếu tiêu dùng, hoàn thành chỉ tiêu doanh số 60 sản phẩm/tháng."
      ]
    },
    {
      role: "Content Marketing",
      company: "Công ty Cổ phần Khác Biệt Là Tất Cả",
      period: "15/05/2024 — 15/04/2025",
      tasks: [
        "Lên ý tưởng và phát triển kế hoạch nội dung truyền thông cho Facebook, TikTok.",
        "Viết content quảng bá sản phẩm, hỗ trợ xây dựng kịch bản video quảng cáo.",
        "Hỗ trợ quay, dựng và tinh chỉnh video ngắn; thiết kế đồ họa hình ảnh cơ bản.",
        "Theo dõi số liệu tương tác bài đăng và đề xuất phương án cải thiện định kỳ."
      ]
    }
  ],
  events: [
    {
      title: "THE MONEYVERSE",
      role: "Điều phối khách mời & Quản lý Talent",
      desc: "Phụ trách đón tiếp, hướng dẫn, sắp xếp lịch trình và hỗ trợ trực tiếp cho các khách mời và Talent trong suốt sự kiện.",
      icon: Star
    },
    {
      title: "SHOW RAP SPACE",
      role: "Biên soạn kịch bản âm thanh & ánh sáng",
      desc: "Xây dựng kịch bản kỹ thuật chi tiết theo nhịp điệu biểu diễn, phối hợp nhịp nhàng với đội ngũ kỹ thuật sân khấu.",
      icon: Mic
    }
  ],
  skills: [
    {
      category: "Lĩnh Vực Chuyên Môn (PR & Media)",
      icon: Share2,
      border: "border-rose-200",
      accent: "from-rose-50 to-amber-50/60",
      items: [
        "Social Media & Xây dựng kênh",
        "Sáng tạo nội dung đa nền tảng",
        "Viết bài PR & Thông cáo báo chí",
        "Lập kế hoạch & Tổ chức sự kiện",
        "Giao tiếp & Xử lý khủng hoảng"
      ]
    },
    {
      category: "Công Cụ Thành Thạo",
      icon: Layers,
      border: "border-amber-200",
      accent: "from-amber-50 to-rose-50/60",
      items: [
        "CapCut Pro (Quay dựng & Dựng nhịp)",
        "Adobe Photoshop (Poster & Đồ họa)",
        "Canva Pro (Ấn phẩm truyền thông)",
        "TikTok Creator Tools & SEO"
      ]
    },
    {
      category: "Phẩm Chất Cốt Lõi",
      icon: Award,
      border: "border-emerald-200",
      accent: "from-emerald-50 to-teal-50/60",
      items: [
        "Chăm chỉ & Tỉ mỉ từng khung hình",
        "Siêng năng, kiên trì theo đuổi KPI",
        "Hiền lành, hòa nhã, dễ gần gũi",
        "Cầu thị, lắng nghe phản hồi tập thể"
      ]
    }
  ]
};

export default function PortfolioPhamMinhChien() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Khi tải lại / reset trang: tự động cuộn về đầu trang (Hero Section)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    
    // Xóa hash trên thanh địa chỉ nếu có để tránh trình duyệt tự nhảy vị trí cũ
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // Lắng nghe vị trí cuộn trang tối ưu bằng requestAnimationFrame (Tránh lag giật khi lướt)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['hero', 'projects', 'content-showcase', 'experience', 'contact'];
          const scrollPosition = window.scrollY + 200;

          for (const sectionId of sections) {
            const elem = document.getElementById(sectionId);
            if (elem) {
              const top = elem.offsetTop;
              const height = elem.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#FAF7F2] text-stone-800 min-h-screen selection:bg-rose-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* Hiệu ứng nền Ambient Lụa & Bụi Sao Vàng Champagne Sang Trọng */}
      <LuxuryAmbientBackground />
      
      {/* 1. Thanh điều hướng Header 3D Floating Glass Capsule Sang Trọng */}
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none transition-all duration-300">
        <div className="max-w-6xl mx-auto pointer-events-auto relative rounded-2xl sm:rounded-full bg-white/80 backdrop-blur-xl border border-white/95 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-[0_16px_36px_-8px_rgba(225,29,72,0.12),0_6px_16px_-4px_rgba(0,0,0,0.06),inset_0_2px_2px_0_rgba(255,255,255,0.95),inset_0_-2px_4px_0_rgba(244,63,94,0.04)]">
          
          {/* Brand & Avatar 3D Badge */}
          <div 
            onClick={() => scrollTo('hero')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-tr from-rose-500 via-amber-400 to-rose-400 shrink-0 shadow-[0_4px_10px_rgba(225,29,72,0.25),inset_0_1px_1px_rgba(255,255,255,0.8)] group-hover:scale-105 group-hover:rotate-1 transition-all duration-300">
              <img 
                src="/images/avatar-new.png" 
                alt="Phạm Minh Chiến" 
                className="w-full h-full object-cover object-top rounded-[13px]"
              />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-stone-900 group-hover:text-rose-600 transition font-heading flex items-center gap-1.5">
                {CANDIDATE_DATA.name}
              </span>
              <span className="text-[10px] block font-mono text-stone-500 font-medium">PR & Social Media Creator</span>
            </div>
          </div>

          {/* 3D Inset Navigation Rail */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/70 p-1.5 rounded-full border border-stone-200/60 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.8)] text-xs font-mono">
            {[
              { id: 'hero', label: 'Giới thiệu' },
              { id: 'projects', label: 'Thành tựu & KPI' },
              { id: 'content-showcase', label: 'Kho bài viết' },
              { id: 'experience', label: 'Kinh nghiệm & Sự kiện' },
              { id: 'contact', label: 'Liên hệ' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'text-rose-700 bg-white font-bold border border-rose-200/80 shadow-[0_3px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] -translate-y-0.5' 
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* 3D Tactile CTA Button */}
          <div className="flex items-center gap-3">
            <a 
              href={encodeURI(CANDIDATE_DATA.cvFileUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl sm:rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-b from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 shadow-[0_4px_14px_rgba(225,29,72,0.35),0_2px_0_#9f1239,inset_0_1.5px_1px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(225,29,72,0.42),0_2px_0_#9f1239,inset_0_1.5px_1px_rgba(255,255,255,0.5)] active:translate-y-0.5 active:shadow-[0_2px_4px_rgba(225,29,72,0.25),0_0px_0_#9f1239] transition-all duration-150 min-h-[40px]"
            >
              <FileText className="w-4 h-4 text-white/90 group-hover:rotate-6 transition-transform" />
              <span className="tracking-tight">Xem Nhanh CV</span>
              {/* Shimmer light sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION VỚI HIỆU ỨNG ANIMATION SANG TRỌNG & TƯƠNG TÁC SỐNG ĐỘNG */}
      <section id="hero" className="min-h-screen flex flex-col justify-center relative z-10 px-4 sm:px-6 pt-28 pb-16 overflow-hidden">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 }
            }
          }}
          className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          
          {/* Cột trái (7 cột): Typography & Call To Actions */}
          <div className="lg:col-span-7 space-y-6">

            {/* Headline */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.12] font-heading">
                Sáng tạo nội dung, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 animate-pulse">
                  chinh phục số liệu thực chiến.
                </span>
              </h1>
              <p className="text-stone-600 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
                Tôi là <strong className="text-stone-900 font-semibold">{CANDIDATE_DATA.name}</strong>. Cử nhân ngành Quan hệ công chúng với tư duy nhạy bén về truyền thông mạng xã hội, kỹ năng quay dựng video ngắn chuẩn giữ chân người xem và tinh thần trách nhiệm kỷ luật cao vì KPI.
              </p>
            </motion.div>

            {/* Objectives Mini Strip */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl"
            >
              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="p-4 rounded-2xl bg-white/90 border border-stone-200/80 backdrop-blur-sm flex items-start gap-3 hover:border-rose-400 transition-colors shadow-sm hover:shadow-md hover:shadow-rose-950/5 group cursor-default"
              >
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 shrink-0 mt-0.5 group-hover:bg-rose-100 group-hover:scale-110 transition-transform">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 font-mono">Mục tiêu ngắn hạn</span>
                  <p className="text-xs text-stone-600 mt-1 leading-snug">
                    {CANDIDATE_DATA.objectives.shortTerm}
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="p-4 rounded-2xl bg-white/90 border border-stone-200/80 backdrop-blur-sm flex items-start gap-3 hover:border-amber-400 transition-colors shadow-sm hover:shadow-md hover:shadow-amber-950/5 group cursor-default"
              >
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 shrink-0 mt-0.5 group-hover:bg-amber-100 group-hover:scale-110 transition-transform">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 font-mono">Mục tiêu dài hạn</span>
                  <p className="text-xs text-stone-600 mt-1 leading-snug">
                    {CANDIDATE_DATA.objectives.longTerm}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Group */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <GlassCvDownloadButton 
                cvUrl={CANDIDATE_DATA.cvDriveUrl}
                label="Xem CV & Hồ Sơ Năng Lực"
              />
            </motion.div>

          </div>

          {/* Cột phải (5-6 cột): Khung ảnh Avatar Profile kích thước lớn hơn, chuyển động 3D Floating & Ánh hào quang nổi bật */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.92, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <motion.div 
              animate={{ 
                y: [-8, 8, -8],
                rotate: [-0.8, 0.8, -0.8]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-full max-w-[390px] sm:max-w-[430px] lg:max-w-[420px] xl:max-w-[450px]"
            >
              {/* Vầng hào quang tỏa sáng đa tầng (Multi-layer Breathing Aura) */}
              <motion.div 
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.75, 1, 0.75]
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-4 bg-gradient-to-tr from-rose-500/40 via-amber-400/35 to-rose-400/40 rounded-[40px] blur-3xl pointer-events-none" 
              />

              {/* Ngôi sao lấp lánh trang trí góc trái */}
              <div className="absolute -top-5 -left-5 text-amber-400 animate-spin-slow pointer-events-none z-20">
                <Sparkles className="w-7 h-7 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
              </div>

              {/* Khung thẻ Profile chính: Viền ánh kim kép sang trọng */}
              <motion.div 
                whileHover={{ scale: 1.025 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="relative rounded-[36px] p-1.5 bg-gradient-to-tr from-rose-500/80 via-amber-400/70 to-rose-400/80 shadow-[0_25px_60px_-12px_rgba(225,29,72,0.28)] backdrop-blur-xl"
              >
                <div className="relative rounded-[30px] bg-white/95 p-3.5 sm:p-4 backdrop-blur-md">
                  <div className="relative aspect-[4/4.8] rounded-[24px] overflow-hidden bg-stone-900 border border-stone-200/90 shadow-inner group">
                    <img
                      src="/images/portrait.jpg"
                      alt="Chân dung Phạm Minh Chiến - Chuyên viên PR & Media Creator"
                      className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Gradient phủ tối dần phía dưới để làm nổi bật nhãn thông tin */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Thẻ định danh nổi bên dưới ảnh chân dung */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3.5 rounded-2xl bg-stone-900/90 backdrop-blur-md border border-white/20 text-white shadow-2xl">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-sm sm:text-base font-extrabold block font-heading tracking-tight text-white">{CANDIDATE_DATA.name}</span>
                          <span className="text-xs text-rose-300 font-mono font-medium">Quan hệ công chúng (PR)</span>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-gradient-to-r from-rose-600 to-amber-500 text-white font-mono font-bold shadow-md shadow-rose-600/30 border border-rose-300/30 shrink-0">
                          ĐH Gia Định
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </motion.div>
      </section>

      {/* 3. PROJECTS & BENTO GRID VỚI HIỆU ỨNG SCROLL-REVEAL & TƯƠNG TÁC SỐNG ĐỘNG */}
      <section id="projects" className="py-24 relative z-10 px-4 sm:px-6 border-t border-rose-100/80">
        <div className="max-w-6xl mx-auto w-full">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-heading">
                Chứng minh bằng số liệu, khẳng định qua sản phẩm.
              </h2>
            </div>
            <p className="text-xs font-mono text-stone-500 max-w-xs">
              Mỗi sản phẩm đều hướng đến sự lan tỏa tự nhiên và chuyển đổi doanh số thực tế.
            </p>
          </motion.div>

          <div className="space-y-10">
            {/* THẺ 1: SHOWCASE TOÀN DIỆN — VIDEO TRIỆU VIEW & PHÂN TÍCH KỸ NĂNG DỰNG */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white/95 border border-stone-200/90 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-rose-950/5 hover:shadow-rose-950/10 hover:border-rose-300 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Cột trái: Khung Smartphone Video Reel (Trailer preview & Phóng to xem từ 00:01 đến hết) */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center">
                  <PRVideoShowcase 
                    videoSrc="/videos/showcase-40s.mp4" 
                    tiktokUrl={CANDIDATE_DATA.tiktokUrl} 
                  />
                  <span className="text-[11px] font-mono text-stone-500 mt-3.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span>Đoạn Trailer • Bấm Phóng To để xem toàn bộ video trực tiếp</span>
                  </span>
                </div>

                {/* Cột phải: Thông tin chi tiết video profile & năng lực PR */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-medium text-xs font-mono">
                      Video Profile & Giới Thiệu Năng Lực
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-xs font-mono">
                      Đại Học Gia Định • PR
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-xs font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                      Quay Dựng & Sáng Tạo Media
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-heading mb-2">
                      Video Portfolio — Giới Thiệu Bản Thân & Năng Lực PR
                    </h3>
                    <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
                      Video profile tổng hợp năng lực chuyên môn, quá trình đào tạo ngành Quan hệ công chúng (PR) tại Trường Đại học Gia Định cùng kinh nghiệm thực chiến trong vai trò Ban tổ chức & Cộng tác viên dự án. Trực tiếp đảm nhận toàn bộ quy trình: Lên ý tưởng kịch bản, thiết kế hình ảnh và hậu kỳ dựng video ngắn với Visual Hook sáng tạo.
                    </p>
                  </div>

                  {/* Highlight Metrics Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-stone-50/90 border border-stone-200/80">
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-3 rounded-xl bg-white border border-stone-200/70 shadow-xs transition-colors hover:border-rose-300"
                    >
                      <div className="text-xs font-mono text-stone-500">Chuyên ngành đào tạo</div>
                      <div className="text-base sm:text-lg font-bold font-heading text-stone-900 mt-0.5">Quan Hệ Công Chúng</div>
                      <div className="text-[10px] text-rose-600 font-medium">Trường Đại học Gia Định</div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-3 rounded-xl bg-white border border-stone-200/70 shadow-xs transition-colors hover:border-amber-300"
                    >
                      <div className="text-xs font-mono text-stone-500">Kênh phát hành</div>
                      <div className="text-xl font-bold font-mono text-amber-600 mt-0.5">TikTok</div>
                      <div className="text-[10px] text-stone-500">@trendytee62</div>
                    </motion.div>
                  </div>

                  {/* Kỹ năng ứng dụng trong sản phẩm */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-stone-700 block">
                      Điểm nhấn kỹ thuật & tư duy sáng tạo:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                      <motion.div 
                        whileHover={{ scale: 1.02, x: 2 }}
                        className="p-3 rounded-xl bg-white border border-stone-200/70 flex items-start gap-2 shadow-xs hover:border-rose-300 transition-colors"
                      >
                        <span className="text-rose-500 font-bold">•</span>
                        <span><strong>Tư Duy Truyền Thông PR:</strong> Trình bày thông điệp bản thân súc tích, làm nổi bật kinh nghiệm dự án và nhiệt huyết nghề nghiệp.</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02, x: 2 }}
                        className="p-3 rounded-xl bg-white border border-stone-200/70 flex items-start gap-2 shadow-xs hover:border-amber-300 transition-colors"
                      >
                        <span className="text-amber-500 font-bold">•</span>
                        <span><strong>Kỹ Thuật Hậu Kỳ Hiện Đại:</strong> Ứng dụng Visual Hook, nhịp cắt chuyển cảnh mượt mà và phối màu đồng điệu thu hút người xem.</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Tech stack tags */}
                  <div className="pt-2 flex flex-wrap items-center gap-1.5">
                    {["CapCut Pro", "Adobe Photoshop", "Tư Duy PR & Media", "Visual Hook", "Kịch Bản Ngắn"].map((t, i) => (
                      <motion.span 
                        key={i} 
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 border border-stone-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-default"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>

                </div>
              </div>
            </motion.div>

            {/* THẺ 2: COMMERCIAL SALES CONVERSION & SOCIAL COMMERCE */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white/95 border border-stone-200/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-rose-950/5 hover:shadow-rose-950/10 hover:border-emerald-300 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                      Social Commerce & Sales Conversion
                    </span>
                    <span className="text-stone-400 font-semibold">HAPI ECOMMERCE</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-heading">
                    Chuyển Đổi Thương Mại & Chốt Đơn Thực Tế
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Thực hiện quay chụp các bộ sưu tập thời trang (áo thun, áo khoác), mỹ phẩm và quà tặng; kết hợp viết content quảng bá đánh trúng tâm lý khách hàng để trực tiếp chốt đơn hàng và hoàn thành vượt mức KPI đề ra.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {["Quay Chụp Sản Phẩm", "Content Bán Hàng", "Nghiên Cứu Insight", "TikTok Shop", "Tư Vấn Khách Hàng"].map((t, i) => (
                      <motion.span 
                        key={i} 
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-default"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3 shadow-xs hover:border-emerald-300 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-800 font-bold uppercase">KPI Chốt đơn tháng</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-600 text-white font-mono font-bold">VƯỢT CHỈ TIÊU</span>
                    </div>
                    <div className="text-3xl font-extrabold font-mono text-emerald-700">
                      60+ Sản Phẩm / Tháng
                    </div>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Sản phẩm trọng tâm: Áo thun, mỹ phẩm, set quà tặng triển khai đồng bộ trên TikTok Shop và Fanpage.
                    </p>
                  </motion.div>

                  <div className="flex items-center justify-between text-xs font-medium text-emerald-700 px-2">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                      Số liệu nội bộ đã nghiệm thu & xác nhận
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 3.5. KHO BÀI VIẾT TƯ LIỆU THỰC CHIẾN (THREEUI 3D PERSPECTIVE RAIL CAROUSEL) */}
      <ContentCharacterCarousel />

      {/* 4. WORK EXPERIENCE & EVENTS (EXECUTIVE TIMELINE & VIP EVENT PASSES) */}
      <ExperienceSection />

      {/* 5. CONTACT & CLOSING SECTION (VIP PRESS INVITATION & SIGN-OFF) */}
      <EditorialPressContact 
        cvUrl={CANDIDATE_DATA.cvDriveUrl} 
        onScrollToTop={() => scrollTo('hero')} 
      />

      {/* Modal CV (Tải lười khi người dùng bấm nút) */}
      <Suspense fallback={null}>
        {isResumeOpen && (
          <ResumeQuickModal 
            isOpen={isResumeOpen} 
            onClose={() => setIsResumeOpen(false)} 
            candidateData={CANDIDATE_DATA}
          />
        )}
      </Suspense>

    </div>
  );
}
