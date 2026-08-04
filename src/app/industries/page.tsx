import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { api } from "@/lib/api";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Zeinethra delivers technology solutions across healthcare, dental, finance, retail, education, manufacturing, and more.",
};

async function getIndustries() {
  try {
    return (await api.getIndustries()).items;
  } catch {
    return [];
  }
}

const fallback = [
  { name: "Healthcare", description: "Clinical systems, patient portals, and telehealth platforms for hospitals and clinics." },
  { name: "Dental", description: "AI shade matching, practice management, and lab workflow automation." },
  { name: "Pharmaceuticals", description: "Supply-chain visibility, regulatory compliance, and clinical-trial analytics." },
  { name: "Education", description: "Learning management systems, EdTech platforms, and student engagement tools." },
  { name: "Finance", description: "Digital banking, FinTech solutions, and regulatory reporting automation." },
  { name: "Retail", description: "E-commerce platforms, inventory optimisation, and customer analytics." },
  { name: "Manufacturing", description: "IoT integration, predictive maintenance, and production analytics." },
  { name: "Government", description: "Citizen portals, public-health reporting, and digital service delivery." },
];

export default async function IndustriesPage() {
  const industries = await getIndustries();
  const list =
    industries.length > 0
      ? industries.map((i) => ({ name: i.name, description: i.description || "" }))
      : fallback;

  return (
    <>
      <PageHero
        eyebrow="INDUSTRIES"
        title="Solutions across sectors"
        subtitle="Our technology is purpose-built for healthcare and proven across every industry. Here's where we deliver impact."
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.06}>
              <div className="card-ze p-6 h-full">
                <h3 className="font-display text-lg font-semibold">
                  {ind.name}
                </h3>
                {ind.description && (
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {ind.description}
                  </p>
                )}
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan hover:gap-2 transition-all"
                >
                  Enquire <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow="YOUR INDUSTRY"
        title="Don&rsquo;t see your sector?"
        subtitle="We build custom solutions for any industry. Let&rsquo;s talk about your specific needs."
        primaryHref="/contact"
        primaryLabel="Get in Touch"
      />
    </>
  );
}
