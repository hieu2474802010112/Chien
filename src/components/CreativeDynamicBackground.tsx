import { useEffect, useRef } from 'react';

interface CreativeDynamicBackgroundProps {
  mousePos: { x: number; y: number };
}

export function CreativeDynamicBackground({ mousePos }: CreativeDynamicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particles: Champagne Gold, Warm Amber, Rose Gold & Velvet Ruby
    const particleCount = Math.min(Math.floor((width * height) / 19000), 55);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      baseAlpha: number;
      pulseSpeed: number;
      pulseOffset: number;
    }> = [];

    const colors = [
      'rgba(245, 158, 11, ',   // Champagne Gold
      'rgba(251, 191, 36, ',   // Warm Amber Gold
      'rgba(251, 113, 133, ',  // Warm Rose Gold
      'rgba(244, 63, 94, ',    // Velvet Ruby
      'rgba(253, 230, 138, ',  // Light Champagne Sparkle
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.45 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Organic luminous fluid aura blobs in Velvet Wine & Champagne Gold
    const blobs = [
      { x: width * 0.2, y: height * 0.3, r: 320, color: 'rgba(217, 119, 6, 0.12)', vx: 0.18, vy: 0.12 },
      { x: width * 0.82, y: height * 0.25, r: 340, color: 'rgba(190, 18, 60, 0.11)', vx: -0.16, vy: 0.18 },
      { x: width * 0.5, y: height * 0.75, r: 360, color: 'rgba(131, 24, 67, 0.10)', vx: 0.12, vy: -0.14 },
      { x: width * 0.15, y: height * 0.85, r: 280, color: 'rgba(245, 158, 11, 0.09)', vx: -0.14, vy: -0.10 },
    ];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.014;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw organic Velvet Wine & Champagne Gold fluid aura
      blobs.forEach((blob) => {
        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x < -blob.r) blob.x = width + blob.r;
        if (blob.x > width + blob.r) blob.x = -blob.r;
        if (blob.y < -blob.r) blob.y = height + blob.r;
        if (blob.y > height + blob.r) blob.y = -blob.r;

        // Subtle interactive mouse offset
        const mouseShiftX = mousePos.x * 24;
        const mouseShiftY = mousePos.y * 18;

        const grad = ctx.createRadialGradient(
          blob.x + mouseShiftX,
          blob.y + mouseShiftY,
          0,
          blob.x + mouseShiftX,
          blob.y + mouseShiftY,
          blob.r
        );
        grad.addColorStop(0, blob.color);
        grad.addColorStop(1, 'rgba(12, 10, 9, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blob.x + mouseShiftX, blob.y + mouseShiftY, blob.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw connecting golden light rays (PR & Press Gala Network)
      const maxDistance = 145;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.16;
            ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw particles with golden pulse
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(time * 2 + p.pulseOffset) * 0.22 + 0.78;
        const alpha = p.baseAlpha * pulse;

        // Particle core
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Soft outer glow
        ctx.fillStyle = `${p.color}${alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Dynamic Subtle Warm Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.11]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(245, 158, 11, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(245, 158, 11, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      {/* Canvas for smooth organic aura & light network */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Warm obsidian vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0A09]/50 via-transparent to-[#0C0A09]/90" />
    </div>
  );
}
