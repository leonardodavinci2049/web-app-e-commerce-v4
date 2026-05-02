import type { MetadataRoute } from "next";
import { getSitemapBaseUrl } from "../base-url";

/**
 * Sitemap for static pages only
 *
 * lastModified is intentionally omitted — a hardcoded date that never updates
 * signals to crawlers that the data is unreliable.  When a real "last modified"
 * date becomes available (e.g. from CMS or git), it should be added back.
 */
export async function GET(request: Request) {
  const baseUrl = getSitemapBaseUrl(request);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reseller`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/return`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/antispam`,
      changeFrequency: "monthly",
      priority: 0.2,
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
