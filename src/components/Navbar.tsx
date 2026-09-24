import { useState } from 'react';
import { Download } from 'lucide-react';

export function Navbar({ cvUrl }: { cvUrl: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.open(cvUrl, '_blank', 'noopener,noreferrer');
    }, 300);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F17]/85 backdrop-blur-md border-b border-[#1F2937]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand Name & Identifier */}
        <a 
          href="#about" 
          className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-blue-500 rounded-lg group"
          aria-label="Về đầu trang Phạm Minh Chiến"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-500/40 shrink-0 bg-slate-800">
            <img 
              src="/images/portrait.jpg" 
              alt="Phạm Minh Chiến" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="font-extrabold tracking-tight text-lg text-white font-heading group-hover:text-blue-400 transition-colors">
            PHẠM MINH CHIẾN
          </span>
          <span className="hidden sm:inline-block text-xs px-2.5 py-0.5 rounded-full bg-blue-950/70 text-blue-300 border border-blue-800/60 font-medium">
            PR & Media Creator
          </span>
        </a>

        {/* Section Anchors */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#about" className="hover:text-white transition-colors focus-visible:outline-blue-500">Giới thiệu</a>
          <a href="#experience" className="hover:text-white transition-colors focus-visible:outline-blue-500">Kinh nghiệm</a>
          <a href="#projects" className="hover:text-white transition-colors focus-visible:outline-blue-500">Dự án & KPI</a>
          <a href="#events" className="hover:text-white transition-colors focus-visible:outline-blue-500">Sự kiện</a>
          <a href="#contact" className="hover:text-white transition-colors focus-visible:outline-blue-500">Liên hệ</a>
        </nav>

        {/* Primary CTA Button (WCAG Min Touch Target >= 44px) */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={loading}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50 min-h-[44px] px-4 py-2 rounded-xl transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 shadow-md shadow-blue-600/20"
          aria-label="Tải CV hoặc hồ sơ của Phạm Minh Chiến"
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          <span>{loading ? 'Đang mở...' : 'Tải CV hoặc hồ sơ'}</span>
        </button>
      </div>
    </header>
  );
}
