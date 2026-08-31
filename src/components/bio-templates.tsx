"use client";

/**
 * BioTemplateCard — click the card to copy; tap the ✏️ pencil to edit.
 *
 * Every line renders in its own font: the data file stores plain text
 * plus a style id per line, and we run each line through that style's
 * transform (from your FONT_STYLES engine). In the edit modal, typed
 * plain letters are converted to the same font character-by-character;
 * already-styled characters are never touched. Nothing is saved.
 *
 * Copy feedback uses the exact same overlay + copied-fade-in animation
 * as the main generator's FontRow.
 */

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Pencil, RotateCcw, X } from "lucide-react";
import { FONT_STYLES } from "@/lib/fonts";

/* ------------------------------------------------------------------ *
 * Rendering — plain line + style id → styled line
 * ------------------------------------------------------------------ */

function renderStyled(plain: string, styleId?: string): string {
  if (!styleId) return plain;
  const style = FONT_STYLES.find((s) => s.id === styleId);
  return style ? style.transform(plain) : plain;
}

/* ------------------------------------------------------------------ *
 * Built-in fallback alphabets (for style ids missing from the registry)
 * ------------------------------------------------------------------ */

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";

function offsetAlphabet(
  lowerBase: number,
  upperBase: number,
  digitBase: number | null
): Record<string, string> {
  const map: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    map[LOWER[i]] = String.fromCodePoint(lowerBase + i);
    map[UPPER[i]] = String.fromCodePoint(upperBase + i);
  }
  if (digitBase !== null) {
    for (let i = 0; i < 10; i++) {
      map[DIGITS[i]] = String.fromCodePoint(digitBase + i);
    }
  }
  return map;
}

const SMALL_CAPS = "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ";
function smallCapsAlphabet(): Record<string, string> {
  const map: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    if (SMALL_CAPS[i] !== LOWER[i]) {
      map[LOWER[i]] = SMALL_CAPS[i];
      map[UPPER[i]] = SMALL_CAPS[i];
    }
  }
  return map;
}

function combiningAlphabet(mark: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const ch of LOWER + UPPER) map[ch] = ch + mark;
  return map;
}

const FALLBACK_STYLES: Record<string, Record<string, string>> = {
  "bold-script": offsetAlphabet(0x1d4ea, 0x1d4d0, 0x1d7ec),
  "sans-bold": offsetAlphabet(0x1d5ee, 0x1d5d4, 0x1d7ec),
  "bold": offsetAlphabet(0x1d41a, 0x1d400, 0x1d7ce),
  "fullwidth": offsetAlphabet(0xff41, 0xff21, 0xff10),
  "double-struck": offsetAlphabet(0x1d552, 0x1d538, 0x1d7d8),
  "monospace": offsetAlphabet(0x1d68a, 0x1d670, 0x1d7f6),
  "fraktur": offsetAlphabet(0x1d51e, 0x1d504, null),
  "bold-fraktur": offsetAlphabet(0x1d586, 0x1d56c, 0x1d7ec),
  "sans-serif": offsetAlphabet(0x1d5ba, 0x1d5a0, 0x1d7e2),
  "math-italic": offsetAlphabet(0x1d44e, 0x1d434, null),
  "mono-upper": smallCapsAlphabet(),
  "small-caps": smallCapsAlphabet(),
  "strikethrough": combiningAlphabet("\u0336"),
};

/* ------------------------------------------------------------------ *
 * Style resolution for typing — registry first, fallbacks second
 * ------------------------------------------------------------------ */

const PLAIN_CHARS = LOWER + UPPER + DIGITS;
const charMapCache = new Map<string, Record<string, string> | null>();

function isCombiningMark(ch: string): boolean {
  const code = ch.codePointAt(0) ?? 0;
  return (
    (code >= 0x0300 && code <= 0x036f) ||
    code === 0x0489 ||
    code === 0x20dd ||
    code === 0x20e3
  );
}

/** True if a transform works per-character (single char or char + marks). */
function isPerCharTransform(ch: string, out: string): boolean {
  const chars = [...out];
  if (chars.length === 1) return chars[0] !== ch;
  if (chars[0] === ch) return chars.slice(1).every(isCombiningMark);
  return false;
}

function getCharMap(styleId: string): Record<string, string> | null {
  const cached = charMapCache.get(styleId);
  if (cached !== undefined) return cached;

  let map: Record<string, string> | null = null;
  const style = FONT_STYLES.find((s) => s.id === styleId);

  if (style) {
    const m: Record<string, string> = {};
    for (const ch of PLAIN_CHARS) {
      const out = style.transform(ch);
      if (out !== ch && isPerCharTransform(ch, out)) m[ch] = out;
    }
    if (Object.keys(m).length > 0) map = m;
  }

  if (!map && FALLBACK_STYLES[styleId]) map = FALLBACK_STYLES[styleId];

  charMapCache.set(styleId, map);
  return map;
}

/** Auto-detect which built-in alphabet a styled line already uses. */
const DETECT_MAPS: Record<string, string>[] = [
  FALLBACK_STYLES["bold-script"],
  FALLBACK_STYLES["sans-bold"],
  FALLBACK_STYLES["bold"],
  FALLBACK_STYLES["fullwidth"],
  FALLBACK_STYLES["double-struck"],
  FALLBACK_STYLES["monospace"],
  FALLBACK_STYLES["small-caps"],
  FALLBACK_STYLES["fraktur"],
];

function detectCharMap(line: string): Record<string, string> | null {
  for (const map of DETECT_MAPS) {
    const styled = new Set(Object.values(map));
    for (const ch of line) {
      if (styled.has(ch)) return map;
    }
  }
  return null;
}

/* ------------------------------------------------------------------ *
 * Conversion — only plain typed characters convert
 * ------------------------------------------------------------------ */

function applyCharMap(
  text: string,
  map: Record<string, string> | null
): string {
  if (!map) return text;
  const chars = [...text];
  let out = "";
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const mapped = map[ch];
    if (mapped === undefined) {
      out += ch;
      continue;
    }
    const alreadyMarked =
      mapped.startsWith(ch) && isCombiningMark(chars[i + 1] ?? "");
    out += alreadyMarked ? ch : mapped;
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Edit modal
 * ------------------------------------------------------------------ */

function EditTemplateModal({
  label,
  lines,
  styles,
  onClose,
}: {
  label: string;
  lines: string[];
  styles?: string[];
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<string[]>(lines);
  const [copied, setCopied] = useState(false);

  const maps = useMemo(
    () =>
      lines.map((line, i) => {
        const styleId = styles?.[i];
        const map = styleId ? getCharMap(styleId) : null;
        // Wrapper styles (꧁༺…༻꧂) can't apply per keystroke — fall back
        // to detecting the inner alphabet so typed text still matches.
        return map ?? detectCharMap(line);
      }),
    [lines, styles]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(draft.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Edit ${label} template`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {label}
          </span>
          <button
            onClick={onClose}
            aria-label="Close editor"
            className="rounded-full p-1.5 text-muted-foreground transition hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          {draft.map((text, i) => (
            <input
              key={i}
              value={text}
              onChange={(e) => {
                const next = [...draft];
                next[i] = applyCharMap(e.target.value, maps[i]);
                setDraft(next);
              }}
              className="w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-center text-[15px] leading-relaxed text-foreground outline-none transition-colors focus:border-primary focus:bg-background"
            />
          ))}
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Each line keeps its own font. Nothing is saved.
        </p>

        <div className="mt-5 flex gap-3">
          <button
            onClick={() => setDraft(lines)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-accent hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button
            onClick={copyAll}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Card
 * ------------------------------------------------------------------ */

export function BioTemplateCard({
  label,
  lines,
  styles,
}: {
  label: string;
  lines: string[];
  styles?: string[];
}) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Plain lines → styled lines (each line in its own font)
  const styledLines = useMemo(
    () => lines.map((line, i) => renderStyled(line, styles?.[i])),
    [lines, styles]
  );

  const copyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(styledLines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <>
      <div
        onClick={copyTemplate}
        title="Click to copy"
        className="relative cursor-pointer select-none overflow-hidden rounded-2xl border border-border bg-card p-5 pt-10 text-center shadow-sm transition-shadow hover:shadow-md"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditing(true);
          }}
          aria-label={`Edit ${label} template`}
          title="Edit before copying"
          className="absolute right-3 top-3 rounded-full p-2 text-muted-foreground opacity-60 transition hover:bg-accent hover:text-primary hover:opacity-100"
        >
          <Pencil className="h-4 w-4" />
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

        {/* Copied overlay — same animation as the main generator */}
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

      {editing && (
        <EditTemplateModal
          label={label}
          lines={styledLines}
          styles={styles}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}