import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms of Service | TyeFlo",
  description: "Terms of Service for TyeFlo — the free copy and paste font generator.",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-8">
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Legal
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Terms of Service
            </h1>
            <span className="mt-2 block h-1 w-16 rounded-full bg-amber-400" />
          </div>

          <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
              <p>By accessing and using TyeFlo (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the Service.</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">2. Use of Service</h2>
              <p>TyeFlo is a free font generator that converts text into Unicode characters. You may use the generated text for personal and commercial purposes, including social media bios, usernames, messages, designs, and creative projects. No attribution is required, though it is appreciated.</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">3. No Warranty</h2>
              <p>The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, express or implied. We do not guarantee that the generated text will display correctly on all platforms or devices, as rendering depends on the target platform&rsquo;s Unicode support.</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">4. Limitation of Liability</h2>
              <p>TyeFlo and its team shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use of or inability to use the Service. You use the generated text at your own risk.</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">5. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>
            </div>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
