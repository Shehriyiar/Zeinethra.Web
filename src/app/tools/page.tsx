"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SolutionRecommender } from "@/components/features/SolutionRecommender";
import { RoiCalculator } from "@/components/features/RoiCalculator";
import { Sparkles, Calculator, Search } from "lucide-react";
import { api, type SearchItem } from "@/lib/api";
import clsx from "clsx";

const tabs = [
  { key: "recommender", label: "Solution Finder", icon: Sparkles },
  { key: "roi", label: "ROI Calculator", icon: Calculator },
  { key: "search", label: "AI Search", icon: Search },
] as const;

type Tab = (typeof tabs)[number]["key"];

function SearchDemo() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await api.search(query);
      setResults(res.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-ze p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
          <Search size={20} />
        </div>
        <h3 className="font-display text-xl font-semibold">AI Search</h3>
      </div>
      <div className="flex gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder="Search across all Zeinethra content\u2026"
          className="flex-1 h-11 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm outline-none focus:ring-2 ring-cyan"
        />
        <button
          onClick={search}
          disabled={loading}
          className="btn-primary h-11 px-5 disabled:opacity-50"
        >
          {loading ? "Searching\u2026" : "Search"}
        </button>
      </div>
      {results.length > 0 && (
        <div className="mt-4 space-y-2">
          {results.map((r) => (
            <div
              key={`${r.type}-${r.slug}`}
              className="rounded-xl border border-[var(--border)] p-4"
            >
              <div className="flex items-center gap-2">
                <span className="eyebrow text-[10px]">{r.type}</span>
                <span className="text-xs text-muted">
                  Score: {(r.score * 100).toFixed(0)}%
                </span>
              </div>
              <h4 className="font-display text-sm font-semibold mt-1">
                {r.title}
              </h4>
              {r.snippet && (
                <p className="text-xs text-muted mt-1">{r.snippet}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("recommender");

  return (
    <>
      <section className="hero-mesh relative overflow-hidden py-20 lg:py-28 text-white">
        <div className="container-ze relative z-10">
          <Reveal>
            <p className="eyebrow mb-4">INTERACTIVE TOOLS</p>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl max-w-3xl">
              Explore, calculate, discover
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70 leading-relaxed">
              Try our AI-powered tools to find the right solution, calculate
              your ROI, or search across our entire platform.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={clsx(
                "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition",
                activeTab === tab.key
                  ? "bg-cyan text-white"
                  : "border border-[var(--border)] text-muted hover:border-cyan hover:text-cyan"
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          {activeTab === "recommender" && <SolutionRecommender />}
          {activeTab === "roi" && <RoiCalculator />}
          {activeTab === "search" && <SearchDemo />}
        </div>
      </Section>
    </>
  );
}
