import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  ORGANIZATION_SCHEMA,
  WEBAPP_SCHEMA,
  SITE_KEYWORDS,
  generateMetadata,
  howToSchema,
  itemListSchema,
  breadcrumbSchema,
  imageObjectSchema,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://tyeflo.com"),
  ...generateMetadata({
    title: "Font Generator — Fancy Text (Copy & Paste) | TyeFlo",
    description:
      "Free online font generator. Convert your text into 200+ fancy Unicode fonts (cool, fancy, cursive, small, bold, glitch and more). Copy and paste anywhere — social media, games, bios, designs.",
    path: "/",
    keywords: SITE_KEYWORDS,
  }),
};

/* ============================================================
   Rank Math equivalent — Homepage JSON-LD structured data
   Includes: Organization, WebApplication, HowTo (steps),
   ItemList (categories), BreadcrumbList, SoftwareApplication
   ============================================================ */

const HOW_TO_STEPS = [
  {
    name: "Type your text",
    text: "Type anything into the input box at the top of the page — your name, a username, a bio line, a caption, or a quote.",
    imageUrl: "/how-it-works-step-1.webp",
  },
  {
    name: "Copy the style you like",
    text: "Tap any font row to copy that exact styled text to your clipboard. Keep clicking to collect multiple options.",
    imageUrl: "/how-it-works-step-2.webp",
  },
  {
    name: "Paste it wherever you want",
    text: "Open Instagram, TikTok, Twitter/X, Discord, WhatsApp, or any app and paste. Unicode characters render natively in almost every modern app.",
    imageUrl: "/how-it-works-step-3.webp",
  },
  {
    name: "Works on all devices",
    text: "Phone, tablet, laptop, or desktop — Windows, Mac, iOS, Android, or Linux. The exact same fonts render everywhere.",
    imageUrl: "/how-it-works-step-4.webp",
  },
  {
    name: "Adjust font size",
    text: "Use the + and - buttons next to the input to enlarge ornate styles or shrink to fit more rows on screen.",
    imageUrl: "/how-it-works-step-5.webp",
  },
];

const CATEGORY_LIST = [
  { name: "Font Generator — Copy & Paste", url: "https://tyeflo.com/font-generator-copy-and-paste" },
  { name: "Cursive Font Generator", url: "https://tyeflo.com/cursive-font-generator" },
  { name: "Cute & Aesthetic Font Generator", url: "https://tyeflo.com/cute-aesthetic-font-generator" },
  { name: "Fancy & Cool Font Generator", url: "https://tyeflo.com/fancy-cool-font-generator" },
  { name: "Gothic & Scary Font Generator", url: "https://tyeflo.com/gothic-scary-font-generator" },
  { name: "Old English & Retro Font Generator", url: "https://tyeflo.com/old-english-retro-font-generator" },
  { name: "Gaming Font Generator", url: "https://tyeflo.com/gaming-font-generator" },
  { name: "Instagram Font Generator", url: "https://tyeflo.com/instagram-font-generator" },
  { name: "Symbol & Emoji Font Generator", url: "https://tyeflo.com/symbol-emoji-font-generator" },
  { name: "Small & Bold Font Generator", url: "https://tyeflo.com/small-bold-font-generator" },
  { name: "Seasonal Font Generator", url: "https://tyeflo.com/seasonal-font-generator" },
];

const HOMEPAGE_HOWTO = howToSchema(HOW_TO_STEPS, {
  name: "How to Use the TyeFlo Font Generator",
  description:
    "Step-by-step guide to generating, copying, and pasting fancy Unicode fonts in seconds.",
});

const HOMEPAGE_ITEMLIST = itemListSchema(CATEGORY_LIST);

const HOMEPAGE_BREADCRUMB = breadcrumbSchema([
  { name: "Home", url: "https://tyeflo.com" },
]);

/* Image SEO — ImageObject schemas for each image on the homepage.
   Helps Google Images index our infographics with proper context. */
const HOMEPAGE_IMAGES = [
  {
    url: "/how-it-works-step-1.webp",
    name: "How it works Step 1 — Type your text in the Copy & Paste Fonts generator",
    caption: "Step 1: type your text into the TyeFlo input box",
  },
  {
    url: "/how-it-works-step-2.webp",
    name: "How it works Step 2 — Copy any font style with one click",
    caption: "Step 2: copy the font style you like by clicking a row",
  },
  {
    url: "/how-it-works-step-3.webp",
    name: "How it works Step 3 — Paste your font anywhere online",
    caption: "Step 3: paste the styled font into any app or platform",
  },
  {
    url: "/how-it-works-step-4.webp",
    name: "How it works Step 4 — Copy & Paste Fonts work on every device",
    caption: "Step 4: the same fonts render on every device and OS",
  },
  {
    url: "/how-it-works-step-5.webp",
    name: "How it works Step 5 — Adjust the Copy & Paste Fonts preview size",
    caption: "Step 5: use the plus and minus buttons to adjust preview font size",
  },
  {
    url: "/why-choose-us-features.webp",
    name: "Copy & Paste Fonts — TyeFlo Features Infographic",
    caption: "The Copy & Paste Fonts generator — 12 reasons to choose TyeFlo",
  },
].map((img) =>
  imageObjectSchema({
    url: img.url,
    name: img.name,
    description:
      "TyeFlo — Free Copy & Paste Fonts generator. Convert text into hundreds of stylish Unicode fonts instantly.",
    caption: img.caption,
    creditText: "TyeFlo",
    width: 1000,
    height: 558,
  }),
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Rank Math equivalent: JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_SCHEMA),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(WEBAPP_SCHEMA),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(HOMEPAGE_HOWTO) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(HOMEPAGE_ITEMLIST) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(HOMEPAGE_BREADCRUMB) }}
        />
        {/* Image SEO — one ImageObject schema per image on the homepage */}
        {HOMEPAGE_IMAGES.map((img, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(img) }}
          />
        ))}
      </head>
      <body
        className={`${geistSans.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip to content link — keyboard accessibility */}
          <a
            href="#tool"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
          >
            Skip to font generator
          </a>
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
