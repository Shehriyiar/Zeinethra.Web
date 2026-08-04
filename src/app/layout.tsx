import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookieConsent } from "@/components/features/CookieConsent";
import { WhatsAppButton } from "@/components/features/WhatsAppButton";
import { AiChatWidget } from "@/components/features/AiChatWidget";
import { CommandSearch } from "@/components/features/CommandSearch";

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zeinethra — Healthcare Technology & Enterprise AI",
    template: "%s | Zeinethra",
  },
  description:
    "Technology that understands healthcare. Platforms built to transform every industry. Flagship product: Zenith Dental.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Zeinethra",
    description: "Healthcare Technology · AI · IT Services — Solutions Across Platforms",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${body.variable} ${display.variable} ${mono.variable} font-body antialiased`}>
        <ThemeProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <CookieConsent />
          <WhatsAppButton />
          <AiChatWidget />
          <CommandSearch />
        </ThemeProvider>
      </body>
    </html>
  );
}
