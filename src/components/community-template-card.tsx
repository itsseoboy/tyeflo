"use client";

/**
 * CommunityTemplateCard - a template published by a creator.
 *
 * Click the card to copy (same overlay animation as the generator).
 * Creator level badge sits top-left, report button top-right.
 * Templates with 5+ reports are hidden automatically by the page query.
 */

import * as React from "react";
import { Check, Flag } from "lucide-react";
import { FONT_STYLES } from "@/lib/fonts";
import { CreatorBadge } from "@/components/creator-badge";

function renderStyled(plain: string, styleId?: string): string {
  if (!styleId) return plain;
  const style = FONT_STYLES.find((s) => s.id === styleId);
  return style ? style.transform(plain) : plain;
}

export function CommunityTemplateCard({
  templateId,
  label,
  lines,
  styles,
  creatorName,
  creatorUsername,
  creatorPoints,
}: {
  templateId: string;
  label: string;
  lines: string[];
  styles: string[];
  creatorName: string | null;
  creatorUsername: string | null;
  creatorPoints: number;
}) {
  const [copied, setCopied] = React.useState(false);
  const [reportState, setReportState] = React.useState<
    "idle" | "sending" | "done"
  >("idle");

  const styledLines = React.useMemo(
    () => lines.map((line, i) => renderStyled(line, styles[i])),
    [lines, styles]
  );

  const copyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(styledLines.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const report = async () => {
    setReportState("sending");
    try {
      const res = await fetch("/api/templates/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });

      if (res.status === 401) {
        // Sign-in needed - take them to the Creator Lab gate.
        window.location.href = "/bio-templates/creator-lab";
        return;
      }

      if (!res.ok) throw new Error("failed");
      setReportState("done");
    } catch {
      // Allow retry on failure.
      setReportState("idle");
    }
  };

  return (
    <div
      onClick={copyTemplate}
      title="Click to copy"
      className="relative cursor-pointer select-none overflow-hidden rounded-2xl border border-border bg-card p-5 pt-10 text-center shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Creator badge - top left */}
      <CreatorBadge
        username={creatorUsername}
        name={creatorName}
        points={creatorPoints}
        className="absolute left-3 top-3"
      />

      {/* Report - top right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (reportState === "idle") report();
        }}
        aria-label="Report this template"
        title={
          reportState === "done"
            ? "Reported - thanks for helping"
            : "Report this template"
        }
        className="absolute right-3 top-3 rounded-full p-2 text-muted-foreground opacity-60 transition hover:bg-accent hover:text-destructive hover:opacity-100"
      >
        {reportState === "done" ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Flag className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

      <div className="space-y-1.5">
        {styledLines.map((line, i) => (
          <p
            key={i}
            className="break-words text-[15px] leading-relaxed text-foreground"
          >
            {line}
          </p>
        ))}
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>

      {/* Copied overlay - same animation as the main generator */}
      {copied && (
        <span
          className="copied-fade-in pointer-events-none absolute inset-0 flex items-center justify-center bg-card/80"
          role="status"
          aria-live="polite"
        >
          <span className="flex items-center gap-1.5 text-lg font-bold text-primary sm:text-2xl">
            <Check className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            Copied
          </span>
        </span>
      )}
    </div>
  );
}
