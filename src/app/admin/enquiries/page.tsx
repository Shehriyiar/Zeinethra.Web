"use client";

import { useEffect, useState } from "react";
import { api, type EnquiryAdminDto } from "@/lib/api";
import { useAdminAuth } from "@/components/admin/AdminAuth";

export default function AdminEnquiriesPage() {
  const { token } = useAdminAuth();
  const [items, setItems] = useState<EnquiryAdminDto[]>([]);
  const [error, setError] = useState("");

  async function load() {
    if (!token) return;
    try {
      const data = await api.getEnquiriesAdmin(token);
      setItems(data.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function mark(id: string, status: string) {
    if (!token) return;
    await api.updateEnquiryStatus(token, id, status);
    await load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Enquiries</h1>
      <p className="mt-2 text-sm text-[#3d4f6f]">Routed leads from the public contact form.</p>
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[rgba(11,32,70,0.1)] bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-[#f7f9fc] text-xs uppercase tracking-wide text-[#3d4f6f]">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Interest</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b last:border-0">
                <td className="px-4 py-3">
                  <div className="font-medium">{item.fullName}</div>
                  <div className="text-xs text-[#3d4f6f]">{item.email}</div>
                </td>
                <td className="px-4 py-3">{item.areaOfInterest}</td>
                <td className="px-4 py-3">{item.status}</td>
                <td className="max-w-xs truncate px-4 py-3">{item.message}</td>
                <td className="px-4 py-3">
                  <button type="button" onClick={() => mark(item.id, "InReview")} className="text-cyan hover:underline">
                    Mark in review
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[#3d4f6f]">
                  No enquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
