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
    <section className="hero-mesh relative overflow-hidden py-24 lg:py-32 text-white">
      <div className="container-ze relative z-10">
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl max-w-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg text-white/70 leading-relaxed">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
    </section>
  );
}
