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
}

const SENTINEL_BRANDS = new Set(["NONE", "SEM MARCA", "N/A", "NA"]);
const GTIN_PROPERTY_BY_LENGTH = {
  8: "gtin8",
  12: "gtin12",
  13: "gtin13",
  14: "gtin14",
} as const;

type GtinProperty =
  (typeof GTIN_PROPERTY_BY_LENGTH)[keyof typeof GTIN_PROPERTY_BY_LENGTH];

interface ValidGtin {
  property: GtinProperty;
  value: string;
}

function getValidBrand(brand: string | undefined): string | undefined {
  const normalizedBrand = brand?.trim();

  if (!normalizedBrand || SENTINEL_BRANDS.has(normalizedBrand.toUpperCase())) {
    return undefined;
  }

  return normalizedBrand;
}

function isRestrictedGtin(gtin: string): boolean {
  return (
    gtin.startsWith("2") ||
    gtin.startsWith("02") ||
    gtin.startsWith("04") ||
    gtin.startsWith("05") ||
    gtin.startsWith("98") ||
    gtin.startsWith("99")
  );
}

function hasValidGtinCheckDigit(gtin: string): boolean {
  const checkDigit = Number(gtin.at(-1));
  let sum = 0;

  for (let index = gtin.length - 2; index >= 0; index -= 1) {
    const digit = Number(gtin[index]);
    const distanceFromCheckDigit = gtin.length - 1 - index;
    sum += digit * (distanceFromCheckDigit % 2 === 1 ? 3 : 1);
  }

  return (10 - (sum % 10)) % 10 === checkDigit;
}

function getValidGtin(gtin: string | undefined): ValidGtin | undefined {
  const normalizedGtin = gtin?.trim().replace(/[\s-]/g, "");

  if (!normalizedGtin || !/^\d+$/.test(normalizedGtin)) {
    return undefined;
  }

  const property =
    GTIN_PROPERTY_BY_LENGTH[
      normalizedGtin.length as keyof typeof GTIN_PROPERTY_BY_LENGTH
    ];

  if (
    !property ||
    isRestrictedGtin(normalizedGtin) ||
    !hasValidGtinCheckDigit(normalizedGtin)
  ) {
    return undefined;
  }

  return { property, value: normalizedGtin };
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
}: ProductJsonLdProps) {
  const baseUrl = envs.NEXT_PUBLIC_BASE_URL_APP;
  const productUrl = `${baseUrl}/product/${generateSlug(product.name, product.id)}`;

  // Schema.org availability values
  const availability = product.inStock
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";

  // Build image array: main image + gallery
  const images: string[] = [product.image];
  if (galleryImages && galleryImages.length > 0) {
    for (const img of galleryImages) {
      if (img && !images.includes(img)) {
        images.push(img);
      }
    }
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

    ...(product.price > 0 && {
      offers: {
        "@type": "Offer",
        url: productUrl,
        priceCurrency: "BRL",
        price: product.price.toFixed(2),
        availability,
        seller: {
          "@type": "Organization",
          "@id": SCHEMA_IDS.organization,
          name: envs.NEXT_PUBLIC_COMPANY_NAME,
        },
        hasMerchantReturnPolicy: {
          "@id": SCHEMA_IDS.merchantReturnPolicy,
        },
      },
    }),
  };

  // Adicionar marca se disponível
  const validBrand = getValidBrand(product.brand);
  if (validBrand) {
    jsonLd.brand = {
      "@type": "Brand",
      name: validBrand,
    };
  }

  // Adicionar SKU se disponível
  if (product.sku) {
    jsonLd.sku = product.sku;
  }

  // Publicar somente GTINs com formato e dígito verificador válidos.
  const validGtin = getValidGtin(product.gtin);
  if (validGtin) {
    jsonLd[validGtin.property] = validGtin.value;
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
