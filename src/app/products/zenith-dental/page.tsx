import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StatGrid } from "@/components/ui/StatGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { ProductTour } from "@/components/features/ProductTour";
import { BeforeAfterSlider } from "@/components/features/BeforeAfterSlider";
import { RoiCalculator } from "@/components/features/RoiCalculator";
import { BookingForm } from "@/components/features/BookingForm";
import { api } from "@/lib/api";
import {
  Sparkles,
  Eye,
  Palette,
  Zap,
  Shield,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zenith Dental",
  description:
    "AI-powered shade matching for dental professionals. Eliminate guesswork, reduce remakes, and improve patient satisfaction.",
};

async function getTour() {
  try {
    return await api.getTour("zenith-dental");
  } catch {
    return [];
  }
}

const features = [
  {
    icon: Eye,
    title: "Computer Vision",
    desc: "Advanced AI analyses tooth images under any lighting condition for consistent results.",
  },
  {
    icon: Palette,
    title: "Precision Shade Matching",
    desc: "Matches to all major shade guide systems with sub-shade accuracy.",
  },
  {
    icon: Zap,
    title: "Real-Time Results",
    desc: "Get accurate shade recommendations in under 2 seconds.",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    desc: "Patient data is encrypted, anonymised, and never shared.",
  },
  {
    icon: Smartphone,
    title: "Works on Any Device",
    desc: "Use your existing smartphone or tablet camera — no extra hardware needed.",
  },
  {
    icon: Sparkles,
    title: "Learning AI",
    desc: "The model improves with every case, adapting to your practice patterns.",
  },
];

export default async function ZenithDentalPage() {
  const tour = await getTour();

  return (
    <>
      {/* Custom hero */}
      <section className="hero-mesh relative overflow-hidden py-24 lg:py-32 text-white">
        <div className="container-ze relative z-10">
          <Reveal>
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan/15 px-4 py-1.5 text-sm font-medium text-cyan">
                <Sparkles size={14} /> Flagship Product
              </div>
              <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Zenith Dental
              </h1>
              <p className="mt-4 text-xl text-white/70 leading-relaxed">
                AI-powered shade matching that eliminates guesswork. Accurate,
                consistent, and effortless.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#booking" className="btn-primary">
                  Book a Demo{" "}
                  <ArrowRight className="ml-1 inline" size={16} />
                </a>
                <a
                  href="#roi"
                  className="btn-secondary text-white border-white/20 hover:border-cyan"
                >
                  Calculate ROI
                </a>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-cyan/10 blur-3xl" />
      </section>

      {/* Features */}
      <Section>
        <Reveal>
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">FEATURES</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Why dental professionals choose Zenith
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="card-ze p-6 h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                  <f.icon size={20} />
                </div>
                <h3 className="mt-3 font-display text-base font-semibold">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Product Tour */}
      {tour.length > 0 && (
        <Section className="bg-bg-elevated">
          <Reveal>
            <div className="text-center mb-10">
              <p className="eyebrow mb-3">PRODUCT TOUR</p>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                See it in action
              </h2>
            </div>
          </Reveal>
          <div className="max-w-2xl mx-auto">
            <ProductTour steps={tour} />
          </div>
        </Section>
      )}

      {/* Before / After */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">BEFORE &amp; AFTER</p>
            <h2 className="font-display text-3xl font-bold">
              The difference AI makes
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Compare manual shade selection with AI-powered matching. Zenith
              Dental reduces shade discrepancies by up to 80%, leading to fewer
              remakes and happier patients.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfterSlider
              beforeLabel="Manual"
              afterLabel="AI-Matched"
            />
          </Reveal>
        </div>
      </Section>

      {/* Stats */}
      <Section className="bg-bg-elevated">
        <Reveal>
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">RESULTS</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Proven clinical outcomes
            </h2>
          </div>
        </Reveal>
        <StatGrid
          stats={[
            { value: "98%", label: "Shade accuracy" },
            { value: "80%", label: "Fewer remakes" },
            { value: "<2s", label: "Processing time" },
            { value: "3mo", label: "Avg. payback period" },
          ]}
        />
      </Section>

      {/* ROI Calculator */}
      <Section id="roi">
        <Reveal>
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">RETURN ON INVESTMENT</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Calculate your savings
            </h2>
          </div>
        </Reveal>
        <div className="max-w-3xl mx-auto">
          <RoiCalculator calculatorType="dental" />
        </div>
      </Section>

      {/* Booking */}
      <Section className="bg-bg-elevated" id="booking">
        <Reveal>
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">GET STARTED</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Book a personalised demo
            </h2>
            <p className="mt-3 text-muted max-w-lg mx-auto">
              See Zenith Dental in action with your own cases. Our team will
              walk you through every feature.
            </p>
          </div>
        </Reveal>
        <div className="max-w-xl mx-auto">
          <BookingForm product="Zenith Dental" />
        </div>
      </Section>

      <CtaBand
        eyebrow="READY?"
        title="Transform your shade matching today"
        primaryHref="/contact"
        primaryLabel="Contact Sales"
        secondaryHref="/products"
        secondaryLabel="View All Products"
      />
    </>
  );
}
