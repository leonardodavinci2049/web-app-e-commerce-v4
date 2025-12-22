import { envs } from "@/core/config";

/**
 * Componente para dados estruturados do WebSite (Schema.org)
 * Habilita Sitelinks Search Box no Google
 */
export function WebSiteJsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: envs.NEXT_PUBLIC_COMPANY_NAME,
    url: envs.NEXT_PUBLIC_BASE_URL_APP,
    description: envs.NEXT_PUBLIC_COMPANY_META_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${envs.NEXT_PUBLIC_BASE_URL_APP}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires structured data injection
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}
