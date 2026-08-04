"use client";

import { useCallback } from "react";
import { api } from "@/lib/api";
import { AdminListPage } from "@/components/admin/AdminListPage";

export default function Page() {
  const loader = useCallback(async (token: string) => {
    const data = await api.getJobsAdmin(token);
    return { items: data.items as unknown as Record<string, unknown>[], totalCount: data.totalCount };
  }, []);
  return (
    <AdminListPage
      title="Careers"
      subtitle="Open and historical roles from the careers module."
      loader={loader}
      columns={[
        { key: "title", label: "Title" },
        { key: "department", label: "Department" },
        { key: "location", label: "Location" },
        { key: "employmentType", label: "Type" },
      ]}
    />
  );
}
