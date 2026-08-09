import type { MetadataRoute } from "next";
import { unstable_noStore } from "next/cache";
import { notFound } from "next/navigation";
import { getSitemapBaseUrl } from "../../base-url";
import {
  getProductSitemapPages,
  MAX_PRODUCT_SITEMAPS,
} from "../../product-sitemap";
import { sitemapServiceUnavailable } from "../../sitemap-response";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  unstable_noStore();

  const { id } = await params;
  const sitemapIndex = /^\d+$/.test(id) ? Number(id) : Number.NaN;

  if (
    Number.isNaN(sitemapIndex) ||
    sitemapIndex < 0 ||
    sitemapIndex >= MAX_PRODUCT_SITEMAPS
  ) {
    notFound();
  }

  const baseUrl = getSitemapBaseUrl(request);

  let productPages: MetadataRoute.Sitemap;

  try {
    productPages = await getProductSitemapPages(sitemapIndex, baseUrl);
  } catch {
    return sitemapServiceUnavailable();
  }

  if (productPages.length === 0) {
    notFound();
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${productPages
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
