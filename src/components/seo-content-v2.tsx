/**
 * SeoContentV2 — comprehensive long-form SEO content for the homepage.
 *
 * This is a SERVER component (no "use client"). It renders 15 sections
 * (How to Use, Where to Use, Tips, Features, Unicode, Bio Templates,
 * Categories, New Fonts, Quotes, Alphabet Styling, Troubleshoot,
 * Found a Font, About, FAQs, Conclusion) all in one place.
 *
 * BioTemplateCard (used inside the Bio Templates section) is a client
 * component imported from "./bio-templates". Template data lives in
 * "@/data/bio-templates" and is shared with the /bio-templates page.
 */

import {
  Zap,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  Type,
  Palette,
  Sparkles,
  Quote,
  AlertTriangle,
  Mail,
  Info,
  HelpCircle,
  ArrowRight,
  LayoutGrid,
  // Category icons
  Sparkle,
  Wand2,
  PenTool,
  Minimize2,
  Bold,
  Bug,
  Hash,
  Shapes,
  CaseSensitive,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { BioTemplateCard } from "./bio-templates";
import { HOMEPAGE_BIO_TEMPLATES } from "@/data/bio-templates";
import { loadHomepageSection } from "@/lib/mdx-loader";

/* ------------------------------------------------------------------ *
 * Shared helpers
 * ------------------------------------------------------------------ */

type HeadingIcon = ComponentType<{ className?: string }>;

function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: HeadingIcon;
  eyebrow: string;
  title: ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 text-primary">
        <Icon className="h-5 w-5" />
        <span className="text-xs font-semibold uppercase tracking-[0.18em]">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <span className="mt-2 mb-2 block h-1 w-16 rounded-full bg-amber-400" />
    </div>
  );
}

const PROSE =
  "text-[15px] leading-relaxed text-muted-foreground sm:text-base";

/* ------------------------------------------------------------------ *
 * Static data
 * ------------------------------------------------------------------ */

const HOW_TO_STEPS: {
  title: string;
  description: string;
  image: string;
  alt: string;
}[] = [
  {
    title: "Type your text",
    description:
      "Start by typing anything into the input box at the top of the page — your name, a username, a bio line, a caption, or a quote. As you type, the tool instantly converts each character into hundreds of fancy Unicode styles, so you can preview them side-by-side in real time.",
    image: "/how-it-works-step-1.webp",
    alt: "How it works Step 1: type your text in the Copy & Paste Fonts generator input box",
  },
  {
    title: "Copy the style you like",
    description:
      "Scroll through the generated styles, then tap any row to copy that exact styled text to your clipboard. Want a few options? Keep clicking — every copy is added to the sticky clipboard bar at the bottom, and you can copy them all together with one tap.",
    image: "/how-it-works-step-2.webp",
    alt: "How it works Step 2: copy any Copy & Paste Fonts style by clicking a row",
  },
  {
    title: "Paste it wherever you want",
    description:
      "Open Instagram, TikTok, Twitter/X, Discord, WhatsApp, Free Fire, or any app that accepts text, and paste. Because these are real Unicode characters (not font files), they render natively in almost every modern app — no install, no download, no plugin required.",
    image: "/how-it-works-step-3.webp",
    alt: "How it works Step 3: paste the Copy & Paste Fonts styled text into any app",
  },
  {
    title: "Works on all devices",
    description:
      "Phone, tablet, laptop, or desktop — Windows, Mac, iOS, Android, or Linux. The exact same fonts render everywhere because Unicode is a global standard supported by every major operating system and browser. No settings to fiddle with.",
    image: "/how-it-works-step-4.webp",
    alt: "How it works Step 4: Copy & Paste Fonts render on every device and OS",
  },
  {
    title: "Adjust font size",
    description:
      "Use the + and - buttons next to the input to make the preview text larger or smaller. Bump it up when you want to admire ornate styles like Fraktur or Bubbles, or shrink it down to fit more rows on the screen while you browse. Your size preference is remembered for the session.",
    image: "/how-it-works-step-5.webp",
    alt: "How it works Step 5: adjust the Copy & Paste Fonts preview size with + and − buttons",
  },
];

const USE_CASES: { title: string; body: string }[] = [
  {
    title: "Social Media",
    body: "Social media is the biggest use case for our free font generator. Use these fonts to spice up Instagram bios, captions and stories, Facebook posts, TikTok captions, WhatsApp status updates, and tweets. The same styles also work on LinkedIn, Reddit, Pinterest, and most other platforms that accept plain text.",
  },
  {
    title: "Games",
    body: "Today, we don't just play games — we chat inside them, set usernames, and write descriptions. Our fonts help your in-game chats, nicknames, and clan tags look more attractive across Discord, Free Fire, PUBG, Minecraft, BGMI, Valorant, and Roblox. A quick note: a few rare games block certain Unicode ranges, so always double-check before paying to rename your character.",
  },
  {
    title: "Art",
    body: "If you're feeling creative, use our fonts to express your personality, thoughts, and artistic side. Drop fancy text into image edits, video thumbnails, poster mockups, Instagram story templates, Canva designs, or Procreate layers — anywhere a text layer exists, a Unicode font fits in beautifully.",
  },
  {
    title: "Education",
    body: "Educational essays, images, presentations, and assignments are usually a little dull, right? Add a visual lift to your slides, headlines, and notes with bold, script, or gothic styles. They're perfect for class posters, project titles, science-fair headers, and study highlights that need a little extra flair.",
  },
  {
    title: "Messaging",
    body: "Add creativity and a bit of style to your messages. Imagine a WhatsApp or iMessage text in an elegant cursive font rather than the default — it instantly conveys your personality and mood. Use them freely on WhatsApp, iMessage, Telegram, Messenger, Snapchat, and Signal.",
  },
  {
    title: "Design",
    body: "Designers are always looking for fresh text accents for their mockups, wireframes, and concept boards. Why not add Unicode fonts to the mix? Enter your text, pick the style that best suits your mood, and paste it straight into Figma, Canva, Photoshop, Illustrator, or any tool that accepts pasted text.",
  },
  {
    title: "Documents",
    body: "We all wish there were fewer documents in our lives — sadly, we can't reduce them. What we can do is make them more fun. Add bold, italics, or other cool fonts to email subject lines, presentation titles, and section headers. They render perfectly in Google Docs, Notion, Slack, and most modern text editors.",
  },
  {
    title: "Ads",
    body: "Running a special offer? \"Normal text\" ❌ — \"Stylish text\" ✔️. Use our fonts to make sale banners, promotional captions, push notifications, and email headlines pop. A fancy headline often converts better than a plain one, and Unicode text works in almost every ad platform that accepts plain text.",
  },
  {
    title: "QR Code",
    body: "You can paste these stylish fonts into a QR code generator and get something unexpected — a custom-decorated label that still scans. Great for event wristbands, custom packaging, wedding invites, or business cards where you want the label itself to feel designed rather than generic.",
  },
];

const TIPS: { title: string; body: string }[] = [
  { title: "Match the Mood", body: "Choose the style that matches your vibe, not just your favorite. Spooky content fits Gothic, playful with Bubbles, elegant with Cursive — match mood to message." },
  { title: "Test on the Target Platform", body: "Before finalizing, test it on your phone or the actual app. Most platforms support every Unicode style, but a quick check saves surprises." },
  { title: "Browse by Category", body: "Cool, Fancy, Cursive, Small, Bold, Glitch, Symbol, and Text Art each have a distinct personality — use categories to find your vibe fast." },
  { title: "Keep it Simple", body: "Avoid overstyling. Too many decorative characters can make your bio or profile feel crowded and hard to read." },
  { title: "Prioritize Readability", body: "A font that looks gorgeous but is hard to read will hurt more than it helps — especially in bios and captions." },
  { title: "Fit the App", body: "Clean script fonts won't work for fast gaming chats; Bubbles won't look great in a professional LinkedIn bio. Match style to platform." },
  { title: "Check What's Trending", body: "The Popular section shows what other people are actually using — a quick way to spot what's hot right now." },
  { title: "Use the Size Slider", body: "Use the +/− buttons to enlarge ornate styles like Fraktur for a closer look, and shrink back when scanning through dozens of options." },
  { title: "Compare Side-by-Side", body: "Copy two or three options to the clipboard bar at the bottom and pick the best one after seeing them side-by-side." },
];

const FEATURES: string[] = [
  "No sign-in required — open the page and start typing instantly.",
  "Always free, with no hidden plan, no watermark, and no daily limit.",
  "Friendly, distraction-free UI built for fast browsing on any device.",
  "Privacy first: the text you type in the generator never leaves your device.",
  "Simple, fast, and easy to use — no learning curve.",
  "Unicode-based styles compatible with almost every modern device and app.",
  "Largest collection — 200+ styles across 11 curated categories.",
  "Unique styles you won't find duplicated on every other generator.",
  "New styles added regularly based on what users ask for.",
  "Simple and instant copy-paste-share — no download, no install.",
  "Categories to help you find the best font for your specific vibe.",
  "Mobile-friendly preview that adapts to any screen size, phone or desktop.",
];

const CATEGORIES: {
  name: string;
  slug: string;
  href: string;
  description: string;
  styles: string;
}[] = [
  {
    name: "Cursive",
    slug: "cursive",
    href: "/cursive-font-generator",
    description: "Elegant script, calligraphy, and handwriting-inspired fonts.",
    styles: "25+ styles",
  },
  {
    name: "Cute & Aesthetic",
    slug: "cute",
    href: "/cute-aesthetic-font-generator",
    description: "Kawaii, preppy, coquette, and Y2K aesthetic fonts.",
    styles: "20+ styles",
  },
  {
    name: "Fancy & Cool",
    slug: "fancy",
    href: "/fancy-cool-font-generator",
    description: "Bubbles, mirrors, wide caps, and decorative wraps.",
    styles: "30+ styles",
  },
  {
    name: "Gothic & Scary",
    slug: "gothic",
    href: "/gothic-scary-font-generator",
    description: "Gothic, horror, creepy, and Zalgo-style glitch fonts.",
    styles: "15+ styles",
  },
  {
    name: "Old English & Retro",
    slug: "old-english",
    href: "/old-english-retro-font-generator",
    description: "Fraktur, typewriter, pixel, and medieval serif fonts.",
    styles: "15+ styles",
  },
  {
    name: "Gaming",
    slug: "gaming",
    href: "/gaming-font-generator",
    description: "Discord, Minecraft, Roblox, and gamer tag fonts.",
    styles: "10+ styles",
  },
  {
    name: "Instagram",
    slug: "instagram",
    href: "/instagram-font-generator",
    description: "Fonts optimized for Instagram bios, captions, and stories.",
    styles: "15+ styles",
  },
  {
    name: "Symbol & Emoji",
    slug: "symbol",
    href: "/symbol-emoji-font-generator",
    description: "Hearts, stars, brackets, and emoji-wrapped fonts.",
    styles: "25+ styles",
  },
  {
    name: "Small & Bold",
    slug: "small-bold",
    href: "/small-bold-font-generator",
    description: "Tiny, superscript, bold, and italic text styles.",
    styles: "15+ styles",
  },
  {
    name: "Seasonal",
    slug: "seasonal",
    href: "/seasonal-font-generator",
    description: "Halloween, Christmas, and birthday-themed fonts.",
    styles: "5+ styles",
  },
];

/** Lucide icon per category — used in the categories table for visual scanability */
const CATEGORY_ICONS: Record<string, HeadingIcon> = {
  cursive: PenTool,
  cute: Sparkle,
  fancy: Wand2,
  gothic: Bug,
  "old-english": Shapes,
  gaming: Bold,
  instagram: Hash,
  symbol: CaseSensitive,
  "small-bold": Minimize2,
  seasonal: TrendingUp,
};

const NEW_FONTS: { name: string; description: string }[] = [
  {
    name: "Square Bold",
    description:
      "Heavy blocky letters enclosed in solid squares — bold without being loud.",
  },
  {
    name: "Mirrored Text",
    description:
      "Every letter reflected horizontally, so the line reads like a fun-house mirror.",
  },
  {
    name: "Strikethrough Wave",
    description:
      "Wavy strikethrough running through cursive script for a hand-crossed-out look.",
  },
  {
    name: "Circled Bubbles",
    description:
      "Each character wrapped in a perfect circle — soft, friendly, and very legible.",
  },
  {
    name: "Small Caps 2.0",
    description:
      "Refined small caps with better x-height balance for clean reading at tiny sizes.",
  },
  {
    name: "Fraktur Filigree",
    description:
      "Intricate Fraktur with extra flourish strokes for medieval-poster vibes.",
  },
  {
    name: "Zalgo Glitch Pro",
    description:
      "Heavier Zalgo distortion with deeper stacking — for when you want it cursed.",
  },
  {
    name: "Mixed Alphabet",
    description:
      "Random mix of math, script, and bold characters for a chaotic-but-cool look.",
  },
  {
    name: "Rainbow Mix",
    description:
      "Multi-block rotation that gives every letter a slightly different visual feel.",
  },
];

const QUOTES: string[] = [
  "My journey is still being written, and I'm just getting started.",
  "I was never meant to blend in; I was made to be different.",
  "Enjoy the little moments because tomorrow is never promised.",
  "Confidence is the best thing I can wear.",
  "I don't follow paths, I create my own.",
  "A small step forward is still progress.",
  "I'm not perfect, I'm one of a kind.",
  "Keep smiling and look for the brighter side of life.",
  "Dream without limits, begin with small steps, and keep moving.",
  "Being yourself will always be your greatest strength.",
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is TyeFlo free to use?",
    a: "Yes, completely free. No sign-up, no watermark, no daily limits, and no hidden plan. Type your text, pick a style, copy it, and paste it wherever you want — that's the whole flow. The tool is funded by lightweight ads so it can stay free forever for everyone.",
  },
  {
    q: "Do these fonts work on Instagram, TikTok, and Twitter?",
    a: "Yes. Instagram bios and captions, TikTok captions and comments, Twitter/X display names and tweets, WhatsApp status, Discord nicknames, YouTube titles — they all accept these Unicode styles because they're standard characters, not real font files. A handful of styles (very rare ones) may render as boxes on older devices; if that happens, just pick another style.",
  },
  {
    q: "Why do some fonts show up as empty boxes?",
    a: "Empty boxes (tofu) or question marks appear when the platform or device doesn't have a glyph for that specific Unicode character. It's rare, but it happens — usually with very exotic styles like Zalgo or obscure mathematical symbols. Just switch to a slightly different style and you'll be fine. The Popular section is full of universally supported options.",
  },
  {
    q: "Are these real fonts I can download?",
    a: "No, and that's actually the point. These are Unicode characters — real text characters that already exist on your device — not downloadable font files like .ttf or .otf. That's why they work everywhere online without installation. If you need an actual installable font file for design software, head to a font library like Google Fonts or DaFont instead.",
  },
  {
    q: "Is anything I type stored or sent to your servers?",
    a: "The generator itself is fully private: everything you type is transformed live in your browser, and your text never leaves your device. We do not store generator input, and we do not track individual font copies. The only things we store are what you deliberately create as a signed-in creator: your username, your published templates, and your creator points — that is what powers the community templates section. Privacy first, always.",
  },
];

/* ------------------------------------------------------------------ *
 * Main component
 * ------------------------------------------------------------------ */

export function SeoContentV2() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
      {/* Table of Contents — collapsible, shows on click */}
      <details className="group mb-16 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-bold text-foreground">
          <span className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-primary" />
            Table of Contents
          </span>
          <span className="text-muted-foreground transition-transform group-open:rotate-180">▾</span>
        </summary>
        <nav className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {[
            { label: "How it Works", href: "#how-it-works" },
            { label: "Where to Use", href: "#use-cases" },
            { label: "Tips for Choosing", href: "#tips" },
            { label: "Why Choose Us", href: "#why-choose-us" },
            { label: "How Unicode Works", href: "#unicode" },
            { label: "Bio Templates", href: "#bio-templates" },
            { label: "Categories", href: "#categories" },
            { label: "New Font Styles", href: "#new" },
            { label: "Quotes", href: "#quotes" },
            { label: "Alphabet Styling", href: "#alphabet-styling" },
            { label: "Troubleshoot", href: "#troubleshoot" },
            { label: "Found a Font?", href: "#found-a-font" },
            { label: "About TyeFlo", href: "#about" },
            { label: "FAQs", href: "#faqs" },
            { label: "Conclusion", href: "#conclusion" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </details>

      <div className="space-y-16 sm:space-y-20">
        {/* -------------------------------------------------- *
         * 1. How to Use
         * -------------------------------------------------- */}
        <article id="how-it-works" className="scroll-mt-24">
          <SectionHeading
            icon={Zap}
            eyebrow="Quick Start"
            title="How it Works"
          />
          <div
            className={PROSE}
            dangerouslySetInnerHTML={{
              __html:
                loadHomepageSection("how-it-works")?.html ||
                "Using TyeFlo takes seconds. Type your text, click a style to copy it, and paste it wherever you want.",
            }}
          />

          <div className="mt-10 space-y-10 sm:space-y-14">
            {HOW_TO_STEPS.map((step, i) => {
              const imageLeft = i % 2 === 0;
              return (
                <div
                  key={step.title}
                  className={`group flex flex-col items-center gap-6 lg:flex-row lg:gap-10 ${imageLeft ? "" : "lg:flex-row-reverse"}`}
                >
                  {/* Image — large card with floating step badge */}
                  <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-card to-card p-3 shadow-sm transition-shadow group-hover:shadow-md lg:w-1/2">
                    {/* Floating step number badge */}
                    <span className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground shadow-md ring-4 ring-background">
                      {i + 1}
                    </span>
                    <img
                      src={step.image}
                      alt={step.alt}
                      width={700}
                      height={390}
                      loading="lazy" decoding="async"
                      className="mx-auto h-auto w-full rounded-2xl object-contain max-h-[min(260px,42vh)] sm:max-h-[360px]"
                    />
                  </div>
                  {/* Text */}
                  <div className="w-full lg:w-1/2">
                    <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      <Zap className="h-3 w-3" />
                      Step {i + 1} of {HOW_TO_STEPS.length}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className={`mt-3 ${PROSE}`}>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        {/* -------------------------------------------------- *
         * 2. Where to Use
         * -------------------------------------------------- */}
        <article id="use-cases" className="scroll-mt-24">
          <SectionHeading
            icon={Palette}
            eyebrow="Use Cases"
            title="Where to Use"
          />
          <p className={PROSE}>
            Once you've copied a styled font, where can you paste it? Almost
            anywhere that accepts plain text. Below are the most popular use
            cases our users actually rely on day-to-day.
          </p>
          <div className="mt-8 space-y-8">
            {USE_CASES.map((u) => (
              <div key={u.title}>
                <h3 className="w-fit border-b-2 border-primary pb-0.5 text-lg font-bold text-foreground">
                  {u.title}
                </h3>
                <p className={`mt-2 ${PROSE}`}>{u.body}</p>
              </div>
            ))}
          </div>
        </article>

        {/* -------------------------------------------------- *
         * 3. Tips for Choosing the Best Font
         * -------------------------------------------------- */}
        <article id="tips" className="scroll-mt-24">
          <SectionHeading
            icon={Lightbulb}
            eyebrow="Pro Tips"
            title="Tips for Choosing the Best Font"
          />
          <div
            className={PROSE}
            dangerouslySetInnerHTML={{
              __html:
                loadHomepageSection("tips")?.html ||
                "With hundreds of styles to pick from, it's easy to get lost. These nine tips will help you narrow down.",
            }}
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TIPS.map((tip, i) => (
              <div
                key={i}
                className="card-3d flex flex-col gap-2 rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <h3 className="text-sm font-bold text-foreground">{tip.title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{tip.body}</p>
              </div>
            ))}
          </div>
        </article>

        {/* -------------------------------------------------- *
         * 4. Features / Why Choose Us
         * -------------------------------------------------- */}
        <article id="why-choose-us" className="scroll-mt-24">
          <SectionHeading
            icon={Sparkles}
            eyebrow="Features"
            title={
              <>
                Why Choose TyeFlo — the{" "}
                <strong className="font-bold text-primary">
                  Copy &amp; Paste Fonts
                </strong>{" "}
                Generator
              </>
            }
          />
          <div
            className={PROSE}
            dangerouslySetInnerHTML={{
              __html:
                loadHomepageSection("why-choose-us")?.html ||
                "TyeFlo is the #1 and best copy and paste fonts generator in the market.",
            }}
          />
          <div className="mt-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-4">
              <img
                src="/why-choose-us-features.webp"
                alt="Copy & Paste Fonts — TyeFlo features infographic showing 11 key reasons to use the free font generator including 11 categories, 200+ options, no sign-in, always free, and data privacy"
                width={700}
                height={390}
                loading="lazy"
                decoding="async"
                className="h-auto w-full rounded-xl object-contain max-h-[50vh] sm:max-h-[400px]"
              />
              <figcaption className="mt-3 text-center text-xs text-muted-foreground">
                The <strong className="font-semibold text-foreground">Copy &amp; Paste Fonts</strong> generator — 11 key features
              </figcaption>
            </div>
            <ul className="flex flex-col justify-center space-y-3">
              {FEATURES.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border/70 bg-card px-4 py-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className={`flex-1 ${PROSE}`}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* -------------------------------------------------- *
         * 5. Why It Works on Every Platform — Unicode
         * -------------------------------------------------- */}
        <article id="unicode" className="scroll-mt-24">
          <SectionHeading
            icon={Type}
            eyebrow="Under the Hood"
            title="Why It Works on Every Platform — Unicode"
          />
          <div
            className={`space-y-4 ${PROSE}`}
            dangerouslySetInnerHTML={{
              __html:
                loadHomepageSection("unicode")?.html ||
                "Unicode is a global character-encoding standard that assigns a unique code to every letter, symbol, and character from almost every writing system.",
            }}
          />
        </article>

        {/* -------------------------------------------------- *
         * 6. Bio Templates
         * -------------------------------------------------- */}
        <article id="bio-templates" className="scroll-mt-24">
          <SectionHeading
            icon={LayoutGrid}
            eyebrow="Templates"
            title="Bio Templates"
          />
          <p className={PROSE}>
            Need inspiration for your next bio? Start with one of these
            ready-made templates — click a card to copy it instantly, or tap
            the pencil icon to edit each line first (the font stays the same).
            Nothing is saved, so templates always reset to their defaults.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HOMEPAGE_BIO_TEMPLATES.map((t) => (
              <BioTemplateCard
                key={t.label}
                label={t.label}
                lines={t.lines}
                styles={t.styles}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/bio-templates"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              See More Templates
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>

        {/* -------------------------------------------------- *
         * 7. Categories
         * -------------------------------------------------- */}
        <article id="categories" className="scroll-mt-24">
          <SectionHeading
            icon={LayoutGrid}
            eyebrow="Browse"
            title="Categories"
          />
          <p className={PROSE}>
            We&apos;ve sorted every font into 11 dedicated generator pages so
            you can find the right vibe in seconds. Click any name below to
            jump straight to its own page — each one has the full font tool,
            popular styles, use cases, and FAQ for that group.
          </p>

          {/* Mobile: card grid (sm and below) */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:hidden">
            {CATEGORIES.map((c) => {
              const Icon = CATEGORY_ICONS[c.slug] || LayoutGrid;
              return (
                <a
                  key={c.slug}
                  href={c.href}
                  className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-foreground group-hover:text-primary">
                        {c.name} Fonts
                      </h3>
                      <span className="inline-flex shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        {c.styles}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {c.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                </a>
              );
            })}
          </div>

          {/* Desktop: semantic table (sm and up) */}
          <div className="mt-8 hidden overflow-hidden rounded-2xl border border-border shadow-sm sm:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider">
                    Styles
                  </th>
                </tr>
              </thead>
              <tbody>
                {CATEGORIES.map((c, i) => {
                  const Icon = CATEGORY_ICONS[c.slug] || LayoutGrid;
                  return (
                    <tr
                      key={c.slug}
                      className={`group cursor-pointer border-t border-border transition-colors hover:bg-primary/5 ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}
                    >
                      <td className="px-5 py-4">
                        <a
                          href={c.href}
                          className="inline-flex items-center gap-2.5 font-bold text-foreground transition-colors group-hover:text-primary"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <Icon className="h-4 w-4" />
                          </span>
                          {c.name} Fonts
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                        </a>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">
                        {c.description}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {c.styles}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className={`mt-4 text-sm text-muted-foreground`}>
            Each category above links to its own dedicated page with the
            complete style catalog, usage examples, and FAQ — perfect for
            bookmarking when you find your favorite vibe.
          </p>
        </article>

        {/* -------------------------------------------------- *
         * 8. New Font Styles
         * -------------------------------------------------- */}
        <article id="new" className="scroll-mt-24">
          <SectionHeading
            icon={TrendingUp}
            eyebrow="Just Dropped"
            title="New Font Styles"
          />
          <p className={PROSE}>
            We've added dozens of new fonts to each category so you can find
            most of what you need on a single platform — no more jumping
            between sites. Here are nine of the latest additions:
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {NEW_FONTS.map((f) => (
              <div
                key={f.name}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-base font-bold text-foreground">
                      {f.name}
                    </h3>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                      New
                    </span>
                  </div>
                  <p className={`text-sm ${PROSE}`}>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* -------------------------------------------------- *
         * 9. Quotes For Profiles
         * -------------------------------------------------- */}
        <article id="quotes" className="scroll-mt-24">
          <SectionHeading
            icon={Quote}
            eyebrow="Inspiration"
            title="Quotes For Profiles"
          />
          <p className={PROSE}>
            Add one of these short quotes to your bio, status, or caption to
            make your profile feel a bit more aesthetic. Click any card to copy
            the quote text.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {QUOTES.map((q, i) => (
              <figure
                key={i}
                className="card-3d flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-5"
              >
                <Quote className="h-5 w-5 text-primary/60" />
                <blockquote className={`flex-1 ${PROSE}`}>"{q}"</blockquote>
              </figure>
            ))}
          </div>
        </article>

        {/* -------------------------------------------------- *
         * 10. Alphabet Styling
         * -------------------------------------------------- */}
        <article id="alphabet-styling" className="scroll-mt-24">
          <SectionHeading
            icon={Type}
            eyebrow="Deep Dive"
            title="Alphabet Styling"
          />
          <div className={`space-y-4 ${PROSE}`}>
            <p>
              Every letter changes its personality across different aesthetic
              styles. The letter <em>A</em>, for example, can appear as
              elegant script <span className="font-mono">𝒜</span>, bold{" "}
              <span className="font-mono">𝐀</span>, gothic{" "}
              <span className="font-mono">𝔄</span>, double-struck{" "}
              <span className="font-mono">𝔸</span>, or cursive{" "}
              <span className="font-mono">𝓐</span> — each version creates a
              completely different visual feel while still representing the same
              character. This variety is what makes aesthetic typography so
              powerful: every combination of letters, styles, symbols, and
              decorative elements can produce a unique look for usernames,
              bios, designs, and creative projects.
            </p>
            <p>
              This tool gives you access to the full alphabet from A to Z in
              hundreds of copy-paste styles, so you can transform any word
              instantly. Unicode also supports stylized numbers and symbols —
              like <span className="font-mono">①②③</span>,{" "}
              <span className="font-mono">𝟏𝟐𝟑</span>, and many other
              decorative characters — letting you customize dates, rankings,
              logos, invitations, posters, and social media text. Whether you
              want something elegant, playful, bold, or modern, these design
              letters help turn ordinary text into something visually
              distinctive.
            </p>
          </div>
        </article>

        {/* -------------------------------------------------- *
         * 11. Troubleshoot
         * -------------------------------------------------- */}
        <article id="troubleshoot" className="scroll-mt-24">
          <SectionHeading
            icon={AlertTriangle}
            eyebrow="Help"
            title="Troubleshoot"
          />
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <p className={PROSE}>
              Sometimes, when you copy a font and paste it into a site or app,
              you may see boxes or empty squares. That's the platform's way of
              saying: <em>"We don't support these characters."</em> It's rare,
              but it happens. You may also see nothing at all on certain
              devices, because that device's fonts don't include the relevant
              Unicode glyphs. The fix is easy — come back to TyeFlo, choose a
              slightly different style, and try again. Most of our 200+ styles
              render universally across modern devices and apps.
            </p>
            <p className={`mt-3 ${PROSE}`}>
              Still stuck or seeing something weird?{" "}
              <a
                href="/contact"
                className="font-semibold text-primary underline underline-offset-4"
              >
                Reach out to us
              </a>{" "}
              and we'll help you figure out what's going on.
            </p>
          </div>
        </article>

        {/* -------------------------------------------------- *
         * 12. Found a Font?
         * -------------------------------------------------- */}
        <article id="found-a-font" className="scroll-mt-24">
          <SectionHeading
            icon={Mail}
            eyebrow="Suggest"
            title="Found a Font?"
          />
          <p className={PROSE}>
            Did you find a font that suits you? If not — and you're looking for
            some other styles — let us know. We're always adding new styles
            based on what you ask for, and we'd love to hear what's missing.
            Drop a quick note on our{" "}
            <a
              href="/contact"
              className="font-semibold text-primary underline underline-offset-4"
            >
              contact page
            </a>{" "}
            and we'll get it added so you and other users can enjoy it.
          </p>
        </article>

        {/* -------------------------------------------------- *
         * 13. About TyeFlo
         * -------------------------------------------------- */}
        <article id="about" className="scroll-mt-24">
          <SectionHeading
            icon={Info}
            eyebrow="About"
            title="About TyeFlo"
          />
          <div className={`space-y-4 ${PROSE}`}>
            <p>
              TyeFlo is a free online font generator that turns your plain
              text into hundreds of stylish Unicode fonts in real time. We
              built it to be the fastest, cleanest, and most privacy-respecting
              way to add personality to your bios, captions, usernames, and
              messages — no sign-up, no download, no paywall.
            </p>
            <p>
              Our team is a small group of designers and engineers who got
              frustrated with clunky, ad-heavy font sites. We wanted something
              that felt instant on mobile, looked clean on desktop, and never
              asked for your data. That's why TyeFlo transforms everything
              client-side in your browser, never stores what you type, and
              keeps the UI distraction-free.
            </p>
            <p>
              We're constantly adding new styles, new categories, and new
              templates based on what you tell us you want. Have an idea,
              spotted a bug, or found a font you'd love to see here? Head to
              the contact page — we read every message.
            </p>
          </div>
        </article>

        {/* -------------------------------------------------- *
         * 14. FAQs
         * -------------------------------------------------- */}
        <article id="faqs" className="scroll-mt-24">
          <SectionHeading
            icon={HelpCircle}
            eyebrow="FAQ"
            title="Frequently Asked Questions"
          />
          <div className="mt-6 space-y-3">
            {FAQS.map((f, i) => (
              <details
                key={i}
                className="group rounded-xl border border-border bg-card px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-base font-semibold text-foreground">
                  <span>{f.q}</span>
                  <span className="ml-auto inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <p className={`mt-3 ${PROSE}`}>{f.a}</p>
              </details>
            ))}
          </div>
        </article>

        {/* -------------------------------------------------- *
         * 15. Conclusion
         * -------------------------------------------------- */}
        <article id="conclusion" className="scroll-mt-24">
          <SectionHeading
            icon={CheckCircle2}
            eyebrow="Wrap Up"
            title="Conclusion"
          />
          <div className={`space-y-4 ${PROSE}`}>
            <p>
              Aesthetic fonts have changed the way people express themselves
              online by making personalized, creative text easier than ever.
              They provide a simple way to add character to your digital
              identity — whether you're crafting a unique Instagram bio, a
              memorable gaming username, designing content, or adding a
              personal touch to everyday messages.
            </p>
            <p>
              The best part is that no design experience, software, or
              expensive tools are needed. With hundreds of styles available —
              from cute and kawaii designs to elegant cursive, bold gothic,
              dreamy, glitch-inspired, and professional Unicode styles —
              anyone can transform regular text into something visually
              unique. Choose a style, copy your customized text, and use it
              across platforms to make your words stand out.
            </p>
            <p>
              Ready to give it a try? TyeFlo is your go-to{" "}
              <strong className="font-bold text-primary">Copy &amp; Paste Fonts</strong>{" "}
              generator — scroll back up to the input box, type anything, and
              tap any style to copy. Your next favorite bio is one click away.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}