import { CategoryPageLayout, type FAQItem } from "@/components/category-page-layout";
import {
  generateMetadata as seoMetadata,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata = seoMetadata({
  title: "Cute & Aesthetic Font Generator — Copy & Paste Cute Fonts | TyeFlo",
  description:
    "Free cute font generator. Copy and paste cute, aesthetic, kawaii, preppy, coquette and Y2K fonts. No sign-up. Works on Instagram, TikTok & Pinterest.",
  path: "/cute-aesthetic-font-generator",
  keywords: [
    "cute fonts copy and paste",
    "cute font generator copy and paste",
    "aesthetic fonts copy and paste",
    "cute font copy and paste",
    "preppy fonts copy and paste",
    "pretty fonts copy and paste",
    "beautiful fonts to copy and paste",
    "coquette fonts copy and paste",
    "kawaii fonts copy and paste",
    "y2k fonts copy and paste",
  ],
});

const FAQ_DATA: FAQItem[] = [
  {
    q: "How do I copy and paste cute fonts?",
    a: "Type your text in the input box on the TyeFlo homepage, switch to the Cute or Fancy category, click any font card to copy it to your clipboard, then paste it into Instagram bios, TikTok captions, Pinterest titles or any platform you like. No app required.",
  },
  {
    q: "Are these cute and aesthetic fonts free?",
    a: "Yes — every kawaii, preppy, coquette and Y2K style on TyeFlo is 100% free with no sign-up, no watermark and no daily limit. Generate and copy as many cute fonts as you want, forever.",
  },
  {
    q: "Do aesthetic fonts work on Instagram, TikTok and Pinterest?",
    a: "Yes. Cute fonts are built from Unicode characters, so they paste natively into Instagram bios and captions, TikTok captions, Pinterest board titles, Notion headers and WhatsApp statuses — no font installation required.",
  },
  {
    q: "What is the difference between coquette, preppy and kawaii styles?",
    a: "Coquette leans soft-romantic with hearts and florals, preppy is clean and bubbly, and kawaii uses cute circled characters and sparkles. Try each style in the generator and pick the one that matches your vibe.",
  },
  {
    q: "Why do cute fonts sometimes show as boxes?",
    a: "Some older devices and strict platforms don't ship every Unicode decorative character. If a bubble, sparkle or full-width style shows as boxes, try a different cute style — most modern phones and browsers render every option on this page.",
  },
];

const RELATED_LINKS = [
  {
    label: "Cursive Font Generator",
    href: "/cursive-font-generator",
    description: "Flowing script, calligraphy and signature fonts for soft-girl bios.",
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
    label: "Symbol & Emoji Font Generator",
    href: "/symbol-emoji-font-generator",
    description: "Hearts, stars and bows to decorate any text.",
  },
];

export default function CuteAestheticFontGeneratorPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://tyeflo.com" },
    { name: "Cute & Aesthetic Font Generator", url: "https://tyeflo.com/cute-aesthetic-font-generator" },
  ]);

  return (
    <CategoryPageLayout
      title="Cute &amp; Aesthetic Font Generator — Copy &amp; Paste"
      shortIntro="Free cute font generator — copy and paste aesthetic, kawaii, preppy, coquette and Y2K fonts for Instagram, TikTok and Pinterest."
      cluster="cute-aesthetic-font-generator"
      description={
        <p>
          Want <strong>cute fonts copy and paste</strong> for your next post? Our{" "}
          <strong>cute font generator copy and paste</strong> tool transforms plain
          text into <strong>aesthetic fonts</strong>, <strong>preppy</strong>,{" "}
          <strong>coquette</strong>, <strong>kawaii</strong> and{" "}
          <strong>y2k fonts</strong> instantly — every style{" "}
          <strong>copies and pastes</strong> natively into Instagram bios, TikTok
          captions, Pinterest board titles and Notion headers. Looking for{" "}
          <strong>pretty fonts</strong> or{" "}
          <strong>beautiful fonts to copy and paste</strong>? Try the{" "}
          <a href="/" className="text-primary underline">free font generator</a>{" "}
          above — no sign-up, no watermark, every cute style is yours forever.
        </p>
      }
      faqs={FAQ_DATA}
      relatedLinks={RELATED_LINKS}
      breadcrumbsJson={breadcrumbs}
      faqJson={faqSchema(FAQ_DATA)}
    />
  );
}
