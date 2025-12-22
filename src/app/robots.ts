import type { MetadataRoute } from "next";
import { envs } from "@/core/config/envs";

/**
 * Generate robots.txt for SEO
 * Defines rules for search engine crawlers
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  // Base URL from environment (using BETTER_AUTH_URL as site URL)
  const baseUrl = envs.BETTER_AUTH_URL || "https://mundialmegastore.com.br";

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
