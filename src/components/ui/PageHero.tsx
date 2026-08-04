"use client";

import { ParticleField } from "@/components/effects/ParticleField";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="hero-mesh relative overflow-hidden py-24 text-white lg:py-32">
      <ParticleField className="opacity-70" />
      <div className="container-ze relative z-10">
        <Reveal>
          <p className="eyebrow mb-4 text-cyan-soft">{eyebrow}</p>
          <h1 className="font-display max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
