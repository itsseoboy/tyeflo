import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { TemplateSearch } from "@/components/template-search";
import { ALL_BIO_TEMPLATES } from "@/data/bio-templates";
import { db } from "@/lib/db";

const REPORT_HIDE_THRESHOLD = 5;

/** Cached 60s - fast loads, fresh-enough community section. */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Bio Templates - Copy & Paste Bios for Instagram, Discord, LinkedIn & Gaming | TyeFlo",
  description:
    "Free ready-made bio templates - aesthetic, gaming, kawaii, LinkedIn, glitch and minimal - plus community-made templates from TyeFlo creators. Click to copy instantly.",
};

async function getCommunityTemplates() {
  try {
    return await db.template.findMany({
      where: { reported: { lt: REPORT_HIDE_THRESHOLD } },
      include: { creator: true },
      orderBy: { createdAt: "desc" },
      take: 48,
    });
  } catch {
    return [];
  }
}

export default async function BioTemplatesPage() {
  const community = await getCommunityTemplates();

  const communityProps = community.map((t) => ({
    templateId: t.id,
    label: t.label,
    lines: t.lines,
    styles: t.styles,
    creatorName: t.creator.name,
    creatorUsername: t.creator.username,
    creatorPoints: t.creator.points,
    creatorRole: t.creator.role,
    copies: t.copies,
    createdAt: t.createdAt.toISOString(),
  }));

  const staticProps = ALL_BIO_TEMPLATES.map((t) => ({
    label: t.label,
    lines: t.lines,
    styles: t.styles,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-16">
          {/* Title row */}
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

          {/* Search + filter + sort */}
          <TemplateSearch
            staticTemplates={staticProps}
            communityTemplates={communityProps}
          />
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
