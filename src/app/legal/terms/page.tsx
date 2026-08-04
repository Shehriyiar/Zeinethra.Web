import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Zeinethra Terms of Service — the terms governing use of our website and services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Terms of Service"
        subtitle="Last updated: August 2026"
      />
      <Section>
        <Reveal>
          <div className="mx-auto max-w-3xl space-y-6 text-sm text-muted leading-relaxed">
            <h2 className="font-display text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>By accessing or using Zeinethra&apos;s website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">2. Services</h2>
            <p>Zeinethra provides healthcare technology, AI platforms, and IT services. Specific terms for individual products and services are outlined in separate agreements.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">3. Intellectual Property</h2>
            <p>All content, software, and technology on this website is owned by LD Hub Pty Ltd and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without written permission.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">4. User Responsibilities</h2>
            <p>You agree to use our services in compliance with applicable laws, not to misuse or attempt to gain unauthorised access to our systems, and to provide accurate information in all forms and communications.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">5. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Zeinethra and LD Hub Pty Ltd shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">6. Governing Law</h2>
            <p>These terms are governed by the laws of New South Wales, Australia. Any disputes shall be resolved in the courts of New South Wales.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">7. Contact</h2>
            <p>For questions about these terms, contact <a href="mailto:legal@zeinethra.com" className="text-cyan hover:underline">legal@zeinethra.com</a>.</p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
