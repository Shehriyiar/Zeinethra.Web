"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Check, ArrowRight, ArrowLeft, Send } from "lucide-react";
import clsx from "clsx";

const areas = [
  "Healthcare Technology",
  "AI & Digital Platforms",
  "IT Services & Consulting",
  "Zenith Dental",
  "Partnership",
  "General Enquiry",
];

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
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    "idle"
  );

  function set(key: string, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function submit() {
    setStatus("sending");
    try {
      await api.submitEnquiry({
        ...form,
        areaOfInterest: area,
        source: "website",
        pageUrl:
          typeof window !== "undefined" ? window.location.href : undefined,
        isComplete: true,
      });
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="card-ze p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan/10 text-cyan">
          <Check size={28} />
        </div>
        <h3 className="font-display text-xl font-semibold">Thank You</h3>
        <p className="mt-2 text-sm text-muted">
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="card-ze p-6 sm:p-8">
      {/* Step indicators */}
      <div className="mb-8 flex items-center justify-between">
        {stepLabels.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition",
                i <= step
                  ? "bg-cyan text-white"
                  : "border border-[var(--border)] text-muted"
              )}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span
              className={clsx(
                "hidden text-sm sm:inline",
                i <= step ? "text-foreground" : "text-muted"
              )}
            >
              {s}
            </span>
            {i < stepLabels.length - 1 && (
              <div className="mx-2 hidden h-px w-8 bg-[var(--border)] sm:block" />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Area of Interest */}
      {step === 0 && (
        <div>
          <h3 className="font-display text-lg font-semibold mb-4">
            What are you interested in?
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {areas.map((a) => (
              <button
                key={a}
                onClick={() => {
                  setArea(a);
                  setStep(1);
                }}
                className={clsx(
                  "rounded-xl border p-4 text-left text-sm transition hover:-translate-y-0.5",
                  area === a
                    ? "border-cyan bg-cyan/5"
                    : "border-[var(--border)] hover:border-cyan/40"
                )}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Contact Details */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold">Your Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              placeholder="Full Name *"
              required
              className="h-11 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm outline-none focus:ring-2 ring-cyan"
            />
            <input
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="Email *"
              type="email"
              required
              className="h-11 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm outline-none focus:ring-2 ring-cyan"
            />
            <input
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="Phone"
              className="h-11 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm outline-none focus:ring-2 ring-cyan"
            />
            <input
              value={form.company}
              onChange={(e) => set("company", e.target.value)}
              placeholder="Company"
              className="h-11 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm outline-none focus:ring-2 ring-cyan"
            />
          </div>
          <div className="flex justify-between pt-2">
            <button onClick={() => setStep(0)} className="btn-secondary gap-2">
              <ArrowLeft size={14} /> Back
            </button>
            <button
              onClick={() => setStep(2)}
              disabled={!form.fullName || !form.email}
              className="btn-primary gap-2 disabled:opacity-50"
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Message */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold">Your Message</h3>
          <textarea
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Tell us about your project or question\u2026"
            rows={5}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-sm outline-none focus:ring-2 ring-cyan resize-none"
          />
          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="btn-secondary gap-2">
              <ArrowLeft size={14} /> Back
            </button>
            <button
              onClick={submit}
              disabled={status === "sending"}
              className="btn-primary gap-2 disabled:opacity-50"
            >
              {status === "sending" ? "Sending\u2026" : "Submit"}{" "}
              <Send size={14} />
            </button>
          </div>
          {status === "err" && (
            <p className="text-sm text-red-500">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
