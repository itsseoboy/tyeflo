import { CategoryPageLayout, type FAQItem } from "@/components/category-page-layout";
import {
  generateMetadata as seoMetadata,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata = seoMetadata({
  title: "Symbol & Emoji Font Generator — Copy & Paste Symbol Fonts | TyeFlo",
  description:
    "Free symbol and emoji font generator. Copy and paste heart, star, letter, number, bow, cat and cross symbol fonts. No sign-up. Works everywhere.",
  path: "/symbol-emoji-font-generator",
  keywords: [
    "heart fonts copy and paste",
    "copy and paste fonts symbols",
    "letter fonts copy and paste",
    "emoji font copy and paste",
    "letter s fonts to copy and paste",
    "number fonts copy and paste",
    "star font copy and paste",
    "bow font copy and paste",
    "name fonts copy and paste",
    "cat font copy and paste",
    "cross font copy and paste",
    "a font copy and paste",
  ],
});

const FAQ_DATA: FAQItem[] = [
  {
    q: "How do I copy and paste symbol fonts?",
    a: "Type your text in the input box on the TyeFlo homepage, switch to the Symbol category, click any font card to copy it to your clipboard, then paste it into Instagram, Discord, WhatsApp, TikTok or anywhere else. No app or extension needed.",
  },
  {
    q: "Are these symbol and emoji fonts free?",
    a: "Yes — every heart, star, letter and number symbol font on TyeFlo is 100% free with no sign-up, no watermark and no daily limit. Generate and copy as many symbol fonts as you want, forever.",
  },
  {
    q: "Do symbol fonts work on Instagram and Discord?",
    a: "Yes. Symbol and emoji fonts are built from Unicode characters, so they paste natively into Instagram bios and captions, Discord nicknames and messages, WhatsApp statuses and TikTok comments — no font installation required.",
  },
  {
    q: "What is the difference between emoji fonts and symbol fonts?",
    a: "Emoji fonts wrap your letters in full emoji characters (hearts, stars, bows, cats), while symbol fonts replace each letter with a stylised Unicode glyph (circled, squared, fraktur). Both copy and paste anywhere — pick whichever suits your vibe.",
  },
  {
    q: "Why do some symbol fonts show as boxes?",
    a: "Some older devices and strict platforms don't ship every Unicode symbol or emoji glyph. If a heart, star or bow font shows as boxes, try a different one — most modern phones and browsers render every option on this page.",
  },
];

const RELATED_LINKS = [
  {
    label: "Cute & Aesthetic Font Generator",
    href: "/cute-aesthetic-font-generator",
    description: "Soft kawaii, coquette and Y2K fonts to pair with symbols.",
  },
  {
    label: "Fancy & Cool Font Generator",
    href: "/fancy-cool-font-generator",
    description: "Bubbles, mirror and unique fonts for standout text.",
  },
  {
    label: "Instagram Font Generator",
    href: "/instagram-font-generator",
    description: "IG-specific fonts for bios, captions and story text.",
  },
  {
    label: "Seasonal Font Generator",
    href: "/seasonal-font-generator",
    description: "Halloween, Christmas and birthday symbol-wrapped fonts.",
  },
];

export default function SymbolEmojiFontGeneratorPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://tyeflo.com" },
    { name: "Symbol & Emoji Font Generator", url: "https://tyeflo.com/symbol-emoji-font-generator" },
  ]);

  return (
    <CategoryPageLayout
      title="Symbol &amp; Emoji Font Generator — Copy &amp; Paste"
      shortIntro="Free symbol and emoji font generator — copy and paste heart, star, letter, number, bow and cross symbol fonts for any platform."
      cluster="symbol-emoji-font-generator"
      description={
        <p>
          Looking for <strong>heart fonts to copy and paste</strong> and other
          symbol-decorated type? TyeFlo&apos;s symbol and{" "}
          <strong>emoji font copy and paste</strong> generator wraps your text in{" "}
          <strong>hearts</strong>, <strong>stars</strong>,{" "}
          <strong>letters</strong>, <strong>numbers</strong>, bows and crosses —
          every style <strong>copies and pastes</strong> natively into Instagram
          bios, Discord nicknames and WhatsApp statuses. Whether you need a{" "}
          <strong>star font</strong>, a <strong>bow font</strong>, a{" "}
          <strong>cat font</strong> or a <strong>cross font</strong> for your next
          post, our <strong>copy and paste fonts symbols</strong> library has you
          covered — try the{" "}
          <a href="/" className="text-primary underline">free font generator</a>{" "}
          above, no sign-up, no watermark.
        </p>
      }
      faqs={FAQ_DATA}
      relatedLinks={RELATED_LINKS}
      breadcrumbsJson={breadcrumbs}
      faqJson={faqSchema(FAQ_DATA)}
    />
  );
}
