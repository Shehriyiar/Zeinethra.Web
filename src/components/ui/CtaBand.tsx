import Link from "next/link";
import { Reveal } from "./Reveal";

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
    <section className="hero-mesh py-20 lg:py-28 text-white">
      <div className="container-ze text-center">
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={primaryHref} className="btn-primary">
              {primaryLabel}
            </Link>
            {secondaryHref && secondaryLabel && (
              <Link
                href={secondaryHref}
                className="btn-secondary text-white border-white/20 hover:border-cyan"
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
