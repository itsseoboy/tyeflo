import { CategoryPageLayout, type FAQItem } from "@/components/category-page-layout";
import {
  generateMetadata as seoMetadata,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata = seoMetadata({
  title: "Gothic & Scary Font Generator — Copy & Paste Gothic Fonts | TyeFlo",
  description:
    "Free gothic and scary font generator. Copy and paste gothic, goth, creepy, emo, horror and freaky fonts. No sign-up. Works on Discord & Instagram.",
  path: "/gothic-scary-font-generator",
  keywords: [
    "gothic font copy and paste",
    "gothic fonts copy and paste",
    "scary fonts copy and paste",
    "goth font copy and paste",
    "creepy font copy and paste",
    "freaky font copy and paste",
    "scary font generator copy and paste",
    "emo font copy and paste",
    "horror font copy and paste",
  ],
});

const FAQ_DATA: FAQItem[] = [
  {
    q: "Are gothic fonts safe for Instagram?",
    a: "Yes. Gothic and blackletter fonts are pure Unicode text, so they paste safely into Instagram bios, captions and comments — no installation, no permissions, no risk. Just copy from TyeFlo and paste it into the Instagram app or web.",
  },
  {
    q: "What is the difference between gothic and fraktur?",
    a: "Fraktur is a specific blackletter typeface family with sharp, broken strokes — gothic is the broader umbrella term for medieval blackletter styles. On TyeFlo, fraktur is one of the gothic font variants you can copy and paste.",
  },
  {
    q: "Do scary fonts work on Discord?",
    a: "Yes. Scary, gothic, horror and emo fonts paste natively into Discord nicknames, server names, channel descriptions and chat messages — they render as Unicode text, so any modern Discord client shows them correctly.",
  },
  {
    q: "Can I use horror fonts for Halloween posts?",
    a: "Absolutely. Horror, creepy and freaky fonts are perfect for Halloween Instagram captions, party flyers, event invites, haunted-house posters and TikTok videos. Copy any style from TyeFlo and paste it straight into your post.",
  },
  {
    q: "Why do some creepy fonts show as boxes?",
    a: "Some older devices and strict platforms don't ship every Unicode blackletter character. If a gothic or horror style shows as boxes or question marks, try a different one — most modern phones and browsers render every option on this page.",
  },
];

const RELATED_LINKS = [
  {
    label: "Fancy & Cool Font Generator",
    href: "/fancy-cool-font-generator",
    description: "Bubbles, mirror and unique fonts for standout profiles.",
  },
  {
    label: "Gaming Font Generator",
    href: "/gaming-font-generator",
    description: "Discord, Minecraft, Roblox and Free Fire nickname fonts.",
  },
  {
    label: "Old English & Retro Font Generator",
    href: "/old-english-retro-font-generator",
    description: "Blackletter and medieval fonts for vintage gothic designs.",
  },
  {
    label: "Seasonal Font Generator",
    href: "/seasonal-font-generator",
    description: "Halloween, Christmas and birthday fonts for every season.",
  },
];

export default function GothicScaryFontGeneratorPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://tyeflo.com" },
    { name: "Gothic & Scary Font Generator", url: "https://tyeflo.com/gothic-scary-font-generator" },
  ]);

  return (
    <CategoryPageLayout
      title="Gothic &amp; Scary Font Generator — Copy &amp; Paste"
      shortIntro="Free gothic and scary font generator — copy and paste dark fraktur, cursed and horror fonts for Discord nicknames and Halloween posts."
      cluster="gothic-scary-font-generator"
      description={
        <p>
          Looking for <strong>gothic fonts to copy and paste</strong>? TyeFlo&apos;s
          free <strong>scary font generator</strong> turns your text into dark
          fraktur blackletter, glitched horror strokes and cursed letterforms —
          every style <strong>copies and pastes</strong> natively into Discord
          nicknames, Instagram bios and TikTok captions. Whether you want a{" "}
          <strong>creepy font</strong>, an <strong>emo font</strong>, a{" "}
          <strong>freaky font</strong> or a <strong>horror font</strong> for
          Halloween, our <strong>goth font</strong> selection has the right dark
          vibe — try the{" "}
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
