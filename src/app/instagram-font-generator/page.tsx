import { CategoryPageLayout, type FAQItem } from "@/components/category-page-layout";
import {
  generateMetadata as seoMetadata,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";

export const metadata = seoMetadata({
  title: "Instagram Font Generator — Copy & Paste Fonts for Instagram | TyeFlo",
  description:
    "Free Instagram font generator. Copy and paste insta fonts, Disney, Word and i am music styles for IG bios, captions and stories. No sign-up.",
  path: "/instagram-font-generator",
  keywords: [
    "copy and paste fonts for instagram",
    "word font copy and paste",
    "disney font copy and paste",
    "i am music font copy and paste",
    "insta fonts copy and paste",
  ],
});

const FAQ_DATA: FAQItem[] = [
  {
    q: "How do I copy and paste fonts for Instagram?",
    a: "Type your text in the input box on the TyeFlo homepage, browse the fancy, cursive or aesthetic categories, click any font card to copy it, then paste it into your Instagram bio, caption, story text or highlight name. No app or extension required.",
  },
  {
    q: "Are these Instagram fonts free?",
    a: "Yes — every insta font on TyeFlo is 100% free with no sign-up, no watermark and no daily limit. Generate and copy as many Instagram fonts as you want, forever.",
  },
  {
    q: "Do Instagram fonts work in bios and captions?",
    a: "Yes. Instagram fully supports Unicode characters in bios, captions, comments, story text and highlight names. Script, bold, fraktur and aesthetic styles all render natively in the Instagram app and on the web.",
  },
  {
    q: "Why do some Instagram fonts show as boxes?",
    a: "Some older Instagram versions and strict platforms strip rare Unicode glyphs. If a fancy or Disney-style font shows as boxes or question marks, try a different style — most modern phones and the latest Instagram app render every option on this page.",
  },
  {
    q: "What is the i am music font?",
    a: "The i am music font references the stylised typography from Playboi Carti's album rollout — wide, stretched caps with a futuristic feel. Our i am music copy and paste style gives your IG bio or caption that same edgy, music-drop aesthetic.",
  },
];

const RELATED_LINKS = [
  {
    label: "Cute & Aesthetic Font Generator",
    href: "/cute-aesthetic-font-generator",
    description: "Soft kawaii, coquette and Y2K fonts for dreamy IG bios.",
  },
  {
    label: "Cursive Font Generator",
    href: "/cursive-font-generator",
    description: "Flowing script and calligraphy fonts for elegant captions.",
  },
  {
    label: "Fancy & Cool Font Generator",
    href: "/fancy-cool-font-generator",
    description: "Bubbles, full-width and unique fonts for standout posts.",
  },
  {
    label: "Symbol & Emoji Font Generator",
    href: "/symbol-emoji-font-generator",
    description: "Hearts, stars and bows to decorate any IG caption.",
  },
];

export default function InstagramFontGeneratorPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://tyeflo.com" },
    { name: "Instagram Font Generator", url: "https://tyeflo.com/instagram-font-generator" },
  ]);

  return (
    <CategoryPageLayout
      title="Instagram Font Generator — Copy &amp; Paste"
      shortIntro="Free Instagram font generator — copy and paste insta fonts, Disney, Word and i am music styles for IG bios, captions and stories."
      cluster="instagram-font-generator"
      description={
        <p>
          Want <strong>copy and paste fonts for instagram</strong> that actually
          render in your bio and captions? TyeFlo&apos;s{" "}
          <strong>insta fonts copy and paste</strong> tool turns your text into
          script, bold, aesthetic and stylised typefaces — every style{" "}
          <strong>copies and pastes</strong> natively into bios, captions, stories
          and highlights. Whether you want a <strong>disney font copy and paste</strong>{" "}
          vibe, an edgy <strong>i am music font</strong> look, or just a clean{" "}
          <strong>word font copy and paste</strong> style, our{" "}
          <a href="/" className="text-primary underline">free font generator</a>{" "}
          has every option — no sign-up, no watermark, free forever.
        </p>
      }
      faqs={FAQ_DATA}
      relatedLinks={RELATED_LINKS}
      breadcrumbsJson={breadcrumbs}
      faqJson={faqSchema(FAQ_DATA)}
    />
  );
}
