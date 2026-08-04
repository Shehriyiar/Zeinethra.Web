"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAdminAuth } from "@/components/admin/AdminAuth";

export default function AdminOverviewPage() {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState({ enquiries: 0, articles: 0, products: 0, faqs: 0, jobs: 0, team: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const [enquiries, articles, products, faqs, jobs, team] = await Promise.all([
          api.getEnquiriesAdmin(token),
          api.getArticlesAdmin(token),
          api.getProductsAdmin(token),
          api.getFaqsAdmin(token),
          api.getJobsAdmin(token),
          api.getTeamAdmin(token),
        ]);
        setStats({
          enquiries: enquiries.totalCount,
          articles: articles.totalCount,
          products: products.totalCount,
          faqs: faqs.totalCount,
          jobs: jobs.totalCount,
          team: team.totalCount,
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load dashboard");
      }
    })();
  }, [token]);

  const cards = [
    { href: "/admin/enquiries", label: "Enquiries", value: stats.enquiries },
    { href: "/admin/insights", label: "Insights", value: stats.articles },
    { href: "/admin/products", label: "Products", value: stats.products },
    { href: "/admin/faqs", label: "FAQs", value: stats.faqs },
    { href: "/admin/careers", label: "Careers", value: stats.jobs },
    { href: "/admin/team", label: "Team", value: stats.team },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Overview</h1>
      <p className="mt-2 text-sm text-[#3d4f6f]">Enterprise CMS snapshot connected to the live Zeinethra API.</p>
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-2xl border border-[rgba(11,32,70,0.1)] bg-white p-6 shadow-sm transition hover:-translate-y-0.5">
            <div className="text-sm text-[#3d4f6f]">{c.label}</div>
            <div className="mt-3 font-display text-4xl font-bold text-[#0b2046]">{c.value}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
