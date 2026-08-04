"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { TokenResponse } from "@/lib/api";

const KEY = "ze_admin_auth";

type AuthState = {
  token: string | null;
  user: Omit<TokenResponse, "accessToken" | "refreshToken"> | null;
  setSession: (data: TokenResponse) => void;
  logout: () => void;
  ready: boolean;
};

const AuthContext = createContext<AuthState | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthState["user"]>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as TokenResponse;
        if (parsed.accessToken && new Date(parsed.expiresAt).getTime() > Date.now()) {
          setToken(parsed.accessToken);
          setUser({
            email: parsed.email,
            fullName: parsed.fullName,
            role: parsed.role,
            expiresAt: parsed.expiresAt,
          });
        } else {
          localStorage.removeItem(KEY);
        }
      }
    } catch {
      localStorage.removeItem(KEY);
    }
    setReady(true);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      token,
      user,
      ready,
      setSession: (data) => {
        localStorage.setItem(KEY, JSON.stringify(data));
        setToken(data.accessToken);
        setUser({
          email: data.email,
          fullName: data.fullName,
          role: data.role,
          expiresAt: data.expiresAt,
        });
      },
      logout: () => {
        localStorage.removeItem(KEY);
        setToken(null);
        setUser(null);
      },
    }),
    [token, user, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
