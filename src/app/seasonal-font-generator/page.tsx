import { CategoryPageLayout, type FAQItem } from "@/components/category-page-layout";
import {
  generateMetadata as seoMetadata,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata = seoMetadata({
  title: "Seasonal Font Generator — Copy & Paste Halloween, Christmas & Birthday Fonts | TyeFlo",
  description:
    "Free seasonal font generator. Copy and paste Halloween, Christmas and happy birthday fonts for cards, captions and posts. No sign-up. Works everywhere.",
  path: "/seasonal-font-generator",
  keywords: [
    "halloween fonts copy and paste",
    "christmas font copy and paste",
    "happy birthday font text copy and paste",
  ],
});

const FAQ_DATA: FAQItem[] = [
  {
    q: "How do I copy and paste Halloween fonts?",
    a: "Type your text in the input box on the TyeFlo homepage, switch to a gothic or fancy category, click any font card to copy it, then paste it into Instagram captions, party flyers, WhatsApp statuses or anywhere you want a spooky vibe. No app required.",
  },
  {
    q: "Are these seasonal fonts free?",
    a: "Yes — every Halloween, Christmas and birthday font on TyeFlo is 100% free with no sign-up, no watermark and no daily limit. Generate and copy as many seasonal fonts as you want, forever.",
  },
  {
    q: "Do seasonal fonts work on Instagram and TikTok?",
    a: "Yes. Halloween, Christmas and birthday fonts are built from Unicode characters, so they paste natively into Instagram bios and captions, TikTok captions, WhatsApp statuses and iMessage — no font installation required.",
  },
  {
    q: "Can I use these fonts for printable cards and invitations?",
    a: "Absolutely. Halloween, Christmas and happy birthday fonts paste cleanly into Canva, Google Docs, Microsoft Word, Photoshop and most design tools. Copy the styled text from TyeFlo and paste it straight into your card or invitation template.",
  },
  {
    q: "Why do some seasonal fonts show as boxes?",
    a: "Some older devices and strict platforms don't ship every Unicode blackletter or decorative glyph. If a Halloween or Christmas style shows as boxes, try a different one — most modern phones and browsers render every option on this page.",
  },
];

const RELATED_LINKS = [
  {
    label: "Gothic & Scary Font Generator",
    href: "/gothic-scary-font-generator",
    description: "Dark fraktur and cursed fonts for Halloween posts.",
  },
  {
    label: "Symbol & Emoji Font Generator",
    href: "/symbol-emoji-font-generator",
    description: "Hearts, stars and bows to wrap any seasonal text.",
  },
  {
    label: "Cute & Aesthetic Font Generator",
    href: "/cute-aesthetic-font-generator",
    description: "Soft kawaii and Y2K fonts for cute holiday vibes.",
  },
  {
    label: "Fancy & Cool Font Generator",
    href: "/fancy-cool-font-generator",
    description: "Bubbles, full-width and unique fonts for festive captions.",
  },
];

export default function SeasonalFontGeneratorPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://tyeflo.com" },
    { name: "Seasonal Font Generator", url: "https://tyeflo.com/seasonal-font-generator" },
  ]);

  return (
    <CategoryPageLayout
      title="Seasonal Font Generator — Copy &amp; Paste"
      shortIntro="Free seasonal font generator — copy and paste Halloween, Christmas and happy birthday fonts for cards, captions and posts."
      cluster="seasonal-font-generator"
      description={
        <p>
          Looking for <strong>halloween fonts to copy and paste</strong> for spooky
          season content? TyeFlo&apos;s seasonal font generator turns your text into
          haunted, festive and celebratory typefaces — including{" "}
          <strong>christmas font copy and paste</strong> and{" "}
          <strong>happy birthday font text copy and paste</strong> — every style{" "}
          <strong>copies and pastes</strong> natively into Instagram bios, Discord
          nicknames, WhatsApp statuses and party invites. Try the{" "}
          <a href="/" className="text-primary underline">free font generator</a>{" "}
          above for hearts, stars, sparkles and gothic letterforms — no sign-up and
          no watermark, free forever.
        </p>
      }
      faqs={FAQ_DATA}
      relatedLinks={RELATED_LINKS}
      breadcrumbsJson={breadcrumbs}
      faqJson={faqSchema(FAQ_DATA)}
    />
  );
}
