import { envs } from "@/core/config";

interface ItemListProduct {
  name: string;
  url: string;
  image?: string;
  position?: number;
}

interface ItemListJsonLdProps {
  name: string;
  items: ItemListProduct[];
}

/**
 * Componente de Dados Estruturados JSON-LD para ItemList
 * Gera schema ItemList para grids de produtos em listagens e categorias
 *
 * @see https://schema.org/ItemList
 * @see https://developers.google.com/search/docs/appearance/structured-data/carousel
 */
export function ItemListJsonLd({ name, items }: ItemListJsonLdProps) {
  const baseUrl = envs.NEXT_PUBLIC_BASE_URL_APP;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: item.position ?? index + 1,
      url: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
      name: item.name,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires structured data injection
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
