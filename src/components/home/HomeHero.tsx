"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ParticleField } from "@/components/effects/ParticleField";

export function HomeHero() {
  return (
    <section className="hero-world relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <ParticleField className="opacity-80" />
      <div className="hero-beams pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,163,180,0.22),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(11,32,70,0.9),transparent_55%)]" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-4 py-24 text-center">
        <div className="logo-stage relative mb-2 flex h-[280px] w-[280px] items-center justify-center sm:h-[340px] sm:w-[340px] md:h-[400px] md:w-[400px]">
          <span className="orbit orbit-a" aria-hidden />
          <span className="orbit orbit-b" aria-hidden />
          <span className="orbit orbit-c" aria-hidden />
          <span className="orbit-ring-floor" aria-hidden />
          <span className="logo-aura" aria-hidden />
          <div className="logo-world relative z-10">
            <Image
              src="/brand/logo-full-dark.png"
              alt="Zeinethra — Technology · AI · IT Services"
              width={520}
              height={360}
              priority
              className="h-auto w-[220px] object-contain drop-shadow-[0_0_40px_rgba(0,163,180,0.45)] sm:w-[280px] md:w-[340px]"
            />
          </div>
        </div>

        <p className="reveal mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
          Step into the next generation of healthcare technology and enterprise AI —
          platforms engineered for a world that&apos;s just beginning.
        </p>

        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4" style={{ animationDelay: "0.15s" }}>
          <Link href="/products/zenith-dental" className="btn-primary">
            Enter Zenith Dental <ArrowRight size={16} />
          </Link>
          <Link
            href="/contact"
            className="btn-secondary border-white/25 text-white hover:border-cyan hover:text-white"
          >
            Book consultation
          </Link>
        </div>

        <a
          href="#intro"
          className="reveal mt-14 inline-flex flex-col items-center gap-1 text-[10px] tracking-[0.28em] text-cyan-soft/90"
          style={{ animationDelay: "0.3s" }}
        >
          EXPLORE
          <ChevronDown size={18} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
