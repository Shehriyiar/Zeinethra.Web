import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { api } from "@/lib/api";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Articles, research, and thought leadership from the Zeinethra team on healthcare technology, AI, and digital transformation.",
};

async function getArticles() {
  try {
    return (await api.getArticles()).items;
  } catch {
    return [];
  }
}

export default async function InsightsPage() {
  const articles = await getArticles();

  return (
    <>
      <PageHero
        eyebrow="INSIGHTS"
        title="Latest thinking"
        subtitle="Articles, research, and perspectives from our team on healthcare technology, AI, and digital transformation."
      />

      <Section>
        {articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.08}>
                <Link
                  href={`/insights/${a.slug}`}
                  className="card-ze group flex flex-col overflow-hidden transition hover:-translate-y-1"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-navy to-navy-deep" />
                  <div className="flex flex-1 flex-col p-5">
                    {a.category && (
                      <p className="eyebrow text-[10px] mb-2">{a.category}</p>
                    )}
                    <h2 className="font-display text-base font-semibold group-hover:text-cyan transition-colors">
                      {a.title}
                    </h2>
                    {a.summary && (
                      <p className="mt-2 flex-1 text-sm text-muted line-clamp-3">
                        {a.summary}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                      {a.author && <span>{a.author}</span>}
                      {a.readingTimeMinutes > 0 && (
                        <span>
                          &middot; {a.readingTimeMinutes} min read
                        </span>
                      )}
                      {a.publishedAt && (
                        <span>
                          &middot;{" "}
                          {new Date(a.publishedAt).toLocaleDateString("en-AU", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="text-center py-16">
              <p className="text-muted">
                No articles published yet. Check back soon.
              </p>
            </div>
          </Reveal>
        )}
      </Section>
    </>
  );
}
