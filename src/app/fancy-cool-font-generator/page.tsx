import { CategoryPageLayout, type FAQItem } from "@/components/category-page-layout";
import {
  generateMetadata as seoMetadata,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata = seoMetadata({
  title: "Fancy & Cool Font Generator — Copy & Paste Fancy Fonts | TyeFlo",
  description:
    "Free fancy and cool font generator. Copy and paste unique, fun, weird, glitch and crazy fonts. No sign-up. Works on Discord, Instagram & WhatsApp.",
  path: "/fancy-cool-font-generator",
  keywords: [
    "fancy font copy and paste",
    "cool fonts copy and paste",
    "cool font generator copy and paste",
    "different fonts copy and paste",
    "fun fonts copy and paste",
    "nice fonts to copy and paste",
    "special font copy and paste",
    "awesome fonts copy and paste",
    "weird font copy and paste",
    "crazy fonts copy and paste",
    "funny font copy and paste",
    "glitch font copy and paste",
    "unique fonts copy and paste",
  ],
});

const FAQ_DATA: FAQItem[] = [
  {
    q: "How do I copy and paste fancy fonts?",
    a: "Type your text in the input box on the TyeFlo homepage, browse the Cool or Fancy categories, click any font card to copy it, then paste it into Discord, social media, gaming profiles or anywhere that supports Unicode.",
  },
  {
    q: "Are these fancy and cool fonts free?",
    a: "Yes — every fancy, cool, glitch and weird style on TyeFlo is 100% free with no sign-up, no watermark and no daily limit. Generate and copy as many fonts as you want, forever.",
  },
  {
    q: "What are glitch and zalgo fonts?",
    a: "Glitch fonts use Unicode combining diacritical marks stacked above and below each letter to create a corrupted, chaotic look. They are perfect for horror content, gaming profiles, edgy usernames and Halloween posts.",
  },
  {
    q: "Do fancy fonts work on Discord and Reddit?",
    a: "Yes. Fancy fonts are built from Unicode characters, so they paste natively into Discord nicknames and messages, Reddit posts and comments, server names and channel descriptions — no font installation required.",
  },
  {
    q: "Why do weird fonts sometimes show as boxes?",
    a: "Some older devices and strict platforms don't ship every Unicode fancy character. If a fraktur, double-struck or glitch style shows as boxes, try a different one — most modern phones and browsers render every option on this page.",
  },
];

const RELATED_LINKS = [
  {
    label: "Gothic & Scary Font Generator",
    href: "/gothic-scary-font-generator",
    description: "Dark fraktur and cursed letterforms for edgy profiles.",
  },
  {
    label: "Cute & Aesthetic Font Generator",
    href: "/cute-aesthetic-font-generator",
    description: "Soft kawaii, coquette and Y2K fonts for dreamy posts.",
  },
  {
    label: "Gaming Font Generator",
    href: "/gaming-font-generator",
    description: "Discord, Minecraft, Roblox and Free Fire nickname fonts.",
  },
  {
    label: "Symbol & Emoji Font Generator",
    href: "/symbol-emoji-font-generator",
    description: "Hearts, stars and decorative symbols to wrap any text.",
  },
];

export default function FancyCoolFontGeneratorPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://tyeflo.com" },
    { name: "Fancy & Cool Font Generator", url: "https://tyeflo.com/fancy-cool-font-generator" },
  ]);

  return (
    <CategoryPageLayout
      title="Fancy &amp; Cool Font Generator — Copy &amp; Paste"
      shortIntro="Free fancy and cool font generator — copy and paste unique, fun, weird, glitch and crazy fonts for Discord, Instagram and gaming tags."
      cluster="fancy-cool-font-generator"
      description={
        <p>
          Looking for <strong>fancy fonts to copy and paste</strong> that actually
          stand out? TyeFlo&apos;s <strong>cool font generator</strong> turns your
          text into fraktur, double-struck, glitch and full-width{" "}
          <strong>unique fonts</strong> — every style{" "}
          <strong>copies and pastes</strong> natively into Discord nicknames,
          Instagram bios and YouTube comments. Whether you want{" "}
          <strong>fun fonts</strong>, <strong>different fonts</strong>,{" "}
          <strong>weird font copy and paste</strong> vibes, or just{" "}
          <strong>nice fonts</strong> and <strong>special fonts</strong> for a clean
          look, our <strong>awesome fonts</strong> cover every angle — including{" "}
          <strong>funny fonts</strong>, <strong>crazy fonts</strong> and{" "}
          <strong>glitch fonts</strong>. Try the{" "}
          <a href="/" className="text-primary underline">Copy &amp; Paste Fonts</a>{" "}
          tool above — all <strong>special font copy and paste</strong> styles are
          free with no sign-up.
        </p>
      }
      faqs={FAQ_DATA}
      relatedLinks={RELATED_LINKS}
      breadcrumbsJson={breadcrumbs}
      faqJson={faqSchema(FAQ_DATA)}
    />
  );
}
