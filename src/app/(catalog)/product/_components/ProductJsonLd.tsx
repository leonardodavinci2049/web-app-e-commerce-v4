import { envs } from "@/core/config";
import { generateSlug } from "@/lib/slug";

interface ProductJsonLdProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image: string;
    inStock: boolean;
    brand?: string;
    sku?: string;
    isNew?: boolean;
    category?: string;
    subcategory?: string;
  };
  /** Rating médio (1-5) - opcional */
  rating?: {
    value: number;
    count: number;
  };
  /** Data de validade do preço (passada pelo server component) */
  priceValidUntil?: string;
}

/**
 * Componente de Dados Estruturados JSON-LD para páginas de produto
 * Segue o schema Product do Schema.org para rich snippets no Google
 *
 * @see https://schema.org/Product
 * @see https://developers.google.com/search/docs/appearance/structured-data/product
 */
export function ProductJsonLd({
  product,
  rating,
  priceValidUntil,
}: ProductJsonLdProps) {
  const productUrl = `${envs.NEXT_PUBLIC_BASE_URL_APP}/product/${generateSlug(product.name, product.id)}`;

  // Schema.org availability values
  const availability = product.inStock
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";

  // Condição do produto (novo ou usado)
  const itemCondition =
    product.isNew !== false
      ? "https://schema.org/NewCondition"
      : "https://schema.org/UsedCondition";

  // Construir objeto JSON-LD base
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description:
      product.description ||
      `${product.name} disponível na ${envs.NEXT_PUBLIC_COMPANY_NAME}`,
    url: productUrl,

    // Offer com informações de preço e disponibilidade
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "BRL",
      price: product.price.toFixed(2),
      ...(priceValidUntil && { priceValidUntil }),
      availability,
      itemCondition,
      seller: {
        "@type": "Organization",
        name: envs.NEXT_PUBLIC_COMPANY_NAME,
      },
    },
  };

  // Adicionar marca se disponível
  if (product.brand) {
    jsonLd.brand = {
      "@type": "Brand",
      name: product.brand,
    };
  }

  // Adicionar SKU se disponível
  if (product.sku) {
    jsonLd.sku = product.sku;
  }

  // Adicionar categoria como categoria do produto
  if (product.category) {
    jsonLd.category = product.subcategory
      ? `${product.category} > ${product.subcategory}`
      : product.category;
  }

  // Adicionar AggregateRating se houver avaliações
  if (rating && rating.count > 0) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating.value.toFixed(1),
      reviewCount: rating.count,
      bestRating: "5",
      worstRating: "1",
    };
  }

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires innerHTML for structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
