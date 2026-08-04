"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import { ParticleField } from "@/components/effects/ParticleField";

export function HomeHero() {
  return (
    <section className="hero-mesh relative min-h-[92vh] overflow-hidden">
      <ParticleField />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,163,180,0.18),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(0,163,180,0.12),transparent_30%)]" />

      <div className="container-ze relative z-10 grid min-h-[92vh] items-center gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="reveal text-white">
          <p className="eyebrow mb-5 text-cyan-soft">
            HEALTHCARE TECHNOLOGY · AI · ENTERPRISE
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            <span className="block text-white">ZEINETHRA</span>
            <span className="mt-3 block text-[0.42em] font-semibold tracking-[0.22em] text-cyan-soft">
              TECHNOLOGY · AI · IT SERVICES
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
            Technology that understands healthcare — platforms built to transform
            every industry. From Zenith Dental to enterprise AI.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
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
          <p className="mt-8 text-xs tracking-[0.2em] text-white/75">
            SOLUTIONS ACROSS PLATFORMS
          </p>
        </div>

        <div className="relative mx-auto flex h-[320px] w-full max-w-[420px] items-center justify-center md:h-[420px]">
          <div className="absolute inset-[12%] rounded-full bg-cyan/15 blur-3xl" />
          <div className="absolute inset-[22%] animate-pulse rounded-full bg-cyan/10 blur-2xl" />
          <BrandMark size={300} animated priority />
        </div>
      </div>
    </section>
  );
}
