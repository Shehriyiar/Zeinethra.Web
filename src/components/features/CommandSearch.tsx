"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { api, type SearchItem } from "@/lib/api";
import clsx from "clsx";

export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("ze:open-search", handler);
    return () => window.removeEventListener("ze:open-search", handler);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.search(query);
        setResults(res.results || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults([]);
    setActive(0);
  }, []);

  function navigate(item: SearchItem) {
    const base =
      item.type === "article"
        ? "/insights"
        : item.type === "product"
          ? "/products"
          : "";
    router.push(`${base}/${item.slug}`);
    close();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") close();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((p) => Math.min(p + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((p) => Math.max(p - 1, 0));
    }
    if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      navigate(results[active]);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 backdrop-blur-sm pt-[15vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4">
          <Search size={18} className="text-muted shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search Zeinethra\u2026"
            className="flex-1 bg-transparent py-4 text-base outline-none"
          />
          <kbd className="hidden rounded border border-[var(--border)] px-2 py-0.5 text-xs text-muted sm:inline">
            ESC
          </kbd>
          <button
            onClick={close}
            className="text-muted hover:text-foreground sm:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {loading && (
          <div className="px-4 py-3 text-sm text-muted">Searching\u2026</div>
        )}

        {!loading && results.length > 0 && (
          <ul className="max-h-72 overflow-y-auto py-2">
            {results.map((item, i) => (
              <li key={`${item.type}-${item.slug}`}>
                <button
                  onClick={() => navigate(item)}
                  onMouseEnter={() => setActive(i)}
                  className={clsx(
                    "flex w-full items-center justify-between px-4 py-3 text-left text-sm transition",
                    active === i
                      ? "bg-[color-mix(in_srgb,var(--cyan)_8%,transparent)]"
                      : "hover:bg-[color-mix(in_srgb,var(--cyan)_5%,transparent)]"
                  )}
                >
                  <div>
                    <span className="eyebrow text-[10px]">{item.type}</span>
                    <div className="font-medium">{item.title}</div>
                    {item.snippet && (
                      <p className="mt-0.5 text-xs text-muted line-clamp-1">
                        {item.snippet}
                      </p>
                    )}
                  </div>
                  <ArrowRight size={14} className="text-muted shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {!loading && query.trim() && results.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-muted">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
}
