"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Calendar, Check } from "lucide-react";

export function BookingForm({ product = "Zenith Dental" }: { product?: string }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
    date: "",
    time: "10:00",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    "idle"
  );

  function set(key: string, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.bookDemo({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone || undefined,
        company: form.company || undefined,
        productInterest: product,
        preferredStartUtc: `${form.date}T${form.time}:00Z`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        notes: form.notes || undefined,
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
        <h3 className="font-display text-xl font-semibold">Demo Booked</h3>
        <p className="mt-2 text-sm text-muted">
          We&apos;ll confirm your slot via email shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-ze p-6 sm:p-8 space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <Calendar size={20} className="text-cyan" />
        <h3 className="font-display text-xl font-semibold">Book a Demo</h3>
      </div>
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
        <input
          type="date"
          value={form.date}
          onChange={(e) => set("date", e.target.value)}
          required
          className="h-11 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm outline-none focus:ring-2 ring-cyan"
        />
        <select
          value={form.time}
          onChange={(e) => set("time", e.target.value)}
          className="h-11 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm outline-none focus:ring-2 ring-cyan"
        >
          {[
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
          ].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={form.notes}
        onChange={(e) => set("notes", e.target.value)}
        placeholder="Any notes for the demo?"
        rows={3}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-sm outline-none focus:ring-2 ring-cyan resize-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full disabled:opacity-50"
      >
        {status === "sending" ? "Booking\u2026" : "Book Demo"}
      </button>
      {status === "err" && (
        <p className="text-sm text-red-500 text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
