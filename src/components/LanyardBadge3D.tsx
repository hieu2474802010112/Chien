import { useState, useRef, MouseEvent } from 'react';
import { Sparkles, CheckCircle2, QrCode, MapPin, ShieldCheck } from 'lucide-react';

interface LanyardBadge3DProps {
  name: string;
  role: string;
  degree: string;
  location: string;
  imageSrc: string;
}

export function LanyardBadge3D({
  name,
  role,
  degree,
  location,
  imageSrc
}: LanyardBadge3DProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tính toán độ nghiêng góc 3D (-14deg đến 14deg) theo vị trí chuột
    const rotateY = ((x - centerX) / centerX) * 14;
    const rotateX = -((y - centerY) / centerY) * 14;

    // Tọa độ vầng sáng Hologram phản quang
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 0.65 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div className="relative flex flex-col items-center select-none pt-2 sm:pt-4">
      
      {/* 1. TOP LANYARD STRAP (Dây đeo sự kiện sang trọng) */}
      <div className="relative flex flex-col items-center z-20">
        {/* Dây vải Satin dệt cao cấp */}
        <div className="relative w-12 sm:w-14 h-16 sm:h-20 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 border-x border-stone-700/80 shadow-md flex items-center justify-center overflow-hidden">
          {/* Lanyard pattern text */}
          <div className="flex flex-col items-center justify-around h-full py-1">
            <span className="text-[8px] font-mono tracking-widest text-amber-400/80 font-bold rotate-90 uppercase">
              PR PASS
            </span>
            <span className="text-[8px] font-mono tracking-widest text-amber-400/80 font-bold rotate-90 uppercase">
              MEDIA
            </span>
          </div>
          {/* Đường chỉ may vàng dệt ở giữa */}
          <div className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-gradient-to-b from-amber-500/30 via-amber-400 to-amber-500/30" />
        </div>

        {/* Móc kẹp kim loại mạ vàng cao cấp (Metallic Clamp Clasp) */}
        <div className="relative -mt-1 flex flex-col items-center">
          {/* Khuyên tròn kim loại */}
          <div className="w-8 h-4 rounded-full border-2 border-amber-400/90 bg-stone-900 shadow-md" />
          {/* Khóa kẹp kim loại */}
          <div className="w-6 h-5 -mt-2 rounded-md bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 border border-amber-300 shadow-lg flex items-center justify-center">
            <div className="w-2.5 h-1 rounded-sm bg-stone-900" />
          </div>
        </div>
      </div>

      {/* 2. KHUNG THẺ NHẬN DIỆN 3D TƯƠNG TÁC (3D INTERACTIVE BADGE CONTAINER) */}
      <div 
        style={{ perspective: 1000 }} 
        className="relative -mt-3.5 z-10"
      >
        <div
          ref={badgeRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
            transformStyle: 'preserve-3d',
          }}
          className="relative w-[300px] sm:w-[325px] rounded-3xl bg-[#141216]/95 border-2 border-amber-500/40 p-4 shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden cursor-pointer"
        >
          {/* Top Slot Hole for Lanyard (Lỗ móc thẻ bo tròn) */}
          <div className="w-14 h-2.5 mx-auto rounded-full bg-stone-950 border border-stone-700/80 mb-3 shadow-inner" />

          {/* Dynamic Holographic Glare Overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 z-30"
            style={{
              background: `radial-gradient(circle 280px at ${glare.x}% ${glare.y}%, rgba(251, 191, 36, 0.28), rgba(244, 63, 94, 0.15), transparent 70%)`,
              opacity: glare.opacity,
            }}
          />

          {/* Badge Hologram Watermark Stripe */}
          <div className="absolute -right-8 top-10 w-32 h-6 bg-gradient-to-r from-transparent via-amber-400/15 to-transparent rotate-45 pointer-events-none" />

          {/* CARD HEADER: VIP ACCESS & SERIAL NUMBER */}
          <div className="flex items-center justify-between border-b border-stone-800/90 pb-2.5 mb-3">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="text-[11px] font-bold font-mono tracking-wider text-amber-400 uppercase">
                OFFICIAL PASS
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-stone-400 bg-stone-900/90 px-2 py-0.5 rounded-md border border-stone-800">
              <span className="text-amber-400 font-bold">#PR-2026</span>
            </div>
          </div>

          {/* CANDIDATE PORTRAIT WITH VERIFIED OVERLAY CHIP */}
          <div className="relative aspect-[4/4.6] rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-inner">
            <img
              src={imageSrc}
              alt={name}
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient bottom shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141216] via-transparent to-transparent opacity-75" />

            {/* Floating Verified Chip inside portrait */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-stone-900/90 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">1M+ Views TikTok & 60 Đơn (Đã Nghiệm Thu)</span>
            </div>
          </div>

          {/* TYPOGRAPHY & IDENTITY DETAILS */}
          <div className="mt-3.5 text-center">
            <h3 className="text-lg font-bold text-white font-heading tracking-tight">
              {name}
            </h3>
            <p className="text-xs text-amber-400 font-medium mt-0.5">
              {role}
            </p>
            <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-900 text-[11px] font-mono text-stone-300 border border-stone-800">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{degree}</span>
            </div>
          </div>

          {/* FOOTER: QR CODE & REALISTIC BARCODE GRAPHIC */}
          <div className="mt-4 pt-3 border-t border-stone-800/90 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-stone-900 border border-stone-800 text-stone-300">
                <QrCode className="w-6 h-6 text-amber-400" />
              </div>
              <div className="text-left">
                <span className="text-[9px] font-mono text-stone-400 block uppercase">KHU VỰC</span>
                <span className="text-[10px] font-medium text-stone-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" /> {location}
                </span>
              </div>
            </div>

            {/* Barcode Graphic Simulation */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-[2px] h-5">
                {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2].map((w, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${w}px` }}
                    className="h-full bg-stone-400/90 rounded-[0.5px]"
                  />
                ))}
              </div>
              <span className="text-[8px] font-mono text-stone-400 tracking-tighter mt-0.5">
                893850172026
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
