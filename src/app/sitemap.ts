import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tyeflo.com";
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    // 11 cluster keyword pages (Clusters 01-11)
    { url: `${baseUrl}/font-generator-copy-and-paste`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/cursive-font-generator`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/cute-aesthetic-font-generator`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/fancy-cool-font-generator`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/gothic-scary-font-generator`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/old-english-retro-font-generator`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/gaming-font-generator`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/instagram-font-generator`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/symbol-emoji-font-generator`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/small-bold-font-generator`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/seasonal-font-generator`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    // Legal pages
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
