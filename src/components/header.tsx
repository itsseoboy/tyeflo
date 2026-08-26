"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { TyeFloLogo } from "@/components/tyeflo-logo";
import { cn } from "@/lib/utils";

/** Minimal anchor nav — only the font generator micro-niche. */
const NAV_LINKS = [
  { label: "Font Generator", href: "#tool" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Use cases", href: "#use-cases" },
  { label: "FAQ", href: "#faqs" },
];

/** TyeFlo brand logo with wordmark. */
function BrandLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <TyeFloLogo size={36} />
      <span className="text-[18px] font-bold tracking-tight text-primary">
        TyeFlo
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const lastScroll = React.useRef(0);
  const ticking = React.useRef(false);

  React.useEffect(() => {
    const onScroll = () => {
      // Use requestAnimationFrame to batch scroll reads/writes —
      // prevents forced reflows from reading window.scrollY on every event
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        if (current > 100 && current > lastScroll.current) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastScroll.current = current;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "glass sticky top-0 z-50 w-full border-b border-border transition-transform duration-300",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        {/* Logo (left) */}
        <BrandLogo />

        {/* Right side: nav + theme toggle + mobile menu */}
        <div className="ml-auto flex items-center gap-2">
          {/* Desktop nav (right side) */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />

          {/* Mobile menu (right side) */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-4">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
