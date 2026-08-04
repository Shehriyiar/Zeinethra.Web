import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import Link from "next/link";
import {
  Handshake,
  Building2,
  Blocks,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Become a Zeinethra partner. Technology partnerships, reseller programmes, and integration collaborations.",
};

const types = [
  {
    icon: Building2,
    title: "Technology Partners",
    desc: "Integrate your platform with Zeinethra solutions. Access our APIs, co-develop features, and expand your reach.",
  },
  {
    icon: Blocks,
    title: "Integration Partners",
    desc: "Build connectors between your systems and our healthcare/AI platforms. We provide SDKs and technical support.",
  },
  {
    icon: Megaphone,
    title: "Referral Partners",
    desc: "Recommend Zeinethra to your clients and earn competitive commissions on every successful engagement.",
  },
  {
    icon: Handshake,
    title: "Strategic Alliances",
    desc: "Joint go-to-market, co-innovation, and long-term strategic partnerships for transformative projects.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="PARTNER WITH US"
        title="Grow with Zeinethra"
        subtitle="We believe the best solutions are built together. Explore partnership opportunities across technology, integration, and strategic alliances."
      />

      <Section>
        <Reveal>
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">PARTNERSHIP TYPES</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Choose your path
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {types.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08}>
              <div className="card-ze p-8 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                  <t.icon size={24} />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {t.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-bg-elevated">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">WHY PARTNER?</p>
            <h2 className="font-display text-3xl font-bold">
              Benefits of joining our ecosystem
            </h2>
            <ul className="mt-6 space-y-3">
              {[
                "Access to healthcare and enterprise verticals",
                "Co-marketing and joint go-to-market support",
                "Technical enablement and API access",
                "Dedicated partner success manager",
                "Early access to new products and features",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm text-muted"
                >
                  <ArrowRight
                    size={14}
                    className="mt-0.5 shrink-0 text-cyan"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-ze p-8 text-center">
              <Handshake size={48} className="mx-auto text-cyan mb-4" />
              <h3 className="font-display text-xl font-semibold">
                Ready to partner?
              </h3>
              <p className="mt-2 text-sm text-muted">
                Tell us about your organisation and we&apos;ll find the
                right partnership model.
              </p>
              <Link href="/contact" className="btn-primary mt-6 inline-flex">
                Apply Now
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        eyebrow="LET&rsquo;S COLLABORATE"
        title="Build the future together"
        primaryHref="/contact"
        primaryLabel="Become a Partner"
      />
    </>
  );
}
