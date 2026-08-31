import {
  Sprout,
  Star,
  Flame,
  Gem,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { levelFromPoints } from "@/lib/creator";

/**
 * Creator badges - Lucide icons, no emoji.
 * Level icons: 1 Sprout - 2 Star - 3 Flame - 4 Gem
 * Admins get a Shield badge that outranks level badges.
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

/**
 * Full badge pill:
 *   Admin:   [shield] name ADMIN
 *   Creator: [flame] name-lv3
 */
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
  // Admin badge takes priority over level badges.
  if (role === "admin") {
    return (
      <span
        className={cn(
          "inline-flex max-w-full items-center gap-1.5 rounded-full border border-primary bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground",
          className
        )}
      >
        <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="truncate">{badgeName(username, name)}</span>
      </span>
    );
  }

  const { level } = levelFromPoints(points);
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary",
        className
      )}
    >
      <LevelIcon level={level} className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">
        {badgeName(username, name)}-lv{level}
      </span>
    </span>
  );
}
