import { CategoryPageLayout, type FAQItem } from "@/components/category-page-layout";
import {
  generateMetadata as seoMetadata,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata = seoMetadata({
  title: "Cursive Font Generator — Copy & Paste Cursive Fonts | TyeFlo",
  description:
    "Free cursive font generator. Copy and paste elegant cursive, script, calligraphy, handwriting and signature fonts. No sign-up. Works on Instagram, Discord & WhatsApp.",
  path: "/cursive-font-generator",
  keywords: [
    "cursive font copy and paste",
    "cursive fonts copy and paste",
    "elegant cursive fonts copy and paste",
    "script font copy and paste",
    "handwriting font copy and paste",
    "cursive font generator copy and paste",
    "calligraphy font copy and paste",
    "free calligraphy fonts copy and paste",
    "signature copy and paste font",
  ],
});

const FAQ_DATA: FAQItem[] = [
  {
    q: "How do I copy and paste cursive fonts?",
    a: "Type your text in the input box on the TyeFlo homepage, switch to the Cursive category, click any font card to copy it to your clipboard, then paste it straight into Instagram, Discord, WhatsApp, TikTok or anywhere else. No app or extension needed.",
  },
  {
    q: "Are these cursive fonts free?",
    a: "Yes — every cursive and calligraphy style on TyeFlo is 100% free with no sign-up, no watermark and no daily limit. Generate and copy as many cursive fonts as you want, forever.",
  },
  {
    q: "Do cursive fonts work on Instagram, Discord and WhatsApp?",
    a: "Yes. Cursive fonts are built from Unicode characters, so they paste natively into Instagram bios and captions, Discord nicknames and messages, WhatsApp statuses, TikTok captions and email signatures — no font installation required.",
  },
  {
    q: "Can I use calligraphy fonts for my signature?",
    a: "You can create signature-style decorative text with our script and calligraphy styles — just type your name, pick a calligraphy card, copy and paste. Note: this is decorative Unicode text, not a legally binding digital signature.",
  },
  {
    q: "Why do cursive fonts sometimes show as boxes?",
    a: "Some older devices and strict platforms don't ship every Unicode script character. If a cursive or calligraphy style shows as boxes, try a different one — most modern phones and browsers render every option on this page.",
  },
];

const RELATED_LINKS = [
  {
    label: "Cute & Aesthetic Font Generator",
    href: "/cute-aesthetic-font-generator",
    description: "Soft kawaii, coquette and Y2K fonts for dreamy bios.",
  },
  {
    label: "Fancy & Cool Font Generator",
    href: "/fancy-cool-font-generator",
    description: "Bubbles, full-width and unique fonts for standout posts.",
  },
  {
    label: "Old English & Retro Font Generator",
    href: "/old-english-retro-font-generator",
    description: "Blackletter and medieval fonts for vintage designs.",
  },
  {
    label: "Small & Bold Font Generator",
    href: "/small-bold-font-generator",
    description: "Tiny superscript, bold serif and italic fonts for tight spaces.",
  },
];

export default function CursiveFontGeneratorPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://tyeflo.com" },
    { name: "Cursive Font Generator", url: "https://tyeflo.com/cursive-font-generator" },
  ]);

  return (
    <CategoryPageLayout
      title="Cursive Font Generator — Copy &amp; Paste"
      shortIntro="Free cursive font generator — copy and paste script, calligraphy, handwriting and signature fonts for Instagram bios and email signatures."
      cluster="cursive-font-generator"
      description={
        <p>
          Looking for <strong>cursive fonts to copy and paste</strong>? TyeFlo&apos;s
          free <strong>cursive font generator</strong> turns your plain text into
          flowing script, <strong>elegant cursive fonts</strong>,{" "}
          <strong>handwriting</strong> and <strong>calligraphy</strong> styles using
          pure Unicode — every style <strong>copies and pastes</strong> natively
          into Instagram, Discord, WhatsApp and email signatures. Need a polished{" "}
          <strong>signature copy and paste font</strong> or{" "}
          <strong>free calligraphy fonts</strong> for your next project? Pick a card
          in the tool above — try our{" "}
          <a href="/" className="text-primary underline">free font generator</a>{" "}
          for hundreds of <strong>script font copy and paste</strong> styles, no
          sign-up and no watermark.
        </p>
      }
      faqs={FAQ_DATA}
      relatedLinks={RELATED_LINKS}
      breadcrumbsJson={breadcrumbs}
      faqJson={faqSchema(FAQ_DATA)}
    />
  );
}
