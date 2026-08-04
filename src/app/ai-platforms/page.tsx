import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { StatGrid } from "@/components/ui/StatGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import Link from "next/link";
import {
  Brain,
  Eye,
  MessageSquare,
  BarChart3,
  Layers,
  Cpu,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & Digital Platforms",
  description:
    "Applied artificial intelligence integrated into real workflows — computer vision, NLP, predictive analytics, and more.",
};

const capabilities = [
  {
    icon: Eye,
    title: "Computer Vision",
    desc: "Image classification, object detection, and visual analysis models trained on domain-specific datasets.",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Processing",
    desc: "Text extraction, sentiment analysis, and conversational AI for clinical and enterprise documents.",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    desc: "Forecasting models for patient outcomes, operational demand, and business intelligence.",
  },
  {
    icon: Layers,
    title: "Platform Engineering",
    desc: "Scalable ML pipelines, model serving infrastructure, and real-time inference APIs.",
  },
  {
    icon: Cpu,
    title: "Edge AI",
    desc: "On-device models for low-latency applications in clinical environments and field deployments.",
  },
  {
    icon: Brain,
    title: "Generative AI",
    desc: "LLM integration, RAG architectures, and AI assistants tailored to your domain and data.",
  },
];

export default function AiPlatformsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI &amp; DIGITAL PLATFORMS"
        title="Intelligence woven into every workflow"
        subtitle="Not bolted-on AI. Purpose-built artificial intelligence that solves real problems across healthcare and enterprise."
      >
        <Link href="/contact" className="btn-primary">
          Discuss Your AI Project{" "}
          <ArrowRight className="ml-1 inline" size={16} />
        </Link>
      </PageHero>

      <Section>
        <Reveal>
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">CAPABILITIES</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Full-spectrum AI capability
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
            <p className="eyebrow mb-3">RESULTS</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              AI that delivers measurable value
            </h2>
          </div>
        </Reveal>
        <StatGrid
          stats={[
            { value: "98%", label: "Model accuracy (Zenith)" },
            { value: "10x", label: "Faster processing" },
            { value: "60%", label: "Cost reduction" },
            { value: "<100ms", label: "Inference latency" },
          ]}
        />
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">APPROACH</p>
            <h2 className="font-display text-3xl font-bold">
              From concept to production
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              We take AI projects from ideation through to production deployment
              with a structured approach: Discovery, Data Strategy, Model
              Development, Integration, and Continuous Improvement. Every model
              is built to serve your specific domain.
            </p>
            <Link href="/contact" className="btn-primary mt-6 inline-flex">
              Start a Conversation
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-4">
              {["Discovery & Scoping", "Data Strategy", "Model Development", "Integration & Testing", "Deployment & Monitoring"].map(
                (s, i) => (
                  <div
                    key={s}
                    className="card-ze flex items-center gap-4 p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan text-white text-sm font-bold">
                      {i + 1}
                    </div>
                    <span className="font-display text-sm font-semibold">
                      {s}
                    </span>
                  </div>
                )
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        eyebrow="AI THAT WORKS"
        title="Ready to integrate AI into your operations?"
        subtitle="From computer vision to generative AI, we build models that deliver."
        primaryHref="/contact"
        primaryLabel="Get in Touch"
        secondaryHref="/products"
        secondaryLabel="See Products"
      />
    </>
  );
}
