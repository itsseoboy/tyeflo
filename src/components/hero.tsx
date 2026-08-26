import { RotatingWord } from "@/components/rotating-word";
import { loadHomepageSection } from "@/lib/mdx-loader";

export function Hero() {
  const desc = loadHomepageSection("hero-description");

  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      {/* Subtle purple glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-6 pt-6 text-center sm:pb-10 sm:pt-8">
          <h1 className="mx-auto max-w-3xl text-[26px] font-bold leading-[1.2] tracking-tight sm:text-4xl md:text-[44px]">
            <span className="block">Free Copy &amp; Paste <RotatingWord /></span>
            <span className="block">Generator</span>
          </h1>

          {/* Hero description — markdown is parsed to HTML by mdx-loader.
              Using dangerouslySetInnerHTML so **bold** renders as <strong>.
              "Copy & Paste Fonts" appears bold here as the main SEO keyword. */}
          <div
            className="mx-auto mt-4 max-w-xl text-center text-[13px] leading-relaxed text-muted-foreground sm:text-base md:text-lg [&_strong]:font-semibold [&_strong]:text-foreground"
            dangerouslySetInnerHTML={{
              __html:
              desc?.html ||
              "<p>Tired of default fonts? Our Free <strong>Copy &amp; Paste Fonts</strong> generator gives you the experience of using different stylish fonts.</p>",
            }}
          />
        </div>
      </div>
    </section>
  );
}
