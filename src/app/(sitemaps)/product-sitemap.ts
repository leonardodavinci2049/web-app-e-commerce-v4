import type { MetadataRoute } from "next";
import { fetchProductsForListingAction } from "@/app/actions/product";
import { getProductPath } from "@/lib/slug";

export const PRODUCTS_PER_SITEMAP = 500;
export const MAX_PRODUCT_SITEMAPS = 100;

type ProductSitemapBatch = Awaited<
  ReturnType<typeof fetchProductsForListingAction>
>;

export async function fetchProductSitemapBatch(
  sitemapIndex: number,
): Promise<ProductSitemapBatch> {
  return fetchProductsForListingAction({
    limit: PRODUCTS_PER_SITEMAP,
    page: sitemapIndex + 1,
  });
}

export function mapProductsToSitemap(
  products: ProductSitemapBatch,
  baseUrl: string,
): MetadataRoute.Sitemap {
  return products
    .filter((product) => {
      // Exclude products without a valid slug (incomplete data)
      if (!product.slug) return false;
      // Exclude products without a valid name (can't generate canonical URL)
      if (!product.name || product.name.trim() === "") return false;
      return true;
    })
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
  const seenBatchSignatures = new Set<string>();

  for (
    let sitemapIndex = 0;
    sitemapIndex < MAX_PRODUCT_SITEMAPS;
    sitemapIndex += 1
  ) {
    const products = await fetchProductSitemapBatch(sitemapIndex);

    if (products.length === 0) {
      break;
    }

    const batchSignature = products.map((product) => product.id).join(",");
    if (seenBatchSignatures.has(batchSignature)) {
      throw new Error("A API repetiu um lote durante a geração do sitemap.");
    }
    seenBatchSignatures.add(batchSignature);

    sitemaps.push(`${baseUrl}/sitemap-products-${sitemapIndex}.xml`);

    if (products.length < PRODUCTS_PER_SITEMAP) {
      break;
    }

    if (sitemapIndex === MAX_PRODUCT_SITEMAPS - 1) {
      throw new Error("O sitemap excedeu o limite seguro de lotes.");
    }
  }

  return sitemaps;
}
