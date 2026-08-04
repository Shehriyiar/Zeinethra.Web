import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { StatGrid } from "@/components/ui/StatGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import Link from "next/link";
import {
  Stethoscope,
  Shield,
  Brain,
  Activity,
  Users,
  FileHeart,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Technology",
  description:
    "Clinical workflow systems, patient portals, and health platforms designed with genuine clinical insight.",
};

const capabilities = [
  {
    icon: Stethoscope,
    title: "Clinical Workflow Systems",
    desc: "Streamline clinical operations with intelligent scheduling, triage, and documentation tools built for real healthcare environments.",
  },
  {
    icon: FileHeart,
    title: "Electronic Health Records",
    desc: "Modern EHR integrations that respect existing workflows while unlocking data-driven insights.",
  },
  {
    icon: Users,
    title: "Patient Portals",
    desc: "Secure, intuitive portals that empower patients to manage appointments, records, and communication.",
  },
  {
    icon: Shield,
    title: "Compliance & Security",
    desc: "HIPAA, GDPR, and regional healthcare regulations built into every layer of our solutions.",
  },
  {
    icon: Brain,
    title: "AI Diagnostics",
    desc: "Computer vision and NLP models trained on clinical data to assist practitioners in decision-making.",
  },
  {
    icon: Activity,
    title: "Remote Monitoring",
    desc: "IoT-enabled platforms for RPM, telehealth, and chronic disease management at scale.",
  },
];

export default function HealthcarePage() {
  return (
    <>
      <PageHero
        eyebrow="HEALTHCARE TECHNOLOGY"
        title="Technology that speaks the language of care"
        subtitle="We build clinical workflow systems, patient portals, and health platforms designed with genuine clinical insight."
      >
        <Link href="/contact" className="btn-primary">
          Talk to Our Team{" "}
          <ArrowRight className="ml-1 inline" size={16} />
        </Link>
      </PageHero>

      <Section>
        <Reveal>
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">CAPABILITIES</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              End-to-end healthcare technology
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="card-ze p-6 h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                  <c.icon size={20} />
                </div>
                <h3 className="mt-3 font-display text-base font-semibold">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-bg-elevated">
        <Reveal>
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">IMPACT</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Healthcare outcomes that matter
            </h2>
          </div>
        </Reveal>
        <StatGrid
          stats={[
            { value: "40%", label: "Reduction in admin time" },
            { value: "98%", label: "Patient satisfaction" },
            { value: "3x", label: "Faster documentation" },
            { value: "100%", label: "Compliance adherence" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">FEATURED</p>
            <h2 className="font-display text-3xl font-bold">Zenith Dental</h2>
            <p className="mt-4 text-muted leading-relaxed">
              Our flagship product demonstrates what happens when deep clinical
              knowledge meets advanced AI. Zenith Dental uses computer vision to
              deliver precise shade matching, eliminating guesswork and reducing
              costly remakes.
            </p>
            <Link
              href="/products/zenith-dental"
              className="btn-primary mt-6 inline-flex"
            >
              Learn About Zenith Dental
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-ze aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-navy to-navy-deep">
              <div className="text-center text-white/40">
                <Stethoscope size={48} className="mx-auto mb-2 text-cyan" />
                <p className="font-display font-semibold text-white">
                  AI-Powered Healthcare
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        eyebrow="HEALTHCARE"
        title="Ready to modernise your clinical workflows?"
        subtitle="Our team combines healthcare expertise with engineering excellence."
        primaryHref="/contact"
        primaryLabel="Get in Touch"
        secondaryHref="/case-studies"
        secondaryLabel="See Case Studies"
      />
    </>
  );
}
