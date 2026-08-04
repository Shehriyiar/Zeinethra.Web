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
  hue: number;
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

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.floor((width * height) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        s: 1.5 + Math.random() * 3.5,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.15 - Math.random() * 0.45,
        a: 0.25 + Math.random() * 0.65,
        pulse: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.35 ? 186 : 210,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;
        if (p.y < -10) p.y = h + 10;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const glow = 0.45 + Math.sin(p.pulse) * 0.35;
        const alpha = p.a * glow;
        ctx.fillStyle = `hsla(${p.hue}, 90%, 62%, ${alpha})`;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${alpha})`;
        ctx.shadowBlur = 12 + glow * 10;
        ctx.fillRect(p.x, p.y, p.s, p.s);
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

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    />
  );
}
