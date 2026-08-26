import { CategoryPageLayout, type FAQItem } from "@/components/category-page-layout";
import {
  generateMetadata as seoMetadata,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata = seoMetadata({
  title: "Old English & Retro Font Generator — Copy & Paste Old English Fonts | TyeFlo",
  description:
    "Free old English and retro font generator. Copy and paste old English, medieval, typewriter, pixel, graffiti and bubble fonts. No sign-up. Works everywhere.",
  path: "/old-english-retro-font-generator",
  keywords: [
    "old english font copy and paste",
    "copy and paste old english fonts",
    "bubble font copy and paste",
    "typewriter font copy and paste",
    "metal font copy and paste",
    "pixel font copy and paste",
    "graffiti font copy and paste",
    "papyrus font copy and paste",
    "pixelated font copy and paste",
    "chinese font copy and paste",
    "graffiti font generator copy and paste",
    "times new roman font copy and paste",
    "medieval font copy and paste",
    "serif font copy and paste",
    "greek font copy and paste",
    "japanese font copy and paste",
  ],
});

const FAQ_DATA: FAQItem[] = [
  {
    q: "How do I copy and paste old English fonts?",
    a: "Type your text in the input box on the TyeFlo homepage, switch to a blackletter or retro category, click any font card to copy it, then paste it into Instagram, Discord, TikTok, tattoos, band logos or wedding signage. No font installation required.",
  },
  {
    q: "Are these old English and retro fonts free?",
    a: "Yes — every old English, medieval, pixel and graffiti style on TyeFlo is 100% free with no sign-up, no watermark and no daily limit. Generate and copy as many retro fonts as you want, forever.",
  },
  {
    q: "Do old English fonts work on Instagram and Discord?",
    a: "Yes. Old English and blackletter fonts are built from Unicode characters, so they paste natively into Instagram bios, Discord nicknames, TikTok captions and WhatsApp statuses — no app extension required.",
  },
  {
    q: "Can I use these fonts for tattoos and logos?",
    a: "Our old English and gothic fraktur styles are perfect inspiration for tattoo stencils, band logos and vintage signage. Copy the text from TyeFlo and show it to your tattoo artist or designer — they will recreate it as a real vector font.",
  },
  {
    q: "Why do some retro fonts show as boxes?",
    a: "Some older devices and strict platforms don't ship every Unicode blackletter or CJK character. If an old English, Greek or Japanese style shows as boxes, try a different one — most modern phones and browsers render every option on this page.",
  },
];

const RELATED_LINKS = [
  {
    label: "Gothic & Scary Font Generator",
    href: "/gothic-scary-font-generator",
    description: "Dark fraktur and cursed letterforms for edgy designs.",
  },
  {
    label: "Cursive Font Generator",
    href: "/cursive-font-generator",
    description: "Flowing script and calligraphy fonts for elegant signage.",
  },
  {
    label: "Fancy & Cool Font Generator",
    href: "/fancy-cool-font-generator",
    description: "Bubbles, full-width and unique fonts for standout text.",
  },
  {
    label: "Small & Bold Font Generator",
    href: "/small-bold-font-generator",
    description: "Tiny, bold serif and italic fonts for tight spaces.",
  },
];

export default function OldEnglishRetroFontGeneratorPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://tyeflo.com" },
    { name: "Old English & Retro Font Generator", url: "https://tyeflo.com/old-english-retro-font-generator" },
  ]);

  return (
    <CategoryPageLayout
      title="Old English &amp; Retro Font Generator — Copy &amp; Paste"
      shortIntro="Free old english and retro font generator — copy and paste blackletter, medieval, typewriter, pixel, graffiti and bubble fonts for any project."
      cluster="old-english-retro-font-generator"
      description={
        <p>
          Looking for an <strong>old english font copy and paste</strong> tool that
          actually delivers the blackletter look? TyeFlo&apos;s retro generator
          turns your text into gothic fraktur, <strong>medieval</strong>,{" "}
          <strong>typewriter</strong>, <strong>pixel</strong> and{" "}
          <strong>graffiti</strong> styles using Unicode — every style{" "}
          <strong>copies and pastes</strong> natively into Instagram bios, Discord
          nicknames, tattoo stencils, band logos and wedding signage. Want a{" "}
          <strong>bubble font</strong>, <strong>times new roman</strong> or{" "}
          <strong>serif font</strong> vibe, even a <strong>papyrus</strong> look?
          Try the{" "}
          <a href="/" className="text-primary underline">free font generator</a>{" "}
          above — every <strong>metal</strong>, <strong>greek</strong> and{" "}
          <strong>japanese</strong> retro style is free with no sign-up.
        </p>
      }
      faqs={FAQ_DATA}
      relatedLinks={RELATED_LINKS}
      breadcrumbsJson={breadcrumbs}
      faqJson={faqSchema(FAQ_DATA)}
    />
  );
}
