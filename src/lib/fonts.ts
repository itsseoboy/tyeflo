/**
 * Unicode Font Transformation Engine
 * ------------------------------------
 * Converts regular ASCII text into 80+ fancy Unicode "font" styles
 * using mathematical alphanumeric symbols, enclosed alphanumerics,
 * combining diacritical marks, and other Unicode blocks.
 *
 * NOTE: Unicode "fonts" are not real fonts — they are different
 * code points that visually resemble styled letters. This is why
 * they can be copied and pasted anywhere online.
 */

type FontCategory =
  | "Popular"
  | "Cool"
  | "Fancy"
  | "Cursive"
  | "Small"
  | "Bold"
  | "Glitch"
  | "Symbol"
  | "Text Art"
  | "Case Converter";

export interface FontStyle {
  id: string;
  name: string;
  category: FontCategory;
  /** Brief label shown under the sample text */
  tag: string;
  /** Transform function */
  transform: (text: string) => string;
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

const UPPER_A = 65;
const UPPER_Z = 90;
const LOWER_A = 97;
const LOWER_Z = 122;
const DIGIT_0 = 48;

/** Map letters/digits by code-point offset, with optional hole substitutions. */
function offsetMap(
  text: string,
  baseUpper: number,
  baseLower: number,
  baseDigit: number | null,
  subs: Record<string, string> = {}
): string {
  let out = "";
  for (const ch of text) {
    if (subs[ch]) {
      out += subs[ch];
      continue;
    }
    const code = ch.charCodeAt(0);
    if (code >= UPPER_A && code <= UPPER_Z) {
      out += String.fromCodePoint(baseUpper + code - UPPER_A);
    } else if (code >= LOWER_A && code <= LOWER_Z) {
      out += String.fromCodePoint(baseLower + code - LOWER_A);
    } else if (baseDigit !== null && code >= DIGIT_0 && code <= 57) {
      out += String.fromCodePoint(baseDigit + code - DIGIT_0);
    } else {
      out += ch;
    }
  }
  return out;
}

/** Map only uppercase letters (converts input to upper first). */
function upperOnlyMap(text: string, base: number): string {
  let out = "";
  for (const ch of text.toUpperCase()) {
    const code = ch.charCodeAt(0);
    if (code >= UPPER_A && code <= UPPER_Z) {
      out += String.fromCodePoint(base + code - UPPER_A);
    } else {
      out += ch;
    }
  }
  return out;
}

/** Map only lowercase letters (converts input to lower first). */
function lowerOnlyMap(text: string, base: number): string {
  let out = "";
  for (const ch of text.toLowerCase()) {
    const code = ch.charCodeAt(0);
    if (code >= LOWER_A && code <= LOWER_Z) {
      out += String.fromCodePoint(base + code - LOWER_A);
    } else {
      out += ch;
    }
  }
  return out;
}

/** Apply a combining diacritical mark after every character. */
function combineWith(text: string, mark: string): string {
  let out = "";
  for (const ch of text) {
    out += ch;
    if (ch !== " " && ch !== "\n") out += mark;
  }
  return out;
}

/** Wrap every character between two symbols. */
function wrapEach(text: string, left: string, right: string): string {
  let out = "";
  for (const ch of text) {
    if (ch === " ") {
      out += " ";
      continue;
    }
    out += left + ch + right;
  }
  return out;
}

/** Wrap every word between two symbols. */
function wrapWords(text: string, left: string, right: string): string {
  return text
    .split(" ")
    .filter(Boolean)
    .map((w) => left + w + right)
    .join(" ");
}

/* ------------------------------------------------------------------ *
 * Mathematical Alphanumeric styles
 * ------------------------------------------------------------------ */

const bold = (t: string) => offsetMap(t, 0x1d400, 0x1d41a, 0x1d7ce);
const italic = (t: string) =>
  offsetMap(t, 0x1d434, 0x1d44e, null, { h: "\u210e" });
const boldItalic = (t: string) => offsetMap(t, 0x1d468, 0x1d482, 0x1d7ec);

// Script (regular) has many holes encoded elsewhere
const script = (t: string) =>
  offsetMap(t, 0x1d49c, 0x1d4b6, null, {
    B: "\u212c",
    E: "\u2130",
    F: "\u2131",
    H: "\u210b",
    I: "\u2110",
    L: "\u2112",
    M: "\u2133",
    R: "\u211b",
    e: "\u212f",
    g: "\u210a",
    o: "\u2134",
  });
const boldScript = (t: string) => offsetMap(t, 0x1d4d0, 0x1d4ea, 0x1d7ec);

// Fraktur has holes
const fraktur = (t: string) =>
  offsetMap(t, 0x1d504, 0x1d51e, null, {
    C: "\u212d",
    H: "\u210c",
    I: "\u2111",
    R: "\u211c",
    Z: "\u2128",
  });
const boldFraktur = (t: string) => offsetMap(t, 0x1d56c, 0x1d586, 0x1d7ec);

// Double-struck has holes
const doubleStruck = (t: string) =>
  offsetMap(t, 0x1d538, 0x1d552, 0x1d7d8, {
    C: "\u2102",
    H: "\u210d",
    N: "\u2115",
    P: "\u2119",
    Q: "\u211a",
    R: "\u211d",
    Z: "\u2124",
  });

const sansSerif = (t: string) => offsetMap(t, 0x1d5a0, 0x1d5ba, 0x1d7e2);
const sansBold = (t: string) => offsetMap(t, 0x1d5d4, 0x1d5ee, 0x1d7ec);
const sansItalic = (t: string) => offsetMap(t, 0x1d608, 0x1d622, null);
const sansBoldItalic = (t: string) => offsetMap(t, 0x1d63c, 0x1d656, 0x1d7ec);
const monospace = (t: string) => offsetMap(t, 0x1d670, 0x1d68a, 0x1d7f6);

/* ------------------------------------------------------------------ *
 * Enclosed / fullwidth styles
 * ------------------------------------------------------------------ */

const fullwidth = (t: string) => offsetMap(t, 0xff21, 0xff41, 0xff10);

// Circled — has both cases, plus digits
function circled(t: string): string {
  const circledDigits = "⓪①②③④⑤⑥⑦⑧⑨";
  let out = "";
  for (const ch of t) {
    const code = ch.charCodeAt(0);
    if (code >= UPPER_A && code <= UPPER_Z) {
      out += String.fromCodePoint(0x24b6 + code - UPPER_A);
    } else if (code >= LOWER_A && code <= LOWER_Z) {
      out += String.fromCodePoint(0x24d0 + code - LOWER_A);
    } else if (code >= DIGIT_0 && code <= 57) {
      out += circledDigits[code - DIGIT_0];
    } else {
      out += ch;
    }
  }
  return out;
}

// Negative circled (solid black circle, white letter) — uppercase + digits
function negCircled(t: string): string {
  const negDigits = "⓪①②③④⑤⑥⑦⑧⑨";
  let out = "";
  for (const ch of t.toUpperCase()) {
    const code = ch.charCodeAt(0);
    if (code >= UPPER_A && code <= UPPER_Z) {
      out += String.fromCodePoint(0x24b6 + code - UPPER_A);
    } else if (code >= DIGIT_0 && code <= 57) {
      out += negDigits[code - DIGIT_0];
    } else {
      out += ch;
    }
  }
  return out;
}

const squared = (t: string) => upperOnlyMap(t, 0x1f130);
const negativeSquared = (t: string) => upperOnlyMap(t, 0x1f170);
const parenthesized = (t: string) => lowerOnlyMap(t, 0x249c);

/* ------------------------------------------------------------------ *
 * Subscript / superscript (partial alphabets)
 * ------------------------------------------------------------------ */

const SUBSCRIPT: Record<string, string> = {
  a: "ₐ", e: "ₑ", h: "ₕ", i: "ᵢ", j: "ⱼ", k: "ₖ", l: "ₗ", m: "ₘ",
  n: "ₙ", o: "ₒ", p: "ₚ", r: "ᵣ", s: "ₛ", t: "ₜ", u: "ᵤ", v: "ᵥ", x: "ₓ",
};
const SUBSCRIPT_DIGITS = "₀₁₂₃₄₅₆₇₈₉";
function subscript(t: string): string {
  let out = "";
  for (const ch of t) {
    const code = ch.charCodeAt(0);
    if (code >= DIGIT_0 && code <= 57) out += SUBSCRIPT_DIGITS[code - DIGIT_0];
    else if (SUBSCRIPT[ch]) out += SUBSCRIPT[ch];
    else out += ch;
  }
  return out;
}

const SUPERSCRIPT: Record<string, string> = {
  A: "ᴬ", B: "ᴮ", C: "ᶜ", D: "ᴰ", E: "ᴱ", F: "ᶠ", G: "ᴳ", H: "ᴴ",
  I: "ᴵ", J: "ᴶ", K: "ᴷ", L: "ᴸ", M: "ᴹ", N: "ᴺ", O: "ᴼ", P: "ᴾ",
  R: "ᴿ", S: "ˢ", T: "ᵀ", U: "ᵁ", V: "ⱽ", W: "ᵂ", X: "ˣ", Y: "ʸ", Z: "ᶻ",
  a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ",
  i: "ⁱ", j: "ʲ", k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ",
  r: "ʳ", s: "ˢ", t: "ᵗ", u: "ᵘ", v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ", z: "ᶻ",
};
const SUPERSCRIPT_DIGITS = "⁰¹²³⁴⁵⁶⁷⁸⁹";
function superscript(t: string): string {
  let out = "";
  for (const ch of t) {
    const code = ch.charCodeAt(0);
    if (code >= DIGIT_0 && code <= 57) out += SUPERSCRIPT_DIGITS[code - DIGIT_0];
    else if (SUPERSCRIPT[ch]) out += SUPERSCRIPT[ch];
    else out += ch;
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Combining-mark decorations
 * ------------------------------------------------------------------ */

const strikethrough = (t: string) => combineWith(t, "\u0336");
const underline = (t: string) => combineWith(t, "\u0332");
const slashThrough = (t: string) => combineWith(t, "\u0338");
const dotBelow = (t: string) => combineWith(t, "\u0323");
const dotAbove = (t: string) => combineWith(t, "\u0307");
const doubleUnderline = (t: string) => combineWith(t, "\u0333");
const longStroke = (t: string) => combineWith(t, "\u0335");
const tildeOverlay = (t: string) => combineWith(t, "\u0330");
const ringBelow = (t: string) => combineWith(t, "\u0325");
const crossBelow = (t: string) => combineWith(t, "\u0335");

/* ------------------------------------------------------------------ *
 * Wrappers — character-level
 * ------------------------------------------------------------------ */

const hearts = (t: string) => wrapEach(t, "♥", "♥");
const starsBlack = (t: string) => wrapEach(t, "★", "");
const starsWhite = (t: string) => wrapEach(t, "✦", "");
const sparkleStar = (t: string) => wrapEach(t, "✧", "");
const asterisk = (t: string) => wrapEach(t, "*", "");
const dots = (t: string) => wrapEach(t, "", "\u0323");
const dotsAbove = (t: string) => wrapEach(t, "", "\u0307");
const brackets = (t: string) => wrapEach(t, "[", "]");
const braces = (t: string) => wrapEach(t, "{", "}");
const angleBrackets = (t: string) => wrapEach(t, "⟨", "⟩");
const cornerBrackets = (t: string) => wrapEach(t, "「", "」");
const lenticular = (t: string) => wrapEach(t, "【", "】");
const tortoise = (t: string) => wrapEach(t, "〔", "〕");
const whiteLenticular = (t: string) => wrapEach(t, "〖", "〗");
const whiteCorner = (t: string) => wrapEach(t, "『", "』");
const flowerBrackets = (t: string) => wrapEach(t, "❴", "❵");
const blackDiamond = (t: string) => wrapEach(t, "◆", "");
const whiteDiamond = (t: string) => wrapEach(t, "◇", "");
const blackCircle = (t: string) => wrapEach(t, "●", "");
const whiteCircle = (t: string) => wrapEach(t, "○", "");
const blackSquare = (t: string) => wrapEach(t, "■", "");
const whiteSquare = (t: string) => wrapEach(t, "□", "");
const flower = (t: string) => wrapEach(t, "❀", "❀");
const flower2 = (t: string) => wrapEach(t, "✿", "✿");
const flower3 = (t: string) => wrapEach(t, "❁", "❁");
const leaves = (t: string) => wrapEach(t, "❦", "❦");
const leaves2 = (t: string) => wrapEach(t, "❧", "❧");
const dagger = (t: string) => wrapEach(t, "†", "");
const doubleDagger = (t: string) => wrapEach(t, "‡", "");
const bullet = (t: string) => wrapEach(t, "•", "");
const smallStar = (t: string) => wrapEach(t, "⋆", "");
const sparkle = (t: string) => wrapEach(t, "❋", "");
const asterism = (t: string) => wrapEach(t, "⁂", "");
const section = (t: string) => wrapEach(t, "§", "");
const pilcrow = (t: string) => wrapEach(t, "¶", "");

/* ------------------------------------------------------------------ *
 * Glitch / Zalgo
 * ------------------------------------------------------------------ */

const ZALGO_UP = [
  "\u030d", "\u030e", "\u0304", "\u0305", "\u033f", "\u0311", "\u0306",
  "\u0310", "\u0352", "\u0357", "\u0351", "\u0307", "\u0308", "\u030a",
  "\u0342", "\u0341", "\u0358", "\u033b", "\u033c", "\u033d", "\u033e",
];
const ZALGO_MID = [
  "\u0315", "\u031b", "\u0340", "\u0341", "\u0358", "\u0321", "\u0322",
  "\u032b", "\u032c", "\u0329", "\u032a", "\u0338",
];
const ZALGO_DOWN = [
  "\u0316", "\u0317", "\u0318", "\u0319", "\u031c", "\u031d", "\u031e",
  "\u031f", "\u0320", "\u0324", "\u0325", "\u0326", "\u0329", "\u032a",
  "\u033b", "\u033c", "\u0339", "\u033a",
];

function pick(arr: string[], rng: () => number): string {
  return arr[Math.floor(rng() * arr.length)];
}

/**
 * Deterministic seeded PRNG (mulberry32). Returns a function that
 * produces a predictable sequence of pseudo-random numbers for a given
 * seed. This makes glitch/Zalgo transforms deterministic per input text,
 * so SSR and client hydration produce identical output — no hydration
 * mismatch, and fonts render correctly on first paint.
 */
function makeRng(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Simple string hash → 32-bit int seed. */
function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function zalgo(text: string, intensity: number): string {
  // Seed the RNG from the text so the same input always produces the
  // same glitch output — deterministic and hydration-safe.
  const rng = makeRng(hashSeed(text + "|" + intensity));
  let out = "";
  for (const ch of text) {
    if (ch === " " || ch === "\n") {
      out += ch;
      continue;
    }
    out += ch;
    const count = Math.floor(rng() * (2 + intensity)) + 1;
    for (let i = 0; i < count; i++) {
      out += pick(ZALGO_UP, rng);
      out += pick(ZALGO_MID, rng);
      out += pick(ZALGO_DOWN, rng);
    }
  }
  return out;
}

const glitchLight = (t: string) => zalgo(t, 0);
const glitchMedium = (t: string) => zalgo(t, 1);
const glitchHeavy = (t: string) => zalgo(t, 2);
const glitchMax = (t: string) => zalgo(t, 4);

/* ------------------------------------------------------------------ *
 * Upside-down / flipped text
 * ------------------------------------------------------------------ */

const FLIP_MAP: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ",
  i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d",
  q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x",
  y: "ʎ", z: "z", A: "∀", B: "𐐒", C: "Ɔ", D: "◖", E: "Ǝ", F: "Ⅎ",
  G: "⅁", H: "H", I: "I", J: "ſ", K: "ʞ", L: "˥", M: "W", N: "N",
  O: "O", P: "Ԁ", Q: "Ò", R: "ᴚ", S: "S", T: "┴", U: "∩", V: "Λ",
  W: "M", X: "X", Y: "⅄", Z: "Z", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ",
  "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄥ", "8": "8", "9": "6",
  "0": "0", ".": "˙", ",": "'", "?": "¿", "!": "¡", '"': ",,",
  "(": ")", ")": "(", "{": "}", "}": "{", "[": "]", "]": "[",
  "<": ">", ">": "<", "&": "⅋", "_": "‾",
};

function flip(text: string): string {
  let out = "";
  for (const ch of text) {
    out += FLIP_MAP[ch] ?? ch;
  }
  return out.split("").reverse().join("");
}

/* ------------------------------------------------------------------ *
 * Readable glitch / decorative styles
 * ------------------------------------------------------------------ */

/** Strike through each letter (single horizontal line). */
const strikeThrough = (t: string) => combineWith(t, "\u0336");

/** Combine two glitch marks per char — readable but creepy. */
const glitchCreepy = (t: string) => {
  const rng = makeRng(hashSeed(t + "|creepy"));
  let out = "";
  for (const ch of t) {
    if (ch === " ") {
      out += ch;
      continue;
    }
    out += ch + pick(ZALGO_UP, rng) + pick(ZALGO_DOWN, rng);
  }
  return out;
};

/** Top-only glitch — marks stack upward only. */
const glitchTop = (t: string) => {
  const rng = makeRng(hashSeed(t + "|top"));
  let out = "";
  for (const ch of t) {
    if (ch === " ") {
      out += ch;
      continue;
    }
    out += ch + pick(ZALGO_UP, rng) + pick(ZALGO_UP, rng);
  }
  return out;
};

/** Bottom-only glitch — marks hang below only. */
const glitchBottom = (t: string) => {
  const rng = makeRng(hashSeed(t + "|bottom"));
  let out = "";
  for (const ch of t) {
    if (ch === " ") {
      out += ch;
      continue;
    }
    out += ch + pick(ZALGO_DOWN, rng) + pick(ZALGO_DOWN, rng);
  }
  return out;
};

/** Bubble glitch — circles each letter with combining marks. */
const glitchBubble = (t: string) => {
  let out = "";
  for (const ch of t) {
    if (ch === " ") {
      out += ch;
      continue;
    }
    out += ch + "\u20dd"; // combining enclosing circle
  }
  return out;
};

/** Keycap glitch — square box around each letter. */
const glitchKeycap = (t: string) => {
  let out = "";
  for (const ch of t) {
    if (ch === " ") {
      out += ch;
      continue;
    }
    out += ch + "\u20e3"; // combining enclosing keycap
  }
  return out;
};

/* ------------------------------------------------------------------ *
 * Case styles
 * ------------------------------------------------------------------ */

const upperCase = (t: string) => t.toUpperCase();
const lowerCase = (t: string) => t.toLowerCase();

function titleCase(t: string): string {
  return t.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function alternatingCase(t: string): string {
  let i = 0;
  let out = "";
  for (const ch of t) {
    if (/[a-zA-Z]/.test(ch)) {
      out += i % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase();
      i++;
    } else {
      out += ch;
    }
  }
  return out;
}

function sarcasticCase(t: string): string {
  let i = 0;
  let out = "";
  for (const ch of t) {
    if (/[a-zA-Z]/.test(ch)) {
      out += i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
      i++;
    } else {
      out += ch;
    }
  }
  return out;
}

function inverseCase(t: string): string {
  let out = "";
  for (const ch of t) {
    if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) {
      out += ch.toLowerCase();
    } else if (ch === ch.toLowerCase() && ch !== ch.toUpperCase()) {
      out += ch.toUpperCase();
    } else {
      out += ch;
    }
  }
  return out;
}

function wideCase(t: string): string {
  // Upper first letter of each word extra wide via fullwidth
  return t
    .split(" ")
    .map((w) => (w ? fullwidth(w.charAt(0)) + w.slice(1) : w))
    .join(" ");
}

/* ------------------------------------------------------------------ *
 * Symbol-decorated styles (word-level)
 * ------------------------------------------------------------------ */

const sparkleWrap = (t: string) => `✨ ${t} ✨`;
const fireWrap = (t: string) => `🔥 ${t} 🔥`;
const crownWrap = (t: string) => `👑 ${t} 👑`;
const butterflyWrap = (t: string) => `🦋 ${t} 🦋`;
const swordWrap = (t: string) => `⚔️ ${t} ⚔️`;
const diamondWrap = (t: string) => `💎 ${t} 💎`;
const starWrap = (t: string) => `🌟 ${t} 🌟`;
const rocketWrap = (t: string) => `🚀 ${t} 🚀`;
const snakeWrap = (t: string) => `🐍 ${t} 🐍`;
const flowerWrap = (t: string) => `🌸 ${t} 🌸`;
const lightningWrap = (t: string) => `⚡ ${t} ⚡`;
const skullWrap = (t: string) => `💀 ${t} 💀`;
const gemWrap = (t: string) => `🔷 ${t} 🔷`;
const sparkleBetween = (t: string) =>
  t
    .split(" ")
    .filter(Boolean)
    .join(" ✦ ");
const starBetween = (t: string) =>
  t
    .split(" ")
    .filter(Boolean)
    .join(" ★ ");
const dotBetween = (t: string) =>
  t
    .split(" ")
    .filter(Boolean)
    .join(" • ");
const arrowBetween = (t: string) =>
  t
    .split(" ")
    .filter(Boolean)
    .join(" → ");
const pipeBetween = (t: string) =>
  t
    .split(" ")
    .filter(Boolean)
    .join(" | ");

/* ------------------------------------------------------------------ *
 * Text art / decorative styles
 * ------------------------------------------------------------------ */

const wavy = (t: string) => {
  let out = "";
  const waves = ["～", "〰", "⌇"];
  [...t].forEach((ch, i) => {
    out += ch;
    if (ch !== " ") out += waves[i % waves.length];
  });
  return out;
};

const spaced = (t: string) => [...t].join(" ");

const doubleSpaced = (t: string) => [...t].join("  ");

const underlineFull = (t: string) => `${t}\n${"‾".repeat([...t].length)}`;

const topLine = (t: string) => `${"_".repeat([...t].length)}\n${t}`;

const boxed = (t: string) => {
  const chars = [...t];
  const len = Math.max(chars.length, 1);
  const top = "╔" + "═".repeat(len) + "╗";
  const mid = "║ " + t + " ║";
  const bot = "╚" + "═".repeat(len) + "╝";
  return `${top}\n${mid}\n${bot}`;
};

const boxedDouble = (t: string) => {
  const chars = [...t];
  const len = Math.max(chars.length, 1);
  const top = "╔" + "═".repeat(len + 2) + "╗";
  const mid = "║  " + t + "  ║";
  const bot = "╚" + "═".repeat(len + 2) + "╝";
  return `${top}\n║  ${t}  ║\n${bot}`;
};

const banner = (t: string) => `▞▚▞▚ ${t.toUpperCase()} ▚▞▚▞`;

const striped = (t: string) => `░▒▓ ${t} ▓▒░`;

const diamondFrame = (t: string) => `◆◇◆ ${t} ◆◇◆`;

const arrowFrame = (t: string) => `➤➤➤ ${t} ➤➤➤`;

const equalFrame = (t: string) => `≡≡ ${t} ≡≡`;

const dotFrame = (t: string) => `••• ${t} •••`;

const slashFrame = (t: string) => `/// ${t} ///`;

const dashFrame = (t: string) => `--- ${t} ---`;

const tildeFrame = (t: string) => `~~~ ${t} ~~~`;

const hashFrame = (t: string) => `### ${t} ###`;

const checkered = (t: string) => `▚▞ ${t} ▚▞`;

const invert = (t: string) => `‮${t}`;

const mirror = (t: string) => `${t} || ${[...t].reverse().join("")}`;

const palindrome = (t: string) => `${t} • ${[...t].reverse().join("")}`;

const vstack = (t: string) => [...t].join("\n");

/* ------------------------------------------------------------------ *
 * Mix styles (combine base + decoration)
 * ------------------------------------------------------------------ */

const boldUnderline = (t: string) => combineWith(bold(t), "\u0332");
const boldStrike = (t: string) => combineWith(bold(t), "\u0336");
const italicUnderline = (t: string) => combineWith(italic(t), "\u0332");
const scriptUnderline = (t: string) => combineWith(script(t), "\u0332");
const frakturStrike = (t: string) => combineWith(fraktur(t), "\u0336");
const doubleStruckBox = (t: string) => wrapEach(doubleStruck(t), "[", "]");
const circledSparkle = (t: string) => `✧ ${circled(t)} ✧`;
const sansSerifDots = (t: string) => combineWith(sansSerif(t), "\u0323");

/* ------------------------------------------------------------------ *
 * Case Converter styles
 * ------------------------------------------------------------------ */

function sentenceCase(t: string): string {
  return t.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()).toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
}

function pascalCase(t: string): string {
  return t.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^./, (c) => c.toUpperCase());
}

function hyphenCase(t: string): string {
  return t.trim().replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

function snakeCase(t: string): string {
  return t.trim().replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s-]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

function randomCase(t: string): string {
  // Deterministic pseudo-random using seeded RNG for SSR safety
  const rng = makeRng(hashSeed(t + "|random"));
  let out = "";
  for (const ch of t) {
    if (/[a-zA-Z]/.test(ch)) {
      out += rng() > 0.5 ? ch.toUpperCase() : ch.toLowerCase();
    } else {
      out += ch;
    }
  }
  return out;
}

function removePunctuation(t: string): string {
  return t.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "");
}

/* ------------------------------------------------------------------ *
 * Math alphanumeric variants (Cursive category additions)
 * ------------------------------------------------------------------ */

const mathItalic = (t: string) => offsetMap(t, 0x1d434, 0x1d44e, null, { h: "\u210e" });
const mathSansItalic = (t: string) => offsetMap(t, 0x1d608, 0x1d622, null);
const mathSansBoldItalic = (t: string) => offsetMap(t, 0x1d63c, 0x1d656, 0x1d7ec);

/* ------------------------------------------------------------------ *
 * Emoji wrapper styles (Cursive category)
 * ------------------------------------------------------------------ */

const emojiWrap = (t: string, left: string, right: string) => `${left} ${t} ${right}`;
const airQuotes = (t: string) => `✌${t}✌`;
const foodEmojis = (t: string) => `🍕🍟🥪 ${t} 🥙🥡🍖`;
const musicNotes = (t: string) => `¸¸♬·¯·♪·¯·♫¸¸ ${t} ¸¸♫·¯·♪¸♩·¯·♬¸¸`;
const loveEmojis = (t: string) => `😍💞💘 ${t} 💔💏💖`;
const drinksEmojis = (t: string) => `🍺🥂🍸 ${t} 🍻🍷🍹`;
const sweetsEmojis = (t: string) => `🍰🍪🧁🍬🍨 ${t} 🥧🎂🍦🍭🍩`;
const veggiesEmojis = (t: string) => `🥕🍅🥬🥦 ${t} 🍆🥔🌽🥑`;

/* ------------------------------------------------------------------ *
 * Exotic Unicode substitution maps (Cool + Glitch categories)
 * ------------------------------------------------------------------ */

/** Generic char-map substitution. */
function charMap(t: string, map: Record<string, string>): string {
  let out = "";
  for (const ch of t) {
    out += map[ch] ?? ch;
  }
  return out;
}

// Cherokee block (Fairytale, used in Glitch)
const CHEROKEE_MAP: Record<string, string> = {
  a: "Ꭿ", b: "Ꮶ", c: "Ꮳ", d: "Ꭰ", e: "Ꮛ", f: "Ꮁ", g: "Ꮆ", h: "Ꮒ",
  i: "Ꭵ", j: "Ꮰ", k: "Ꮶ", l: "Ꮂ", m: "Ꮇ", n: "Ꮑ", o: "Ꭷ", p: "Ꮲ",
  q: "Ꭴ", r: "Ꮢ", s: "Ꮥ", t: "Ꮦ", u: "Ꮼ", v: "Ꮫ", w: "Ꮺ", x: "Ꭺ",
  y: "Ꭹ", z: "Ꮠ",
  A: "Ꮦ", B: "Ꮶ", C: "Ꮳ", D: "Ꭰ", E: "Ꮛ", F: "Ꮁ", G: "Ꮆ", H: "Ꮒ",
  I: "Ꭵ", J: "Ꮰ", K: "Ꮶ", L: "Ꮂ", M: "Ꮇ", N: "Ꮑ", O: "Ꭷ", P: "Ꮲ",
  Q: "Ꭴ", R: "Ꮢ", S: "Ꮥ", T: "Ꮦ", U: "Ꮼ", V: "Ꮫ", W: "Ꮺ", X: "Ꭺ",
  Y: "Ꭹ", Z: "Ꮠ",
};
const cherokee = (t: string) => charMap(t, CHEROKEE_MAP);

// Old Italic (Cryptic Italic)
const OLD_ITALIC_MAP: Record<string, string> = {
  a: "𐌄", b: "𐌁", c: "𐌊", d: "𐌃", e: "𐌄", f: "𐌅", g: "𐌂", h: "𐌇",
  i: "𐌉", j: "𐌉", k: "𐌊", l: "𐌋", m: "𐌌", n: "𐌍", o: "𐌏", p: "𐌐",
  q: "𐌒", r: "𐌓", s: "𐌔", t: "𐌕", u: "𐌖", v: "𐌖", w: "𐌅", x: "𐌗",
  y: "𐌉", z: "𐌆",
  A: "𐌕", B: "𐌁", C: "𐌊", D: "𐌃", E: "𐌄", F: "𐌅", G: "𐌂", H: "𐌇",
  I: "𐌉", J: "𐌉", K: "𐌊", L: "𐌋", M: "𐌌", N: "𐌍", O: "𐌏", P: "𐌐",
  Q: "𐌒", R: "𐌓", S: "𐌔", T: "𐌕", U: "𐌖", V: "𐌖", W: "𐌅", X: "𐌗",
  Y: "𐌉", Z: "𐌆",
};
const oldItalic = (t: string) => charMap(t, OLD_ITALIC_MAP);

// Cyrillic (Faux Cyrillic)
const CYRILLIC_MAP: Record<string, string> = {
  a: "ӓ", b: "ь", c: "ҫ", d: "ԁ", e: "ё", f: "ғ", g: "ɡ", h: "һ",
  i: "і", j: "ј", k: "ҝ", l: "ɭ", m: "ɱ", n: "һ", o: "ѳ", p: "р",
  q: "ҁ", r: "г", s: "ѕ", t: "т", u: "ц", v: "ѵ", w: "щ", x: "ҳ",
  y: "џ", z: "ȥ",
  A: "Г", B: "В", C: "Ϲ", D: "Đ", E: "Ё", F: "Ѓ", G: "Γ", H: "Н",
  I: "І", J: "Ј", K: "К", L: "Љ", M: "М", N: "И", O: "Ф", P: "Р",
  Q: "Ҧ", R: "Я", S: "Ѕ", T: "Т", U: "Ц", V: "Ѵ", W: "Щ", X: "Ж",
  Y: "Ћ", Z: "Ћ",
};
const cyrillic = (t: string) => charMap(t, CYRILLIC_MAP);

// Japanese katakana-like
const JAPANESE_MAP: Record<string, string> = {
  a: "卂", b: "乃", c: "匚", d: "下", e: "乇", f: "千", g: "ム", h: "卄",
  i: "丨", j: "フ", k: "ズ", l: "レ", m: "爪", n: "几", o: "ㄖ", p: "卩",
  q: "ゐ", r: "尺", s: "丂", t: "ㄒ", u: "ㄩ", v: "々", w: "山", x: "乂",
  y: "ㄚ", z: "乙",
  A: "ㄒ", B: "乃", C: "匚", D: "下", E: "乇", F: "千", G: "ム", H: "卄",
  I: "丨", J: "フ", K: "ズ", L: "レ", M: "爪", N: "几", O: "ㄖ", P: "卩",
  Q: "ゐ", R: "尺", S: "丂", T: "ㄒ", U: "ㄩ", V: "々", W: "山", X: "乂",
  Y: "ㄚ", Z: "乙",
};
const japanese = (t: string) => charMap(t, JAPANESE_MAP);

// Greek
const GREEK_MAP: Record<string, string> = {
  a: "α", b: "β", c: "¢", d: "δ", e: "ε", f: "φ", g: "γ", h: "η",
  i: "ι", j: "ι", k: "κ", l: "λ", m: "μ", n: "η", o: "σ", p: "ρ",
  q: "q", r: "ρ", s: "ѕ", t: "τ", u: "υ", v: "ν", w: "ω", x: "χ",
  y: "ψ", z: "ζ",
  A: "Ƭ", B: "β", C: "Σ", D: "Δ", E: "Σ", F: "φ", G: "Γ", H: "H",
  I: "I", J: "J", K: "K", L: "Λ", M: "M", N: "N", O: "Ө", P: "П",
  Q: "Q", R: "R", S: "Ƨ", T: "Ƭ", U: "Ц", V: "V", W: "W", X: "X",
  Y: "Y", Z: "Z",
};
const modernGreek = (t: string) => charMap(t, GREEK_MAP);

// Arabic-style
const ARABIC_MAP: Record<string, string> = {
  a: "ค", b: "๒", c: "ς", d: "๔", e: "є", f: "Ŧ", g: "ﻮ", h: "ђ",
  i: "เ", j: "ן", k: "к", l: "l", m: "๓", n: "ภ", o: "๏", p: "ρ",
  q: "q", r: "г", s: "ร", t: "t", u: "ย", v: "v", w: "ฬ", x: "x",
  y: "ץ", z: "z",
  A: "ค", B: "๒", C: "ς", D: "๔", E: "є", F: "Ŧ", G: "ﻮ", H: "ђ",
  I: "เ", J: "ן", K: "к", L: "l", M: "๓", N: "ภ", O: "๏", P: "ρ",
  Q: "q", R: "г", S: "ร", T: "t", U: "ย", V: "v", W: "ฬ", X: "x",
  Y: "ץ", Z: "z",
};
const arabicStyle = (t: string) => charMap(t, ARABIC_MAP);

// Canadian Aboriginal Syllabics (Cryptic)
const ABORIGINAL_MAP: Record<string, string> = {
  a: "ᘏ", b: "ᑋ", c: "ᑲ", d: "ᑕ", e: "ᘿ", f: "ᖸ", g: "ᑲ", h: "ᕼ",
  i: "ᓰ", j: "ᒍ", k: "ᑲ", l: "ᓬ", m: "ᒻ", n: "ᘉ", o: "ᓍ", p: "ᕵ",
  q: "q", r: "ᖇ", s: "ᔅ", t: "ᖶ", u: "ᘮ", v: "ᐯ", w: "ᘍ", x: "x",
  y: "ᖻ", z: "ᔓ",
  A: "ᖶ", B: "ᑋ", C: "ᑲ", D: "ᑕ", E: "ᘿ", F: "ᖸ", G: "ᑲ", H: "ᕼ",
  I: "ᓰ", J: "ᒍ", K: "ᑲ", L: "ᓬ", M: "ᒻ", N: "ᘉ", O: "ᓍ", P: "ᕵ",
  Q: "Q", R: "ᖇ", S: "ᔅ", T: "ᖶ", U: "ᘮ", V: "ᐯ", W: "ᘍ", X: "X",
  Y: "ᖻ", Z: "ᔓ",
};
const aboriginal = (t: string) => charMap(t, ABORIGINAL_MAP);

// Ethiopian (Faux Ethiopian)
const ETHIOPIC_MAP: Record<string, string> = {
  a: "ቿ", b: "ጌ", c: "ር", d: "ድ", e: "ቿ", f: "ፈ", g: "ግ", h: "ህ",
  i: "ኢ", j: "ጅ", k: "ከ", l: "ል", m: "ም", n: "ን", o: "ኦ", p: "ፕ",
  q: "ቅ", r: "ር", s: "ስ", t: "ት", u: "ኡ", v: "ቨ", w: "ወ", x: "ክስ",
  y: "ይ", z: "ዝ",
  A: "ፕ", B: "ጌ", C: "ር", D: "ድ", E: "ቿ", F: "ፈ", G: "ግ", H: "ህ",
  I: "ኢ", J: "ጅ", K: "ከ", L: "ል", M: "ም", N: "ን", O: "ኦ", P: "ፕ",
  Q: "ቅ", R: "ር", S: "ስ", T: "ት", U: "ኡ", V: "ቨ", W: "ወ", X: "ክስ",
  Y: "ይ", Z: "ዝ",
};
const ethiopic = (t: string) => charMap(t, ETHIOPIC_MAP);

// Armenian (Hieroglyphs)
const ARMENIAN_MAP: Record<string, string> = {
  a: "ɑ", b: "Ь", c: "ϲ", d: "ԁ", e: "е", f: "ғ", g: "ɡ", h: "հ",
  i: "і", j: "ј", k: "к", l: "l", m: "ʍ", n: "ո", o: "օ", p: "р",
  q: "q", r: "г", s: "ѕ", t: "τ", u: "υ", v: "ν", w: "ա", x: "х",
  y: "ɣ", z: "z",
  A: "Ե", B: "В", C: "ϲ", D: "Đ", E: "Е", F: "Γ", G: "Ӡ", H: "Н",
  I: "І", J: "Ј", K: "К", L: "Λ", M: "М", N: "Ո", O: "О", P: "Р",
  Q: "Ծ", R: "Я", S: "Ѕ", T: "Т", U: "Ц", V: "Ѵ", W: "Շ", X: "Ժ",
  Y: "Ћ", Z: "Ζ",
};
const armenian = (t: string) => charMap(t, ARMENIAN_MAP);

// Hebrew (Mysterious)
const HEBREW_MAP: Record<string, string> = {
  a: "ɑ", b: "Ь", c: "ϲ", d: "ԁ", e: "ε", f: "Ŧ", g: "ɡ", h: "հ",
  i: "і", j: "ј", k: "к", l: "l", m: "ʍ", n: "Ռ", o: "օ", p: "ρ",
  q: "q", r: "г", s: "ѕ", t: "τ", u: "υ", v: "ν", w: "ש", x: "х",
  y: "ɣ", z: "z",
  A: "Շ", B: "В", C: "ς", D: "Đ", E: "Σ", F: "Γ", G: "ɕ", H: "Н",
  I: "І", J: "Ј", K: "К", L: "Λ", M: "М", N: "Ն", O: "О", P: "Р",
  Q: "Ծ", R: "Я", S: "Ѕ", T: "Т", U: "Ц", V: "Ѵ", W: "ש", X: "Ժ",
  Y: "Ћ", Z: "Ζ",
};
const hebrew = (t: string) => charMap(t, HEBREW_MAP);

// Small caps (Mono Upper)
const SMALL_CAPS_MAP: Record<string, string> = {
  a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ",
  i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ",
  q: "q", r: "ʀ", s: "ꜱ", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x",
  y: "ʏ", z: "ᴢ",
  A: "ᴀ", B: "ʙ", C: "ᴄ", D: "ᴅ", E: "ᴇ", F: "ꜰ", G: "ɢ", H: "ʜ",
  I: "ɪ", J: "ᴊ", K: "ᴋ", L: "ʟ", M: "ᴍ", N: "ɴ", O: "ᴏ", P: "ᴘ",
  Q: "Q", R: "ʀ", S: "ꜱ", T: "ᴛ", U: "ᴜ", V: "ᴠ", W: "ᴡ", X: "X",
  Y: "ʏ", Z: "ᴢ",
};
const smallCaps = (t: string) => charMap(t, SMALL_CAPS_MAP);

// Currency substitution (Currencies)
const CURRENCY_MAP: Record<string, string> = {
  a: "₳", b: "₿", c: "¢", d: "₫", e: "€", f: "₣", g: "₲", h: "₴",
  i: "₹", j: "J", k: "₭", l: "Ł", m: "₼", n: "₦", o: "₳", p: "₱",
  q: "Q", r: "₹", s: "$", t: "₮", u: "₪", v: "V", w: "₩", x: "₳",
  y: "¥", z: "Z",
  A: "₳", B: "₿", C: "¢", D: "₫", E: "€", F: "₣", G: "₲", H: "₴",
  I: "₹", J: "J", K: "₭", L: "Ł", M: "₼", N: "₦", O: "₳", P: "₱",
  Q: "Q", R: "₹", S: "$", T: "₮", U: "₪", V: "V", W: "₩", X: "₳",
  Y: "¥", Z: "Z",
};
const currencies = (t: string) => charMap(t, CURRENCY_MAP);

// Delta (stylistic)
const DELTA_MAP: Record<string, string> = {
  a: "∆", b: "β", c: "¢", d: "Đ", e: "€", f: "Ŧ", g: "Ɠ", h: "H",
  i: "Ɨ", j: "J", k: "K", l: "Ł", m: "M", n: "N", o: "Ø", p: "P",
  q: "Q", r: "R", s: "Ş", t: "Ŧ", u: "Ʉ", v: "V", w: "W", x: "X",
  y: "Y", z: "Z",
  A: "Ŧ", B: "¥", C: "Ƥ", D: "€", E: "Σ", F: "Ŧ", G: "Ɠ", H: "H",
  I: "Ɨ", J: "J", K: "K", L: "Ł", M: "M", N: "N", O: "Ø", P: "P",
  Q: "Q", R: "R", S: "Ş", T: "Ŧ", U: "Ʉ", V: "V", W: "W", X: "X",
  Y: "Y", Z: "Z",
};
const deltaStyle = (t: string) => charMap(t, DELTA_MAP);

// Bubbly (Funky)
const BUBBLY_MAP: Record<string, string> = {
  a: "α", b: "Ь", c: "ϲ", d: "ԁ", e: "є", f: "Ŧ", g: "ɡ", h: "н",
  i: "ι", j: "ј", k: "к", l: "l", m: "м", n: "η", o: "σ", p: "ρ",
  q: "q", r: "г", s: "ѕ", t: "τ", u: "υ", v: "ν", w: "ω", x: "х",
  y: "γ", z: "z",
  A: "α", B: "Ь", C: "ϲ", D: "ԁ", E: "є", F: "Ŧ", G: "ɡ", H: "н",
  I: "ι", J: "ј", K: "к", L: "l", M: "м", N: "η", O: "σ", P: "ρ",
  Q: "q", R: "г", S: "ѕ", T: "τ", U: "υ", V: "ν", W: "ω", X: "х",
  Y: "γ", Z: "z",
};
const bubbly = (t: string) => charMap(t, BUBBLY_MAP);

// Wizard
const WIZARD_MAP: Record<string, string> = {
  a: "ǟ", b: "ɮ", c: "ƈ", d: "ɗ", e: "ɛ", f: "ʄ", g: "ɢ", h: "ɦ",
  i: "ɨ", j: "ʝ", k: "ӄ", l: "ʟ", m: "ʍ", n: "ռ", o: "օ", p: "ք",
  q: "զ", r: "ʀ", s: "ֆ", t: "ȶ", u: "ʊ", v: "ʋ", w: "ա", x: "Ӽ",
  y: "ʏ", z: "ʐ",
  A: "ȶ", B: "ɮ", C: "ƈ", D: "ɗ", E: "ɛ", F: "ʄ", G: "ɢ", H: "ɦ",
  I: "ɨ", J: "ʝ", K: "ӄ", L: "ʟ", M: "ʍ", N: "ռ", O: "օ", P: "ք",
  Q: "զ", R: "ʀ", S: "ֆ", T: "ȶ", U: "ʊ", V: "ʋ", W: "ա", X: "Ӽ",
  Y: "ʏ", Z: "ʐ",
};
const wizard = (t: string) => charMap(t, WIZARD_MAP);

// Lefthanded
const LEFTHANDED_MAP: Record<string, string> = {
  a: "α", b: "Ь", c: "ς", d: "ԁ", e: "ε", f: "Ŧ", g: "ɡ", h: "ɦ",
  i: "เ", j: "ј", k: "к", l: "l", m: "ʍ", n: "ռ", o: "๏", p: "ρ",
  q: "q", r: "г", s: "ร", t: "τ", u: "υ", v: "ν", w: "ฬ", x: "х",
  y: "γ", z: "z",
  A: "ƭ", B: "Ь", C: "ς", D: "ԁ", E: "ε", F: "Ŧ", G: "ɡ", H: "ɦ",
  I: "เ", J: "ј", K: "к", L: "l", M: "ʍ", N: "ռ", O: "๏", P: "ρ",
  Q: "q", R: "г", S: "ร", T: "τ", U: "υ", V: "ν", W: "ฬ", X: "х",
  Y: "γ", Z: "z",
};
const lefthanded = (t: string) => charMap(t, LEFTHANDED_MAP);

/* ------------------------------------------------------------------ *
 * Glitch combining-mark variants
 * ------------------------------------------------------------------ */

const diagonalStrikes = (t: string) => combineWith(t, "\u0337");
const underlinedDashes = (t: string) => combineWith(t, "\u0331");
const metalUmlauts = (t: string) => combineWith(t, "\u0308");
const bandaid = (t: string) => combineWith(t, "\u035c");
const xCross = (t: string) => combineWith(t, "\u036f");
const stroked = (t: string) => combineWith(t, "\u0338");
const linesLines = (t: string) => combineWith(t, "\u0346");
const fireworks = (t: string) => combineWith(t, "\u0489");
const doubleUnderlines = (t: string) => combineWith(t, "\u0347");
const musicBars = (t: string) => combineWith(t, "\u0332");
const allTheWayUp = (t: string) => combineWith(t, "\u0313");
const rightDirectionAbove = (t: string) => combineWith(t, "\u0361");
const rightDirectionUnder = (t: string) => combineWith(t, "\u0318");
const stackedAbove = (t: string) => combineWith(t, "\u0305");
const crossItUnder = (t: string) => combineWith(t, "\u034d");
const rainOnTop = (t: string) => combineWith(t, "\u030b");
const bubblesOnTop = (t: string) => combineWith(t, "\u030a");
const hot = (t: string) => combineWith(t, "\u033e");
const wiseChars = (t: string) => combineWith(t, "\u0310");

/* ------------------------------------------------------------------ *
 * Symbols decorative wrappers
 * ------------------------------------------------------------------ */

const fadingEffect = (t: string) => `█▓▒▒░░░${t}░░░▒▒▓█`;
const arrowsWrap = (t: string) => t.split("").map((c) => c === " " ? " " : `»${c}`).join("");
const volume = (t: string) => `✩░▒▓▆▅▃▂▁${t}▁▂▃▅▆▓▒░✩`;
const princessStyle = (t: string) => `✴.·´¯\`·.·★  🎀${t}🎀  ★·.·\`¯´·.✴`;
const cupido = (t: string) => t.split("").map((c) => c === " " ? " " : `ᅳ${c}`).join("");
const sparkles = (t: string) => `(¯\`·._.··¸.-~*´¨¯¨\`*·~-.${t}.-~*´¨¯¨\`*·~-.¸··.`;
const finish = (t: string) => `▀▄▀▄▀▄${t}▄▀▄▀▄▀`;
const barcode = (t: string) => ` ▌║█║▌│║▌│║▌║▌█║${t} ▌│║▌║▌│║║▌█║▌║█`;
const bubblyBubbles = (t: string) => `∙∙·▫▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼ${t}ᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫▫·∙∙`;
const sea = (t: string) => `࿐🌊🐋࿐࿐${t}࿐࿐🌊🐋࿐`;
const weights = (t: string) => `❚█══${t}══█❚`;

/* ------------------------------------------------------------------ *
 * Full style registry
 * ------------------------------------------------------------------ */

export const FONT_STYLES: FontStyle[] = [
  // ---- Featured (shown first in "All" view) ----
  { id: "bold-fraktur", name: "Fraktur Bold", category: "Fancy", tag: "Bold gothic", transform: boldFraktur },
  { id: "double-struck", name: "Double Struck", category: "Fancy", tag: "Hollow", transform: doubleStruck },
  { id: "monospace", name: "Monospace Text", category: "Fancy", tag: "Fixed width", transform: monospace },
  { id: "bold-script", name: "Script Bold Italic", category: "Cursive", tag: "Bold elegant", transform: boldScript },
  { id: "bold-italic", name: "Bold Italic", category: "Cursive", tag: "Bold slanted", transform: boldItalic },
  { id: "fraktur", name: "Fraktur", category: "Fancy", tag: "Gothic", transform: fraktur },

  // ---- Cool (12) ----
  { id: "circled", name: "Light Text Bubbles", category: "Cool", tag: "Circled", transform: circled },
  { id: "neg-squared", name: "Dark Text Bubbles", category: "Cool", tag: "Negative squared", transform: negativeSquared },
  { id: "fullwidth", name: "Full Width", category: "Cool", tag: "Wide", transform: fullwidth },
  { id: "neg-circled", name: "Black Bubbles", category: "Cool", tag: "Solid circle", transform: negCircled },
  { id: "wide-case", name: "Wide Caps", category: "Cool", tag: "Wide first letter", transform: wideCase },
  { id: "circled-sparkle", name: "Sparkle Bubbles", category: "Cool", tag: "✧ circled ✧", transform: circledSparkle },
  { id: "double-struck-box", name: "Boxed Hollow", category: "Cool", tag: "[ 𝔸𝔹ℂ ]", transform: doubleStruckBox },
  { id: "spaced", name: "Spaced Out", category: "Cool", tag: "L e t t e r s", transform: spaced },
  { id: "double-spaced", name: "Wide Spaced", category: "Cool", tag: "L  e  t", transform: doubleSpaced },
  { id: "mirror", name: "Mirror", category: "Cool", tag: "|| reflection", transform: mirror },
  { id: "palindrome", name: "Reflective", category: "Cool", tag: "• reversed", transform: palindrome },

  // ---- Fancy (remaining) ----
  { id: "fraktur-strike", name: "Gothic Slash", category: "Fancy", tag: "Strikethrough", transform: frakturStrike },
  { id: "small-star", name: "Starred Fancy", category: "Fancy", tag: "⋆ starred", transform: smallStar },
  { id: "sparkle", name: "Sparkle Fancy", category: "Fancy", tag: "❋ sparkle", transform: sparkle },
  { id: "asterism", name: "Asterism", category: "Fancy", tag: "⁂ marked", transform: asterism },
  { id: "flower3", name: "Floral Fancy", category: "Fancy", tag: "❁ flower", transform: flower3 },
  { id: "leaves", name: "Leaf Fancy", category: "Fancy", tag: "❦ leaves", transform: leaves },

  // ---- Cursive (remaining) ----
  { id: "script-underline", name: "Script Lined", category: "Cursive", tag: "Underlined", transform: scriptUnderline },
  { id: "italic-underline", name: "Italic Lined", category: "Cursive", tag: "Underlined", transform: italicUnderline },
  { id: "flower", name: "Floral Script", category: "Cursive", tag: "❀ wrapped", transform: flower },
  { id: "flower2", name: "Bloom Script", category: "Cursive", tag: "✿ wrapped", transform: flower2 },

  // ---- Small (8) ----
  { id: "sans-serif", name: "Math Sans", category: "Small", tag: "Sans serif", transform: sansSerif },
  { id: "subscript", name: "Subscript", category: "Small", tag: "Below line", transform: subscript },
  { id: "superscript", name: "Superscript", category: "Small", tag: "Above line", transform: superscript },
  { id: "sans-serif-dots", name: "Dotted Sans", category: "Small", tag: "Dot below", transform: sansSerifDots },
  { id: "dot-below", name: "Tiny Dots", category: "Small", tag: "Below marks", transform: dotBelow },
  { id: "dot-above", name: "Star Dot", category: "Small", tag: "Above marks", transform: dotAbove },

  // ---- Bold (6) ----
  { id: "bold", name: "Bold Serif", category: "Bold", tag: "Strong", transform: bold },
  { id: "sans-bold", name: "Bold Sans", category: "Bold", tag: "Strong sans", transform: sansBold },
  { id: "bold-underline", name: "Bold Lined", category: "Bold", tag: "Underlined", transform: boldUnderline },
  { id: "bold-strike", name: "Bold Strike", category: "Bold", tag: "Crossed out", transform: boldStrike },
  { id: "black-square", name: "Black Square", category: "Bold", tag: "■ strong", transform: blackSquare },

  // ---- Glitch (10) ----
  { id: "glitch-light", name: "Glitch Lite", category: "Glitch", tag: "Subtle effect", transform: glitchLight },
  { id: "glitch-medium", name: "Glitch", category: "Glitch", tag: "Mild chaos", transform: glitchMedium },
  { id: "glitch-heavy", name: "Glitch Max", category: "Glitch", tag: "Heavy chaos", transform: glitchHeavy },
  { id: "glitch-max", name: "Glitch Extreme", category: "Glitch", tag: "Deep chaos", transform: glitchMax },
  { id: "glitch-creepy", name: "Creepy", category: "Glitch", tag: "Spooky marks", transform: glitchCreepy },
  { id: "glitch-top", name: "Top Glitch", category: "Glitch", tag: "Marks above", transform: glitchTop },
  { id: "glitch-bottom", name: "Bottom Glitch", category: "Glitch", tag: "Marks below", transform: glitchBottom },
  { id: "glitch-bubble", name: "Bubble Glitch", category: "Glitch", tag: "○ circled", transform: glitchBubble },
  { id: "glitch-keycap", name: "Keycap Glitch", category: "Glitch", tag: "⃠ boxed", transform: glitchKeycap },

  // ---- Symbol (18) ----
  { id: "strikethrough", name: "Strikethrough", category: "Symbol", tag: "Crossed out", transform: strikethrough },
  { id: "underline", name: "Underline", category: "Symbol", tag: "Underlined", transform: underline },
  { id: "slash", name: "Slashed", category: "Symbol", tag: "Slash mark", transform: slashThrough },
  { id: "hearts", name: "Hearts", category: "Symbol", tag: "♥ wrapped", transform: hearts },
  { id: "stars-black", name: "Black Stars", category: "Symbol", tag: "★ starred", transform: starsBlack },
  { id: "stars-white", name: "White Stars", category: "Symbol", tag: "✦ starred", transform: starsWhite },
  { id: "sparkle-star", name: "Sparkle", category: "Symbol", tag: "✧ sparkle", transform: sparkleStar },
  { id: "brackets", name: "Brackets", category: "Symbol", tag: "[ boxed ]", transform: brackets },
  { id: "braces", name: "Braces", category: "Symbol", tag: "{ curly }", transform: braces },
  { id: "angle-brackets", name: "Angles", category: "Symbol", tag: "⟨ pointed ⟩", transform: angleBrackets },
  { id: "corner-brackets", name: "Corners", category: "Symbol", tag: "「 asian 」", transform: cornerBrackets },
  { id: "lenticular", name: "Lenticular", category: "Symbol", tag: "【 bracket 】", transform: lenticular },
  { id: "white-corner", name: "White Corners", category: "Symbol", tag: "『 double 』", transform: whiteCorner },
  { id: "tortoise", name: "Tortoise", category: "Symbol", tag: "〔 shell 〕", transform: tortoise },
  { id: "white-lenticular", name: "White Lenticular", category: "Symbol", tag: "〖 hollow 〗", transform: whiteLenticular },
  { id: "double-underline", name: "Double Underline", category: "Symbol", tag: "Double lined", transform: doubleUnderline },
  { id: "tilde-overlay", name: "Tilde Slash", category: "Symbol", tag: "∼ overlay", transform: tildeOverlay },
  { id: "long-stroke", name: "Long Slash", category: "Symbol", tag: "― stroke", transform: longStroke },

  // ---- Text Art (20) ----
  { id: "wavy", name: "Wavy", category: "Text Art", tag: "〰 flow", transform: wavy },
  { id: "banner", name: "Banner", category: "Text Art", tag: "▞ striped", transform: banner },
  { id: "boxed", name: "Box Frame", category: "Text Art", tag: "╔ framed ╗", transform: boxed },
  { id: "boxed-double", name: "Wide Box", category: "Text Art", tag: "╔ wide ╗", transform: boxedDouble },
  { id: "sparkle-between", name: "Sparkle Gap", category: "Text Art", tag: "✦ spaced", transform: sparkleBetween },
  { id: "star-between", name: "Star Gap", category: "Text Art", tag: "★ spaced", transform: starBetween },
  { id: "dot-between", name: "Dot Gap", category: "Text Art", tag: "• spaced", transform: dotBetween },
  { id: "arrow-between", name: "Arrow Gap", category: "Text Art", tag: "→ spaced", transform: arrowBetween },
  { id: "pipe-between", name: "Pipe Gap", category: "Text Art", tag: "| spaced", transform: pipeBetween },
  { id: "title", name: "Title Case", category: "Text Art", tag: "Capitalized", transform: titleCase },
  { id: "sarcastic", name: "SarCaStIc", category: "Text Art", tag: "Spongebob", transform: sarcasticCase },
  { id: "inverse", name: "Inverse Case", category: "Text Art", tag: "Swapped", transform: inverseCase },
  { id: "striped", name: "Striped", category: "Text Art", tag: "░▒▓ framed", transform: striped },
  { id: "diamond-frame", name: "Diamond Frame", category: "Text Art", tag: "◆◇◆ framed", transform: diamondFrame },
  { id: "arrow-frame", name: "Arrow Frame", category: "Text Art", tag: "➤ framed", transform: arrowFrame },
  { id: "vstack", name: "Vertical", category: "Text Art", tag: "Stacked", transform: vstack },

  // ---- Extra decorative wrappers (10) ----
  { id: "sparkle-wrap", name: "Sparkle Magic", category: "Text Art", tag: "✨ wrapped", transform: sparkleWrap },
  { id: "fire-wrap", name: "Fire Text", category: "Text Art", tag: "🔥 wrapped", transform: fireWrap },
  { id: "crown-wrap", name: "Royal Text", category: "Text Art", tag: "👑 wrapped", transform: crownWrap },
  { id: "butterfly-wrap", name: "Butterfly", category: "Text Art", tag: "🦋 wrapped", transform: butterflyWrap },
  { id: "diamond-wrap", name: "Diamond Glow", category: "Text Art", tag: "💎 wrapped", transform: diamondWrap },
  { id: "star-wrap", name: "Star Burst", category: "Text Art", tag: "🌟 wrapped", transform: starWrap },
  { id: "rocket-wrap", name: "Rocket", category: "Text Art", tag: "🚀 wrapped", transform: rocketWrap },
  { id: "flower-wrap", name: "Flower Bloom", category: "Text Art", tag: "🌸 wrapped", transform: flowerWrap },
  { id: "lightning-wrap", name: "Lightning", category: "Text Art", tag: "⚡ wrapped", transform: lightningWrap },
  { id: "skull-wrap", name: "Skull Edge", category: "Text Art", tag: "💀 wrapped", transform: skullWrap },

  // ---- Case Converter (9) ----
  { id: "all-lower", name: "all lowercase", category: "Case Converter", tag: "Small caps", transform: (t) => t.toLowerCase() },
  { id: "all-upper", name: "ALL UPPERCASE", category: "Case Converter", tag: "All caps", transform: (t) => t.toUpperCase() },
  { id: "sentence-case", name: "Sentence case.", category: "Case Converter", tag: "First cap", transform: sentenceCase },
  { id: "alternating-case-cc", name: "AlTeRnAtInG CaSe", category: "Case Converter", tag: "Mixed", transform: alternatingCase },
  { id: "random-case", name: "RanDoM cASE", category: "Case Converter", tag: "Random", transform: randomCase },
  { id: "pascal-case", name: "PascalCase", category: "Case Converter", tag: "No spaces", transform: pascalCase },
  { id: "hyphen-case", name: "hyphen-case", category: "Case Converter", tag: "Dashes", transform: hyphenCase },
  { id: "snake-case", name: "snake_case", category: "Case Converter", tag: "Underscores", transform: snakeCase },
  { id: "remove-punct", name: "Remove punctuation", category: "Case Converter", tag: "Clean", transform: removePunctuation },

  // ---- Cursive additions: Math variants + emoji wrappers (11) ----
  { id: "cryptic-italic", name: "Cryptic Italic", category: "Cursive", tag: "Old Italic", transform: oldItalic },
  { id: "math-italic", name: "Math Italic", category: "Cursive", tag: "Slanted", transform: mathItalic },
  { id: "math-sans-italic", name: "Math Sans Italic", category: "Cursive", tag: "Sans slant", transform: mathSansItalic },
  { id: "math-sans-bold-italic", name: "Math Sans Bold Italic", category: "Cursive", tag: "Bold sans slant", transform: mathSansBoldItalic },
  { id: "air-quotes", name: "Air Quotes", category: "Cursive", tag: "✌ wrapped", transform: airQuotes },
  { id: "food-emojis", name: "Food Emojis", category: "Cursive", tag: "🍕 wrapped", transform: foodEmojis },
  { id: "music-notes", name: "Music Notes", category: "Cursive", tag: "♬ wrapped", transform: musicNotes },
  { id: "love-emojis", name: "Love Emojis", category: "Cursive", tag: "😍 wrapped", transform: loveEmojis },
  { id: "drinks-emojis", name: "Drinks Emojis", category: "Cursive", tag: "🍺 wrapped", transform: drinksEmojis },
  { id: "sweets-emojis", name: "Sweets Emojis", category: "Cursive", tag: "🍰 wrapped", transform: sweetsEmojis },
  { id: "veggies-emojis", name: "Veggies Emojis", category: "Cursive", tag: "🥕 wrapped", transform: veggiesEmojis },

  // ---- Fancy additions (3) ----
  { id: "wizard", name: "Wizard", category: "Fancy", tag: "Magic", transform: wizard },
  { id: "lefthanded", name: "Lefthanded", category: "Fancy", tag: "Mirror", transform: lefthanded },
  { id: "manuscript", name: "Manuscript", category: "Fancy", tag: "✍ Fraktur", transform: (t) => boldFraktur(t) + "✍" },

  // ---- Cool additions: exotic Unicode substitutions (21) ----
  { id: "light-squares", name: "Light Text Squares", category: "Cool", tag: "Squared", transform: squared },
  { id: "cyrillic", name: "Cyrillic", category: "Cool", tag: "Russian", transform: cyrillic },
  { id: "japanese", name: "Japanese", category: "Cool", tag: "Kana", transform: japanese },
  { id: "arabic", name: "Arabic", category: "Cool", tag: "Arabic", transform: arabicStyle },
  { id: "modern-greek", name: "Modern Greek", category: "Cool", tag: "Greek", transform: modernGreek },
  { id: "european-chars", name: "European Characters", category: "Cool", tag: "Euro", transform: (t) => charMap(t, { a: "ä", o: "ö", u: "ü", e: "ë", i: "ï", A: "Ä", O: "Ö", U: "Ü", E: "Ë", I: "Ï" }) },
  { id: "mono-upper", name: "Mono Upper", category: "Cool", tag: "Small caps", transform: smallCaps },
  { id: "curvy", name: "Curvy", category: "Cool", tag: "Aboriginal", transform: aboriginal },
  { id: "math-style", name: "Math Style", category: "Cool", tag: "Math", transform: bubbly },
  { id: "handwriting", name: "Handwriting", category: "Cool", tag: "Script", transform: script },
  { id: "mirrored-flipped", name: "Mirrored / Flipped", category: "Cool", tag: "Flipped", transform: flip },
  { id: "mixed-style-2", name: "Mixed Style 2", category: "Cool", tag: "Mixed", transform: (t) => t.split("").map((c, i) => i % 2 === 0 ? circled(c) : sansSerif(c)).join("") },
  { id: "mixed-style-3", name: "Mixed Style 3", category: "Cool", tag: "Mixed", transform: (t) => t.split("").map((c, i) => i % 4 === 0 ? doubleStruck(c) : i % 4 === 1 ? bold(c) : c).join("") },

  // ---- Glitch additions: combining marks + exotic substitutions (44) ----
  { id: "fairytale", name: "Fairytale", category: "Glitch", tag: "Cherokee", transform: cherokee },
  { id: "diagonal-strikes", name: "Diagonal Strikes", category: "Glitch", tag: "Slash marks", transform: diagonalStrikes },
  { id: "acute-accents", name: "Acute Accents", category: "Glitch", tag: "Acute", transform: (t) => combineWith(t, "\u0301") },
  { id: "underlined-dashes", name: "Underlined by Dashes", category: "Glitch", tag: "Dash below", transform: underlinedDashes },
  { id: "metal-umlauts", name: "Metal Ümlauts", category: "Glitch", tag: "Umlauts", transform: metalUmlauts },
  { id: "bandaid", name: "Bandaid", category: "Glitch", tag: "Bridge", transform: bandaid },
  { id: "delta", name: "Delta", category: "Glitch", tag: "Delta", transform: deltaStyle },
  { id: "x-cross", name: "X-cross", category: "Glitch", tag: "Cross above", transform: xCross },
  { id: "lines-lines", name: "Lines, Lines, Lines.", category: "Glitch", tag: "Lines", transform: linesLines },
  { id: "fireworks", name: "Fireworks", category: "Glitch", tag: "Spark above", transform: fireworks },
  { id: "double-underlines-g", name: "Double Underlines", category: "Glitch", tag: "Double below", transform: doubleUnderlines },
  { id: "hourglass", name: "Hourglass", category: "Glitch", tag: "Hourglass", transform: (t) => combineWith(t, "\u0317") },
  { id: "all-the-way-up", name: "All The Way Up", category: "Glitch", tag: "Above", transform: allTheWayUp },
  { id: "wise-characters", name: "Wise Characters", category: "Glitch", tag: "Wise", transform: wiseChars },
  { id: "hot", name: "HOT", category: "Glitch", tag: "Hot", transform: hot },
  { id: "mysterious", name: "Mysterious", category: "Glitch", tag: "Hebrew", transform: hebrew },
  { id: "faux-ethiopian", name: "Faux Ethiopian", category: "Glitch", tag: "Ethiopic", transform: ethiopic },
  { id: "right-direction-above", name: "Right Direction Above", category: "Glitch", tag: "Arrow above", transform: rightDirectionAbove },
  { id: "right-direction-under", name: "Right Direction Under", category: "Glitch", tag: "Arrow below", transform: rightDirectionUnder },
  { id: "hieroglyphs", name: "Hieroglyphs", category: "Glitch", tag: "Armenian", transform: armenian },
  { id: "currencies", name: "Currencies", category: "Glitch", tag: "Currency", transform: currencies },
  { id: "stacked-above", name: "Stacked above", category: "Glitch", tag: "Overline", transform: stackedAbove },
  { id: "cross-it-under", name: "Cross It Under", category: "Glitch", tag: "Cross below", transform: crossItUnder },
  { id: "rain-on-top", name: "Rain On Top", category: "Glitch", tag: "Rain", transform: rainOnTop },
  { id: "bubbles-on-top", name: "Bubbles On Top", category: "Glitch", tag: "Bubbles", transform: bubblesOnTop },

  // ---- Symbol additions: decorative wrappers (11) ----
  { id: "fading-effect", name: "Fading Effect", category: "Symbol", tag: "█▓▒░", transform: fadingEffect },
  { id: "arrows-wrap", name: "Arrows", category: "Symbol", tag: "»» arrows", transform: arrowsWrap },
  { id: "volume", name: "Volume", category: "Symbol", tag: "░▒▓ bars", transform: volume },
  { id: "princess-style", name: "Princess Style", category: "Symbol", tag: "🎀 princess", transform: princessStyle },
  { id: "cupido", name: "Cupido", category: "Symbol", tag: "ᅳ cupido", transform: cupido },
  { id: "sparkles-wrap", name: "Sparkles", category: "Symbol", tag: "✦ sparkle", transform: sparkles },
  { id: "finish", name: "Finish", category: "Symbol", tag: "▀▄ bars", transform: finish },
  { id: "barcode", name: "Barcode", category: "Symbol", tag: "▌║█ barcode", transform: barcode },
  { id: "bubbly-bubbles", name: "Bubbly Bubbles", category: "Symbol", tag: "ᵒᴼ bubbles", transform: bubblyBubbles },
  { id: "sea", name: "Sea", category: "Symbol", tag: "🌊 sea", transform: sea },
  { id: "weights", name: "Weights", category: "Symbol", tag: "█❚ weights", transform: weights },
];

export const FONT_CATEGORIES: ("Popular" | FontCategory)[] = [
  "Popular",
  "Cool",
  "Fancy",
  "Cursive",
  "Small",
  "Bold",
  "Glitch",
  "Symbol",
  "Text Art",
  "Case Converter",
];

/** Lucide icon name for each category — used in the UI pills. */
export const CATEGORY_ICONS: Record<string, string> = {
  Popular: "Flame",
  Cool: "Snowflake",
  Fancy: "Gem",
  Cursive: "PenTool",
  Small: "Minimize2",
  Bold: "Bold",
  Glitch: "Zap",
  Symbol: "Sparkles",
  "Text Art": "Type",
  "Case Converter": "CaseSensitive",
};

/** IDs of the 20 best/most popular fonts shown on the homepage "Popular" tab. */
export const POPULAR_FONT_IDS: string[] = [
  // Gothic + Cursive first
  "fraktur",
  "bold-fraktur",
  "bold-script",
  "double-struck",
  // Then cool/popular styles
  "circled",
  "neg-squared",
  "fullwidth",
  "bold",
  "bold-italic",
  "monospace",
  "sans-bold",
  "sans-serif",
  "subscript",
  "superscript",
  "strikethrough",
  "underline",
  "hearts",
  "flip",
  "currencies",
  "neg-circled",
];

export function getStylesByCategory(category: "Popular" | FontCategory): FontStyle[] {
  if (category === "Popular") {
    const byId = new Map(FONT_STYLES.map((s) => [s.id, s]));
    return POPULAR_FONT_IDS.map((id) => byId.get(id)).filter(Boolean) as FontStyle[];
  }
  return FONT_STYLES.filter((s) => s.category === category);
}

/* ------------------------------------------------------------------ *
 * CLUSTERS — 11 keyword clusters that replace the old font categories
 * in the sidebar. Each cluster maps to a subset of FONT_STYLES based
 * on the underlying font categories that best match its vibe.
 * ------------------------------------------------------------------ */

export interface FontCluster {
  /** URL slug (e.g. "cursive-font-generator") */
  slug: string;
  /** Display name shown in the sidebar */
  name: string;
  /** Short label */
  shortName: string;
  /** Lucide icon name */
  icon: string;
  /** 1-2 sentence description for the sidebar tooltip / meta */
  description: string;
  /** Underlying font categories whose fonts belong to this cluster */
  categories: FontCategory[];
  /** Optional curated list of specific font IDs (overrides categories) */
  fontIds?: string[];
}

export const FONT_CLUSTERS: FontCluster[] = [
  {
    slug: "font-generator-copy-and-paste",
    name: "Popular",
    shortName: "Popular",
    icon: "Flame",
    description: "The 20 most-used fonts across every category.",
    fontIds: POPULAR_FONT_IDS,
  },
  {
    slug: "cursive-font-generator",
    name: "Cursive",
    shortName: "Cursive",
    icon: "PenTool",
    description: "Elegant script, calligraphy, and handwriting styles.",
    categories: ["Cursive"],
  },
  {
    slug: "cute-aesthetic-font-generator",
    name: "Cute & Aesthetic",
    shortName: "Cute",
    icon: "Gem",
    description: "Kawaii, preppy, coquette, and Y2K decorative wraps.",
    categories: ["Fancy"],
  },
  {
    slug: "fancy-cool-font-generator",
    name: "Fancy & Cool",
    shortName: "Fancy",
    icon: "Snowflake",
    description: "Bubbles, mirrors, wide caps, and eye-catching looks.",
    categories: ["Cool"],
  },
  {
    slug: "gothic-scary-font-generator",
    name: "Gothic & Scary",
    shortName: "Gothic",
    icon: "Zap",
    description: "Gothic, horror, creepy, and Zalgo glitch fonts.",
    categories: ["Glitch", "Bold"],
  },
  {
    slug: "old-english-retro-font-generator",
    name: "Old English",
    shortName: "Old English",
    icon: "Type",
    description: "Fraktur, typewriter, pixel, and medieval serif fonts.",
    categories: ["Bold"],
  },
  {
    slug: "gaming-font-generator",
    name: "Gaming",
    shortName: "Gaming",
    icon: "Bold",
    description: "Discord, Minecraft, Roblox, and gamer tag fonts.",
    categories: ["Glitch", "Cool"],
  },
  {
    slug: "instagram-font-generator",
    name: "Instagram",
    shortName: "Instagram",
    icon: "Sparkles",
    description: "Fonts optimized for Instagram bios and captions.",
    categories: ["Fancy", "Cursive"],
  },
  {
    slug: "symbol-emoji-font-generator",
    name: "Symbol & Emoji",
    shortName: "Symbol",
    icon: "Sparkles",
    description: "Hearts, stars, brackets, and emoji-wrapped fonts.",
    categories: ["Symbol"],
  },
  {
    slug: "small-bold-font-generator",
    name: "Small & Bold",
    shortName: "Small",
    icon: "Minimize2",
    description: "Tiny, superscript, bold, and italic text styles.",
    categories: ["Small", "Bold"],
  },
  {
    slug: "seasonal-font-generator",
    name: "Seasonal",
    shortName: "Seasonal",
    icon: "CaseSensitive",
    description: "Halloween, Christmas, and birthday-themed fonts.",
    categories: ["Symbol"],
  },
];

/** Get fonts for a given cluster slug. */
export function getStylesByCluster(slug: string): FontStyle[] {
  const cluster = FONT_CLUSTERS.find((c) => c.slug === slug);
  if (!cluster) return [];
  if (cluster.fontIds) {
    const byId = new Map(FONT_STYLES.map((s) => [s.id, s]));
    return cluster.fontIds.map((id) => byId.get(id)).filter(Boolean) as FontStyle[];
  }
  const cats = cluster.categories ?? [];
  return FONT_STYLES.filter((s) => cats.includes(s.category));
}

/** Count fonts for a given cluster slug (for the sidebar badge). */
export function clusterFontCount(slug: string): number {
  return getStylesByCluster(slug).length;
}

/** Find a cluster by slug. */
export function getCluster(slug: string): FontCluster | undefined {
  return FONT_CLUSTERS.find((c) => c.slug === slug);
}

/** Count styles per category (for the "All" badge etc.) */
export function styleCount(): number {
  return FONT_STYLES.length;
}
