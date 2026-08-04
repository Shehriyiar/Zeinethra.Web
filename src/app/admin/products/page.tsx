"use client";

import { useCallback } from "react";
import { api } from "@/lib/api";
import { AdminListPage } from "@/components/admin/AdminListPage";

export default function Page() {
  const loader = useCallback(async (token: string) => {
    const data = await api.getProductsAdmin(token);
    return { items: data.items as unknown as Record<string, unknown>[], totalCount: data.totalCount };
  }, []);
  return (
    <AdminListPage
      title="Products"
      subtitle="Product catalogue including Zenith Dental."
      loader={loader}
      columns={[
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug" },
        { key: "tagline", label: "Tagline" },
        { key: "isFlagship", label: "Flagship" },
      ]}
    />
  );
}
