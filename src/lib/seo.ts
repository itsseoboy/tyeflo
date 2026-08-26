import type { Metadata } from "next";

/* ============================================================
   Rank Math equivalent — SEO utilities for Next.js
   Implements: structured data, meta tags, sitemap, robots,
   canonical URLs, OG/Twitter cards, FAQ schema, breadcrumbs
   ============================================================ */

/** Organization Schema (JSON-LD) */
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TyeFlo",
  url: "https://tyeflo.com",
  description:
    "Free Copy & Paste Font Generator. Convert text into 90+ fancy Unicode fonts instantly.",
  logo: "https://tyeflo.com/logo.svg",
};

/** WebApplication Schema (JSON-LD) */
export const WEBAPP_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TyeFlo — Font Generator",
  url: "https://tyeflo.com",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  description:
    "Free online font generator. Convert your text into 90+ fancy Unicode fonts (cool, fancy, cursive, small, bold, glitch and more). Copy and paste anywhere.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1284",
  },
};

/** BreadcrumbList Schema (JSON-LD) */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** FAQ Schema (JSON-LD) — for FAQ rich results in Google */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

/** ItemList Schema (JSON-LD) — for list-style rich results (e.g. style catalogues) */
export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}
/** ImageObject Schema (JSON-LD) — for image SEO / Google Images indexing */
export function imageObjectSchema(opts: {
  url: string;
  name?: string;
  description?: string;
  width?: number;
  height?: number;
  caption?: string;
  creditText?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    url: `https://tyeflo.com${opts.url}`,
    name: opts.name || "TyeFlo Font Generator",
    description: opts.description || "TyeFlo — Free Copy & Paste Fonts generator",
    contentUrl: `https://tyeflo.com${opts.url}`,
    width: {
      "@type": "QuantitativeValue",
      value: opts.width || 1000,
      unitText: "px",
    },
    height: {
      "@type": "QuantitativeValue",
      value: opts.height || 558,
      unitText: "px",
    },
    ...(opts.caption ? { caption: opts.caption } : {}),
    ...(opts.creditText ? { creditText: opts.creditText } : {}),
    license: "https://tyeflo.com/terms",
    acquireLicensePage: "https://tyeflo.com/terms",
  };
}

/** HowTo Schema (JSON-LD) — for "How to Use" step-by-step rich results */
export function howToSchema(steps: { name: string; text: string; imageUrl?: string }[], opts?: { name?: string; description?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts?.name || "How to Use the TyeFlo Font Generator",
    description: opts?.description || "Step-by-step guide to generating, copying, and pasting fancy Unicode fonts.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.imageUrl
        ? {
            image: {
              "@type": "ImageObject",
              url: `https://tyeflo.com${s.imageUrl}`,
              width: 1000,
              height: 558,
            },
          }
        : {}),
    })),
  };
}

/** Article Schema (JSON-LD) — for long-form SEO content articles */
export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}) {
  const now = new Date().toISOString();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    image: `https://tyeflo.com${opts.image || "/why-choose-us-features.webp"}`,
    datePublished: opts.datePublished || now,
    dateModified: opts.dateModified || now,
    author: {
      "@type": "Organization",
      name: opts.author || "TyeFlo",
      url: "https://tyeflo.com",
    },
    publisher: {
      "@type": "Organization",
      name: "TyeFlo",
      logo: {
        "@type": "ImageObject",
        url: "https://tyeflo.com/logo.svg",
      },
    },
  };
}

/** SoftwareApplication Schema (JSON-LD) — alternative to WebApplication for rich results */
export function softwareApplicationSchema(opts: {
  name: string;
  description: string;
  url: string;
  ratingValue?: string;
  ratingCount?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: opts.ratingValue || "4.8",
      ratingCount: opts.ratingCount || "1284",
    },
  };
}

/** Review Schema (JSON-LD) — for review rich snippets */
export function reviewSchema(opts: {
  itemName: string;
  rating: number;
  author: string;
  body: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: opts.itemName,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(opts.rating),
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Person",
      name: opts.author,
    },
    reviewBody: opts.body,
    url: opts.url,
  };
}

/** VideoObject Schema (JSON-LD) — placeholder for video rich results */
export function videoObjectSchema(opts: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl?: string;
  embedUrl?: string;
  uploadDate?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: opts.name,
    description: opts.description,
    thumbnailUrl: opts.thumbnailUrl,
    ...(opts.contentUrl ? { contentUrl: opts.contentUrl } : {}),
    ...(opts.embedUrl ? { embedUrl: opts.embedUrl } : {}),
    uploadDate: opts.uploadDate || new Date().toISOString(),
  };
}

/** Generate full metadata with OG, Twitter, canonical */
export function generateMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = `https://tyeflo.com${path}`;
  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
    openGraph: {
      title,
      description,
      url,
      siteName: "TyeFlo",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "https://tyeflo.com/why-choose-us-features.webp",
          width: 1000,
          height: 558,
          alt: "TyeFlo Font Generator Features",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://tyeflo.com/why-choose-us-features.webp"],
    },
  };
}

/** Default site-wide keywords */
export const SITE_KEYWORDS = [
  "font generator",
  "copy and paste fonts",
  "fancy text generator",
  "cool fonts",
  "cursive font generator",
  "unicode fonts",
  "text generator",
  "glitch text generator",
  "small text generator",
  "instagram bio fonts",
  "discord fonts",
  "fancy text copy paste",
  "aesthetic fonts",
  "gothic font generator",
  "calligraphy font generator",
];
