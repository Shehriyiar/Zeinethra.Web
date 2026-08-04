"use client";

import { useCallback } from "react";
import { api } from "@/lib/api";
import { AdminListPage } from "@/components/admin/AdminListPage";

export default function Page() {
  const loader = useCallback(async (token: string) => {
    const data = await api.getFaqsAdmin(token);
    return { items: data.items as unknown as Record<string, unknown>[], totalCount: data.totalCount };
  }, []);
  return (
    <AdminListPage
      title="FAQs"
      subtitle="Published FAQ content for the public site."
      loader={loader}
      columns={[
        { key: "question", label: "Question" },
        { key: "category", label: "Category" },
        { key: "answer", label: "Answer" },
      ]}
    />
  );
}
