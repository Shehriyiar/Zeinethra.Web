import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { StatGrid } from "@/components/ui/StatGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { api } from "@/lib/api";
import { Heart, Target, Users, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Zeinethra",
  description:
    "A brand of LD Hub Pty Ltd. Technology that understands healthcare — platforms built to transform every industry.",
};

async function getTeam() {
  try {
    return (await api.getTeam()).items;
  } catch {
    return [];
  }
}

const values = [
  {
    icon: Heart,
    title: "Clinical Empathy",
    desc: "We design technology for the people who use it — clinicians, patients, and businesses.",
  },
  {
    icon: Target,
    title: "Outcome-Driven",
    desc: "Every feature, every line of code is measured by the real-world outcomes it delivers.",
  },
  {
    icon: Users,
    title: "Collaborative",
    desc: "We work alongside our clients, not above them. Partnership defines our process.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    desc: "Built in Australia, designed for the world. Compliance, language, and culture considered everywhere.",
  },
];

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      <PageHero
        eyebrow="ABOUT ZEINETHRA"
        title="Technology that understands healthcare"
        subtitle="A brand of LD Hub Pty Ltd. We combine deep clinical understanding with cutting-edge engineering to build platforms that genuinely improve outcomes."
      />

      {/* Mission */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">OUR MISSION</p>
            <h2 className="font-display text-3xl font-bold">
              Bridge the gap between healthcare and technology
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Too much healthcare technology is built by people who
              don&apos;t understand healthcare. We exist to change that.
              Our team combines clinical knowledge, AI expertise, and
              enterprise engineering to create solutions that work in the
              real world.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-ze aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-navy to-navy-deep">
              <div className="text-center text-white">
                <div className="font-display text-5xl font-bold text-cyan">Z</div>
                <p className="mt-2 font-display text-sm tracking-widest">
                  ZEINETHRA
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-bg-elevated">
        <Reveal>
          <div className="text-center mb-12">
            <p className="eyebrow mb-3">OUR VALUES</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              What drives us
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="card-ze p-6 h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                  <v.icon size={20} />
                </div>
                <h3 className="mt-3 font-display text-base font-semibold">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section>
        <StatGrid
          stats={[
            { value: "2020", label: "Founded" },
            { value: "50+", label: "Clients worldwide" },
            { value: "12", label: "Industries served" },
            { value: "99.9%", label: "Platform uptime" },
          ]}
        />
      </Section>

      {/* Team */}
      {team.length > 0 && (
        <Section className="bg-bg-elevated">
          <Reveal>
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">LEADERSHIP</p>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                The team behind Zeinethra
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team
              .filter((t) => t.isLeadership)
              .map((t, i) => (
                <Reveal key={t.id} delay={i * 0.08}>
                  <div className="card-ze p-6 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-deep">
                      <span className="font-display text-2xl font-bold text-white">
                        {t.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-semibold">
                      {t.fullName}
                    </h3>
                    {t.title && (
                      <p className="mt-1 text-sm text-cyan">{t.title}</p>
                    )}
                    {t.bio && (
                      <p className="mt-2 text-sm text-muted line-clamp-3">
                        {t.bio}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
          </div>
        </Section>
      )}

      <CtaBand
        eyebrow="JOIN US"
        title="Let&rsquo;s build the future of healthcare technology"
        primaryHref="/contact"
        primaryLabel="Get in Touch"
        secondaryHref="/careers"
        secondaryLabel="View Careers"
      />
    </>
  );
}
