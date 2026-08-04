"use client";

import { useState, useRef } from "react";

export function BeforeAfterSlider({
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMove(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, x)));
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full cursor-col-resize select-none overflow-hidden rounded-2xl border border-[var(--border)]"
      onMouseMove={(e) => {
        if (e.buttons === 1) handleMove(e.clientX);
      }}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      role="slider"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Before and after comparison"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(2, p - 2));
        if (e.key === "ArrowRight") setPos((p) => Math.min(98, p + 2));
      }}
    >
      {/* After side */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 to-navy-deep flex items-center justify-center">
        <div className="text-center">
          <div className="font-display text-2xl font-bold text-white/80">
            {afterLabel}
          </div>
          <p className="mt-1 text-sm text-white/40">AI-matched shade</p>
        </div>
      </div>

      {/* Before side */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy to-navy-deep flex items-center justify-center"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <div className="text-center">
          <div className="font-display text-2xl font-bold text-white/80">
            {beforeLabel}
          </div>
          <p className="mt-1 text-sm text-white/40">Manual selection</p>
        </div>
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 z-10 w-0.5 bg-cyan"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-cyan text-white text-sm font-bold shadow-lg">
          &#x27F7;
        </div>
      </div>
    </div>
  );
}
