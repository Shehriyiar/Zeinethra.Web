"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Calculator, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function RoiCalculator({
  calculatorType = "dental",
}: {
  calculatorType?: string;
}) {
  const [params, setParams] = useState<Record<string, number>>({
    patientsPerDay: 20,
    avgCaseValue: 500,
    currentErrorRate: 15,
  });
  const [results, setResults] = useState<Record<string, number | string> | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  function set(key: string, value: number) {
    setParams((p) => ({ ...p, [key]: value }));
  }

  async function calculate() {
    setLoading(true);
    try {
      const res = await api.roi({ calculatorType, parameters: params });
      setResults(res.results);
    } catch {
      setResults({
        estimatedAnnualSavings: Math.round(
          params.patientsPerDay *
            params.avgCaseValue *
            (params.currentErrorRate / 100) *
            260 *
            0.8
        ),
        remakeReduction: "80%",
        paybackMonths: 3,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Reveal>
      <div className="card-ze p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
            <Calculator size={20} />
          </div>
          <h3 className="font-display text-xl font-semibold">ROI Calculator</h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <label className="space-y-2">
            <span className="text-sm text-muted">Patients / Day</span>
            <input
              type="number"
              value={params.patientsPerDay}
              onChange={(e) => set("patientsPerDay", +e.target.value)}
              className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm outline-none focus:ring-2 ring-cyan"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-muted">Avg Case Value ($)</span>
            <input
              type="number"
              value={params.avgCaseValue}
              onChange={(e) => set("avgCaseValue", +e.target.value)}
              className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm outline-none focus:ring-2 ring-cyan"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm text-muted">Current Error Rate (%)</span>
            <input
              type="number"
              value={params.currentErrorRate}
              onChange={(e) => set("currentErrorRate", +e.target.value)}
              className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm outline-none focus:ring-2 ring-cyan"
            />
          </label>
        </div>

        <button
          onClick={calculate}
          disabled={loading}
          className="btn-primary mt-6 disabled:opacity-50"
        >
          {loading ? "Calculating\u2026" : "Calculate ROI"}
        </button>

        {results && (
          <div className="mt-6 grid gap-4 rounded-xl bg-cyan/5 p-6 sm:grid-cols-3">
            {Object.entries(results).map(([k, v]) => (
              <div key={k} className="text-center">
                <TrendingUp size={16} className="mx-auto text-cyan" />
                <div className="font-display text-2xl font-bold mt-1">
                  {typeof v === "number" && k.toLowerCase().includes("saving")
                    ? `$${v.toLocaleString()}`
                    : String(v)}
                </div>
                <div className="text-xs text-muted mt-1">
                  {k.replace(/([A-Z])/g, " $1").trim()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}
