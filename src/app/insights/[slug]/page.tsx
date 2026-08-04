import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { api } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await api.getArticle(slug);
    return { title: article.title, description: article.summary || undefined };
  } catch {
    return { title: "Article" };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  let article;
  try {
    article = await api.getArticle(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <section className="hero-mesh relative overflow-hidden py-20 lg:py-28 text-white">
        <div className="container-ze relative z-10 max-w-3xl">
          <Reveal>
            <Link
              href="/insights"
              className="mb-6 inline-flex items-center gap-1 text-sm text-white/60 hover:text-cyan transition"
            >
              <ArrowLeft size={14} /> Back to Insights
            </Link>
            {article.category && (
              <p className="eyebrow mb-3">{article.category}</p>
            )}
            <h1 className="font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/60">
              {article.author && (
                <span className="flex items-center gap-1">
                  <User size={14} /> {article.author}
                </span>
              )}
              {article.readingTimeMinutes > 0 && (
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {article.readingTimeMinutes} min read
                </span>
              )}
              {article.publishedAt && (
                <span>
                  {new Date(article.publishedAt).toLocaleDateString("en-AU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            {article.summary && (
              <p className="text-lg text-muted leading-relaxed mb-8 border-l-4 border-cyan pl-4">
                {article.summary}
              </p>
            )}
            {article.tags && (
              <div className="flex flex-wrap gap-2 mt-8">
                {article.tags.split(",").map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </Section>

      <CtaBand
        eyebrow="STAY INFORMED"
        title="Want more insights like this?"
        primaryHref="/contact"
        primaryLabel="Subscribe to Updates"
        secondaryHref="/insights"
        secondaryLabel="Browse All Articles"
      />
    </>
  );
}
