import { envs } from "@/core/config";
import { JsonLdScript } from "@/lib/seo/json-ld";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

/**
 * Componente de Dados Estruturados JSON-LD para BreadcrumbList
 * Gera breadcrumbs no formato Schema.org para rich results no Google
 *
 * @see https://schema.org/BreadcrumbList
 * @see https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const baseUrl = envs.NEXT_PUBLIC_BASE_URL_APP;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };

  return <JsonLdScript data={jsonLd} />;
}
