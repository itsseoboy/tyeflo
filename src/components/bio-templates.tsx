"use client";

import * as React from "react";
import { Check } from "lucide-react";

/**
 * BioTemplateCard — click ANYWHERE on the card to copy.
 * Shows a "Copied" overlay with smooth animation.
 */
export function BioTemplateCard({
  label,
  lines,
}: {
  label: string;
  lines: string[];
}) {
  const [copied, setCopied] = React.useState(false);

  const handleClick = async () => {
    const text = lines.join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* silent fallback */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="card-3d relative block w-full overflow-hidden rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-primary/40 hover:shadow-md active:scale-[0.98]"
      aria-label={`Click to copy ${label} template`}
    >
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">
        {label}
      </h3>
      <ul className="space-y-1.5 text-sm text-foreground">
        {lines.map((line, i) => (
          <li key={i} className="font-sans">
            {line}
          </li>
        ))}
      </ul>

      {/* Copied overlay — fades + scales in centered */}
      {copied && (
        <span className="copied-fade-in pointer-events-none absolute inset-0 flex items-center justify-center bg-card/80">
          <span className="flex items-center gap-1.5 text-lg font-bold text-primary">
            <Check className="h-5 w-5" />
            Copied
          </span>
        </span>
      )}
    </button>
  );
}
