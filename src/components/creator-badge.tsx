import {
  Sprout,
  Star,
  Flame,
  Gem,
  ShieldCheck,
  ShieldHalf,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { levelFromPoints } from "@/lib/creator";

/**
 * Creator badges - Lucide icons, no emoji.
 *
 * Structure: [icon] name  [LV chip]   - the level sits in its own small
 * chip so the name never crowds. Admin/moderator replace the whole pill
 * with a single distinct badge.
 */

const LEVEL_ICONS: Record<number, LucideIcon> = {
  1: Sprout,
  2: Star,
  3: Flame,
  4: Gem,
};

/** Just the level icon - reusable in stats, tables, headers. */
export function LevelIcon({
  level,
  className,
}: {
  level: number;
  className?: string;
}) {
  const Icon = LEVEL_ICONS[level] ?? Sprout;
  return <Icon className={className} aria-hidden="true" />;
}

function badgeName(
  username: string | null | undefined,
  name: string | null | undefined
): string {
  if (username) return username;
  return (name ?? "creator")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .slice(0, 20);
}

/** Creator badge: [icon] name [lv chip] */
export function CreatorBadge({
  username,
  name,
  points,
  role,
  className,
}: {
  username?: string | null;
  name?: string | null;
  points: number;
  role?: string | null;
  className?: string;
}) {
  const { level } = levelFromPoints(points);

  // Admin: solid, unmistakable.
  if (role === "admin") {
    return (
      <span
        className={cn(
          "inline-flex max-w-full items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-sm",
          className
        )}
      >
        <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="truncate">{badgeName(username, name)}</span>
      </span>
    );
  }

  // Moderator: outlined shield + MOD tag.
  if (role === "moderator") {
    return (
      <span
        className={cn(
          "inline-flex max-w-full items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary",
          className
        )}
      >
        <ShieldHalf className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="truncate">{badgeName(username, name)}</span>
        <span className="rounded-full bg-primary/10 px-1.5 text-[10px] font-bold">
          MOD
        </span>
      </span>
    );
  }

  // Regular creator: icon + name + level chip.
  const Icon = LEVEL_ICONS[level] ?? Sprout;
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground",
        className
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
      <span className="truncate text-foreground">{badgeName(username, name)}</span>
      <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
        lv{level}
      </span>
    </span>
  );
}
