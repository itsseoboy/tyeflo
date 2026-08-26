import { CategoryPageLayout, type FAQItem } from "@/components/category-page-layout";
import {
  generateMetadata as seoMetadata,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata = seoMetadata({
  title: "Font Generator — Copy & Paste Fonts (Free) | TyeFlo",
  description:
    "Free font generator to copy and paste fonts. Fancy, old english, simple & more — find any font and copy it instantly. No sign-up. Works on Instagram, Discord & WhatsApp.",
  path: "/font-generator-copy-and-paste",
  keywords: [
    "old english font text generator copy and paste",
    "fancy font generator copy and paste",
    "simple fonts copy and paste",
    "what font is this copy and paste",
    "font finder copy and paste",
    "font website copy and paste",
    "type copy and paste fonts",
    "you font copy and paste",
    "copy and paste fonta",
  ],
});

const FAQ_DATA: FAQItem[] = [
  {
    q: "How do I use this font generator to copy and paste fonts?",
    a: "Type your text into the input box on the TyeFlo homepage. The tool instantly converts it into hundreds of styled fonts. Click any font card to copy it to your clipboard, then paste it wherever you want — Instagram, Discord, WhatsApp, TikTok, or any other platform. No sign-up, no download, completely free.",
  },
  {
    q: "What font is this? Can I use the font finder to identify a font?",
    a: "If you've seen a font online and wondered 'what font is this', our font finder approach helps: type your text into TyeFlo, browse the categories (Fancy, Old English, Bold, Cursive, etc.), and match the visual style. Most decorative fonts you see on social media are Unicode styles that TyeFlo can reproduce — try the Popular section first for the most common ones.",
  },
  {
    q: "Are these fonts free to copy and paste?",
    a: "Yes — every font on TyeFlo is 100% free with no sign-up, no watermark, and no daily limit. You can generate and copy as many fonts as you want, forever. There's no premium tier, no hidden plan, and no installable font file to buy.",
  },
  {
    q: "Is TyeFlo a font website or a font file downloader?",
    a: "TyeFlo is a font website — not a font file downloader. We don't distribute .ttf or .otf font files. Instead, we generate Unicode text styles that you can copy and paste directly into any app. This means you don't need to install anything: the styled text works everywhere instantly because it uses standard Unicode characters that every device already understands.",
  },
  {
    q: "Can I type and copy and paste fonts on my phone?",
    a: "Yes. TyeFlo works on every device — phone, tablet, laptop, or desktop. On mobile, the input box stays sticky at the top of the page so you can type, copy, and paste fonts while scrolling through styles. The same fonts render identically on iOS, Android, Windows, Mac, and Linux because Unicode is a global standard.",
  },
];

const RELATED_LINKS = [
  {
    label: "Cursive Font Generator",
    href: "/cursive-font-generator",
    description: "Elegant script, calligraphy and signature-style fonts for bios.",
  },
  {
    label: "Fancy & Cool Font Generator",
    href: "/fancy-cool-font-generator",
    description: "Bubbles, mirror, full-width and unique fonts for Discord & IG.",
  },
  {
    label: "Gothic & Scary Font Generator",
    href: "/gothic-scary-font-generator",
    description: "Dark fraktur and cursed letterforms for edgy profiles.",
  },
  {
    label: "Old English & Retro Font Generator",
    href: "/old-english-retro-font-generator",
    description: "Blackletter, medieval, typewriter and pixel retro fonts.",
  },
];

export default function FontGeneratorCopyPastePage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://tyeflo.com" },
    {
      name: "Font Generator — Copy & Paste",
      url: "https://tyeflo.com/font-generator-copy-and-paste",
    },
  ]);

  return (
    <CategoryPageLayout
      title="Font Generator — Copy &amp; Paste Fonts"
      shortIntro="Free font generator to copy and paste fonts — fancy, old english, simple and more — for Instagram, Discord, WhatsApp and TikTok."
      cluster="font-generator-copy-and-paste"
      description={
        <p>
          Looking for a free <strong>font generator to copy and paste fonts</strong>?
          TyeFlo is the simplest <strong>font website</strong> on the web — type any
          text and instantly convert it into hundreds of stylish Unicode fonts you
          can <strong>copy and paste</strong> into Instagram, Discord, WhatsApp and
          TikTok. Whether you want an <strong>old english font text generator</strong>{" "}
          vibe, a <strong>fancy font generator</strong> look, or just{" "}
          <strong>simple fonts</strong> for a clean bio, TyeFlo has them all — no
          sign-up, no download. Need a quick <strong>font finder</strong> to identify
          a style you spotted online, or just want to <strong>type copy and paste
          fonts</strong> for your next post? Try our{" "}
          <a href="/" className="text-primary underline">free font generator</a>{" "}
          — it handles every <strong>copy and paste fonta</strong> style you need.
        </p>
      }
      faqs={FAQ_DATA}
      relatedLinks={RELATED_LINKS}
      breadcrumbsJson={breadcrumbs}
      faqJson={faqSchema(FAQ_DATA)}
    />
  );
}
