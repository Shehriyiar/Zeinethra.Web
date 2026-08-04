"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import clsx from "clsx";

type Item = { question: string; answer: string };

export function FaqAccordion({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <Reveal key={i} delay={i * 0.05}>
            <div className="card-ze overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="font-display text-sm font-semibold pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  className={clsx(
                    "shrink-0 text-muted transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              <div
                className={clsx(
                  "overflow-hidden transition-all",
                  isOpen ? "max-h-96 pb-5" : "max-h-0"
                )}
              >
                <p className="px-5 text-sm text-muted leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
