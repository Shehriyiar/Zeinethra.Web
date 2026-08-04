"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookieConsent } from "@/components/features/CookieConsent";
import { WhatsAppButton } from "@/components/features/WhatsAppButton";
import { AiChatWidget } from "@/components/features/AiChatWidget";
import { CommandSearch } from "@/components/features/CommandSearch";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <CookieConsent />
      <WhatsAppButton />
      <AiChatWidget />
      <CommandSearch />
    </>
  );
}
