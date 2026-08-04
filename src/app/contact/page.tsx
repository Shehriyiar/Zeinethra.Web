import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryForm } from "@/components/features/EnquiryForm";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Zeinethra. Enquire about our healthcare technology, AI platforms, and IT services.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Let&rsquo;s start a conversation"
        subtitle="Whether you have a project in mind, a question about our products, or want to explore partnership opportunities."
      />

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold">
                  Get in touch
                </h2>
                <p className="mt-2 text-muted leading-relaxed">
                  Fill in the form and our team will get back to you within
                  24&nbsp;hours. Or reach out directly using the details below.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Email</p>
                    <a
                      href="mailto:hello@zeinethra.com"
                      className="text-sm text-muted hover:text-cyan transition"
                    >
                      hello@zeinethra.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Phone</p>
                    <p className="text-sm text-muted">
                      +61 (0) 400 000 000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Office</p>
                    <p className="text-sm text-muted">
                      Sydney, Australia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <EnquiryForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
