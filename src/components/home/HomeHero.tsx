"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ParticleField } from "@/components/effects/ParticleField";

export function HomeHero() {
  return (
    <section className="hero-world relative min-h-[100svh] overflow-hidden">
      <ParticleField className="opacity-65" />
      <div className="hero-beams pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(0,200,220,0.18),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,rgba(2,8,20,0.9),transparent_50%)]" />

      <div className="container-ze relative z-10 grid min-h-[100svh] items-center gap-8 py-20 max-sm:pt-24 sm:gap-10 sm:py-24 lg:grid-cols-2 lg:gap-8 lg:py-28">
        {/* Copy */}
        <div className="reveal order-2 text-center text-white lg:order-1 lg:text-left">
          <p className="eyebrow mb-3 text-cyan-soft sm:mb-4">
            HEALTHCARE TECHNOLOGY · AI · ENTERPRISE
          </p>
          <h1 className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-white">ZEINETHRA</span>
            <span className="mt-2 block text-[0.36em] font-semibold tracking-[0.18em] text-cyan-soft sm:mt-3 sm:text-[0.4em] sm:tracking-[0.2em]">
              TECHNOLOGY · AI · IT SERVICES
            </span>
          </h1>
          <p className="mt-3 text-[11px] font-medium tracking-[0.2em] text-white/90 sm:text-xs sm:tracking-[0.22em]">
            SOLUTIONS ACROSS PLATFORMS
          </p>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/90 sm:mt-6 sm:text-base md:text-lg lg:mx-0">
            Technology that understands healthcare — platforms built to transform
            every industry. From Zenith Dental to enterprise AI.
          </p>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center lg:justify-start">
            <Link href="/products/zenith-dental" className="btn-primary w-full sm:w-auto">
              Explore Zenith Dental <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-on-dark w-full sm:w-auto">
              Book consultation
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/85 sm:mt-8 sm:gap-x-6 sm:text-sm lg:justify-start">
            <span>Clinical platforms</span>
            <span className="hidden text-cyan sm:inline">·</span>
            <span>Enterprise delivery</span>
            <span className="hidden text-cyan sm:inline">·</span>
            <span>Secure by design</span>
          </div>
        </div>

        {/* Crystal logo stage */}
        <div className="order-1 mx-auto flex w-full max-w-[420px] items-center justify-center lg:order-2 lg:max-w-none">
          <div className="crystal-orb logo-stage relative flex aspect-square w-[min(86vw,360px)] items-center justify-center sm:w-[min(70vw,400px)] lg:w-[min(100%,440px)]">
            <span className="orbit orbit-a" aria-hidden />
            <span className="orbit orbit-b" aria-hidden />
            <span className="orbit orbit-c" aria-hidden />
            <span className="orbit-ring-floor" aria-hidden />
            <span className="logo-aura" aria-hidden />
            <div className="crystal-glass absolute inset-[12%] rounded-full" aria-hidden />
            <div className="logo-world relative z-10 flex flex-col items-center px-4 sm:px-6">
              <Image
                src="/brand/logo-mark.png"
                alt="Zeinethra"
                width={1920}
                height={1115}
                quality={100}
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 280px"
                priority
                className="mx-auto h-auto w-[52%] max-w-[200px] object-contain brightness-110 contrast-110 drop-shadow-[0_0_48px_rgba(0,220,240,0.65)] sm:w-[58%] sm:max-w-[240px]"
              />
              <div className="mt-4 text-center sm:mt-5">
                <div className="font-display text-xl font-bold tracking-[0.14em] text-white sm:text-2xl md:text-3xl">
                  ZEINETHRA
                </div>
                <div className="mt-1.5 text-[10px] font-semibold tracking-[0.2em] text-cyan-soft sm:text-xs">
                  TECHNOLOGY · AI · IT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
