import type { MetadataRoute } from "next";
import { fetchCategoriesAction } from "@/app/actions/product";
import { envs } from "@/core/config/envs";

/**
 * Sitemap for categories only (3 levels: family > group > subgroup)
 */
export async function GET() {
  const baseUrl =
    envs.NEXT_PUBLIC_BASE_URL_APP || "https://mundialmegastore.com.br";
  const currentDate = new Date().toISOString();

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
  } catch {
    // Silently handle API errors
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${categoryPages
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
