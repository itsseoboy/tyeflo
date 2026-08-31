"use client";

import * as React from "react";
import {
  Wand2,
  X,
  Minus,
  Plus,
  Flame,
  Snowflake,
  Gem,
  PenTool,
  Minimize2,
  Bold,
  Zap,
  Sparkles,
  Type,
  CaseSensitive,
  Settings2,
  History,
  type LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontRow } from "@/components/font-row";
import {
  FONT_CLUSTERS,
  getStylesByCluster,
  clusterFontCount,
  getCluster,
  type FontStyle,
} from "@/lib/fonts";
import { ClipboardBar } from "@/components/clipboard-bar";
import { cn } from "@/lib/utils";

const SAMPLE_TEXTS = [
  "Type something to start",
  "Hello World",
  "Stay creative",
  "Good vibes only",
  "Dream big",
  "Make it happen",
  "Be yourself",
  "Live laugh love",
];

const PREVIEW_FALLBACK = "Type something to start";

// Performance tuning:
//   INITIAL_ROWS — rendered on first paint. Small = fast hydration;
//   the rest stream in via IntersectionObserver as the user scrolls.
//   STEP_ROWS — how many more appear per scroll trigger.
const INITIAL_ROWS = 6;
const STEP_ROWS = 12;

const FONT_SIZE_DEFAULT = 17;
const FONT_SIZE_MIN = 10;
const FONT_SIZE_MAX = 32;

const STORAGE_KEY_TEXT = "tyeflo:input-text";
const STORAGE_KEY_SIZE = "tyeflo:font-size";

const TRANSFORM_CACHE = new WeakMap<FontStyle, Map<string, string>>();
const MAX_CACHED_INPUTS_PER_STYLE = 24;

function getTransformedText(style: FontStyle, source: string): string {
  let cache = TRANSFORM_CACHE.get(style);
  if (!cache) {
    cache = new Map<string, string>();
    TRANSFORM_CACHE.set(style, cache);
  }

  const cached = cache.get(source);
  if (cached !== undefined) return cached;

  const transformed = style.transform(source);

  if (cache.size >= MAX_CACHED_INPUTS_PER_STYLE) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }

  cache.set(source, transformed);
  return transformed;
}

const ICONS: Record<string, LucideIcon> = {
  Flame,
  Snowflake,
  Gem,
  PenTool,
  Minimize2,
  Bold,
  Zap,
  Sparkles,
  Type,
  CaseSensitive,
};

function clusterHref(slug: string): string {
  return slug === "Popular" ? "/" : `/${slug}`;
}

function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Flame;
  return <Icon className={className} />;
}

export function FontTool({
  initialCluster = "Popular",
}: {
  initialCluster?: string;
} = {}) {
  const [textState, setTextState] = React.useState("");
  const [fontSizeState, setFontSizeState] = React.useState(FONT_SIZE_DEFAULT);

  React.useEffect(() => {
    try {
      const storedText = window.sessionStorage.getItem(STORAGE_KEY_TEXT);
      if (storedText !== null) setTextState(storedText);

      const storedSize = window.sessionStorage.getItem(STORAGE_KEY_SIZE);
      if (storedSize !== null) {
        const parsed = Number(storedSize);
        if (Number.isFinite(parsed)) setFontSizeState(parsed);
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  const setText = React.useCallback((value: React.SetStateAction<string>) => {
    setTextState((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      try {
        window.sessionStorage.setItem(STORAGE_KEY_TEXT, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const setFontSize = React.useCallback((value: React.SetStateAction<number>) => {
    setFontSizeState((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      try {
        window.sessionStorage.setItem(STORAGE_KEY_SIZE, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const [activeCluster, setActiveCluster] = React.useState(initialCluster);
  const [visibleCount, setVisibleCount] = React.useState(INITIAL_ROWS);
  const [clipboard, setClipboard] = React.useState<string[]>([]);
  const [bulkCopied, setBulkCopied] = React.useState(false);
  const [recentlyCopied, setRecentlyCopied] = React.useState<
    { name: string; value: string }[]
  >([]);

  React.useEffect(() => {
    setVisibleCount(INITIAL_ROWS);
  }, [activeCluster]);

  /* ------------------------------------------------------------------ *
   * Infinite scroll — a sentinel div at the bottom of the font list.
   * When it enters the viewport, more rows render. Replaces the
   * "Load More" button click with natural scrolling, and keeps initial
   * hydration cheap (only INITIAL_ROWS rows exist on first paint).
   * ------------------------------------------------------------------ */
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((count) => count + STEP_ROWS);
        }
      },
      { rootMargin: "600px 0px" } // start loading just before visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [activeCluster]);

  const text = textState;
  const fontSize = fontSizeState;

  const styles: FontStyle[] = React.useMemo(
    () => getStylesByCluster(activeCluster),
    [activeCluster]
  );

  const visibleStyles = React.useMemo(
    () => styles.slice(0, visibleCount),
    [styles, visibleCount]
  );

  const hasMore = visibleCount < styles.length;

  const cluster = getCluster(activeCluster);
  const headingText = cluster ? `${cluster.name} Fonts` : "Popular Fonts";

  const source = text.trim() || PREVIEW_FALLBACK;
  const deferredSource = React.useDeferredValue(source);

  const transformedStyles = React.useMemo(
    () =>
      visibleStyles.map((style) => ({
        style,
        styled: getTransformedText(style, deferredSource),
      })),
    [visibleStyles, deferredSource]
  );

  const handleInspire = () => {
    const pick = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setText(pick);
  };

  const copyText = (value: string, name?: string) => {
    navigator.clipboard.writeText(value).catch(() => {});
    setClipboard((prev) => [value, ...prev]);
    if (name) {
      setRecentlyCopied((prev) =>
        [{ name, value }, ...prev.filter((r) => r.value !== value)].slice(0, 5)
      );
    }
  };

  const removeLastClip = () => setClipboard((prev) => prev.slice(0, -1));
  const clearClip = () => {
    setClipboard([]);
    setBulkCopied(false);
  };
  const copyAllClip = () => {
    navigator.clipboard.writeText(clipboard.join("\n")).catch(() => {});
    setBulkCopied(true);
    window.setTimeout(() => setBulkCopied(false), 1500);
  };

  const renderCategoryPill = (c: (typeof FONT_CLUSTERS)[number]) => {
    const count = clusterFontCount(c.slug);
    const isActive = activeCluster === c.slug;
    return (
      <a
        key={c.slug}
        href={clusterHref(c.slug)}
        className={cn(
          "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
          isActive
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        <CategoryIcon name={c.icon} className="h-3.5 w-3.5" />
        {c.shortName}
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
            isActive
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          {count}
        </span>
      </a>
    );
  };

  return (
    <section id="tool" className="mx-auto max-w-6xl px-4 sm:px-6" aria-label="Font generator tool">
      {/* Mobile: sticky input */}
      <div className="glass sticky top-0 z-30 -mx-4 border-b border-border px-4 py-3 sm:-mx-6 sm:px-6 lg:hidden">
        <div className="relative mx-auto max-w-3xl">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type to start…"
            className="h-12 rounded-full border-2 border-border bg-card px-5 pr-24 text-base font-medium shadow-sm focus-visible:border-primary focus-visible:ring-primary sm:h-14 sm:text-lg"
            maxLength={120}
            aria-label="Text to convert"
          />
          <div className="absolute inset-y-0 right-2 flex items-center justify-end gap-1.5">
            {text && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setText("")}
                className="h-8 w-8 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Clear text"
                title="Clear text"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleInspire}
              className="h-8 rounded-full px-2 text-muted-foreground hover:bg-accent hover:text-primary"
              aria-label="Inspire me"
              title="Inspire me"
            >
              <Wand2 className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Inspire me</span>
            </Button>
          </div>

          <div className="mx-auto mt-2 flex max-w-3xl items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setFontSize((s) => Math.max(FONT_SIZE_MIN, s - 1))}
              className="h-8 w-8 shrink-0 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label="Decrease font size"
              title="Decrease font size"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </Button>
            <input
              type="range"
              min={FONT_SIZE_MIN}
              max={FONT_SIZE_MAX}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-[var(--primary)]"
              aria-label="Adjust font size"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setFontSize((s) => Math.min(FONT_SIZE_MAX, s + 1))}
              className="h-8 w-8 shrink-0 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label="Increase font size"
              title="Increase font size"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop: sidebar + main column */}
      <div className="flex gap-6 py-5">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-4">
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground" id="font-category-label">
              Select a font style
            </p>
            <nav className="space-y-0.5" aria-labelledby="font-category-label">
              {FONT_CLUSTERS.map((c) => {
                const count = clusterFontCount(c.slug);
                const isActive = activeCluster === c.slug;
                return (
                  <a
                    key={c.slug}
                    href={clusterHref(c.slug)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <CategoryIcon name={c.icon} className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left">{c.name}</span>
                    <span
                      className={cn(
                        "text-xs",
                        isActive
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      )}
                    >
                      {count}
                    </span>
                  </a>
                );
              })}
            </nav>

            {recentlyCopied.length > 0 && (
              <div className="mt-6 rounded-xl border border-border bg-card p-3">
                <p className="mb-2 flex items-center gap-1.5 px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <History className="h-3.5 w-3.5" />
                  Recently Copied
                </p>
                <div className="space-y-1">
                  {recentlyCopied.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => copyText(r.value, r.name)}
                      className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-xs hover:bg-accent"
                      title={r.value}
                    >
                      <span className="truncate text-foreground">{r.value}</span>
                      <span className="shrink-0 text-muted-foreground">{r.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Desktop: sticky input */}
          <div className="sticky top-4 z-30 mb-5 hidden lg:block">
            <div className="relative">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type to start…"
                className="h-14 rounded-full border-2 border-border bg-card px-6 pr-44 text-lg font-medium shadow-sm focus-visible:border-primary focus-visible:ring-primary"
                maxLength={120}
                aria-label="Text to convert"
              />
              <div className="absolute inset-y-0 right-2 flex items-center justify-end gap-1.5">
                {text && (
                  <span className="text-xs tabular-nums text-muted-foreground" aria-live="polite">
                    {text.length}/120
                  </span>
                )}
                {text && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setText("")}
                    className="h-8 w-8 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                    aria-label="Clear text"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleInspire}
                  className="h-9 rounded-full text-muted-foreground hover:bg-accent hover:text-primary"
                  aria-label="Inspire me"
                  title="Inspire me"
                >
                  <Wand2 className="h-4 w-4" aria-hidden="true" />
                  <span>Inspire me</span>
                </Button>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFontSize((s) => Math.max(FONT_SIZE_MIN, s - 1))}
                className="h-8 w-8 shrink-0 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Decrease font size"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </Button>
              <input
                type="range"
                min={FONT_SIZE_MIN}
                max={FONT_SIZE_MAX}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-[var(--primary)]"
                aria-label="Adjust font size"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFontSize((s) => Math.min(FONT_SIZE_MAX, s + 1))}
                className="h-8 w-8 shrink-0 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Increase font size"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Mobile category pills */}
          <nav
            className="mx-4 mb-4 flex items-center gap-2 overflow-x-auto px-4 pb-2"
            aria-label="Font categories"
          >
            {FONT_CLUSTERS.map(renderCategoryPill)}
            <button
              className="flex shrink-0 items-center justify-center rounded-full border border-border bg-card p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              aria-label="Font settings"
            >
              <Settings2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </nav>

          {/* Mobile heading */}
          <div className="mb-3 flex items-center justify-between lg:hidden">
            <h2 className="text-lg font-bold text-foreground">{headingText}</h2>
            <span className="text-xs text-muted-foreground">
              {visibleStyles.length} of {styles.length}
            </span>
          </div>

          {/* Desktop heading */}
          <div className="mb-3 hidden items-center justify-between lg:flex">
            <div className="flex items-baseline gap-3">
              <h2 className="text-xl font-bold text-foreground">{headingText}</h2>
              <span className="text-sm text-muted-foreground">
                {styles.length} styles available
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {visibleStyles.length} of {styles.length} shown
            </span>
          </div>

          {/* Font rows */}
          <div className="space-y-1.5">
            {transformedStyles.map(({ style, styled }) => (
              <FontRow
                key={style.id}
                name={style.name}
                category={style.category}
                styled={styled}
                onCopy={() => copyText(styled, style.name)}
                fontSize={fontSize}
              />
            ))}
          </div>

          {/* Infinite-scroll sentinel — starts loading 600px before
              becoming visible, so rows always arrive in time. */}
          {hasMore && (
            <div ref={sentinelRef} className="h-1 w-full" aria-hidden="true" />
          )}

          {/* Fallback for no-JS/observer-failure edge cases */}
          {hasMore && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8"
                onClick={() => setVisibleCount((c) => c + STEP_ROWS)}
              >
                Load More Fonts
              </Button>
            </div>
          )}

          <ClipboardBar
            items={clipboard}
            copied={bulkCopied}
            onRemoveLast={removeLastClip}
            onClear={clearClip}
            onCopyAll={copyAllClip}
          />
        </div>
      </div>
    </section>
  );
}
