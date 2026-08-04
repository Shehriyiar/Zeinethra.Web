import Link from "next/link";
import { NewsletterForm } from "@/components/features/NewsletterForm";
import { BrandMark } from "@/components/brand/BrandMark";

const cols = [
  {
    title: "Solutions",
    links: [
      { href: "/healthcare", label: "Healthcare Technology" },
      { href: "/ai-platforms", label: "AI & Digital Platforms" },
      { href: "/it-services", label: "IT Services" },
      { href: "/products/zenith-dental", label: "Zenith Dental" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/partners", label: "Partner With Us" },
      { href: "/industries", label: "Industries" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/insights", label: "Insights" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/security", label: "Security" },
      { href: "/legal/accessibility", label: "Accessibility" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="container-ze grid gap-10 py-14 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandMark size={42} />
            <div>
              <div className="font-display text-xl font-bold tracking-wide text-foreground">ZEINETHRA</div>
              <div className="text-xs tracking-[0.16em] text-cyan">SOLUTIONS ACROSS PLATFORMS</div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            A brand of LD Hub Pty Ltd. Technology that understands healthcare — platforms built to transform every industry.
          </p>
          <div className="mt-6">
            <p className="eyebrow mb-3">Newsletter</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold tracking-wide">{col.title}</h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-muted transition hover:text-cyan">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="container-ze flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Zeinethra · LD Hub Pty Ltd</p>
          <p className="font-mono tracking-wider">HEALTHCARE · AI · ENTERPRISE</p>
        </div>
      </div>
    </footer>
  );
}
