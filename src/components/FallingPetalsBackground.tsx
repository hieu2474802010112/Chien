import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  swaySpeed: number;
  swayAmplitude: number;
  swayOffset: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  opacity: number;
}

export function FallingPetalsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Number of gentle petals
    const petalCount = Math.min(Math.floor((width * height) / 24000), 38);
    const petals: Petal[] = [];

    const petalColors = [
      'rgba(251, 113, 133, ', // Soft Rose Coral
      'rgba(244, 63, 94, ',   // Rose Pink
      'rgba(253, 164, 175, ', // Light Sakura Rose
      'rgba(254, 205, 211, ', // Pastel Blush
      'rgba(251, 191, 36, ',  // Golden Petal Sparkle
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 11 + 9,
        speedX: Math.random() * 0.3 + 0.15, // Chuyển động ngang rất chậm, tự nhiên
        speedY: Math.random() * 0.45 + 0.35, // Rơi chầm chậm êm đềm
        swaySpeed: Math.random() * 0.012 + 0.006,
        swayAmplitude: Math.random() * 0.6 + 0.3,
        swayOffset: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008, // Xoay chậm nhẹ
        flip: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.012 + 0.005, // Lật cánh mềm mại
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.45 + 0.35,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Helper to draw a single petal shape
    const drawPetal = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      flip: number,
      color: string,
      opacity: number
    ) => {
      pCtx.save();
      pCtx.translate(x, y);
      pCtx.rotate(rotation);
      pCtx.scale(Math.cos(flip), 1);

      pCtx.beginPath();
      pCtx.moveTo(0, 0);
      pCtx.bezierCurveTo(-size * 0.6, -size * 0.4, -size * 0.8, -size * 1.2, 0, -size * 1.5);
      pCtx.bezierCurveTo(size * 0.8, -size * 1.2, size * 0.6, -size * 0.4, 0, 0);

      // Gradient for 3D curved petal depth
      const grad = pCtx.createLinearGradient(0, -size * 1.5, 0, 0);
      grad.addColorStop(0, `${color}${opacity * 0.92})`);
      grad.addColorStop(0.6, `${color}${opacity * 0.72})`);
      grad.addColorStop(1, `${color}${opacity * 0.32})`);

      pCtx.fillStyle = grad;
      pCtx.fill();

      // Subtle petal central rib
      pCtx.beginPath();
      pCtx.moveTo(0, 0);
      pCtx.quadraticCurveTo(size * 0.08, -size * 0.8, 0, -size * 1.3);
      pCtx.strokeStyle = `${color}${opacity * 0.35})`;
      pCtx.lineWidth = 0.7;
      pCtx.stroke();

      pCtx.restore();
    };

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        // Dao động lượn sóng tự nhiên theo hàm sin không bị giật khi rê chuột
        const sway = Math.sin(time * p.swaySpeed + p.swayOffset) * p.swayAmplitude;
        p.x += p.speedX + sway;
        p.y += p.speedY; // Tốc độ rơi đều đặn, êm ái
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Wrap around smoothly
        if (p.y > height + 25) {
          p.y = -25;
          p.x = Math.random() * width;
        }
        if (p.x > width + 25) {
          p.x = -25;
        } else if (p.x < -25) {
          p.x = width + 25;
        }

        drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.flip, p.color, p.opacity);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Soft warm light ambient glow blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-rose-200/35 blur-[140px]" />
      <div className="absolute top-[35%] right-[-10%] w-[550px] h-[550px] rounded-full bg-amber-100/50 blur-[130px]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[650px] h-[650px] rounded-full bg-rose-100/40 blur-[150px]" />

      {/* Falling Petals Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Subtle organic texture grid */}
      <div 
        className="absolute inset-0 opacity-[0.025]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
        }}
      />
    </div>
  );
}
