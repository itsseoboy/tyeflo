"use client";

/**
 * TemplateSearch - search, category filter, and New/Top sorting over all
 * templates (static + community). Client-side over server-fetched data,
 * so it is instant with no extra database queries.
 */

import * as React from "react";
import { Search, Clock, Flame, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BioTemplateCard } from "@/components/bio-templates";
import { CommunityTemplateCard } from "@/components/community-template-card";
import { cn } from "@/lib/utils";

type SortMode = "new" | "top";

interface StaticTemplate {
  label: string;
  lines: string[];
  styles: string[];
}

interface CommunityTemplateData {
  templateId: string;
  label: string;
  lines: string[];
  styles: string[];
  creatorName: string | null;
  creatorUsername: string | null;
  creatorPoints: number;
  creatorRole?: string | null;
  copies: number;
  createdAt: string;
}

export function TemplateSearch({
  staticTemplates,
  communityTemplates,
}: {
  staticTemplates: StaticTemplate[];
  communityTemplates: CommunityTemplateData[];
}) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("All");
  const [sort, setSort] = React.useState<SortMode>("new");

  const categories = React.useMemo(() => {
    const labels = new Set<string>();
    staticTemplates.forEach((t) => labels.add(t.label));
    communityTemplates.forEach((t) => labels.add(t.label));
    return ["All", ...Array.from(labels).sort()];
  }, [staticTemplates, communityTemplates]);

  const matches = React.useCallback(
    (text: string) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return text.toLowerCase().includes(q);
    },
    [query]
  );

  const filteredStatic = staticTemplates.filter(
    (t) =>
      (category === "All" || t.label === category) &&
      (matches(t.label) || t.lines.some(matches))
  );

  let filteredCommunity = communityTemplates.filter(
    (t) =>
      (category === "All" || t.label === category) &&
      (matches(t.label) || t.lines.some(matches))
  );

  if (sort === "top") {
    filteredCommunity = [...filteredCommunity].sort(
      (a, b) => b.copies - a.copies
    );
  }
  // "new" is already the server order (createdAt desc).

  const total = filteredStatic.length + filteredCommunity.length;

  return (
    <div className="mt-10">
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates..."
            className="h-11 rounded-full pl-11"
            aria-label="Search templates"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={sort === "new" ? "default" : "outline"}
            size="sm"
            onClick={() => setSort("new")}
            className="gap-1.5 rounded-full"
            aria-pressed={sort === "new"}
          >
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            New
          </Button>
          <Button
            variant={sort === "top" ? "default" : "outline"}
            size="sm"
            onClick={() => setSort("top")}
            className="gap-1.5 rounded-full"
            aria-pressed={sort === "top"}
          >
            <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            Top
          </Button>
        </div>
      </div>

      {/* Category pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
              category === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="mt-6 text-sm text-muted-foreground">
        {total} {total === 1 ? "template" : "templates"}
        {query && (
          <span className="text-foreground">
            {" "}
            for &ldquo;{query.trim()}&rdquo;
          </span>
        )}
      </p>

      {/* Community section */}
      {filteredCommunity.length > 0 && (
        <section className="mt-4">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            <Users className="h-5 w-5 text-primary" aria-hidden="true" />
            Community Templates
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCommunity.map((t) => (
              <CommunityTemplateCard key={t.templateId} {...t} />
            ))}
          </div>
        </section>
      )}

      {/* Static sections grouped by label */}
      {filteredStatic.length > 0 && (
        <section className="mt-10 space-y-10">
          {[...new Set(filteredStatic.map((t) => t.label))].map((label) => (
            <div key={label}>
              <h2 className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {label}
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredStatic
                  .filter((t) => t.label === label)
                  .map((t) => (
                    <BioTemplateCard
                      key={t.label + t.lines[0]}
                      label={t.label}
                      lines={t.lines}
                      styles={t.styles}
                    />
                  ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Empty state */}
      {total === 0 && (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-border bg-muted/30 p-10 text-center">
          <p className="text-lg font-bold text-foreground">
            No templates found
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search or category.
          </p>
          <Button
            variant="outline"
            className="mt-4 rounded-full"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
