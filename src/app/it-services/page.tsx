import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { StatGrid } from "@/components/ui/StatGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import Link from "next/link";
import {
  Cloud,
  Code2,
  Layers,
  RefreshCcw,
  Lock,
  Headphones,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Services",
  description:
    "Enterprise consulting, cloud architecture, and bespoke software development for digital transformation.",
};

const services = [
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    desc: "Azure, AWS, and multi-cloud architecture designed for performance, compliance, and cost efficiency.",
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    desc: "Full-stack engineering using modern frameworks, from MVPs to enterprise-grade platforms.",
  },
  {
    icon: Layers,
    title: "System Integration",
    desc: "Connect ERP, CRM, EHR, and third-party systems with secure, well-documented APIs.",
  },
  {
    icon: RefreshCcw,
    title: "Digital Transformation",
    desc: "Strategy and execution for organisations moving from legacy systems to modern architectures.",
  },
  {
    icon: Lock,
    title: "Cybersecurity",
    desc: "Penetration testing, compliance audits, and zero-trust architecture implementation.",
  },
  {
    icon: Headphones,
    title: "Managed Services",
    desc: "24/7 monitoring, incident response, and proactive maintenance for critical systems.",
  },
];

export default function ITServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="IT SERVICES"
        title="Engineering excellence, delivered"
        subtitle="Enterprise consulting, cloud architecture, and bespoke software development for organisations that demand reliability."
      >
        <Link href="/contact" className="btn-primary">
          Start a Project{" "}
          <ArrowRight className="ml-1 inline" size={16} />
        </Link>
      </PageHero>

      <Section>
        <Reveal>
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">SERVICES</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Full-spectrum IT capability
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="card-ze p-6 h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                  <s.icon size={20} />
                </div>
                <h3 className="mt-3 font-display text-base font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-bg-elevated">
        <Reveal>
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">TRACK RECORD</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Proven delivery at scale
            </h2>
          </div>
        </Reveal>
        <StatGrid
          stats={[
            { value: "99.9%", label: "Uptime SLA" },
            { value: "200+", label: "Projects delivered" },
            { value: "50+", label: "Enterprise clients" },
            { value: "24/7", label: "Support coverage" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">METHODOLOGY</p>
            <h2 className="font-display text-3xl font-bold">
              How we deliver
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              We follow an agile-first methodology with fixed-scope sprints,
              transparent reporting, and continuous delivery. Every project
              includes architecture review, security assessment, and
              comprehensive documentation.
            </p>
            <Link href="/contact" className="btn-primary mt-6 inline-flex">
              Discuss Your Project
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-4">
              {["Discovery & Architecture", "Sprint Planning", "Build & Integrate", "QA & Security Audit", "Deploy & Optimise"].map(
                (label, i) => (
                  <div key={label} className="card-ze flex items-center gap-4 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan text-white text-sm font-bold">
                      {i + 1}
                    </div>
                    <span className="font-display text-sm font-semibold">
                      {label}
                    </span>
                  </div>
                )
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        eyebrow="LET&rsquo;S BUILD"
        title="Ready to modernise your technology?"
        subtitle="From cloud migration to custom development, our engineering team is ready."
        primaryHref="/contact"
        primaryLabel="Get in Touch"
        secondaryHref="/case-studies"
        secondaryLabel="See Case Studies"
      />
    </>
  );
}
