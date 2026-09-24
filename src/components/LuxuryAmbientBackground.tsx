import React, { useEffect, useRef } from 'react';

interface FloatingElement {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  swaySpeed: number;
  swayRange: number;
  swayAngle: number;
  rotation: number;
  rotSpeed: number;
  flipAngle: number;
  flipSpeed: number;
  alpha: number;
  baseAlpha: number;
  type: 'flower' | 'petal' | 'pollen';
  petalsCount?: number;
  colorScheme: {
    petal1: string;
    petal2: string;
    center: string;
    glow: string;
  };
}

export function LuxuryAmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isTabVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Bảng màu các đóa hoa & cánh hoa nhung lụa cao cấp
    const colorPalettes = [
      {
        petal1: 'rgba(244, 63, 94,',   // Rose Silk
        petal2: 'rgba(253, 164, 175,', // Soft Blossom Pink
        center: 'rgba(245, 158, 11,',  // Gold Pistil
        glow: 'rgba(225, 29, 72,',
      },
      {
        petal1: 'rgba(251, 113, 133,', // Coral Rose
        petal2: 'rgba(254, 205, 211,', // Champagne Blush
        center: 'rgba(251, 191, 36,',  // Amber Gold
        glow: 'rgba(244, 63, 94,',
      },
      {
        petal1: 'rgba(245, 158, 11,',  // Champagne Gold
        petal2: 'rgba(254, 243, 199,', // Ivory Pearl
        center: 'rgba(225, 29, 72,',   // Rose Gold
        glow: 'rgba(251, 191, 36,',
      },
      {
        petal1: 'rgba(225, 29, 72,',   // Velvet Rose
        petal2: 'rgba(251, 113, 133,', // Deep Silk Pink
        center: 'rgba(245, 158, 11,',  // Warm Gold
        glow: 'rgba(190, 18, 60,',
      },
    ];

    // Số lượng hoa tối ưu: mượt mà 60 FPS cả trên điện thoại yếu và laptop
    const ELEMENT_COUNT = Math.min(width < 768 ? 20 : 38, 45);

    const createFloatingElement = (initialY?: number): FloatingElement => {
      const rand = Math.random();
      let type: 'flower' | 'petal' | 'pollen';
      if (rand < 0.28) {
        type = 'flower'; // 28% đóa hoa nở rộ trọn vẹn
      } else if (rand < 0.78) {
        type = 'petal'; // 50% cánh hoa bay lượn 3D
      } else {
        type = 'pollen'; // 22% phấn hoa ánh kim phát sáng
      }

      const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      const size = type === 'flower' 
        ? Math.random() * 11 + 9 
        : type === 'petal' 
        ? Math.random() * 8 + 5 
        : Math.random() * 2.2 + 1;

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        size,
        speedY: type === 'pollen' ? Math.random() * 0.35 + 0.15 : Math.random() * 0.5 + 0.25,
        speedX: (Math.random() - 0.5) * 0.25,
        swaySpeed: Math.random() * 0.02 + 0.008,
        swayRange: Math.random() * 30 + 15,
        swayAngle: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        flipAngle: Math.random() * Math.PI * 2,
        flipSpeed: (Math.random() * 0.025 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        alpha: Math.random() * 0.4 + 0.35,
        baseAlpha: Math.random() * 0.45 + 0.35,
        type,
        petalsCount: Math.random() > 0.4 ? 5 : 6,
        colorScheme: palette,
      };
    };

    const elements: FloatingElement[] = Array.from({ length: ELEMENT_COUNT }, () => createFloatingElement());

    let mouseX = -1000;
    let mouseY = -1000;
    let smoothMouseX = -1000;
    let smoothMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${e.clientX - 225}px, ${e.clientY - 225}px, 0)`;
        spotlightRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Tự động tạm dừng animation khi người dùng chuyển tab để tiết kiệm 100% CPU/Pin
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 1. Hàm vẽ Đóa Hoa Nở Rộ 5-6 Cánh Lụa Mềm Mại
    const drawBloomingFlower = (el: FloatingElement) => {
      const { x, y, size, rotation, flipAngle, alpha, colorScheme, petalsCount = 5 } = el;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      const flipScale = Math.cos(flipAngle);
      ctx.scale(1, Math.abs(flipScale) * 0.6 + 0.4);

      const petalAngleStep = (Math.PI * 2) / petalsCount;

      // Hào quang mềm phát sáng quanh bông hoa
      const auraGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.6);
      auraGrad.addColorStop(0, `${colorScheme.glow} ${alpha * 0.25})`);
      auraGrad.addColorStop(1, `${colorScheme.glow} 0)`);
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(0, 0, size * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Vẽ từng cánh hoa xếp lớp
      for (let i = 0; i < petalsCount; i++) {
        const angle = i * petalAngleStep;
        ctx.save();
        ctx.rotate(angle);

        const petalGrad = ctx.createLinearGradient(0, 0, 0, -size);
        petalGrad.addColorStop(0, `${colorScheme.petal1} ${alpha * 0.95})`);
        petalGrad.addColorStop(0.7, `${colorScheme.petal2} ${alpha * 0.8})`);
        petalGrad.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.6})`);

        ctx.fillStyle = petalGrad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-size * 0.55, -size * 0.35, -size * 0.45, -size * 0.9, 0, -size);
        ctx.bezierCurveTo(size * 0.45, -size * 0.9, size * 0.55, -size * 0.35, 0, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      // Nhụy hoa ánh vàng champagne lấp lánh ở tâm
      const pistilGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.3);
      pistilGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.95})`);
      pistilGrad.addColorStop(0.5, `${colorScheme.center} ${alpha * 0.9})`);
      pistilGrad.addColorStop(1, `${colorScheme.petal1} ${alpha * 0.4})`);

      ctx.fillStyle = pistilGrad;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.28, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // 2. Hàm vẽ Cánh Hoa Rơi Uốn Lượn 3D (Floating Petal)
    const drawFloatingPetal = (el: FloatingElement) => {
      const { x, y, size, rotation, flipAngle, alpha, colorScheme } = el;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      const flipScale = Math.cos(flipAngle);
      ctx.scale(flipScale, 1);

      const petalGrad = ctx.createLinearGradient(-size * 0.5, -size, size * 0.5, size);
      petalGrad.addColorStop(0, `${colorScheme.petal1} ${alpha * 0.85})`);
      petalGrad.addColorStop(0.6, `${colorScheme.petal2} ${alpha * 0.75})`);
      petalGrad.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.5})`);

      ctx.fillStyle = petalGrad;
      ctx.beginPath();
      ctx.moveTo(0, -size * 1.1);
      ctx.bezierCurveTo(size * 0.7, -size * 0.6, size * 0.6, size * 0.6, 0, size);
      ctx.bezierCurveTo(-size * 0.6, size * 0.6, -size * 0.7, -size * 0.6, 0, -size * 1.1);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // 3. Hàm vẽ Hạt Phấn Hoa Ánh Kim Phát Sáng (Golden Floral Pollen)
    const drawPollen = (el: FloatingElement) => {
      const { x, y, size, alpha, colorScheme } = el;
      ctx.save();

      const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, size * 2.5);
      glowGrad.addColorStop(0, `${colorScheme.center} ${alpha * 0.9})`);
      glowGrad.addColorStop(1, `${colorScheme.glow} 0)`);

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.7, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      if (!isTabVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Cập nhật vị trí trỏ chuột mượt mà (Tạo làn gió đẩy nhẹ hoa)
      if (mouseX > 0 && mouseY > 0) {
        if (smoothMouseX === -1000) {
          smoothMouseX = mouseX;
          smoothMouseY = mouseY;
        } else {
          smoothMouseX += (mouseX - smoothMouseX) * 0.12;
          smoothMouseY += (mouseY - smoothMouseY) * 0.12;
        }
      }

      // Cập nhật và kết xuất từng phần tử hoa & cánh hoa
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];

        el.swayAngle += el.swaySpeed;
        const swayX = Math.sin(el.swayAngle) * (el.swayRange * 0.025);
        el.x += el.speedX + swayX;
        el.y += el.speedY;

        el.rotation += el.rotSpeed;
        el.flipAngle += el.flipSpeed;

        if (smoothMouseX > 0 && smoothMouseY > 0) {
          const dx = smoothMouseX - el.x;
          const dy = smoothMouseY - el.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140 && dist > 0) {
            const force = ((140 - dist) / 140) * 0.55;
            el.x -= (dx / dist) * force;
            el.y -= (dy / dist) * force * 0.4;
          }
        }

        if (el.y > height + 35) {
          Object.assign(el, createFloatingElement(-35));
        }
        if (el.x < -35) el.x = width + 35;
        if (el.x > width + 35) el.x = -35;

        if (el.type === 'flower') {
          drawBloomingFlower(el);
        } else if (el.type === 'petal') {
          drawFloatingPetal(el);
        } else {
          drawPollen(el);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. LỚP VÂN LƯỚI TẠP CHÍ CAO CẤP */}
      <div 
        className="absolute inset-0 opacity-[0.35] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(225, 29, 72, 0.08) 1px, transparent 0),
            linear-gradient(to right, rgba(245, 158, 11, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(225, 29, 72, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 120px 120px, 120px 120px',
        }}
      />

      {/* 2. CÁC QUẦNG SÁNG AURORA LỤA MỀM MẠI CỐ ĐỊNH NHẸ NHÀNG */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-rose-300/20 via-amber-300/12 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] -left-44 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-rose-500/15 via-rose-300/8 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-[60%] right-[5%] w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-amber-400/14 via-rose-400/8 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-40 left-[15%] w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-rose-600/14 via-amber-300/10 to-transparent blur-[150px] pointer-events-none" />

      {/* 3. VÙNG HÀO QUANG THEO DẤU CHUỘT (CẬP NHẬT TRỰC TIẾP QUA TRANSFORM KHÔNG GÂY RE-RENDER) */}
      <div 
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full bg-radial from-rose-300/15 via-amber-300/10 to-transparent blur-[90px] opacity-0 pointer-events-none will-change-transform transition-opacity duration-300"
      />

      {/* 4. CANVAS ĐÓA HOA NỞ RỘ VÀ CÁNH HOA LƠ LỬNG 60 FPS */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 5. ĐƯỜNG CHỈ VIỀN VÂN METALLIC ĐẦU TRANG */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-rose-300/60 to-transparent shadow-sm shadow-rose-400/20" />
    </div>
  );
}


