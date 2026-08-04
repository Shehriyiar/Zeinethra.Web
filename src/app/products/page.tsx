import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { api } from "@/lib/api";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Purpose-built software products for healthcare and enterprise, including our flagship Zenith Dental.",
};

async function getProducts() {
  try {
    return (await api.getProducts()).items;
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  const fallback = [
    {
      name: "Zenith Dental",
      slug: "zenith-dental",
      tagline: "AI-powered shade matching for dental professionals",
      isFlagship: true,
    },
  ];

  const list = products.length > 0 ? products : fallback;

  return (
    <>
      <PageHero
        eyebrow="PRODUCTS"
        title="Software built to perform"
        subtitle="Purpose-built platforms for healthcare and enterprise. Each product is designed to solve specific, high-impact problems."
      />

      <Section>
        <div className="grid gap-8">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <Link
                href={`/products/${p.slug}`}
                className="card-ze group grid items-center gap-8 p-8 transition hover:-translate-y-1 lg:grid-cols-[1fr_1.5fr]"
              >
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-navy to-navy-deep flex items-center justify-center">
                  <span className="font-display text-lg text-white/40">
                    {p.name}
                  </span>
                </div>
                <div>
                  {p.isFlagship && (
                    <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">
                      <Star size={12} /> Flagship
                    </div>
                  )}
                  <h2 className="font-display text-2xl font-bold group-hover:text-cyan transition-colors">
                    {p.name}
                  </h2>
                  {p.tagline && (
                    <p className="mt-2 text-muted leading-relaxed">
                      {p.tagline}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow="INTERESTED?"
        title="See our products in action"
        subtitle="Book a personalised demo with our team."
        primaryHref="/contact"
        primaryLabel="Book a Demo"
      />
    </>
  );
}
