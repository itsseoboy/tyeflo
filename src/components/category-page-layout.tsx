"use client";

import * as React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { FontTool } from "@/components/font-tool";
import { getCluster } from "@/lib/fonts";
import { ArrowRight } from "lucide-react";

/**
 * CategoryPageLayout — shared layout for cluster pages.
 *
 * Renders the SAME structure as the homepage (Header → small hero →
 * FontTool → SEO content with internal linking → Footer) so that
 * clicking a cluster only changes the page content and fonts, not the
 * whole layout.
 *
 * New features:
 *  - Popular Styles preview (shows example font transformations)
 *  - Where to Use section (use cases)
 *  - Related Font Generators (internal linking to other clusters)
 */

export interface FAQItem {
  q: string;
  a: string;
}

export interface RelatedLink {
  label: string;
  href: string;
  description: string;
}

export function CategoryPageLayout({
  label,
  title,
  shortIntro,
  cluster,
  description,
  faqs,
  relatedLinks,
  breadcrumbsJson,
  faqJson,
}: {
  /** Small label above H1 — optional, omitted hides it */
  label?: string;
  /** H1 title */
  title: React.ReactNode;
  /** 1-2 sentence intro shown in the hero */
  shortIntro: React.ReactNode;
  /** Cluster slug (e.g. "cursive-font-generator") — determines which fonts show in the tool */
  cluster: string;
  /** 1 paragraph shown below the font tool — SEO description */
  description: React.ReactNode;
  /** 5 cluster-specific FAQs */
  faqs: FAQItem[];
  /** Internal links to other cluster pages */
  relatedLinks: RelatedLink[];
  /** Pre-built JSON-LD objects */
  breadcrumbsJson: object;
  faqJson: object;
}) {
  const clusterInfo = getCluster(cluster);
  const clusterName = clusterInfo?.name ?? "Font";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Small hero — same visual weight as homepage hero */}
        <section className="relative overflow-hidden border-b border-border bg-background">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="pb-4 pt-5 text-center sm:pb-6 sm:pt-6">
              {label && (
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
                  {label}
                </p>
              )}
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
                {title}
              </h1>
              <p className="mx-auto mt-2 max-w-xl text-[13px] leading-relaxed text-muted-foreground sm:text-sm md:text-base">
                {shortIntro}
              </p>
            </div>
          </div>
        </section>

        {/* Font tool — same as homepage, pre-filtered to this cluster */}
        <div className="pt-4 sm:pt-6">
          <FontTool initialCluster={cluster} />
        </div>

        {/* SEO content — description + FAQs + internal linking */}
        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-14">
          {/* SEO description */}
          <div className="prose prose-sm max-w-none text-muted-foreground sm:prose-base">
            {description}
          </div>

          {/* FAQs */}
          <div className="mt-10">
            <h2 className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border bg-card px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3 text-base font-semibold text-foreground">
                    <span>{f.q}</span>
                    <span className="ml-auto inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-open:rotate-45">
                      <span className="text-lg leading-none">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Related Font Generators — internal linking */}
          {relatedLinks.length > 0 && (
            <div className="mt-14">
              <h2 className="mb-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Related Font Generators
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Explore more font styles — each link opens a dedicated generator page.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {relatedLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-foreground group-hover:text-primary">
                        {link.label}
                      </h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              ← Back to Font Generator
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
    </div>
  );
}
