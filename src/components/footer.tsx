import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-foreground">
            TyeFlo
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Free fancy text and font generator.
          </p>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
          aria-label="Footer navigation"
        >
          <Link
            href="/"
            className="transition-colors hover:text-foreground"
          >
            Home
          </Link>

          <Link
            href="/contact"
            className="transition-colors hover:text-foreground"
          >
            Contact
          </Link>

          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy
          </Link>

          <Link
            href="/terms"
            className="transition-colors hover:text-foreground"
          >
            Terms
          </Link>
        </nav>
      </div>

      <div className="border-t border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
          © {year} TyeFlo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
