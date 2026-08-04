"use client";

import { useCallback } from "react";
import { api } from "@/lib/api";
import { AdminListPage } from "@/components/admin/AdminListPage";

export default function Page() {
  const loader = useCallback(async (token: string) => {
    const data = await api.getTeamAdmin(token);
    return { items: data.items as unknown as Record<string, unknown>[], totalCount: data.totalCount };
  }, []);
  return (
    <AdminListPage
      title="Team"
      subtitle="Leadership and team profiles."
      loader={loader}
      columns={[
        { key: "fullName", label: "Name" },
        { key: "title", label: "Title" },
        { key: "isLeadership", label: "Leadership" },
        { key: "bio", label: "Bio" },
      ]}
    />
  );
}
