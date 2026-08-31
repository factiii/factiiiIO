import type { MetadataRoute } from "next";

const siteUrl = "https://factiii.io";

// Only the homepage is public. The pitch decks under /p/ sit behind a password
// and the admin dashboard behind a login, so neither belongs here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
