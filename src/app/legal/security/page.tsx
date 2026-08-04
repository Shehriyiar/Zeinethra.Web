import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { Shield, Lock, Eye, Server } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description: "Zeinethra Security — how we protect your data and ensure platform integrity.",
};

const measures = [
  {
    icon: Lock,
    title: "Encryption",
    desc: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We enforce HTTPS across all services.",
  },
  {
    icon: Shield,
    title: "Compliance",
    desc: "Our platforms are designed to meet HIPAA, GDPR, and SOC 2 requirements. Regular compliance audits ensure ongoing adherence.",
  },
  {
    icon: Eye,
    title: "Monitoring",
    desc: "24/7 security monitoring, intrusion detection, and automated alerting across all infrastructure.",
  },
  {
    icon: Server,
    title: "Infrastructure",
    desc: "Hosted on enterprise-grade cloud infrastructure with redundancy, automated backups, and disaster recovery.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="SECURITY"
        title="Your data, protected"
        subtitle="Security is foundational to everything we build. Here's how we protect your information."
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          {measures.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08}>
              <div className="card-ze p-6 h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                  <m.icon size={20} />
                </div>
                <h3 className="mt-3 font-display text-base font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-bg-elevated">
        <Reveal>
          <div className="mx-auto max-w-3xl space-y-6 text-sm text-muted leading-relaxed">
            <h2 className="font-display text-xl font-semibold text-foreground">Responsible Disclosure</h2>
            <p>If you discover a security vulnerability, please report it responsibly to <a href="mailto:security@zeinethra.com" className="text-cyan hover:underline">security@zeinethra.com</a>. We appreciate the security research community and will acknowledge valid reports.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">Certifications</h2>
            <p>Our infrastructure and processes are regularly audited against industry standards. We maintain compliance documentation available upon request for enterprise clients under NDA.</p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
