import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { api } from "@/lib/api";
import type { Metadata } from "next";
import { FaqAccordion } from "./FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Zeinethra's healthcare technology, AI platforms, and IT services.",
};

async function getFaqs() {
  try {
    return (await api.getFaqs()).items;
  } catch {
    return [];
  }
}

const fallbackFaqs = [
  {
    id: "1",
    category: "General",
    question: "What is Zeinethra?",
    answer:
      "Zeinethra is a technology company and brand of LD Hub Pty Ltd, specialising in healthcare technology, AI platforms, and enterprise IT services.",
  },
  {
    id: "2",
    category: "General",
    question: "What is Zenith Dental?",
    answer:
      "Zenith Dental is our flagship product — an AI-powered shade matching solution for dental professionals that uses computer vision to deliver 98% accurate results.",
  },
  {
    id: "3",
    category: "Technical",
    question: "Is Zeinethra HIPAA compliant?",
    answer:
      "Yes. All our healthcare solutions are designed with HIPAA, GDPR, and relevant regional healthcare regulations built into every layer.",
  },
  {
    id: "4",
    category: "Services",
    question: "Do you offer custom development?",
    answer:
      "Absolutely. Our IT Services division builds bespoke software solutions, from MVPs to enterprise-grade platforms, using modern frameworks and cloud architecture.",
  },
  {
    id: "5",
    category: "Partnership",
    question: "How can I partner with Zeinethra?",
    answer:
      "We offer technology partnerships, integration partnerships, referral programmes, and strategic alliances. Visit our Partners page or contact us to learn more.",
  },
];

export default async function FaqPage() {
  const faqs = await getFaqs();
  const list = faqs.length > 0 ? faqs : fallbackFaqs;

  const categories = [...new Set(list.map((f) => f.category))];

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        subtitle="Find answers to common questions about our technology, products, and services."
      />

      <Section>
        {categories.map((cat, ci) => (
          <div key={cat} className={ci > 0 ? "mt-12" : ""}>
            <Reveal>
              <h2 className="eyebrow mb-6">{cat}</h2>
            </Reveal>
            <FaqAccordion
              items={list
                .filter((f) => f.category === cat)
                .map((f) => ({ question: f.question, answer: f.answer }))}
            />
          </div>
        ))}
      </Section>

      <CtaBand
        eyebrow="STILL HAVE QUESTIONS?"
        title="We&rsquo;re here to help"
        primaryHref="/contact"
        primaryLabel="Contact Us"
      />
    </>
  );
}
