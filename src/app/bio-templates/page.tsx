import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Users } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { BioTemplateCard } from "@/components/bio-templates";
import { CommunityTemplateCard } from "@/components/community-template-card";
import { ALL_BIO_TEMPLATES } from "@/data/bio-templates";
import { db } from "@/lib/db";

/** Templates with this many reports are hidden automatically. */
const REPORT_HIDE_THRESHOLD = 5;

/** Community templates come from the live database - always fresh. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bio Templates - Copy & Paste Bios for Instagram, Discord, LinkedIn & Gaming | TyeFlo",
  description:
    "Free ready-made bio templates - aesthetic, gaming, kawaii, LinkedIn, glitch and minimal - plus community-made templates from TyeFlo creators. Click to copy instantly.",
};

const GENERATOR_LINKS: Record<string, string> = {
  "Aesthetic Instagram": "/instagram-font-generator",
  "Gaming Tag": "/gaming-font-generator",
  "Cute / Kawaii": "/cute-aesthetic-font-generator",
  "LinkedIn Bio": "/small-bold-font-generator",
  "Glitch / Discord": "/gothic-scary-font-generator",
  "Small / Minimal": "/small-bold-font-generator",
};

async function getCommunityTemplates() {
  try {
    return await db.template.findMany({
      where: { reported: { lt: REPORT_HIDE_THRESHOLD } },
      include: { creator: true },
      orderBy: { createdAt: "desc" },
      take: 24,
    });
  } catch {
    // Database unavailable - show the section without crashing the page.
    return [];
  }
}

export default async function BioTemplatesPage() {
  const labels = [...new Set(ALL_BIO_TEMPLATES.map((t) => t.label))];
  const community = await getCommunityTemplates();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-16">
          {/* Title row - heading left, Create button right */}
          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Bio Templates
            </h1>

            <Link
              href="/bio-templates/creator-lab"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Create a Template
            </Link>
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Ready-made bios for every vibe. Click a card to copy it instantly,
            or tap the pencil icon to edit each line first - the font stays
            the same. Edits are never saved, so templates always reset.
          </p>

          <div className="mt-12 space-y-14">
            {labels.map((label) => {
              const templates = ALL_BIO_TEMPLATES.filter(
                (t) => t.label === label
              );
              return (
                <section key={label} className="scroll-mt-24">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {label}
                    </h2>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {templates.length} templates
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {templates.map((t) => (
                      <BioTemplateCard
                        key={t.label + t.lines[0]}
                        label={t.label}
                        lines={t.lines}
                        styles={t.styles}
                      />
                    ))}
                  </div>
                  {GENERATOR_LINKS[label] && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      Style your own text in the{" "}
                      <Link
                        href={GENERATOR_LINKS[label]}
                        className="font-semibold text-primary underline underline-offset-4"
                      >
                        {label.split(" / ")[0].toLowerCase()} font generator
                      </Link>
                      .
                    </p>
                  )}
                </section>
              );
            })}
          </div>

          {/* Community Templates */}
          <section className="mt-16">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                Community Templates
              </h2>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {community.length}{" "}
                {community.length === 1 ? "template" : "templates"}
              </span>
            </div>

            {community.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-border bg-muted/30 p-10 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" aria-hidden="true" />
                </span>
                <p className="mt-3 text-lg font-bold text-foreground">
                  No community templates yet
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Be the first to publish one and start earning creator points.
                </p>
                <Link
                  href="/bio-templates/creator-lab"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Create a Template
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {community.map((t) => (
                  <CommunityTemplateCard
                    key={t.id}
                    templateId={t.id}
                    label={t.label}
                    lines={t.lines}
                    styles={t.styles}
                    creatorName={t.creator.name}
                    creatorUsername={t.creator.username}
                    creatorPoints={t.creator.points}
                    creatorRole={t.creator.role}
                  />
                ))}
              </div>
            )}
          </section>

          <p className="mt-14 text-center text-sm text-muted-foreground">
            Want a font instead of a template?{" "}
            <Link
              href="/"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Back to the generator
            </Link>
          </p>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
