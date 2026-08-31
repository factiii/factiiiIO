import type { MetadataRoute } from "next";

const siteUrl = "https://factiii.io";

// Auth-gated and operational routes are disallowed to save crawl budget. Pages
// we merely want out of the index carry `robots: { index: false }` in their own
// metadata and stay crawlable — a Disallow'd URL is never fetched, so Google
// never sees the noindex and can still index it link-only.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/p/", "/adminl33t/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
