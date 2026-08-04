import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Zeinethra Accessibility Statement — our commitment to digital accessibility.",
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="ACCESSIBILITY"
        title="Accessible by design"
        subtitle="We are committed to ensuring our website and products are accessible to everyone."
      />
      <Section>
        <Reveal>
          <div className="mx-auto max-w-3xl space-y-6 text-sm text-muted leading-relaxed">
            <h2 className="font-display text-xl font-semibold text-foreground">Our Commitment</h2>
            <p>Zeinethra is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">Standards</h2>
            <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible to people with a wide range of disabilities.</p>

            <h2 className="font-display text-xl font-semibold text-foreground">What We Do</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Semantic HTML for proper document structure</li>
              <li>Sufficient colour contrast ratios throughout</li>
              <li>Keyboard navigation support across all interactive elements</li>
              <li>ARIA labels and roles where appropriate</li>
              <li>Alt text for all meaningful images</li>
              <li>Responsive design that works across devices and screen sizes</li>
              <li>Regular accessibility audits and testing</li>
            </ul>

            <h2 className="font-display text-xl font-semibold text-foreground">Feedback</h2>
            <p>We welcome your feedback on the accessibility of Zeinethra. Please let us know if you encounter accessibility barriers by contacting <a href="mailto:accessibility@zeinethra.com" className="text-cyan hover:underline">accessibility@zeinethra.com</a>.</p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
