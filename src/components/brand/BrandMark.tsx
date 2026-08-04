"use client";

import Image from "next/image";
import clsx from "clsx";

export function BrandMark({
  size = 40,
  className,
  animated = false,
  priority = false,
}: {
  size?: number;
  className?: string;
  animated?: boolean;
  priority?: boolean;
}) {
  return (
    <span
      className={clsx(
        "relative inline-flex shrink-0 items-center justify-center",
        animated && "logo-float",
        className
      )}
      style={{ width: size, height: size }}
    >
      {animated && <span className="logo-glow" aria-hidden />}
      <Image
        src="/brand/logo-mark.png"
        alt="Zeinethra"
        width={size}
        height={size}
        priority={priority}
        className="relative z-[1] h-full w-full object-contain drop-shadow-[0_0_24px_rgba(0,163,180,0.45)]"
      />
    </span>
  );
}

export function BrandWordmark({
  className,
  showTag = true,
  inverted = false,
}: {
  className?: string;
  showTag?: boolean;
  inverted?: boolean;
}) {
  return (
    <div className={clsx("leading-tight", className)}>
      <div
        className={clsx(
          "font-display text-lg font-bold tracking-[0.06em]",
          inverted ? "text-white" : "text-foreground"
        )}
      >
        ZEINETHRA
      </div>
      {showTag && (
        <div
          className={clsx(
            "hidden text-[10px] tracking-[0.18em] sm:block",
            inverted ? "text-cyan-soft" : "text-cyan"
          )}
        >
          TECHNOLOGY · AI · IT
        </div>
      )}
    </div>
  );
}
