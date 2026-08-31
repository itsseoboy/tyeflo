"use client";

/**
 * TemplateBuilder - the creation studio.
 *
 * Creators type up to 6 lines, pick a font for each line from the
 * FONT_STYLES registry, see a live preview, and publish. Publishing
 * runs the server-side moderation checkpoint; on success the
 * dashboard refreshes with the new points total.
 *
 * Fonts whose output contains combining marks (glitch, strikethrough...)
 * are excluded from the picker: they paste badly into real bios and
 * would be rejected by moderation anyway.
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Rocket, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FONT_STYLES, type FontStyle } from "@/lib/fonts";
import { TEMPLATE_LABELS } from "@/lib/creator";

/** Same combining-mark range moderation rejects. */
const COMBINING_MARKS = /[\u0300-\u036f]/;

function isPublishableFont(style: FontStyle): boolean {
  return !COMBINING_MARKS.test(style.transform("sample"));
}

/* Group publishable styles by category for the dropdowns. */
const STYLES_BY_CATEGORY = (() => {
  const groups = new Map<string, FontStyle[]>();
  for (const style of FONT_STYLES) {
    if (style.id.startsWith("pop-")) continue; // avoid duplicates
    if (!isPublishableFont(style)) continue; // combining marks
    const bucket = groups.get(style.category);
    if (bucket) bucket.push(style);
    else groups.set(style.category, [style]);
  }
  return Array.from(groups.entries());
})();

const MAX_LINES = 6;

interface DraftLine {
  text: string;
  styleId: string;
}

const STARTING_LINES: DraftLine[] = [
  { text: "", styleId: "bold-script" },
  { text: "", styleId: "monospace" },
  { text: "", styleId: "small-caps" },
];

/** Render one preview line through its style transform. */
function renderLine(text: string, styleId: string): string {
  if (!text.trim()) return "";
  const style = FONT_STYLES.find((s) => s.id === styleId);
  return style ? style.transform(text) : text;
}

export function TemplateBuilder() {
  const router = useRouter();

  const [label, setLabel] = React.useState<string>(TEMPLATE_LABELS[0]);
  const [lines, setLines] = React.useState<DraftLine[]>(STARTING_LINES);
  const [publishing, setPublishing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const updateLine = (index: number, patch: Partial<DraftLine>) => {
    setLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, ...patch } : line))
    );
  };

  const addLine = () => {
    if (lines.length >= MAX_LINES) return;
    setLines((prev) => [...prev, { text: "", styleId: "monospace" }]);
  };

  const removeLine = (index: number) => {
    if (lines.length <= 1) return;
    setLines((prev) => prev.filter((_, i) => i !== index));
  };

  const filledLines = lines.filter((l) => l.text.trim().length > 0);
  const canPublish = filledLines.length >= 1 && !publishing && !success;

  const publish = async () => {
    setError(null);
    setPublishing(true);

    // Only send non-empty lines (keep text + style pairs aligned).
    const payloadLines = filledLines.map((l) => l.text.trim());
    const payloadStyles = filledLines.map((l) => l.styleId);

    try {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label,
          lines: payloadLines,
          styles: payloadStyles,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      setSuccess(true);
      // Refresh the server component so points/stats update.
      router.refresh();
    } catch {
      setError("Network error - check your connection and try again.");
    } finally {
      setPublishing(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Rocket className="h-7 w-7 text-primary" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-xl font-bold text-foreground">
          Template published!
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          +10 creator points added. Your template is live in the community
          section - build another?
        </p>
        <Button
          onClick={() => {
            setSuccess(false);
            setLines(STARTING_LINES.map((l) => ({ ...l })));
          }}
          className="mt-6 gap-2 rounded-full"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Create another
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-bold text-foreground">Template Builder</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Write up to {MAX_LINES} lines, give each its own font, publish.
      </p>

      {/* Category picker */}
      <div className="mt-5">
        <label
          htmlFor="template-category"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Category
        </label>
        <Select value={label} onValueChange={setLabel}>
          <SelectTrigger id="template-category" className="w-full">
            <SelectValue placeholder="Pick a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {TEMPLATE_LABELS.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Line editor */}
      <div className="mt-5 space-y-4">
        {lines.map((line, index) => (
          <div key={index} className="rounded-xl border border-border p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {index + 1}
              </span>
              <Input
                value={line.text}
                onChange={(e) => updateLine(index, { text: e.target.value })}
                maxLength={80}
                placeholder={`Line ${index + 1} - type your text`}
                className="flex-1"
                aria-label={`Line ${index + 1} text`}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeLine(index)}
                disabled={lines.length <= 1}
                className="shrink-0 text-muted-foreground hover:text-destructive"
                aria-label={`Remove line ${index + 1}`}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            {/* Font picker for this line */}
            <div className="mt-3">
              <Select
                value={line.styleId}
                onValueChange={(value) => updateLine(index, { styleId: value })}
              >
                <SelectTrigger className="w-full" aria-label={`Font for line ${index + 1}`}>
                  <SelectValue placeholder="Pick a font" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {STYLES_BY_CATEGORY.map(([category, styles]) => (
                    <SelectGroup key={category}>
                      <SelectLabel>{category}</SelectLabel>
                      {styles.map((style) => (
                        <SelectItem key={style.id} value={style.id}>
                          {style.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              {/* Mini live preview of this line */}
              {line.text.trim() && (
                <p className="mt-2 truncate rounded-lg bg-muted/50 px-3 py-2 text-sm text-foreground">
                  {renderLine(line.text, line.styleId)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {lines.length < MAX_LINES && (
        <Button
          variant="outline"
          onClick={addLine}
          className="mt-4 w-full gap-2 rounded-xl border-dashed"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add line
        </Button>
      )}

      {/* Full preview card - exactly how it will look published */}
      {filledLines.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Preview
          </p>
          <div className="rounded-2xl border border-border bg-background p-5 pt-8 text-center">
            <div className="space-y-1.5">
              {filledLines.map((line, i) => (
                <p
                  key={i}
                  className="break-words text-[15px] leading-relaxed text-foreground"
                >
                  {renderLine(line.text, line.styleId)}
                </p>
              ))}
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {label}
            </p>
          </div>
        </div>
      )}

      {/* Error / publish */}
      {error && (
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <Button
        onClick={publish}
        disabled={!canPublish}
        size="lg"
        className="mt-6 w-full gap-2 rounded-full"
      >
        {publishing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Publishing...
          </>
        ) : (
          <>
            <Rocket className="h-4 w-4" aria-hidden="true" />
            Publish template (+10 points)
          </>
        )}
      </Button>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Templates are checked automatically before publishing - keep it clean.
      </p>
    </div>
  );
}
