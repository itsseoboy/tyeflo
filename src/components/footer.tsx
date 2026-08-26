"use client";

import * as React from "react";
import Link from "next/link";
import { TyeFloLogo } from "@/components/tyeflo-logo";

const FOOTER_LINKS = [
  { label: "Font Generator", href: "#tool" },
  { label: "How it works", href: "#how-to-use" },
  { label: "Use cases", href: "#use-cases" },
  { label: "FAQ", href: "#faqs" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const [year, setYear] = React.useState<number | null>(null);
  React.useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <TyeFloLogo size={28} />
            <span className="text-base font-bold tracking-tight text-primary">
              TyeFlo
            </span>
          </Link>

          {/* Links — inline, clean */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {year ?? 2025} TyeFlo — Free Copy &amp; Paste Font Generator. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
