import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { api } from "@/lib/api";
import { MapPin, Briefcase, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Zeinethra and build technology that transforms healthcare and enterprise. View open positions.",
};

async function getJobs() {
  try {
    return (await api.getJobs()).items;
  } catch {
    return [];
  }
}

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <>
      <PageHero
        eyebrow="CAREERS"
        title="Build what matters"
        subtitle="Join a team that combines clinical empathy with engineering excellence. We're building technology that genuinely improves lives."
      />

      {/* Culture */}
      <Section>
        <Reveal>
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">WHY ZEINETHRA</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              More than a tech company
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Meaningful Impact",
              desc: "Your work directly improves patient outcomes and business operations across healthcare.",
            },
            {
              title: "Cutting-Edge Stack",
              desc: "Work with the latest in AI, cloud, and modern frameworks on genuinely challenging problems.",
            },
            {
              title: "Flexible & Remote",
              desc: "Work from anywhere with flexible hours. We trust our team to deliver.",
            },
            {
              title: "Growth & Learning",
              desc: "Dedicated learning budgets, conference attendance, and mentorship programmes.",
            },
            {
              title: "Diverse & Inclusive",
              desc: "A team that reflects the communities we serve. Diversity drives better solutions.",
            },
            {
              title: "Competitive Package",
              desc: "Market-leading compensation, equity options, and comprehensive benefits.",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <div className="card-ze p-6 h-full">
                <h3 className="font-display text-base font-semibold">
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

      {/* Open Roles */}
      <Section className="bg-bg-elevated">
        <Reveal>
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">OPEN POSITIONS</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Current opportunities
            </h2>
          </div>
        </Reveal>
        {jobs.length > 0 ? (
          <div className="space-y-4 max-w-3xl mx-auto">
            {jobs.map((job, i) => (
              <Reveal key={job.id} delay={i * 0.06}>
                <div className="card-ze p-6">
                  <h3 className="font-display text-lg font-semibold">
                    {job.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted">
                    {job.department && (
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} /> {job.department}
                      </span>
                    )}
                    {job.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {job.location}
                      </span>
                    )}
                    {job.employmentType && (
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {job.employmentType}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-2">
                    {job.description}
                  </p>
                  <a
                    href={`mailto:careers@zeinethra.com?subject=Application: ${job.title}`}
                    className="btn-primary mt-4 inline-flex text-sm h-9 px-4"
                  >
                    Apply Now
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="text-center py-12">
              <p className="text-muted">
                No open positions right now, but we&apos;re always interested in
                exceptional talent.
              </p>
              <a
                href="mailto:careers@zeinethra.com"
                className="btn-primary mt-4 inline-flex"
              >
                Send Your CV
              </a>
            </div>
          </Reveal>
        )}
      </Section>

      <CtaBand
        eyebrow="DON&rsquo;T SEE YOUR ROLE?"
        title="We&rsquo;re always looking for great people"
        subtitle="Send us your CV and we&rsquo;ll keep you in mind for future opportunities."
        primaryHref="mailto:careers@zeinethra.com"
        primaryLabel="Get in Touch"
      />
    </>
  );
}
