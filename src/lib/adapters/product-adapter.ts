/**
 * Product Data Adapter
 * Transforms API ProductWebListItem to UI Product interface
 */

import { slugify } from "@/lib/utils";
import type { ProductWebListItem } from "@/services/api-main/product/types/product-types";
import type { ProductWithMetadata } from "@/types/product";

/**
 * Formats price string to number with 2 decimal places
 */
function formatPrice(priceString: string): number {
  const price = Number.parseFloat(priceString);
  return Number.isNaN(price) ? 0 : Number(price.toFixed(2));
}

/**
 * Calculates discount percentage between original and current price
 */
function calculateDiscount(original: number, current: number): number {
  if (original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}

/**
 * Determines the fallback image path
 */
function getImagePath(pathImagem: string | null): string {
  if (!pathImagem || pathImagem.trim() === "") {
    return "/images/product/no-image.jpeg";
  }
  return pathImagem;
}

/**
 * Determines category name from TIPO field
 */
function getCategoryName(tipo: string | null): string {
  return tipo || "Sem Categoria";
}

/**
 * Determines badge based on product flags
 */
function getBadge(
  isPromotion: number,
  isLaunch: number,
  isImported: number,
): string | undefined {
  if (isPromotion === 1) return "Promoção";
  if (isLaunch === 1) return "Lançamento";
  if (isImported === 1) return "Importado";
  return undefined;
}

/**
 * Adapts ProductWebListItem from API to ProductWithMetadata for UI
 * Uses VL_VAREJO as primary price and VL_CORPORATIVO as original price for discount calculation
 */
export function adaptProductFromApi(
  apiProduct: ProductWebListItem,
): ProductWithMetadata {
  const retailPrice = formatPrice(apiProduct.VL_VAREJO);
  const corporatePrice = formatPrice(apiProduct.VL_CORPORATIVO);

  // Use corporate price as original if it's higher than retail (indicates discount)
  const hasDiscount = corporatePrice > retailPrice;
  const originalPrice = hasDiscount ? corporatePrice : undefined;
  const discount = hasDiscount
    ? calculateDiscount(corporatePrice, retailPrice)
    : undefined;

  const slug = apiProduct.SLUG || slugify(apiProduct.PRODUTO);

  return {
    id: apiProduct.ID_PRODUTO.toString(),
    sku: apiProduct.SKU,
    name: apiProduct.PRODUTO,
    price: retailPrice,
    originalPrice,
    discount,
    image: getImagePath(apiProduct.PATH_IMAGEM),
    category: getCategoryName(apiProduct.TIPO),
    subcategory: "",
    brand: apiProduct.MARCA || undefined,
    badge: getBadge(
      apiProduct.PROMOCAO,
      apiProduct.LANCAMENTO,
      apiProduct.IMPORTADO,
    ),
    slug,
    stock: apiProduct.ESTOQUE_LOJA,
    warranty: apiProduct.TEMPODEGARANTIA_DIA,
    isImported: apiProduct.IMPORTADO === 1,
    isPromotion: apiProduct.PROMOCAO === 1,
    isLaunch: apiProduct.LANCAMENTO === 1,
    isNew: apiProduct.LANCAMENTO === 1,
    inStock: apiProduct.ESTOQUE_LOJA > 0,
    description: apiProduct.DESCRICAO_VENDA || "",
    createdAt: apiProduct.DATADOCADASTRO || undefined,
  };
}

/**
 * Adapts array of ProductWebListItem to ProductWithMetadata
 */
export function adaptProductsFromApi(
  apiProducts: ProductWebListItem[],
): ProductWithMetadata[] {
  return apiProducts.map(adaptProductFromApi);
}
