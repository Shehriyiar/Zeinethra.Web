"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ParticleField } from "@/components/effects/ParticleField";

export function HomeHero() {
  return (
    <section className="hero-world relative min-h-[100svh] overflow-hidden">
      <ParticleField className="opacity-70" />
      <div className="hero-beams pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(0,163,180,0.2),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(2,8,20,0.85),transparent_55%)]" />

      <div className="container-ze relative z-10 grid min-h-[100svh] items-center gap-10 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-28">
        {/* Left content */}
        <div className="reveal text-left text-white">
          <p className="eyebrow mb-4 text-cyan-soft">
            HEALTHCARE TECHNOLOGY · AI · ENTERPRISE
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            <span className="block text-white">ZEINETHRA</span>
            <span className="mt-3 block text-[0.38em] font-semibold tracking-[0.2em] text-cyan-soft sm:text-[0.42em]">
              TECHNOLOGY · AI · IT SERVICES
            </span>
          </h1>
          <p className="mt-3 text-xs font-medium tracking-[0.22em] text-white/85 sm:text-sm">
            SOLUTIONS ACROSS PLATFORMS
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
            Technology that understands healthcare — platforms built to transform
            every industry. From Zenith Dental to enterprise AI.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Link href="/products/zenith-dental" className="btn-primary">
              Explore Zenith Dental <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="btn-secondary border-white/30 text-white hover:border-cyan hover:text-white"
            >
              Book consultation
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            <span>Clinical platforms</span>
            <span className="text-cyan">·</span>
            <span>Applied AI</span>
            <span className="text-cyan">·</span>
            <span>Enterprise delivery</span>
          </div>
        </div>

        {/* Right: logo + product card */}
        <div className="relative mx-auto flex w-full max-w-[460px] flex-col items-center">
          <div className="logo-stage relative flex h-[260px] w-full items-center justify-center sm:h-[320px] md:h-[360px]">
            <span className="orbit orbit-a" aria-hidden />
            <span className="orbit orbit-b" aria-hidden />
            <span className="orbit orbit-c" aria-hidden />
            <span className="orbit-ring-floor" aria-hidden />
            <span className="logo-aura" aria-hidden />
            <div className="logo-world relative z-10 flex flex-col items-center">
              <Image
                src="/brand/logo-mark.png"
                alt="Zeinethra"
                width={280}
                height={240}
                priority
                className="h-auto w-[160px] object-contain drop-shadow-[0_0_40px_rgba(0,163,180,0.55)] sm:w-[200px] md:w-[240px]"
              />
              <div className="mt-3 text-center">
                <div className="font-display text-2xl font-bold tracking-[0.12em] text-white sm:text-3xl">
                  ZEINETHRA
                </div>
                <div className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-cyan-soft sm:text-xs">
                  TECHNOLOGY · AI · IT SERVICES
                </div>
                <div className="mt-1 text-[10px] tracking-[0.2em] text-white/80">
                  SOLUTIONS ACROSS PLATFORMS
                </div>
              </div>
            </div>
          </div>

          <div className="reveal relative z-10 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#07152e] via-[#0b2046] to-[#0a3a4a] p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-7">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,163,180,0.35),transparent_60%)]" />
            <div className="relative">
              <Sparkles
                size={40}
                className="mx-auto text-cyan drop-shadow-[0_0_12px_rgba(0,163,180,0.9)]"
              />
              <p className="mt-3 font-display text-lg font-semibold text-white sm:text-xl">
                AI Shade Matching
              </p>
              <p className="mt-1 text-sm font-medium text-cyan-soft">
                98% accuracy · Real-time results
              </p>
              <Link
                href="/products/zenith-dental"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white hover:text-cyan"
              >
                Open product tour <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
