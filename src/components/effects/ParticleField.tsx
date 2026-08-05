"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  s: number;
  vx: number;
  vy: number;
  a: number;
  pulse: number;
  kind: "pixel" | "star";
};

export function ParticleField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(70, Math.floor((width * height) / 16000));
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        s: i % 7 === 0 ? 2.4 : 0.8 + Math.random() * 1.6,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.05 - Math.random() * 0.18,
        a: 0.15 + Math.random() * 0.45,
        pulse: Math.random() * Math.PI * 2,
        kind: i % 5 === 0 ? "pixel" : "star",
      }));
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduce) return () => window.removeEventListener("resize", resize);

    const tick = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.025;
        if (p.y < -12) {
          p.y = h + 8;
          p.x = Math.random() * w;
        }
        if (p.x < -12) p.x = w + 8;
        if (p.x > w + 12) p.x = -8;

        const glow = 0.5 + Math.sin(p.pulse) * 0.35;
        const alpha = p.a * glow;
        ctx.fillStyle = `rgba(120, 230, 245, ${alpha})`;
        ctx.shadowColor = `rgba(0, 200, 220, ${alpha})`;
        ctx.shadowBlur = p.kind === "pixel" ? 12 : 8;

        if (p.kind === "pixel") {
          ctx.fillRect(p.x, p.y, p.s, p.s);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.s * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden />;
}
