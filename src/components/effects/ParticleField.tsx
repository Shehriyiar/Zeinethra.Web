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
  kind: "pixel" | "dot";
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

      const count = Math.min(48, Math.floor((width * height) / 22000));
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        s: i % 5 === 0 ? 2.8 : 1.2 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -0.08 - Math.random() * 0.22,
        a: 0.18 + Math.random() * 0.35,
        pulse: Math.random() * Math.PI * 2,
        kind: i % 4 === 0 ? "pixel" : "dot",
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
        p.pulse += 0.02;
        if (p.y < -12) {
          p.y = h + 8;
          p.x = Math.random() * w;
        }
        if (p.x < -12) p.x = w + 8;
        if (p.x > w + 12) p.x = -8;

        const glow = 0.55 + Math.sin(p.pulse) * 0.25;
        const alpha = p.a * glow;
        ctx.fillStyle = `rgba(90, 208, 220, ${alpha})`;
        ctx.shadowColor = `rgba(0, 163, 180, ${alpha * 0.9})`;
        ctx.shadowBlur = p.kind === "pixel" ? 10 : 6;

        if (p.kind === "pixel") {
          ctx.fillRect(p.x, p.y, p.s, p.s);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.s * 0.55, 0, Math.PI * 2);
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
