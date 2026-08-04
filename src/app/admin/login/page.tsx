"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { BrandMark } from "@/components/brand/BrandMark";
import { ParticleField } from "@/components/effects/ParticleField";
import { useAdminAuth } from "@/components/admin/AdminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { setSession } = useAdminAuth();
  const [email, setEmail] = useState("admin@zeinethra.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = await api.login(email, password);
      setSession(token);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hero-mesh relative flex min-h-screen items-center justify-center px-4">
      <ParticleField className="opacity-50" />
      <form onSubmit={onSubmit} className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-white/95 p-8 shadow-2xl backdrop-blur">
        <div className="mb-6 flex flex-col items-center text-center">
          <BrandMark size={72} animated />
          <h1 className="mt-4 font-display text-2xl font-bold text-[#0b2046]">Admin Login</h1>
          <p className="mt-2 text-sm text-[#3d4f6f]">Sign in to manage Zeinethra content and leads.</p>
        </div>
        <label className="mb-3 block text-sm font-medium text-[#0b2046]">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 h-11 w-full rounded-xl border border-[rgba(11,32,70,0.12)] bg-[#f4f7fb] px-3 text-[#0b2046]"
          />
        </label>
        <label className="mb-4 block text-sm font-medium text-[#0b2046]">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 h-11 w-full rounded-xl border border-[rgba(11,32,70,0.12)] bg-[#f4f7fb] px-3 text-[#0b2046]"
          />
        </label>
        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
