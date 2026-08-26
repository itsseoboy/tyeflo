import { CategoryPageLayout, type FAQItem } from "@/components/category-page-layout";
import {
  generateMetadata as seoMetadata,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata = seoMetadata({
  title: "Gaming Font Generator — Copy & Paste Discord, Minecraft & Roblox Fonts | TyeFlo",
  description:
    "Free gaming font generator. Copy and paste Discord, Minecraft, Roblox, Adopt Me and Starborn fonts. No sign-up. Works on Discord, Minecraft & Roblox.",
  path: "/gaming-font-generator",
  keywords: [
    "discord font copy and paste",
    "adopt me fonts copy and paste",
    "minecraft font copy and paste",
    "roblox fonts copy and paste",
    "minecraft font generator copy and paste",
    "starborn font copy and paste",
    "death note font copy and paste",
  ],
});

const FAQ_DATA: FAQItem[] = [
  {
    q: "How do I copy and paste fonts for Discord?",
    a: "Type your text in the input box on the TyeFlo homepage, switch to a fancy or gaming category, click any font card to copy it, then paste it into your Discord nickname, server name, channel description or chat message. No Nitro or extension required.",
  },
  {
    q: "Do Minecraft fonts work in chat and on signs?",
    a: "Minecraft chat accepts most Unicode characters, so blocky and pixel-style fonts from TyeFlo will display in chat, on signs, in books and on item names. Some console editions may strip rare Unicode glyphs — try a different style if you see boxes.",
  },
  {
    q: "Can I use these fonts in Roblox display names?",
    a: "Yes. Unicode fancy fonts paste into Roblox display names and bio fields. Note that Roblox occasionally filters certain symbols, so if a style is rejected, pick another variant from the generator — most options on TyeFlo pass the filter.",
  },
  {
    q: "Are these gaming fonts free?",
    a: "Yes — every Discord, Minecraft, Roblox, Adopt Me and Starborn style on TyeFlo is 100% free with no sign-up, no watermark and no daily limit. Generate and copy as many gaming fonts as you want, forever.",
  },
  {
    q: "What is the Starborn font?",
    a: "Starborn is a stylised cosmic typeface inspired by fantasy and sci-fi RPG aesthetics. Our Starborn copy and paste style gives your gaming profile, Discord nickname or YouTube title a glowing, interstellar feel — pair it with a death-note style for an edgy anime vibe.",
  },
];

const RELATED_LINKS = [
  {
    label: "Gothic & Scary Font Generator",
    href: "/gothic-scary-font-generator",
    description: "Dark fraktur and cursed letterforms for edgy gamer profiles.",
  },
  {
    label: "Fancy & Cool Font Generator",
    href: "/fancy-cool-font-generator",
    description: "Bubbles, mirror and unique fonts for standout tags.",
  },
  {
    label: "Symbol & Emoji Font Generator",
    href: "/symbol-emoji-font-generator",
    description: "Stars, hearts and decorative symbols to wrap your gamer name.",
  },
  {
    label: "Instagram Font Generator",
    href: "/instagram-font-generator",
    description: "Streaming and IG-ready fonts for clip captions and bios.",
  },
];

export default function GamingFontGeneratorPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://tyeflo.com" },
    { name: "Gaming Font Generator", url: "https://tyeflo.com/gaming-font-generator" },
  ]);

  return (
    <CategoryPageLayout
      title="Gaming Font Generator — Copy &amp; Paste"
      shortIntro="Free gaming font generator — copy and paste Discord, Minecraft, Roblox, Adopt Me and Starborn fonts for server names and gaming handles."
      cluster="gaming-font-generator"
      description={
        <p>
          Need a <strong>discord font copy and paste</strong> tool that actually
          works in nicknames and messages? TyeFlo&apos;s gaming font generator
          turns your text into pixel, blocky and stylised typefaces for{" "}
          <strong>Minecraft</strong>, <strong>Roblox</strong>,{" "}
          <strong>Adopt Me</strong> and <strong>Starborn</strong> profiles — every
          style <strong>copies and pastes</strong> natively into Discord nicknames,
          server names and chat messages. Looking for a{" "}
          <strong>minecraft font generator</strong>, an anime-inspired{" "}
          <strong>death note font</strong> or a cosmic <strong>starborn font</strong>?
          Try the{" "}
          <a href="/" className="text-primary underline">free font generator</a>{" "}
          above — no Nitro required, every gaming font is free with no sign-up.
        </p>
      }
      faqs={FAQ_DATA}
      relatedLinks={RELATED_LINKS}
      breadcrumbsJson={breadcrumbs}
      faqJson={faqSchema(FAQ_DATA)}
    />
  );
}
