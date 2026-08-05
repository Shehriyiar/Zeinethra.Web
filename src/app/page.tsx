import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StatGrid } from "@/components/ui/StatGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { HomeHero } from "@/components/home/HomeHero";
import { api } from "@/lib/api";
import {
  Heart,
  Brain,
  Code2,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
} from "lucide-react";

async function getInsights() {
  try {
    return (await api.getArticles()).items;
  } catch {
    return [];
  }
}

async function getIndustries() {
  try {
    return (await api.getIndustries()).items;
  } catch {
    return [];
  }
}

export default async function Home() {
  const [articles, industries] = await Promise.all([
    getInsights(),
    getIndustries(),
  ]);

  return (
    <>
      <HomeHero />

      <Section id="intro">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4">WHO WE ARE</p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              A brand of LD Hub Pty Ltd
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Zeinethra is a technology company purpose-built for healthcare and
              enterprise. We combine deep clinical understanding with
              cutting-edge AI to create platforms that genuinely improve
              outcomes — for patients, practitioners, and businesses.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-bg-elevated">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">WHAT WE DO</p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Three pillars of innovation
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {(
            [
              {
                icon: Heart,
                title: "Healthcare Technology",
                desc: "Clinical workflow systems, patient portals, and health platforms designed with clinical insight.",
                href: "/healthcare",
              },
              {
                icon: Brain,
                title: "AI & Digital Platforms",
                desc: "Applied artificial intelligence — from computer vision to NLP — integrated into real workflows.",
                href: "/ai-platforms",
              },
              {
                icon: Code2,
                title: "IT Services",
                desc: "Enterprise consulting, cloud architecture, and bespoke software development.",
                href: "/it-services",
              },
            ] as const
          ).map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <Link
                href={item.href}
                className="card-ze group flex flex-col p-8 transition hover:-translate-y-1"
              >
                <item.icon size={32} className="text-cyan" />
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan transition-all group-hover:gap-2">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">FLAGSHIP PRODUCT</p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Zenith Dental
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              AI-powered shade matching that eliminates guesswork. Zenith Dental
              uses advanced computer vision to deliver accurate, consistent shade
              results — reducing remakes and improving patient satisfaction.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/products/zenith-dental" className="btn-primary">
                Explore Zenith Dental
              </Link>
              <Link href="/contact" className="btn-secondary">
                Book a Demo
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[var(--radius)] border border-[rgba(11,32,70,0.12)] text-center shadow-[var(--shadow)]" style={{ background: "linear-gradient(145deg, #07152e 0%, #0b2046 45%, #0a3a4a 100%)" }}>
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 40%, rgba(0,163,180,0.4), transparent 58%)" }} />
              <div className="relative z-10 px-6">
                <Sparkles size={48} className="mx-auto text-[#5ad0dc] drop-shadow-[0_0_12px_rgba(0,163,180,0.9)]" />
                <p className="mt-3 font-display text-lg font-semibold text-white md:text-xl">
                  AI Shade Matching
                </p>
                <p className="mt-2 text-sm font-semibold text-[#5ad0dc]">
                  98% accuracy · Real-time results
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-bg-elevated">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">WHY ZEINETHRA</p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Built different, by design
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              {
                icon: Shield,
                title: "Compliance First",
                desc: "HIPAA, GDPR, and regional healthcare regulations built into every layer.",
              },
              {
                icon: Zap,
                title: "AI-Native",
                desc: "Not bolted-on AI — purpose-built intelligence woven into core workflows.",
              },
              {
                icon: Globe,
                title: "Globally Scalable",
                desc: "Cloud-native architecture that scales from solo practices to hospital networks.",
              },
              {
                icon: Heart,
                title: "Clinical Empathy",
                desc: "Designed by people who understand healthcare, not just technology.",
              },
            ] as const
          ).map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="card-ze p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                  <v.icon size={20} />
                </div>
                <h3 className="mt-3 font-display text-base font-semibold text-foreground">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">INDUSTRIES</p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Solutions across sectors
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(industries.length > 0
            ? industries
                .slice(0, 8)
                .map((ind) => ({ name: ind.name, desc: ind.description || "" }))
            : [
                { name: "Healthcare", desc: "Hospitals & clinics" },
                { name: "Dental", desc: "Practices & labs" },
                { name: "Pharmaceuticals", desc: "Research & distribution" },
                { name: "Education", desc: "EdTech & LMS" },
                { name: "Finance", desc: "FinTech & banking" },
                { name: "Retail", desc: "E-commerce & POS" },
                { name: "Manufacturing", desc: "IoT & automation" },
                { name: "Government", desc: "Public sector digital" },
              ]
          ).map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.05}>
              <div className="card-ze p-5 transition hover:-translate-y-0.5 hover:border-cyan/40">
                <h3 className="font-display text-sm font-semibold text-foreground">
                  {ind.name}
                </h3>
                {ind.desc && (
                  <p className="mt-1 text-xs text-muted">{ind.desc}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-8 text-center">
            <Link
              href="/industries"
              className="text-sm font-medium text-cyan hover:underline"
            >
              View all industries →
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-bg-elevated">
        <Reveal>
          <div className="mb-10 text-center">
            <p className="eyebrow mb-3">BY THE NUMBERS</p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Impact at scale
            </h2>
          </div>
        </Reveal>
        <StatGrid
          stats={[
            { value: "98%", label: "Shade Accuracy" },
            { value: "50+", label: "Enterprise Clients" },
            { value: "12", label: "Industries Served" },
            { value: "99.9%", label: "Platform Uptime" },
          ]}
        />
      </Section>

      {articles.length > 0 && (
        <Section>
          <Reveal>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="eyebrow mb-3">INSIGHTS</p>
                <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  Latest thinking
                </h2>
              </div>
              <Link
                href="/insights"
                className="hidden text-sm font-medium text-cyan hover:underline sm:inline"
              >
                View all →
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((a, i) => (
              <Reveal key={a.id} delay={i * 0.1}>
                <Link
                  href={`/insights/${a.slug}`}
                  className="card-ze group flex flex-col overflow-hidden transition hover:-translate-y-1"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-navy to-navy-deep" />
                  <div className="flex flex-1 flex-col p-5">
                    {a.category && (
                      <p className="eyebrow mb-2 text-[10px]">{a.category}</p>
                    )}
                    <h3 className="font-display text-base font-semibold text-foreground transition-colors group-hover:text-cyan">
                      {a.title}
                    </h3>
                    {a.summary && (
                      <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">
                        {a.summary}
                      </p>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CtaBand
        eyebrow="READY TO TRANSFORM?"
        title="Let's build something remarkable"
        subtitle="Whether you're a healthcare provider, enterprise, or technology partner — we'd love to hear from you."
        primaryHref="/contact"
        primaryLabel="Get in Touch"
        secondaryHref="/partners"
        secondaryLabel="Partner With Us"
      />
    </>
  );
}
