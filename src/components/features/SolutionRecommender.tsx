"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const questions = [
  {
    key: "industry",
    label: "What industry are you in?",
    options: [
      "Healthcare",
      "Dental",
      "Retail",
      "Finance",
      "Education",
      "Manufacturing",
      "Other",
    ],
  },
  {
    key: "challenge",
    label: "What\u2019s your biggest challenge?",
    options: [
      "Process Automation",
      "Patient Experience",
      "Data & Analytics",
      "Digital Transformation",
      "AI Integration",
      "Custom Software",
    ],
  },
  {
    key: "size",
    label: "Organisation size?",
    options: ["1\u201310", "11\u201350", "51\u2013200", "200+"],
  },
  {
    key: "timeline",
    label: "When do you need it?",
    options: [
      "Immediately",
      "1\u20133 months",
      "3\u20136 months",
      "Exploring options",
    ],
  },
];

type Result = {
  name: string;
  slug: string;
  rationale: string;
  alternatives: string[];
};

export function SolutionRecommender() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  async function answer(value: string) {
    const updated = { ...answers, [questions[step].key]: value };
    setAnswers(updated);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        const res = await api.recommend(updated);
        setResult({
          name: res.recommendedName,
          slug: res.recommendedSlug,
          rationale: res.rationale,
          alternatives: res.alternatives,
        });
      } catch {
        setResult({
          name: "Zenith Dental",
          slug: "zenith-dental",
          rationale:
            "Based on your responses, our flagship product could be a great fit.",
          alternatives: ["Healthcare Technology", "AI Platforms"],
        });
      } finally {
        setLoading(false);
      }
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setResult(null);
  }

  if (loading) {
    return (
      <div className="card-ze p-8 text-center">
        <Sparkles size={32} className="mx-auto text-cyan animate-pulse" />
        <p className="mt-4 text-muted">Analysing your needs\u2026</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="card-ze p-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={20} className="text-cyan" />
          <p className="eyebrow">Our Recommendation</p>
        </div>
        <h3 className="font-display text-2xl font-bold">{result.name}</h3>
        <p className="mt-3 text-muted leading-relaxed">{result.rationale}</p>
        {result.alternatives.length > 0 && (
          <p className="mt-3 text-sm text-muted">
            Also consider: {result.alternatives.join(", ")}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/products/${result.slug}`}
            className="btn-primary gap-2"
          >
            Learn More <ArrowRight size={14} />
          </Link>
          <button onClick={reset} className="btn-secondary gap-2">
            <RotateCcw size={14} /> Start Over
          </button>
        </div>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="card-ze p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={20} className="text-cyan" />
        <p className="eyebrow">Solution Finder</p>
      </div>
      <p className="text-xs text-muted mb-2">
        Question {step + 1} of {questions.length}
      </p>
      <h3 className="font-display text-lg font-semibold mb-4">{q.label}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={() => answer(opt)}
            className={clsx(
              "rounded-xl border border-[var(--border)] p-4 text-left text-sm transition hover:border-cyan hover:-translate-y-0.5",
              answers[q.key] === opt && "border-cyan bg-cyan/5"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-4 text-sm text-muted hover:text-cyan"
        >
          &larr; Back
        </button>
      )}
    </div>
  );
}
