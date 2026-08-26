import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | TyeFlo",
  description: "Privacy Policy for TyeFlo — your privacy is our priority. No data stored, no sign-in required.",
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
              <h2 className="mb-2 text-lg font-bold text-foreground">1. No Data Stored</h2>
              <p>TyeFlo is built with a privacy-first approach. We do not store, collect, or track any text you type into the font generator. Your text is converted in your browser and never sent to our servers for processing.</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">2. No Sign-In Required</h2>
              <p>You do not need to create an account, sign in, or provide any personal information to use TyeFlo. The service is completely anonymous and free to use.</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">3. Cookies & Analytics</h2>
              <p>We may use basic, anonymous analytics to understand how the tool is used and improve the experience. This data is aggregated and does not identify individual users. No personal data is collected through cookies or tracking.</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">4. Third-Party Links</h2>
              <p>Our content may reference or link to third-party platforms (WhatsApp, Discord, Instagram, etc.). We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">5. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page. Continued use of the Service after changes constitutes acceptance of the updated policy.</p>
            </div>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
