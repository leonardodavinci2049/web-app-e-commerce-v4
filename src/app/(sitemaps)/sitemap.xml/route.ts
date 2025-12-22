import { envs } from "@/core/config/envs";

/**
 * Sitemap Index - Main sitemap that references all other sitemaps
 * This follows the sitemap index protocol for large sites
 */
export async function GET() {
  const baseUrl =
    envs.NEXT_PUBLIC_BASE_URL_APP || "https://mundialmegastore.com.br";
  const currentDate = new Date().toISOString();

  // List of all sitemap files
  const sitemaps = [
    `${baseUrl}/sitemap-static.xml`,
    `${baseUrl}/sitemap-categories.xml`,
    `${baseUrl}/sitemap-products-0.xml`,
    `${baseUrl}/sitemap-products-1.xml`,
    `${baseUrl}/sitemap-products-2.xml`,
    `${baseUrl}/sitemap-products-3.xml`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (sitemap) => `  <sitemap>
    <loc>${sitemap}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
