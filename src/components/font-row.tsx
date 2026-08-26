"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FontRowProps {
  name: string;
  category: string;
  styled: string;
  onCopy: () => void;
  fontSize?: number;
}

/**
 * FontRow — a single styled font preview row.
 *
 * Memoized with React.memo to prevent unnecessary re-renders when the
 * parent's `text` state changes but this row's `styled` output hasn't
 * (e.g., when typing characters that don't affect this particular font
 * transform). The comparison checks `styled`, `name`, `category`, and
 * `fontSize` — if none changed, the row skips re-rendering.
 *
 * Accessibility:
 * - role="button" with descriptive aria-label
 * - focus-visible ring for keyboard navigation
 * - disabled state when no text to copy
 * - aria-live="polite" announces copy status to screen readers
 */
export const FontRow = React.memo(function FontRow({
  name,
  category,
  styled,
  onCopy,
  fontSize = 15,
}: FontRowProps) {
  const [copied, setCopied] = React.useState(false);

  const handleClick = React.useCallback(() => {
    if (!styled.trim()) return;
    onCopy();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }, [styled, onCopy]);

  const empty = !styled.trim();

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={empty}
      className={cn(
        "group relative mb-1.5 block w-full overflow-hidden rounded-xl border border-border/50 bg-card px-4 py-3.5 text-left transition-all duration-200 hover:border-primary/30 hover:shadow-md last:mb-0 sm:px-5 sm:py-4",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
      aria-label={`Copy ${name} font: ${Array.from(styled).slice(0, 40).join("")}${Array.from(styled).length > 40 ? "…" : ""}`}
    >
      {/* Preview text */}
      <p
        className="no-scrollbar whitespace-nowrap leading-snug"
        style={{ fontSize: `${fontSize}px` }}
        dir="auto"
      >
        <span className={cn(empty ? "text-muted-foreground/50" : "text-foreground")}>
          {empty ? "Type to preview…" : styled}
        </span>
      </p>

      {/* Metadata — bolder name, subtle category */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs font-bold text-foreground">
          {name}
        </span>
        <span className="text-xs text-muted-foreground/60" aria-hidden="true">·</span>
        <span className="text-[11px] uppercase tracking-wide text-primary/60">
          {category}
        </span>
      </div>

      {/* Copied overlay — announced to screen readers */}
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
    </button>
  );
},
(prev, next) =>
  prev.styled === next.styled &&
  prev.name === next.name &&
  prev.category === next.category &&
  prev.fontSize === next.fontSize
);
