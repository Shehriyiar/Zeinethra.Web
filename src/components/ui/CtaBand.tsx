import Link from "next/link";
import { Reveal } from "./Reveal";
import { ParticleField } from "@/components/effects/ParticleField";

export function CtaBand({
  eyebrow,
  title,
  subtitle,
  primaryHref = "/contact",
  primaryLabel = "Get Started",
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="hero-mesh relative overflow-hidden py-20 text-white lg:py-28">
      <ParticleField className="opacity-60" />
      <div className="container-ze relative z-10 text-center">
        <Reveal>
          <p className="eyebrow mb-4 text-cyan-soft">{eyebrow}</p>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">{subtitle}</p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={primaryHref} className="btn-primary">
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel && (
              <Link
                href={secondaryHref}
                className="btn-secondary border-white/30 text-white hover:border-cyan hover:text-white"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
