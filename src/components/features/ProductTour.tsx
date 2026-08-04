"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { TourStepDto } from "@/lib/api";
import clsx from "clsx";

export function ProductTour({ steps }: { steps: TourStepDto[] }) {
  const [current, setCurrent] = useState(0);

  if (!steps.length) return null;
  const step = steps[current];

  return (
    <Reveal>
      <div className="card-ze overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-navy to-navy-deep flex items-center justify-center">
          {step.imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={step.imageUrl}
              alt={step.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-center text-white/30 font-display text-lg">
              Step {step.stepOrder}
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="eyebrow">
              Step {current + 1} of {steps.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrent((p) => Math.max(0, p - 1))}
                disabled={current === 0}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] disabled:opacity-30 transition hover:border-cyan"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() =>
                  setCurrent((p) => Math.min(steps.length - 1, p + 1))
                }
                disabled={current === steps.length - 1}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] disabled:opacity-30 transition hover:border-cyan"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <h3 className="font-display text-xl font-semibold">{step.title}</h3>
          {step.description && (
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {step.description}
            </p>
          )}

          <div className="mt-4 flex gap-1">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to step ${i + 1}`}
                className={clsx(
                  "h-1.5 rounded-full transition-all",
                  i === current ? "w-6 bg-cyan" : "w-1.5 bg-[var(--border)]"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
