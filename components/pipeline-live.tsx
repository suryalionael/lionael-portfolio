"use client";

import { useEffect, useRef } from "react";

const STAGES = ["Ingest", "Transform", "Model", "Serve"];
const DOTS = 14;

// A small live diagram under the Work heading: data dots flowing through
// the pipeline stages, gently nudged by the cursor. Runs only while
// visible and the tab is active; reduced motion gets the static diagram.
export function PipelineLive() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim() || "#3e63dd";
    const fit = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Resizing clears the canvas; redraw so the static diagram (reduced
      // motion, or paused offscreen) never stays blank.
      drawTrack();
    };
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);

    // Stage x-positions along the track, with margins for the labels.
    const stageX = (i: number) =>
      width * (0.06 + (0.88 * i) / (STAGES.length - 1));
    const midY = () => height * 0.42;

    const drawTrack = () => {
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(stageX(0), midY());
      ctx.lineTo(stageX(STAGES.length - 1), midY());
      ctx.stroke();
      ctx.font = "10px var(--font-geist-mono), monospace";
      ctx.textAlign = "center";
      STAGES.forEach((s, i) => {
        const x = stageX(i);
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.beginPath();
        ctx.arc(x, midY(), 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.45)";
        ctx.fillText(s.toUpperCase(), x, midY() + 24);
      });
    };

    if (reduce) {
      drawTrack();
      return () => ro.disconnect();
    }

    type Dot = { p: number; speed: number; drift: number; size: number };
    const dots: Dot[] = Array.from({ length: DOTS }, (_, i) => ({
      p: i / DOTS,
      speed: 0.00035 + Math.random() * 0.00045,
      drift: (Math.random() - 0.5) * 10,
      size: 1.2 + Math.random() * 1.4,
    }));

    let mouseX = -1;
    let mouseY = -1;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    };
    const onLeave = () => {
      mouseX = -1;
      mouseY = -1;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let running = false;
    let last = 0;
    const frame = (t: number) => {
      const dt = last ? Math.min(t - last, 50) : 16;
      last = t;
      drawTrack();
      for (const dot of dots) {
        dot.p = (dot.p + dot.speed * dt) % 1;
        const x = stageX(0) + dot.p * (stageX(STAGES.length - 1) - stageX(0));
        let y = midY() + Math.sin(dot.p * Math.PI * 6 + dot.drift) * 3;
        // Cursor nudge: dots bow away from the pointer.
        if (mouseX >= 0) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const d2 = dx * dx + dy * dy;
          if (d2 < 3600) {
            const f = (1 - d2 / 3600) * 10;
            y += (dy >= 0 ? 1 : -1) * f;
          }
        }
        // Brighter as it reaches Serve, with the accent at the end.
        const nearEnd = dot.p > 0.92;
        ctx.globalAlpha = nearEnd ? 0.9 : 1;
        ctx.fillStyle = nearEnd
          ? accent
          : `rgba(255,255,255,${0.25 + dot.p * 0.4})`;
        ctx.beginPath();
        ctx.arc(x, y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([entry]) =>
        entry.isIntersecting && !document.hidden ? start() : stop(),
      { threshold: 0.05 },
    );
    io.observe(wrap);
    const onVis = () => {
      if (document.hidden) stop();
      else if (wrap.getBoundingClientRect().bottom > 0) start();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-auto mt-8 h-[72px] w-full max-w-[560px]"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}
