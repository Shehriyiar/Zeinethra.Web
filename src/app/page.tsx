import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StatGrid } from "@/components/ui/StatGrid";
import { CtaBand } from "@/components/ui/CtaBand";
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
      {/* ── HERO ── */}
      <section className="hero-mesh relative overflow-hidden">
        <div className="container-ze relative z-10 flex min-h-[85vh] flex-col items-center justify-center py-20 text-center text-white">
          <Reveal>
            <Image
              src="/brand/logo.png"
              alt="Zeinethra"
              width={80}
              height={80}
              className="mx-auto mb-6 rounded-2xl"
              priority
            />
            <p className="eyebrow mb-4">
              HEALTHCARE TECHNOLOGY &middot; AI &middot; ENTERPRISE
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl max-w-4xl mx-auto">
              Technology that
              <br />
              <span className="text-cyan">understands</span> healthcare
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
              Platforms built to transform every industry. From AI-powered dental
              solutions to enterprise digital transformation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/healthcare" className="btn-primary">
                Explore Solutions{" "}
                <ArrowRight className="ml-1 inline" size={16} />
              </Link>
              <Link
                href="/products/zenith-dental"
                className="btn-secondary text-white border-white/20 hover:border-cyan"
              >
                See Zenith Dental
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-cyan/10 blur-3xl" />
        <div className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-navy-deep/40 blur-3xl" />
      </section>

      {/* ── INTRO ── */}
      <Section id="intro">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className="eyebrow mb-4">WHO WE ARE</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              A brand of LD Hub Pty Ltd
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Zeinethra is a technology company purpose-built for healthcare and
              enterprise. We combine deep clinical understanding with
              cutting-edge AI to create platforms that genuinely improve
              outcomes&nbsp;&mdash; for patients, practitioners, and businesses.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ── WHAT WE DO ── */}
      <Section className="bg-bg-elevated">
        <Reveal>
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">WHAT WE DO</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
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
                desc: "Applied artificial intelligence\u00a0\u2014 from computer vision to NLP\u00a0\u2014 integrated into real workflows.",
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
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">
                  {item.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── ZENITH DENTAL SPOTLIGHT ── */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">FLAGSHIP PRODUCT</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Zenith Dental
            </h2>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              AI-powered shade matching that eliminates guesswork. Zenith Dental
              uses advanced computer vision to deliver accurate, consistent shade
              results&nbsp;&mdash; reducing remakes and improving patient
              satisfaction.
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
            <div className="card-ze aspect-video flex items-center justify-center bg-gradient-to-br from-navy to-navy-deep text-center">
              <div>
                <Sparkles size={48} className="mx-auto text-cyan" />
                <p className="mt-3 font-display text-lg font-semibold text-white">
                  AI Shade Matching
                </p>
                <p className="mt-1 text-sm text-white/60">
                  98% accuracy &middot; Real-time results
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── WHY ZEINETHRA ── */}
      <Section className="bg-bg-elevated">
        <Reveal>
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">WHY ZEINETHRA</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
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
                desc: "Not bolted-on AI\u00a0\u2014 purpose-built intelligence woven into core workflows.",
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
                <h3 className="mt-3 font-display text-base font-semibold">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── INDUSTRIES ── */}
      <Section>
        <Reveal>
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">INDUSTRIES</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
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
              <div className="card-ze p-5">
                <h3 className="font-display text-sm font-semibold">
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
              View all industries &rarr;
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* ── STATS ── */}
      <Section className="bg-bg-elevated">
        <Reveal>
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">BY THE NUMBERS</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
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

      {/* ── INSIGHTS ── */}
      {articles.length > 0 && (
        <Section>
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="eyebrow mb-3">INSIGHTS</p>
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  Latest thinking
                </h2>
              </div>
              <Link
                href="/insights"
                className="hidden text-sm font-medium text-cyan hover:underline sm:inline"
              >
                View all &rarr;
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
                      <p className="eyebrow text-[10px] mb-2">{a.category}</p>
                    )}
                    <h3 className="font-display text-base font-semibold group-hover:text-cyan transition-colors">
                      {a.title}
                    </h3>
                    {a.summary && (
                      <p className="mt-2 flex-1 text-sm text-muted line-clamp-2">
                        {a.summary}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                      {a.author && <span>{a.author}</span>}
                      {a.readingTimeMinutes > 0 && (
                        <span>&middot; {a.readingTimeMinutes} min read</span>
                      )}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ── PARTNER CTA ── */}
      <CtaBand
        eyebrow="READY TO TRANSFORM?"
        title="Let&rsquo;s build something remarkable"
        subtitle="Whether you&rsquo;re a healthcare provider, enterprise, or technology partner&nbsp;&mdash; we&rsquo;d love to hear from you."
        primaryHref="/contact"
        primaryLabel="Get in Touch"
        secondaryHref="/partners"
        secondaryLabel="Partner With Us"
      />
    </>
  );
}
