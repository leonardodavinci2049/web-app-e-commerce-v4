import type { MetadataRoute } from "next";
import { getSitemapBaseUrl } from "../base-url";

/**
 * Sitemap for static pages only
 */
export async function GET(request: Request) {
  const baseUrl = getSitemapBaseUrl(request);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: "2025-10-15",
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: "2025-10-15",
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: "2025-10-15",
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: "2025-10-15",
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: "2025-10-15",
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: "2025-10-15",
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/return`,
      lastModified: "2025-10-15",
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/antispam`,
      lastModified: "2025-10-15",
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
    <lastmod>${item.lastModified}</lastmod>
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
