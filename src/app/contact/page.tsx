import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Mail, MessageSquare, Lightbulb, Bug } from "lucide-react";

export const metadata = {
  title: "Contact Us | TyeFlo",
  description: "Contact TyeFlo — request new fonts, report issues, or share feedback.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-8">
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Mail className="h-3.5 w-3.5" />
              Get in Touch
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Contact Us
            </h1>
            <span className="mt-2 block h-1 w-16 rounded-full bg-amber-400" />
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </span>
                <h2 className="text-lg font-bold text-foreground">Email Us</h2>
              </div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                For any questions, feedback, or support requests, reach out to us at:
              </p>
              <a
                href="mailto:hello@tyeflo.com"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                hello@tyeflo.com
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </span>
                <h2 className="text-lg font-bold text-foreground">Request a Font</h2>
              </div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Didn&rsquo;t find a font style you were looking for? Let us know! We&rsquo;re constantly adding new styles and would love to hear your suggestions. Email us with the style name or example, and we&rsquo;ll do our best to add it.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Bug className="h-5 w-5 text-primary" />
                </span>
                <h2 className="text-lg font-bold text-foreground">Report an Issue</h2>
              </div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Found a bug or experiencing an issue with the tool? Send us an email with a description of the problem, your device, and browser. We&rsquo;ll investigate and fix it as soon as possible.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </span>
                <h2 className="text-lg font-bold text-foreground">Troubleshooting</h2>
              </div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Seeing boxes or missing characters when pasting your styled text? This usually means the target platform doesn&rsquo;t fully support that Unicode character. Try a different font style from our generator — most styles work universally.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
