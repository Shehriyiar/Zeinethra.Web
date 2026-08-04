"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Check, ArrowRight, ArrowLeft, Send } from "lucide-react";
import clsx from "clsx";

const areas = [
  { label: "Healthcare Technology", value: "Healthcare" },
  { label: "Zenith Dental", value: "ZenithDental" },
  { label: "AI Solutions", value: "AiSolutions" },
  { label: "IT Services", value: "ItServices" },
  { label: "Investment", value: "Investment" },
  { label: "Partnership", value: "Partnership" },
] as const;

const stepLabels = ["Interest", "Details", "Message"];

export function EnquiryForm() {
  const [step, setStep] = useState(0);
  const [area, setArea] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function set(key: string, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function submit() {
    setStatus("sending");
    setErrorMsg("");
    try {
      await api.submitEnquiry({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone || undefined,
        company: form.company || undefined,
        message: form.message || "Website enquiry",
        areaOfInterest: area,
        source: "website",
        pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      });
      setStatus("ok");
    } catch (e) {
      setStatus("err");
      setErrorMsg(e instanceof Error ? e.message.slice(0, 180) : "Something went wrong. Please try again.");
    }
  }

  if (status === "ok") {
    return (
      <div className="card-ze p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan/10 text-cyan">
          <Check size={28} />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground">Thank You</h3>
        <p className="mt-2 text-sm text-muted">We&apos;ll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="card-ze p-6 sm:p-8">
      <div className="mb-8 flex items-center justify-between gap-1">
        {stepLabels.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition",
                i <= step ? "bg-cyan text-white" : "border border-[var(--border)] text-muted"
              )}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span className={clsx("hidden text-sm sm:inline", i <= step ? "text-foreground" : "text-muted")}>{s}</span>
            {i < stepLabels.length - 1 && <div className="mx-1 hidden h-px w-6 bg-[var(--border)] sm:block md:w-8" />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div>
          <h3 className="mb-4 font-display text-lg font-semibold text-foreground">What are you interested in?</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {areas.map((a) => (
              <button
                key={a.value}
                type="button"
                onClick={() => {
                  setArea(a.value);
                  setStep(1);
                }}
                className={clsx(
                  "rounded-xl border p-4 text-left text-sm transition hover:-translate-y-0.5",
                  area === a.value ? "border-cyan bg-cyan/5 text-foreground" : "border-[var(--border)] text-foreground hover:border-cyan/40"
                )}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground">Your Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Full Name *" required className="h-11 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm text-foreground outline-none ring-cyan focus:ring-2" />
            <input value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="Email *" type="email" required className="h-11 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm text-foreground outline-none ring-cyan focus:ring-2" />
            <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="Phone" className="h-11 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm text-foreground outline-none ring-cyan focus:ring-2" />
            <input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Company" className="h-11 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm text-foreground outline-none ring-cyan focus:ring-2" />
          </div>
          <div className="flex justify-between gap-3 pt-2">
            <button type="button" onClick={() => setStep(0)} className="btn-secondary gap-2">
              <ArrowLeft size={14} /> Back
            </button>
            <button type="button" onClick={() => setStep(2)} disabled={!form.fullName || !form.email} className="btn-primary gap-2 disabled:opacity-50">
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground">Your Message</h3>
          <textarea
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Tell us about your project or question…"
            rows={5}
            className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-sm text-foreground outline-none ring-cyan focus:ring-2"
          />
          <div className="flex justify-between gap-3">
            <button type="button" onClick={() => setStep(1)} className="btn-secondary gap-2">
              <ArrowLeft size={14} /> Back
            </button>
            <button type="button" onClick={submit} disabled={status === "sending" || !area} className="btn-primary gap-2 disabled:opacity-50">
              {status === "sending" ? "Sending…" : "Submit"} <Send size={14} />
            </button>
          </div>
          {status === "err" && <p className="text-sm text-red-500">{errorMsg || "Something went wrong. Please try again."}</p>}
        </div>
      )}
    </div>
  );
}
