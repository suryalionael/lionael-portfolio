"use client";

import { useRef, useEffect, useState } from "react";

interface ParticleTypographyProps {
  text: string;
  className?: string;
}

export function ParticleTypography({ text, className = "" }: ParticleTypographyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const fontSize = Math.min(rect.width * 0.12, 120);
    ctx.font = `500 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`;
    ctx.fillStyle = "#fafafa";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = fontSize * 1.2;
    
    const startX = (rect.width - textWidth) / 2;
    const startY = (rect.height - textHeight) / 2;

    ctx.fillText(text, startX, startY);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    const particles: { x: number; y: number; targetX: number; targetY: number; alpha: number }[] = [];
    
    for (let y = 0; y < canvas.height; y += 4) {
      for (let x = 0; x < canvas.width; x += 4) {
        const i = (y * canvas.width + x) * 4;
        if (pixels[i + 3] > 128) {
          particles.push({
            x: (x / dpr) + (Math.random() - 0.5) * 100,
            y: (y / dpr) + (Math.random() - 0.5) * 100,
            targetX: x / dpr,
            targetY: y / dpr,
            alpha: 0,
          });
        }
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let frame = 0;
    const maxFrames = 60;

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, rect.width, rect.height);

      const progress = Math.min(frame / maxFrames, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      particles.forEach((p) => {
        p.x += (p.targetX - p.x) * 0.08;
        p.y += (p.targetY - p.y) * 0.08;
        p.alpha = easeProgress;

        ctx.fillStyle = `rgba(250, 250, 250, ${p.alpha})`;
        ctx.fillRect(p.x, p.y, 2, 2);
      });

      frame++;

      if (frame < maxFrames + 20) {
        requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
      }
    }

    const timer = setTimeout(() => {
      animate();
    }, 200);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 transition-opacity duration-700 ${isComplete ? "opacity-0" : "opacity-100"}`}
        style={{ width: "100%", height: "100%" }}
      />
      <h1
        className={`text-[clamp(3.5rem,9.5vw,8rem)] leading-[0.95] font-medium tracking-[-0.045em] transition-opacity duration-700 ${isComplete ? "opacity-100" : "opacity-0"}`}
      >
        {text}
      </h1>
    </div>
  );
}
