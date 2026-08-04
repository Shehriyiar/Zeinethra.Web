import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Zeinethra Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        subtitle="Last updated: August 2026"
      />
      <Section>
        <Reveal>
          <div className="prose-ze mx-auto max-w-3xl space-y-6 text-sm text-muted leading-relaxed">
            <h2 className="font-display text-xl font-semibold text-foreground">1. Introduction</h2>
            <p>Zeinethra, a brand of LD Hub Pty Ltd (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), is committed to protecting your privacy. This policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website or use our services.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">2. Information We Collect</h2>
            <p>We may collect personal information including your name, email address, phone number, company name, and any other information you provide through our forms. We also collect usage data such as IP address, browser type, pages visited, and cookies.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p>We use your information to provide and improve our services, respond to enquiries, send newsletters (with your consent), analyse website usage, and comply with legal obligations.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">4. Data Sharing</h2>
            <p>We do not sell your personal information. We may share data with trusted service providers who assist in operating our website and services, subject to confidentiality agreements.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">5. Data Security</h2>
            <p>We implement industry-standard security measures including encryption, access controls, and regular security audits to protect your information.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. Contact us at privacy@zeinethra.com for any requests.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">7. Cookies</h2>
            <p>Our website uses cookies to enhance your experience. You can manage cookie preferences through our cookie consent banner or your browser settings.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">8. Contact</h2>
            <p>For privacy-related enquiries, contact us at <a href="mailto:privacy@zeinethra.com" className="text-cyan hover:underline">privacy@zeinethra.com</a>.</p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
