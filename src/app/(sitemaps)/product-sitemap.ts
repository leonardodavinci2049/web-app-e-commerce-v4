import type { MetadataRoute } from "next";
import { fetchProductsAction } from "@/app/actions/product";
import { getProductPath } from "@/lib/slug";

export const PRODUCTS_PER_SITEMAP = 500;

type ProductSitemapBatch = Awaited<ReturnType<typeof fetchProductsAction>>;

export async function fetchProductSitemapBatch(
  sitemapIndex: number,
): Promise<ProductSitemapBatch> {
  try {
    return await fetchProductsAction({
      limit: PRODUCTS_PER_SITEMAP,
      page: sitemapIndex + 1,
    });
  } catch {
    return [];
  }
}

export function mapProductsToSitemap(
  products: ProductSitemapBatch,
  baseUrl: string,
): MetadataRoute.Sitemap {
  return products
    .filter((product) => product.slug)
    .map((product) => ({
      url: `${baseUrl}${getProductPath(product.name, product.id)}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
}

export async function getProductSitemapPages(
  sitemapIndex: number,
  baseUrl: string,
): Promise<MetadataRoute.Sitemap> {
  const products = await fetchProductSitemapBatch(sitemapIndex);
  return mapProductsToSitemap(products, baseUrl);
}

export async function getProductSitemapLocations(
  baseUrl: string,
): Promise<string[]> {
  const sitemaps: string[] = [];

  for (let sitemapIndex = 0; ; sitemapIndex += 1) {
    const products = await fetchProductSitemapBatch(sitemapIndex);

    if (products.length === 0) {
      break;
    }

    sitemaps.push(`${baseUrl}/sitemap-products-${sitemapIndex}.xml`);

    if (products.length < PRODUCTS_PER_SITEMAP) {
      break;
    }
  }

  return sitemaps;
}
