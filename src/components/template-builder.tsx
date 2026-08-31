"use client";

/**
 * TemplateBuilder - the creation studio.
 *
 * One flat card, no nested boxes: each line is a numbered input row
 * with its font dropdown beside it, joined by a slim rail. The styled
 * preview renders inline as ghost text under the input while typing.
 * Publishing runs the server-side moderation checkpoint.
 *
 * Fonts whose output contains combining marks (glitch, strikethrough...)
 * are excluded: they paste badly into real bios.
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Rocket, Loader2, AlertCircle } from "lucide-react";
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
import { cn } from "@/lib/utils";

/** Same combining-mark range moderation rejects. */
const COMBINING_MARKS = /[\u0300-\u036f]/;

function isPublishableFont(style: FontStyle): boolean {
  return !COMBINING_MARKS.test(style.transform("sample"));
}

/* Group publishable styles by category for the dropdowns. */
const STYLES_BY_CATEGORY = (() => {
  const groups = new Map<string, FontStyle[]>();
  for (const style of FONT_STYLES) {
    if (style.id.startsWith("pop-")) continue;
    if (!isPublishableFont(style)) continue;
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
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      {/* Header row: title + category picker side by side */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">
            Template Builder
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Up to {MAX_LINES} lines, each with its own font.
          </p>
        </div>

        <div className="w-full sm:w-52">
          <Select value={label} onValueChange={setLabel}>
            <SelectTrigger className="w-full" aria-label="Template category">
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
      </div>

      <div className="my-6 h-px bg-border" />

      {/* Lines - flat list, no nested boxes */}
      <div className="space-y-1">
        {lines.map((line, index) => (
          <div
            key={index}
            className="group relative flex items-start gap-3 rounded-lg py-2 pr-1 transition-colors hover:bg-muted/40"
          >
            {/* Line number on a slim rail */}
            <div className="flex flex-col items-center pt-2.5">
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                  line.text.trim()
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index + 1}
              </span>
              {index < lines.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-border" />
              )}
            </div>

            {/* Input + inline styled preview */}
            <div className="min-w-0 flex-1">
              <Input
                value={line.text}
                onChange={(e) => updateLine(index, { text: e.target.value })}
                maxLength={80}
                placeholder={`Line ${index + 1} text`}
                className="h-10 rounded-lg border-transparent bg-transparent px-2 font-medium shadow-none focus-visible:bg-background focus-visible:ring-0 sm:h-11"
                aria-label={`Line ${index + 1} text`}
              />
              {/* Inline live preview - ghost text under the input */}
              {line.text.trim() && (
                <p className="mt-0.5 truncate px-2 text-sm text-muted-foreground/70">
                  {renderLine(line.text, line.styleId)}
                </p>
              )}
            </div>

            {/* Font picker */}
            <div className="w-36 shrink-0 pt-0.5 sm:w-44">
              <Select
                value={line.styleId}
                onValueChange={(value) => updateLine(index, { styleId: value })}
              >
                <SelectTrigger
                  className="h-10 rounded-lg border-transparent bg-transparent text-xs font-medium text-muted-foreground shadow-none hover:bg-background focus-visible:ring-0 sm:h-11 sm:text-sm"
                  aria-label={`Font for line ${index + 1}`}
                >
                  <SelectValue placeholder="Font" />
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
            </div>

            {/* Remove - subtle, hover only */}
            <button
              onClick={() => removeLine(index)}
              disabled={lines.length <= 1}
              className={cn(
                "mt-1.5 rounded-full p-1.5 text-muted-foreground/0 transition-all group-hover:text-muted-foreground hover:bg-accent hover:text-destructive",
                "disabled:cursor-not-allowed disabled:group-hover:text-muted-foreground/30"
              )}
              aria-label={`Remove line ${index + 1}`}
              title="Remove line"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>

      {/* Add line - ghost button, no border box */}
      {lines.length < MAX_LINES && (
        <button
          onClick={addLine}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add line
        </button>
      )}

      <div className="my-6 h-px bg-border" />

      {/* Full preview - exactly how it publishes */}
      {filledLines.length > 0 && (
        <div className="mb-6">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Preview
          </p>
          <div className="relative rounded-2xl border border-border bg-background p-5 pt-10 text-center">
            <span className="absolute left-3 top-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              {label}
            </span>
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
          </div>
        </div>
      )}

      {/* Error / publish */}
      {error && (
        <p className="mb-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <Button
        onClick={publish}
        disabled={!canPublish}
        size="lg"
        className="w-full gap-2 rounded-full"
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
