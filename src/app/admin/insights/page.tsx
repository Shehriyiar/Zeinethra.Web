"use client";

import { useCallback } from "react";
import { api } from "@/lib/api";
import { AdminListPage } from "@/components/admin/AdminListPage";

export default function Page() {
  const loader = useCallback(async (token: string) => {
    const data = await api.getArticlesAdmin(token);
    return { items: data.items as unknown as Record<string, unknown>[], totalCount: data.totalCount };
  }, []);
  return (
    <AdminListPage
      title="Insights"
      subtitle="Articles and resources synced from the CMS API."
      loader={loader}
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "author", label: "Author" },
        { key: "slug", label: "Slug" },
      ]}
    />
  );
}
