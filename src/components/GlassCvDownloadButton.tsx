import React, { useState, useRef, useEffect } from 'react';
import { Download, Sparkles, Check } from 'lucide-react';

interface GlassCvButtonProps {
  cvUrl?: string;
  className?: string;
  label?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export function GlassCvDownloadButton({
  cvUrl = "/CV_PHAM_MINH_CHIEN.pdf",
  className = "",
  label = "Tải Toàn Bộ Hồ Sơ Năng Lực (PDF)"
}: GlassCvButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Xử lý tọa độ chuột để tạo góc khúc xạ ánh sáng trên kính
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Khởi tạo vụ nổ hạt ánh sáng (Particle Burst)
  const triggerParticleBurst = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const colors = ['#F59E0B', '#FBBF24', '#FB7185', '#FFFFFF', '#E11D48'];
    const count = 45;
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      newParticles.push({
        x: clickX,
        y: clickY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2.5 + 1,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    particlesRef.current = newParticles;

    const ctx = canvas.getContext('2d');
    const animateParticles = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.alpha -= 0.025;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.alpha <= 0) {
          particlesRef.current.splice(index, 1);
        }
      });

      if (particlesRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animateParticles);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => setIsClicked(false), 1200);
      }
    };

    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(animateParticles);
  };

  // Xử lý mở trực tiếp file PDF trên tab mới để người dùng xem ngay
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsClicked(true);
    triggerParticleBurst(e);

    const pdfTargetUrl = cvUrl || "/CV PHẠM MINH CHIẾN (6) (1).pdf";
    const encodedUrl = encodeURI(pdfTargetUrl);

    // Mở trực tiếp trang PDF trên tab mới
    window.open(encodedUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsClicked(false);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      
      {/* 1. LỚP ĐỆM HÀO QUANG TOẢ SÁNG PHÍA SAU (AMBIENT BACK GLOW) */}
      <div 
        className="absolute inset-1 rounded-full bg-gradient-to-r from-amber-500/25 via-rose-600/30 to-amber-400/25 blur-xl transition-opacity duration-500 pointer-events-none"
        style={{ opacity: isHovered ? 0.9 : 0.4 }}
      />

      {/* 2. KHUNG NÚT THỦY TINH KHÚC XẠ CHÍNH (THE GLASS CAPSULE) */}
      <a
        ref={buttonRef}
        href={cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        download="CV PHẠM MINH CHIẾN.pdf"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={handleDownload}
        className="relative z-10 inline-flex items-center justify-center gap-3.5 px-8 sm:px-10 py-4 rounded-full min-h-[56px] text-white font-bold text-sm sm:text-base tracking-wide transition-all duration-300 transform active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0A09] group overflow-hidden cursor-pointer"
        style={{
          // Khối kính thủy tinh đa lớp với hiệu ứng mờ viền khúc xạ
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(20, 18, 22, 0.65) 50%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: `
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.4),
            inset 0 -2px 4px 0 rgba(0, 0, 0, 0.6),
            0 10px 25px -5px rgba(0, 0, 0, 0.8),
            0 0 15px 1px rgba(245, 158, 11, ${isHovered ? '0.35' : '0.12'})
          `,
          border: '1px solid rgba(245, 158, 11, 0.45)'
        }}
      >
        {/* Khối cầu năng lượng bên trong (Deep Galaxy Glow Orb) di chuyển theo chuột */}
        <div 
          className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-rose-600/40 via-amber-500/30 to-amber-200/20 blur-2xl pointer-events-none transition-transform duration-200 ease-out"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: isHovered ? 1 : 0.6
          }}
        />

        {/* Vệt quét ánh sáng bề mặt kính (Refraction Fresnel Flare) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.35) 0%, transparent 55%)`
          }}
        />

        {/* 3. BIỂU TƯỢNG VECTƠ DOWNLOAD TRACED & CỤM CHỮ LUMINOUS */}
        <div className="relative z-20 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-sm group-hover:rotate-[-6deg] group-hover:scale-110 transition-transform duration-300">
            {isClicked ? (
              <Check className="w-4 h-4 text-emerald-400 animate-bounce" aria-hidden="true" />
            ) : (
              <Download className="w-4 h-4 text-amber-300 group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
            )}
          </div>

          <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-extrabold tracking-tight text-sm sm:text-base">
            {isClicked ? "Đang Mở Hồ Sơ CV (PDF) ✓" : label}
          </span>

          <Sparkles className="w-4 h-4 text-amber-400 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300" aria-hidden="true" />
        </div>

        {/* 4. CANVAS NỔ HẠT ÁNH SÁNG KHI KÍCH HOẠT (PARTICLE BURST OVERLAY) */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 pointer-events-none z-30 w-full h-full"
        />
      </a>
    </div>
  );
}
