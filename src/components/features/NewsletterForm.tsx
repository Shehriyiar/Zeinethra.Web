"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.newsletter(email);
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <label className="sr-only" htmlFor="newsletter-email">
        Email
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@clinic.com"
        className="h-11 flex-1 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 text-sm outline-none ring-cyan focus:ring-2"
      />
      <button type="submit" className="btn-primary h-11 px-5">
        Subscribe
      </button>
      {status === "ok" && <p className="text-xs text-cyan sm:self-center">Subscribed.</p>}
      {status === "err" && <p className="text-xs text-red-500 sm:self-center">Try again.</p>}
    </form>
  );
}
