import type { MetadataRoute } from "next";
import { fetchProductsAction } from "@/app/actions/product";
import { envs } from "@/core/config/envs";

const PRODUCTS_PER_SITEMAP = 500;
const SITEMAP_INDEX = 2;

/**
 * Sitemap for products (batch 2 - products 1001-1500)
 */
export async function GET() {
  const baseUrl =
    envs.NEXT_PUBLIC_BASE_URL_APP || "https://mundialmegastore.com.br";
  const currentDate = new Date().toISOString();

  let productPages: MetadataRoute.Sitemap = [];

  try {
    const products = await fetchProductsAction({
      limit: PRODUCTS_PER_SITEMAP,
      page: SITEMAP_INDEX + 1, // API uses 1-indexed pages
    });

    if (products && products.length > 0) {
      productPages = products
        .filter((product) => product.slug)
        .map((product) => ({
          url: `${baseUrl}/product/${product.slug}`,
          lastModified: currentDate,
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }));
    }
  } catch {
    // Silently handle API errors
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${productPages
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
