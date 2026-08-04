"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, Moon, Search, Sun, X, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { BrandMark, BrandWordmark } from "@/components/brand/BrandMark";

const solutions = [
  { href: "/healthcare", label: "Healthcare Technology", desc: "Clinical workflows & portals" },
  { href: "/ai-platforms", label: "AI & Digital Platforms", desc: "Applied AI capability" },
  { href: "/it-services", label: "IT Services", desc: "Transformation & delivery" },
  { href: "/products/zenith-dental", label: "Zenith Dental", desc: "AI shade matching" },
];

const company = [
  { href: "/about", label: "About Zeinethra" },
  { href: "/partners", label: "Partner With Us" },
  { href: "/industries", label: "Industries" },
  { href: "/careers", label: "Careers" },
];

const resources = [
  { href: "/insights", label: "Insights" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("ze:open-search"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b transition-all backdrop-blur-xl",
        scrolled
          ? "border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] shadow-[var(--shadow)]"
          : "border-white/10 bg-[color-mix(in_srgb,#07152e_72%,transparent)]"
      )}
    >
      <div className="container-ze flex h-16 items-center justify-between gap-4 md:h-[4.25rem]">
        <Link href="/" className="flex items-center gap-3" aria-label="Zeinethra home">
          <BrandMark size={38} />
          <BrandWordmark inverted={!scrolled} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <MegaTrigger inverted={!scrolled} label="Solutions" active={mega === "solutions"} onToggle={() => setMega(mega === "solutions" ? null : "solutions")} />
          <NavLink inverted={!scrolled} href="/products">Products</NavLink>
          <MegaTrigger inverted={!scrolled} label="Company" active={mega === "company"} onToggle={() => setMega(mega === "company" ? null : "company")} />
          <MegaTrigger inverted={!scrolled} label="Resources" active={mega === "resources"} onToggle={() => setMega(mega === "resources" ? null : "resources")} />
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={clsx(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border hover:text-cyan",
              !scrolled ? "border-white/25 text-white/85" : "border-[var(--border)] text-muted"
            )}
            aria-label="Open search"
            onClick={() => window.dispatchEvent(new CustomEvent("ze:open-search"))}
          >
            <Search size={16} />
          </button>
          <button
            type="button"
            className={clsx(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border hover:text-cyan",
              !scrolled ? "border-white/25 text-white/85" : "border-[var(--border)] text-muted"
            )}
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link href="/contact" className="btn-primary hidden sm:inline-flex">
            Enquire
          </Link>
          <button
            type="button"
            className={clsx(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden",
              !scrolled ? "border-white/25 text-white" : "border-[var(--border)]"
            )}
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mega && (
        <div className="absolute inset-x-0 top-full hidden border-b border-[var(--border)] bg-[var(--bg-elevated)] lg:block" onMouseLeave={() => setMega(null)}>
          <div className="container-ze grid gap-4 py-8 md:grid-cols-3">
            {(mega === "solutions" ? solutions : mega === "company" ? company.map((c) => ({ ...c, desc: "" })) : resources.map((r) => ({ ...r, desc: "" }))).map((item) => (
              <Link key={item.href} href={item.href} className="card-ze p-5 transition hover:-translate-y-0.5" onClick={() => setMega(null)}>
                <div className="font-display text-lg font-semibold text-foreground">{item.label}</div>
                {"desc" in item && item.desc ? <p className="mt-1 text-sm text-muted">{item.desc}</p> : null}
              </Link>
            ))}
          </div>
        </div>
      )}

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg-elevated)] lg:hidden">
          <div className="container-ze flex flex-col gap-2 py-4">
            {[...solutions, ...company, ...resources].map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl px-3 py-3 text-foreground hover:bg-[color-mix(in_srgb,var(--cyan)_8%,transparent)]" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children, inverted }: { href: string; children: React.ReactNode; inverted?: boolean }) {
  return (
    <Link
      href={href}
      className={clsx(
        "rounded-full px-3 py-2 text-sm font-medium transition",
        inverted ? "text-white/85 hover:text-white" : "text-muted hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}

function MegaTrigger({
  label,
  active,
  onToggle,
  inverted,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
  inverted?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition",
        active ? "text-cyan" : inverted ? "text-white/85 hover:text-white" : "text-muted hover:text-foreground"
      )}
    >
      {label}
      <ChevronDown size={14} className={clsx("transition", active && "rotate-180")} />
    </button>
  );
}
