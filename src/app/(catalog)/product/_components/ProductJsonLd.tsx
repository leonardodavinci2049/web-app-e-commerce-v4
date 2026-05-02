import { envs } from "@/core/config";
import { JsonLdScript, SCHEMA_IDS } from "@/lib/seo/json-ld";
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
    gtin?: string;
    mpn?: string;
  };
  /** Additional gallery images (full URLs) */
  galleryImages?: string[];
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
  galleryImages,
  rating,
  priceValidUntil,
}: ProductJsonLdProps) {
  const baseUrl = envs.NEXT_PUBLIC_BASE_URL_APP;
  const productUrl = `${baseUrl}/product/${generateSlug(product.name, product.id)}`;

  // Calcula priceValidUntil como +30 dias se não fornecido (Google exige para rich results)
  const effectivePriceValidUntil =
    priceValidUntil ||
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  // Schema.org availability values
  const availability = product.inStock
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";

  // Condição do produto (novo ou usado)
  const itemCondition =
    product.isNew !== false
      ? "https://schema.org/NewCondition"
      : "https://schema.org/UsedCondition";

  // Build image array: main image + gallery
  const images: string[] = [product.image];
  if (galleryImages && galleryImages.length > 0) {
    for (const img of galleryImages) {
      if (img && !images.includes(img)) {
        images.push(img);
      }
    }
  }

  // Build shipping details with free shipping threshold
  const freeShippingOver = envs.NEXT_PUBLIC_FREE_SHIPPING_OVER;
  const shippingDetails: Record<string, unknown>[] = [];

  if (freeShippingOver > 0 && product.price >= freeShippingOver) {
    shippingDetails.push({
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency: "BRL",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "BR",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 3,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 3,
          maxValue: 10,
          unitCode: "DAY",
        },
      },
    });
  }

  // Construir objeto JSON-LD base
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: images.length > 1 ? images : product.image,
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
      priceValidUntil: effectivePriceValidUntil,
      availability,
      itemCondition,
      seller: {
        "@type": "Organization",
        "@id": SCHEMA_IDS.organization,
        name: envs.NEXT_PUBLIC_COMPANY_NAME,
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "BR",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
        returnPolicySeasonalOverride: undefined,
        itemCondition: "https://schema.org/NewCondition",
      },
      ...(shippingDetails.length > 0 && {
        shippingDetails: shippingDetails,
      }),
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

  // Adicionar GTIN (EAN) se disponível — melhora elegibilidade para Google Shopping
  if (product.gtin) {
    jsonLd.gtin = product.gtin;
  }

  // Adicionar MPN (código do fabricante) se disponível
  if (product.mpn) {
    jsonLd.mpn = product.mpn;
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

  return <JsonLdScript data={jsonLd} />;
}
