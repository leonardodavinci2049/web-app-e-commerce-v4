import type { MetadataRoute } from "next";
import { unstable_noStore } from "next/cache";
import { fetchCategoriesAction } from "@/app/actions/product";
import { getSitemapBaseUrl } from "../base-url";

/**
 * Sitemap for categories — flat, canonical URLs only.
 *
 * Publishes every category at `/category/{slug}` regardless of its hierarchy
 * level, because the app resolves categories by slug (not by parent path).
 * This avoids duplicate URLs like `/category/parent/child` vs `/category/child`.
 */
export async function GET(request: Request) {
  unstable_noStore();

  const baseUrl = getSitemapBaseUrl(request);

  let categoryPages: MetadataRoute.Sitemap = [];

  try {
    const categories = await fetchCategoriesAction();

    if (categories && categories.length > 0) {
      const seenSlugs = new Set<string>();

      categoryPages = categories.flatMap((category) => {
        const pages: MetadataRoute.Sitemap = [];

        // Level 1: Family (e.g., /category/informatica)
        if (category.slug && !seenSlugs.has(category.slug)) {
          seenSlugs.add(category.slug);
          pages.push({
            url: `${baseUrl}/category/${category.slug}`,
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }

        // Level 2: Group (e.g., /category/notebooks)
        if (category.subcategories && category.subcategories.length > 0) {
          for (const subcategory of category.subcategories) {
            if (subcategory.slug && !seenSlugs.has(subcategory.slug)) {
              seenSlugs.add(subcategory.slug);
              pages.push({
                url: `${baseUrl}/category/${subcategory.slug}`,
                changeFrequency: "weekly",
                priority: 0.6,
              });
            }

            // Level 3: Subgroup (e.g., /category/gaming)
            if (subcategory.children && subcategory.children.length > 0) {
              for (const subgroup of subcategory.children) {
                if (subgroup.slug && !seenSlugs.has(subgroup.slug)) {
                  seenSlugs.add(subgroup.slug);
                  pages.push({
                    url: `${baseUrl}/category/${subgroup.slug}`,
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
  } catch {
    // Silently handle API errors
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${categoryPages
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
