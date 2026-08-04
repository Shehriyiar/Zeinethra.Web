import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { api } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real-world results from Zeinethra's healthcare technology, AI, and IT solutions across industries.",
};

async function getCaseStudies() {
  try {
    return (await api.getCaseStudies()).items;
  } catch {
    return [];
  }
}

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();

  return (
    <>
      <PageHero
        eyebrow="CASE STUDIES"
        title="Real-world results"
        subtitle="See how organisations across healthcare and enterprise have transformed their operations with Zeinethra."
      />

      <Section>
        {studies.length > 0 ? (
          <div className="grid gap-8">
            {studies.map((cs, i) => (
              <Reveal key={cs.id} delay={i * 0.08}>
                <div className="card-ze overflow-hidden">
                  <div className="grid lg:grid-cols-[1fr_2fr]">
                    <div className="bg-gradient-to-br from-navy to-navy-deep p-8 text-white flex flex-col justify-center">
                      <p className="eyebrow text-[10px] mb-2">
                        {cs.industry}
                      </p>
                      <h2 className="font-display text-xl font-bold">
                        {cs.title}
                      </h2>
                    </div>
                    <div className="p-8 space-y-4">
                      <div>
                        <h3 className="font-display text-sm font-semibold text-cyan mb-1">
                          Challenge
                        </h3>
                        <p className="text-sm text-muted leading-relaxed">
                          {cs.challenge}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-semibold text-cyan mb-1">
                          Approach
                        </h3>
                        <p className="text-sm text-muted leading-relaxed">
                          {cs.approach}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-semibold text-cyan mb-1">
                          Outcome
                        </h3>
                        <p className="text-sm text-muted leading-relaxed">
                          {cs.outcome}
                        </p>
                      </div>
                      {cs.results && (
                        <div>
                          <h3 className="font-display text-sm font-semibold text-cyan mb-1">
                            Results
                          </h3>
                          <p className="text-sm text-muted leading-relaxed">
                            {cs.results}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="text-center py-16">
              <p className="text-muted">
                Case studies coming soon. In the meantime, get in touch to
                learn about our work.
              </p>
            </div>
          </Reveal>
        )}
      </Section>

      <CtaBand
        eyebrow="YOUR STORY"
        title="Ready to create your own success story?"
        primaryHref="/contact"
        primaryLabel="Get in Touch"
      />
    </>
  );
}
