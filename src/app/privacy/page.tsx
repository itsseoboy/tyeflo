import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | TyeFlo",
  description:
    "Privacy Policy for TyeFlo - the font generator stores nothing; optional creator accounts store your username, templates and points. Read the full details.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-8">
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Shield className="h-3.5 w-3.5" />
              Legal
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Privacy Policy
            </h1>
            <span className="mt-2 block h-1 w-16 rounded-full bg-amber-400" />
          </div>

          <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">
                1. The Font Generator
              </h2>
              <p>
                TyeFlo is built privacy-first. The generator requires no
                account and no personal information. Everything you type is
                converted live in your browser and never sent to our servers
                for processing, storage, or tracking. Using the generator is
                completely anonymous and free.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">
                2. Creator Accounts (Optional)
              </h2>
              <p>
                Some features - publishing community bio templates, earning
                creator points and level badges - require a free creator
                account. Accounts are created through Google sign-in. If you
                sign in, we store: your email address, your Google display
                name and profile image, your chosen username, your creator
                points, and the templates you publish. You never need an
                account to browse, copy, or edit templates.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">
                3. Community Templates &amp; Moderation
              </h2>
              <p>
                Templates you publish are stored on our servers and displayed
                publicly with your username and level badge. All submissions
                pass automatic moderation before going live, and community
                reports may hide or remove templates. We may remove content
                that violates our Terms.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">
                4. Third-Party Services
              </h2>
              <p>
                TyeFlo relies on these services: Google, for sign-in
                (authentication only - we never post on your behalf); our
                database and hosting providers, to store the account data
                described above; and standard, privacy-respecting analytics to
                understand aggregate site usage. Our content may also link to
                external platforms (Instagram, Discord, etc.) whose privacy
                practices are their own.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">
                5. Cookies
              </h2>
              <p>
                We use a small session cookie solely to keep you signed in to
                your creator account. The generator itself works fully without
                cookies. We do not use advertising or cross-site tracking
                cookies.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">
                6. Your Data &amp; Deletion
              </h2>
              <p>
                Want your account or templates removed? Contact us at
                hello@tyeflo.com (or via the contact page) and we will delete
                your account data and published templates. Anonymous
                generator usage has nothing to delete - it was never stored.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">
                7. Children
              </h2>
              <p>
                TyeFlo is not directed at children under 13, and creator
                accounts (Google sign-in) are not available to them.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">
                8. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy as features evolve.
                Continued use after changes constitutes acceptance of the
                updated policy.
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              Last updated: August 2026
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
