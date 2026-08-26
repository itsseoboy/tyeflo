import { CategoryPageLayout, type FAQItem } from "@/components/category-page-layout";
import {
  generateMetadata as seoMetadata,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata = seoMetadata({
  title: "Small & Bold Font Generator — Copy & Paste Small, Bold & Tiny Fonts | TyeFlo",
  description:
    "Free small and bold font generator. Copy and paste small, tiny, bold, italic and colored fonts. No sign-up. Works on Instagram, Discord & WhatsApp.",
  path: "/small-bold-font-generator",
  keywords: [
    "small font copy and paste",
    "bold font copy and paste",
    "tiny font copy and paste",
    "small fonts copy and paste",
    "copy and paste italic font",
    "color fonts copy and paste",
    "colored font copy and paste",
    "coloring font copy and paste",
  ],
});

const FAQ_DATA: FAQItem[] = [
  {
    q: "How do I copy and paste small fonts?",
    a: "Type your text in the input box on the TyeFlo homepage, switch to the Small category, click any font card to copy it to your clipboard, then paste it into Instagram, Discord, WhatsApp, TikTok or anywhere else. No app or extension needed.",
  },
  {
    q: "What is the difference between superscript and subscript?",
    a: "Superscript characters sit above the baseline (like x²), subscript sits below (like x₂). Both are small Unicode fonts — superscript works well for footnotes and exponents, subscript for chemical formulas and references.",
  },
  {
    q: "Are these small and bold fonts free?",
    a: "Yes — every small, tiny, bold, italic and coloured font on TyeFlo is 100% free with no sign-up, no watermark and no daily limit. Generate and copy as many small fonts as you want, forever.",
  },
  {
    q: "Why do some small letters look normal?",
    a: "Unicode doesn't define every letter of every alphabet as a superscript or subscript glyph. For letters that don't have a small variant (like q or z), TyeFlo falls back to the normal letter so your text still reads correctly — this is expected, not a bug.",
  },
  {
    q: "Do coloured fonts work everywhere?",
    a: "Coloured and rainbow fonts rely on Unicode variation selectors and emoji presentation, which render best on Apple devices and modern browsers. On older Android or strict platforms they may appear monochrome — try a plain bold or italic style if colour doesn't show.",
  },
];

const RELATED_LINKS = [
  {
    label: "Cursive Font Generator",
    href: "/cursive-font-generator",
    description: "Flowing script and calligraphy fonts for elegant text.",
  },
  {
    label: "Fancy & Cool Font Generator",
    href: "/fancy-cool-font-generator",
    description: "Bubbles, mirror and unique fonts for standout posts.",
  },
  {
    label: "Instagram Font Generator",
    href: "/instagram-font-generator",
    description: "IG-specific fonts for bios, captions and story text.",
  },
  {
    label: "Old English & Retro Font Generator",
    href: "/old-english-retro-font-generator",
    description: "Blackletter, medieval and bold serif retro fonts.",
  },
];

export default function SmallBoldFontGeneratorPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://tyeflo.com" },
    { name: "Small & Bold Font Generator", url: "https://tyeflo.com/small-bold-font-generator" },
  ]);

  return (
    <CategoryPageLayout
      title="Small &amp; Bold Font Generator — Copy &amp; Paste"
      shortIntro="Free small and bold font generator — copy and paste tiny, superscript, bold serif, italic and colored fonts for Instagram, Discord and WhatsApp."
      cluster="small-bold-font-generator"
      description={
        <p>
          Looking for a <strong>small font copy and paste</strong> tool that
          actually works for bios and captions? TyeFlo&apos;s small and{" "}
          <strong>bold font copy and paste</strong> generator turns your text into{" "}
          <strong>tiny</strong> superscript, subscript, small caps,{" "}
          <strong>bold serif</strong>, <strong>italic</strong> and{" "}
          <strong>colored font</strong> styles — every style{" "}
          <strong>copies and pastes</strong> natively into Instagram bios, Discord
          nicknames and WhatsApp statuses. Whether you want a <strong>copy and paste
          italic font</strong> for emphasis, <strong>color fonts</strong>, or just{" "}
          <strong>small fonts</strong> to fit a tight bio, try the{" "}
          <a href="/" className="text-primary underline">free font generator</a>{" "}
          above — every <strong>colored</strong> and{" "}
          <strong>coloring font</strong> style is free with no sign-up.
        </p>
      }
      faqs={FAQ_DATA}
      relatedLinks={RELATED_LINKS}
      breadcrumbsJson={breadcrumbs}
      faqJson={faqSchema(FAQ_DATA)}
    />
  );
}
