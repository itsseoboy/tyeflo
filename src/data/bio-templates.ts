/**
 * Shared bio-template data.
 *
 * lines  = PLAIN text (one entry per bio row)
 * styles = font style id from src/lib/fonts.ts (FONT_STYLES), one per line.
 *
 * The card renders each line through its style's transform, so every
 * line appears in its own font — and the edit modal converts typed
 * letters to the same font. Keep styles the same length as lines.
 */

export interface BioTemplate {
  label: string;
  lines: string[];
  styles: string[];
}

export const HOMEPAGE_BIO_TEMPLATES: BioTemplate[] = [
  {
    label: "Aesthetic Instagram",
    lines: [
      "soft era ⋆˙",
      "🌿 plant mom | ☕ coffee",
      "⟡ living slowly on purpose",
      "📷 @yourhandle",
    ],
    styles: ["bold-script", "math-italic", "monospace", "mono-upper"],
  },
  {
    label: "Gaming Tag",
    lines: [
      "DRAGON",
      "🎮 Free Fire • PUBG • Valorant",
      "⚔️ Rank: Mythic",
      "💬 DM for duo queue",
    ],
    styles: ["gaming-skull", "sans-bold", "bold-fraktur", "fullwidth"],
  },
  {
    label: "Cute / Kawaii",
    lines: [
      "(｡･ω･｡)ﾉ♡",
      "🍓 small & sweet",
      "☁️ daydream collector",
      "✨ be kind, be cozy",
    ],
    styles: ["mono-upper", "bold-script", "circled", "double-struck"],
  },
  {
    label: "LinkedIn Bio",
    lines: [
      "Senior Product Designer",
      "Building tools people love.",
      "🚀 ex-Startup • ex-BigTech",
      "📍 Bengaluru · she/her",
    ],
    styles: ["sans-bold", "bold", "monospace", "mono-upper"],
  },
  {
    label: "Glitch / Discord",
    lines: [
      "Zalgo Mode",
      "💿 404: bio not found",
      "⚡ night owl + glitch head",
      "🗡️ prefers dark mode",
    ],
    styles: ["glitch-heavy", "strikethrough", "fullwidth", "fraktur"],
  },
  {
    label: "Small / Minimal",
    lines: [
      "tiny but mighty",
      "• reader • walker • tea",
      "· keeping it simple",
      "@tinyhandle",
    ],
    styles: ["mono-upper", "superscript", "sans-serif", "math-italic"],
  },
];

export const MORE_BIO_TEMPLATES: BioTemplate[] = [
  {
    label: "Aesthetic Instagram",
    lines: [
      "moon child 🌙",
      "✧ indie music + iced lattes ✧",
      "「 living softly 」",
      "📷 @moonchild",
    ],
    styles: ["bold-script", "math-italic", "monospace", "mono-upper"],
  },
  {
    label: "Aesthetic Instagram",
    lines: [
      "golden hours ✿",
      "sunsets & soft playlists",
      "— stay golden —",
      "🌴 slow living",
    ],
    styles: ["bold-script", "math-italic", "monospace", "mono-upper"],
  },
  {
    label: "Gaming Tag",
    lines: [
      "KRONOS",
      "🔫 headshot machine",
      "clan: [TYEFLO]",
      "💬 DM for squad",
    ],
    styles: ["gaming-royal", "sans-bold", "bold-fraktur", "fullwidth"],
  },
  {
    label: "Gaming Tag",
    lines: [
      "NOVA",
      "Minecraft • Roblox • Fortnite",
      "🛡️ tank main",
      "⚡ 24/7 grinding",
    ],
    styles: ["gaming-star", "sans-bold", "bold-fraktur", "fullwidth"],
  },
  {
    label: "Cute / Kawaii",
    lines: [
      "(๑ᵔ⤙ᵔ๑) nugget",
      "🎀 certified cutie pie",
      "⊹˚₊ soft girl era ₊˚⊹",
      "🍓 @nugget",
    ],
    styles: ["mono-upper", "bold-script", "circled", "double-struck"],
  },
  {
    label: "Cute / Kawaii",
    lines: [
      "♡ pastel princess ♡",
      "milk & cookies uwu",
      "ɞ angel baby ɞ",
      "☁️ @pastel",
    ],
    styles: ["mono-upper", "bold-script", "circled", "double-struck"],
  },
  {
    label: "LinkedIn Bio",
    lines: [
      "Growth Marketer",
      "Turning data into revenue 📈",
      "SaaS • B2B • Content",
      "📍 Remote · open to work",
    ],
    styles: ["sans-bold", "bold", "monospace", "mono-upper"],
  },
  {
    label: "LinkedIn Bio",
    lines: [
      "Full-Stack Developer",
      "Building in public 🚀",
      "React • Node • TypeScript",
      "💻 Portfolio below ⬇",
    ],
    styles: ["sans-bold", "bold", "monospace", "mono-upper"],
  },
  {
    label: "Glitch / Discord",
    lines: [
      "error_404",
      "not human.exe",
      "🩸 corrupted by the void",
      "discord.gg/glitch",
    ],
    styles: ["fullwidth", "strikethrough", "glitch-heavy", "monospace"],
  },
  {
    label: "Glitch / Discord",
    lines: [
      "░▒▓ VOID ▓▒░",
      "system failure",
      "🌑 prefers dark mode",
      "status: offline forever",
    ],
    styles: ["fraktur", "strikethrough", "glitch-heavy", "fullwidth"],
  },
  {
    label: "Small / Minimal",
    lines: [
      "less but better",
      "doing nothing",
      "☕ + 🎧 + 📚",
      "@lessmore",
    ],
    styles: ["mono-upper", "superscript", "sans-serif", "math-italic"],
  },
  {
    label: "Small / Minimal",
    lines: [
      "just vibes",
      "no thoughts · head empty",
      "· take care ·",
      "@justvibes",
    ],
    styles: ["mono-upper", "superscript", "sans-serif", "math-italic"],
  },
];

export const ALL_BIO_TEMPLATES: BioTemplate[] = [
  ...HOMEPAGE_BIO_TEMPLATES,
  ...MORE_BIO_TEMPLATES,
];