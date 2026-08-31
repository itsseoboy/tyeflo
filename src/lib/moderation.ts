/**
 * Content moderation — the publish checkpoint.
 *
 * Every template passes through checkTemplate() before it can be saved.
 * Runs on the SERVER (in the API route), never trusted from the client.
 *
 * Layered checks:
 *   1. Length & shape limits   (spam, empty lines, wrong counts)
 *   2. Normalized text filter  (banned words, even with fancy Unicode)
 *   3. URL/link rejection      (no promo spam in bios)
 *   4. Character-set allowlist (no invisible chars / zalgo bombs)
 *
 * Unicode trick this defeats: writing banned words in style alphabets,
 * e.g. "𝓫𝓪𝓭" — normalize() converts style characters back to plain
 * letters before the word list is checked.
 */

/* ------------------------------------------------------------------ *
 * 1. Banned words — add entries freely, all lowercase.
 *    Sourced from common profanity lists; extend as you learn what
 *    your audience actually tries to publish.
 * ------------------------------------------------------------------ */

const BANNED_WORDS: string[] = [
  // English profanity (core list)
  "fuck", "shit", "bitch", "asshole", "bastard", "dick", "pussy",
  "slut", "whore", "cunt", "nigger", "nigga", "faggot", "retard",
  "rape", "sex", "porn", "nude", "naked", "horny", "sexy",
  // Drugs & self-harm
  "drug", "cocaine", "weed", "heroin", "kill myself", "suicide",
  "kys", "self harm", "cut myself",
  // Hate & harassment
  "hate you", "nazi", "hitler", "terrorist", "isis",
  // Spam / scam patterns
  "free follower", "buy follower", "free robux", "crypto giveaway",
  "click here", "subscribe", "onlyfans", "telegram me", "whatsapp me",
  // Common Hindi/Urdu abuses (transliterated)
  "madarchod", "behenchod", "bhosdi", "chutiya", "gandu", "harami",
  "kutta", "kutti", "randi", "saala", "saali", "tatti",
];

/* ------------------------------------------------------------------ *
 * 2. Style-alphabet → plain-text normalization
 *    Converts fancy Unicode (bold, script, fullwidth, circled...) back
 *    to plain a-z so word filters can't be bypassed with styling.
 * ------------------------------------------------------------------ */

const STYLE_BASES: Array<[number, number, number | null]> = [
  // [upperBase, lowerBase, digitBase] for common math alphanumerics
  [0x1d400, 0x1d41a, 0x1d7ce], // bold
  [0x1d434, 0x1d44e, null],    // italic
  [0x1d468, 0x1d482, 0x1d7ec], // bold italic
  [0x1d49c, 0x1d4b6, null],    // script
  [0x1d4d0, 0x1d4ea, 0x1d7ec], // bold script
  [0x1d504, 0x1d51e, null],    // fraktur
  [0x1d56c, 0x1d586, 0x1d7ec], // bold fraktur
  [0x1d538, 0x1d552, 0x1d7d8], // double-struck
  [0x1d5a0, 0x1d5ba, 0x1d7e2], // sans
  [0x1d5d4, 0x1d5ee, 0x1d7ec], // sans bold
  [0x1d608, 0x1d622, null],    // sans italic
  [0x1d63c, 0x1d656, 0x1d7ec], // sans bold italic
  [0x1d670, 0x1d68a, 0x1d7f6], // monospace
  [0xff21, 0xff41, 0xff10],    // fullwidth
];

const CIRCLED_UPPER = 0x24b6;
const CIRCLED_LOWER = 0x24d0;

/** Convert style-alphabet characters back to plain ASCII. */
export function normalizeStyledText(text: string): string {
  let out = "";
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    let mapped: string | null = null;

    for (const [upperBase, lowerBase, digitBase] of STYLE_BASES) {
      if (code >= upperBase && code < upperBase + 26) {
        mapped = String.fromCharCode(65 + code - upperBase);
        break;
      }
      if (code >= lowerBase && code < lowerBase + 26) {
        mapped = String.fromCharCode(97 + code - lowerBase);
        break;
      }
      if (digitBase !== null && code >= digitBase && code < digitBase + 10) {
        mapped = String.fromCharCode(48 + code - digitBase);
        break;
      }
    }

    if (!mapped) {
      if (code >= CIRCLED_UPPER && code < CIRCLED_UPPER + 26) {
        mapped = String.fromCharCode(65 + code - CIRCLED_UPPER);
      } else if (code >= CIRCLED_LOWER && code < CIRCLED_LOWER + 26) {
        mapped = String.fromCharCode(97 + code - CIRCLED_LOWER);
      }
    }

    out += mapped ?? ch;
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * 3. The checks
 * ------------------------------------------------------------------ */

export interface ModerationResult {
  ok: boolean;
  /** User-facing message when rejected. */
  reason?: string;
}

/** Strip everything that isn't a letter/digit/space, lowercase it. */
function toSearchable(text: string): string {
  return normalizeStyledText(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const URL_PATTERN =
  /(https?:\/\/|www\.|\.com\b|\.net\b|\.org\b|\.xyz\b|\.io\b|t\.me\b|bit\.ly\b)/i;

const INVISIBLE_OR_ZALGO = /[\u0300-\u036f\u200b-\u200f\u2028\u2029\u2060\ufeff]/;

export function checkTemplate(input: {
  label: string;
  lines: string[];
  styles: string[];
}): ModerationResult {
  const { label, lines, styles } = input;

  // --- Shape checks ---
  if (!label || label.length > 60) {
    return { ok: false, reason: "Pick a valid template category." };
  }
  if (!Array.isArray(lines) || lines.length < 1 || lines.length > 6) {
    return { ok: false, reason: "Templates need 1 to 6 lines." };
  }
  if (!Array.isArray(styles) || styles.length !== lines.length) {
    return { ok: false, reason: "Font selection is invalid." };
  }
  for (const line of lines) {
    if (typeof line !== "string") {
      return { ok: false, reason: "Invalid line content." };
    }
    if (line.trim().length === 0) {
      return { ok: false, reason: "Every line needs some text." };
    }
    if (line.length > 80) {
      return { ok: false, reason: "Keep each line under 80 characters." };
    }
  }

  // --- Invisible characters / zalgo bombs (checked on RAW text) ---
  for (const line of lines) {
    if (INVISIBLE_OR_ZALGO.test(line)) {
      return {
        ok: false,
        reason: "Please remove glitch/invisible characters — they break bios on most platforms.",
      };
    }
  }

  // --- Banned words (checked on NORMALIZED text) ---
  const searchable = toSearchable(lines.join(" ") + " " + label);
  for (const word of BANNED_WORDS) {
    if (searchable.includes(word)) {
      // Return a generic reason — never echo the banned word back.
      return {
        ok: false,
        reason: "Your template contains words we can't publish. Please edit and try again.",
      };
    }
  }

  // --- Link / promo spam ---
  for (const line of lines) {
    if (URL_PATTERN.test(normalizeStyledText(line))) {
      return {
        ok: false,
        reason: "Links aren't allowed in templates — they're used for spam.",
      };
    }
  }

  return { ok: true };
}

/** Username validation for the onboarding step. */
export function checkUsername(username: string): ModerationResult {
  if (typeof username !== "string") {
    return { ok: false, reason: "Invalid username." };
  }
  const clean = username.trim().toLowerCase();

  if (!/^[a-z0-9-]{3,20}$/.test(clean)) {
    return {
      ok: false,
      reason: "3-20 characters: letters, numbers, hyphens only.",
    };
  }
  if (clean.startsWith("-") || clean.endsWith("-") || clean.includes("--")) {
    return { ok: false, reason: "No leading/trailing or double hyphens." };
  }
  if (checkTemplate({ label: "x", lines: [clean], styles: ["plain"] }).ok === false) {
    return { ok: false, reason: "That username isn't allowed." };
  }

  const RESERVED = ["admin", "root", "moderator", "staff", "official", "tyeflo", "support", "system"];
  if (RESERVED.includes(clean)) {
    return { ok: false, reason: "That username is reserved." };
  }

  return { ok: true };
}
