"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Package,
  HelpCircle,
  Briefcase,
  Users,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import { AdminAuthProvider, useAdminAuth } from "@/components/admin/AdminAuth";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/admin/insights", label: "Insights", icon: FileText },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/careers", label: "Careers", icon: Briefcase },
  { href: "/admin/team", label: "Team", icon: Users },
];

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { token, user, ready, logout } = useAdminAuth();
  const [open, setOpen] = useState(false);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (!ready || isLogin) return;
    if (!token) router.replace("/admin/login");
  }, [ready, token, isLogin, router]);

  if (isLogin) return <>{children}</>;
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07152e] text-white">
        Loading admin…
      </div>
    );
  }
  if (!token) return null;

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-[#0b2046]">
      <div className="flex min-h-screen">
        <aside
          className={clsx(
            "fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-[#07152e] text-white transition-transform lg:static lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
            <BrandMark size={34} animated />
            <div>
              <div className="font-display text-sm font-bold tracking-[0.12em]">ZEINETHRA</div>
              <div className="text-[10px] tracking-[0.18em] text-cyan-soft">ADMIN</div>
            </div>
          </div>
          <nav className="space-y-1 p-4">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                    active ? "bg-cyan text-white" : "text-white/75 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <l.icon size={16} />
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="absolute inset-x-0 bottom-0 border-t border-white/10 p-4">
            <div className="mb-3 text-xs text-white/60">
              <div className="font-medium text-white">{user?.fullName}</div>
              <div>{user?.role}</div>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/admin/login");
              }}
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--border)] bg-white/90 px-4 backdrop-blur md:px-6">
            <button type="button" className="rounded-lg border border-[var(--border)] p-2 lg:hidden" onClick={() => setOpen((v) => !v)}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="font-display text-lg font-semibold">Control Centre</div>
            <Link href="/" target="_blank" className="inline-flex items-center gap-1 text-sm text-cyan">
              View site <ExternalLink size={14} />
            </Link>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
      {open && <button type="button" aria-label="Close menu" className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <Shell>{children}</Shell>
    </AdminAuthProvider>
  );
}
