import type { MetadataRoute } from "next";
import { envs } from "@/core/config/envs";

/**
 * Generate robots.txt for SEO
 * Defines rules for search engine crawlers
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  // Base URL from environment
  const baseUrl =
    envs.NEXT_PUBLIC_BASE_URL_APP;

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/products", "/product/", "/category/", "/lancamentos"],
        disallow: [
          "/api/",
          "/cart",
          "/checkout",
          "/minha-conta",
          "/auth/",
          "/_next/",
          "/private/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
