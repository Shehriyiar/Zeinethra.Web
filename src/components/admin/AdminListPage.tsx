"use client";

import { useEffect, useState } from "react";
import { useAdminAuth } from "@/components/admin/AdminAuth";

export function AdminListPage({
  title,
  subtitle,
  loader,
  columns,
}: {
  title: string;
  subtitle: string;
  loader: (token: string) => Promise<{ items: Record<string, unknown>[]; totalCount: number }>;
  columns: { key: string; label: string }[];
}) {
  const { token } = useAdminAuth();
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const data = await loader(token);
        setItems(data.items);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load");
      }
    })();
  }, [token, loader]);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-[#3d4f6f]">{subtitle}</p>
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[rgba(11,32,70,0.1)] bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-[#f7f9fc] text-xs uppercase tracking-wide text-[#3d4f6f]">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="px-4 py-3">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={String(item.id || idx)} className="border-b last:border-0">
                {columns.map((c) => (
                  <td key={c.key} className="max-w-xs truncate px-4 py-3">
                    {String(item[c.key] ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-[#3d4f6f]">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
