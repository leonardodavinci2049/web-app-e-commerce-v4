import type { MetadataRoute } from "next";
import {
  fetchCategoriesAction,
  fetchProductsAction,
} from "@/app/actions/product";
import { envs } from "@/core/config/envs";
import { generateSlug } from "@/lib/slug";

/**
 * Generate dynamic sitemap for SEO
 * Includes: static pages, products, and categories (3 levels deep)
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL from environment (using BETTER_AUTH_URL as site URL)
  const baseUrl = envs.BETTER_AUTH_URL || "https://mundialmegastore.com.br";

  // Current date for lastModified
  const currentDate = new Date();

  // ========================================
  // Static Pages
  // ========================================
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lancamentos`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // ========================================
  // Product Pages
  // ========================================
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await fetchProductsAction();

    if (products && products.length > 0) {
      productPages = products.map((product) => ({
        url: `${baseUrl}/product/${generateSlug(product.name, product.id)}`,
        lastModified: currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("[Sitemap] Failed to fetch products:", error);
  }

  // ========================================
  // Category Pages (3 levels: family > group > subgroup)
  // ========================================
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const categories = await fetchCategoriesAction();

    if (categories && categories.length > 0) {
      categoryPages = categories.flatMap((category) => {
        const pages: MetadataRoute.Sitemap = [];

        // Level 1: Family (e.g., /category/informatica)
        if (category.slug) {
          pages.push({
            url: `${baseUrl}/category/${category.slug}`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }

        // Level 2: Group (e.g., /category/informatica/notebooks)
        if (category.subcategories && category.subcategories.length > 0) {
          for (const subcategory of category.subcategories) {
            if (subcategory.slug) {
              pages.push({
                url: `${baseUrl}/category/${category.slug}/${subcategory.slug}`,
                lastModified: currentDate,
                changeFrequency: "weekly",
                priority: 0.6,
              });
            }

            // Level 3: Subgroup (e.g., /category/informatica/notebooks/gaming)
            if (subcategory.children && subcategory.children.length > 0) {
              for (const subgroup of subcategory.children) {
                if (subgroup.slug) {
                  pages.push({
                    url: `${baseUrl}/category/${category.slug}/${subcategory.slug}/${subgroup.slug}`,
                    lastModified: currentDate,
                    changeFrequency: "weekly",
                    priority: 0.5,
                  });
                }
              }
            }
          }
        }

        return pages;
      });
    }
  } catch (error) {
    console.error("[Sitemap] Failed to fetch categories:", error);
  }

  // ========================================
  // Combine all pages
  // ========================================
  return [...staticPages, ...productPages, ...categoryPages];
}
