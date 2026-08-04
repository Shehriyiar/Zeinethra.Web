"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { api } from "@/lib/api";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ze-consent");
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  async function accept() {
    localStorage.setItem("ze-consent", "all");
    setVisible(false);
    try {
      await api.consent({
        sessionId: "web",
        necessary: true,
        analytics: true,
        marketing: true,
        preferences: true,
      });
    } catch {
      /* non-critical */
    }
  }

  function dismiss() {
    localStorage.setItem("ze-consent", "necessary");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="container-ze">
        <div className="card-ze flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            We use cookies to improve your experience.{" "}
            <a href="/legal/privacy" className="text-cyan underline">
              Learn more
            </a>
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={accept} className="btn-primary h-9 px-4 text-sm">
              Accept All
            </button>
            <button onClick={dismiss} className="btn-secondary h-9 px-4 text-sm">
              Necessary Only
            </button>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="text-muted hover:text-foreground"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
