/**
 * Creator levels, points, handles & template labels.
 *
 * Level is ALWAYS computed from points — never stored — so it can never
 * fall out of sync with the database.
 */

export const POINTS_PER_TEMPLATE = 10;

/** The fixed template categories creators can publish under. */
export const TEMPLATE_LABELS = [
  "Aesthetic Instagram",
  "Gaming Tag",
  "Cute / Kawaii",
  "LinkedIn Bio",
  "Glitch / Discord",
  "Small / Minimal",
] as const;

export type TemplateLabel = (typeof TEMPLATE_LABELS)[number];

export interface LevelInfo {
  level: number;
  /** Points required to reach this level */
  min: number;
  /** Lucide icon name — mapped to a component in creator-badge.tsx */
  icon: "Sprout" | "Star" | "Flame" | "Gem";
}

export const LEVELS: LevelInfo[] = [
  { level: 1, min: 0, icon: "Sprout" },
  { level: 2, min: 100, icon: "Star" },
  { level: 3, min: 500, icon: "Flame" },
  { level: 4, min: 1000, icon: "Gem" },
];

/** Resolve the level a given points total belongs to. */
export function levelFromPoints(points: number): LevelInfo {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (points >= l.min) current = l;
  }
  return current;
}

/** Points needed for the next level — null when maxed. */
export function nextLevelAt(points: number): number | null {
  for (const l of LEVELS) {
    if (points < l.min) return l.min;
  }
  return null;
}

/**
 * Creator handle shown on badges, e.g. "muzamil".
 * Lowercase, spaces → hyphens, capped at 20 characters.
 */
export function creatorHandle(name: string | null | undefined): string {
  return (name ?? "creator")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .slice(0, 20);
}
