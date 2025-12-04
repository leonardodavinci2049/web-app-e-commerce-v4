/**
 * Data Transformers
 *
 * Transforms API response types to UI-friendly types.
 * Centralizes data mapping logic for products and categories.
 */

import type {
  ProductWebDetail,
  ProductWebListItem,
  ProductWebRelatedItem,
} from "@/services/api-main/product/types/product-types";
import type { TblTaxonomyWebMenu } from "@/services/api-main/category/types/category-types";

// ============================================================================
// Constants
// ============================================================================

export const PLACEHOLDER_IMAGE = "/images/product/no-image.jpeg";

// ============================================================================
// UI Types
// ============================================================================

export interface UIProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string;
  categoryId: string;
  subcategoryId?: string;
  inStock: boolean;
  brand?: string;
  isNew?: boolean;
  discount?: number;
  specifications?: Record<string, unknown>;
  shipping?: Record<string, unknown>;
}

export interface UISubcategory {
  id: string;
  name: string;
  slug: string;
  href: string;
}

export interface UICategory {
  id: string;
  name: string;
  slug: string;
  href: string;
  iconName?: string;
  subcategories?: UISubcategory[];
}

export interface CategoryLookupResult {
  category: UICategory;
  subcategory: UISubcategory | null;
}


// ============================================================================
// Product Transformers
// ============================================================================

/**
 * Safely parses a price string to number
 */
function parsePrice(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

/**
 * Gets image path with fallback to placeholder
 */
function getImagePath(path: string | null | undefined): string {
  return path && path.trim() !== "" ? path : PLACEHOLDER_IMAGE;
}

/**
 * Transforms a ProductWebListItem from API to UIProduct for UI components
 */
export function transformProductListItem(item: ProductWebListItem): UIProduct {
  return {
    id: String(item.ID_PRODUTO),
    name: item.PRODUTO,
    description: item.DESCRICAO_TAB ?? item.DESCRICAO_VENDA ?? null,
    price: parsePrice(item.VL_VAREJO),
    image: getImagePath(item.PATH_IMAGEM),
    categoryId: "", // Will be set from taxonomy context
    subcategoryId: undefined,
    inStock: item.ESTOQUE_LOJA > 0,
    brand: item.MARCA ?? undefined,
    isNew: item.LANCAMENTO === 1,
    discount: item.PROMOCAO === 1 ? calculateDiscount(item) : undefined,
  };
}

/**
 * Transforms multiple ProductWebListItem to UIProduct array
 */
export function transformProductList(items: ProductWebListItem[]): UIProduct[] {
  return items.map(transformProductListItem);
}

/**
 * Calculates discount percentage if promotion is active
 */
function calculateDiscount(item: ProductWebListItem): number | undefined {
  // If DECONTO field exists and has value, use it
  if (item.DECONTO) {
    const discount = parsePrice(item.DECONTO);
    if (discount > 0) return discount;
  }
  return undefined;
}


/**
 * Transforms a ProductWebDetail from API to UIProduct for product detail page
 */
export function transformProductDetail(detail: ProductWebDetail): UIProduct {
  return {
    id: String(detail.ID_PRODUTO),
    name: detail.PRODUTO,
    description: detail.DESCRICAO_TAB ?? detail.DESCRICAO_VENDA ?? null,
    price: parsePrice(detail.VL_VAREJO),
    image: getImagePath(detail.PATH_IMAGEM),
    categoryId: detail.ID_FAMILIA ? String(detail.ID_FAMILIA) : "",
    subcategoryId: detail.ID_GRUPO ? String(detail.ID_GRUPO) : undefined,
    inStock: detail.ESTOQUE_LOJA > 0,
    brand: detail.MARCA ?? undefined,
    isNew: detail.LANCAMENTO === 1,
    discount: detail.PROMOCAO === 1 ? undefined : undefined, // Calculate from price difference if needed
    specifications: buildSpecifications(detail),
    shipping: buildShippingInfo(detail),
  };
}

/**
 * Builds specifications object from product detail
 */
function buildSpecifications(
  detail: ProductWebDetail,
): Record<string, unknown> {
  return {
    sku: detail.SKU,
    model: detail.MODELO,
    reference: detail.REF,
    weight: detail.PESO_GR,
    dimensions: {
      length: detail.COMPRIMENTO_MM,
      width: detail.LARGURA_MM,
      height: detail.ALTURA_MM,
      diameter: detail.DIAMETRO_MM,
    },
    warranty: detail.TEMPODEGARANTIA_DIA,
    ean: detail.EAN,
    ncm: detail.NCM,
  };
}

/**
 * Builds shipping info from product detail
 */
function buildShippingInfo(detail: ProductWebDetail): Record<string, unknown> {
  return {
    weight: detail.PESO_GR,
    length: detail.COMPRIMENTO_MM,
    width: detail.LARGURA_MM,
    height: detail.ALTURA_MM,
  };
}

/**
 * Transforms ProductWebRelatedItem to UIProduct for related products
 */
export function transformRelatedProduct(item: ProductWebRelatedItem): UIProduct {
  return {
    id: String(item.SKU ?? 0),
    name: item.PRODUTO ?? "",
    description: item.DESCRICAO_TAB ?? null,
    price: parsePrice(item.VL_VAREJO),
    image: getImagePath(item.PATH_IMAGEM),
    categoryId: item.ID_TAXONOMY ? String(item.ID_TAXONOMY) : "",
    inStock: (item.ESTOQUE_LOJA ?? 0) > 0,
    brand: undefined,
    isNew: item.LANCAMENTO === 1,
    discount: item.PROMOCAO === 1 ? undefined : undefined,
  };
}

/**
 * Transforms multiple ProductWebRelatedItem to UIProduct array
 */
export function transformRelatedProducts(
  items: ProductWebRelatedItem[],
): UIProduct[] {
  return items.map(transformRelatedProduct);
}


// ============================================================================
// Category Transformers
// ============================================================================

/**
 * Generates href path for a category based on its position in hierarchy
 */
function generateCategoryHref(slug: string, parentSlug?: string): string {
  if (parentSlug) {
    return `/category/${parentSlug}/${slug}`;
  }
  return `/category/${slug}`;
}

/**
 * Transforms a single TblTaxonomyWebMenu to UISubcategory
 */
function transformToSubcategory(
  item: TblTaxonomyWebMenu,
  parentSlug: string,
): UISubcategory {
  const slug = item.SLUG ?? String(item.ID_TAXONOMY);
  return {
    id: String(item.ID_TAXONOMY ?? 0),
    name: item.TAXONOMIA ?? "",
    slug,
    href: generateCategoryHref(slug, parentSlug),
  };
}

/**
 * Transforms a single TblTaxonomyWebMenu to UICategory
 * Recursively transforms children to subcategories
 */
function transformToCategory(
  item: TblTaxonomyWebMenu,
  parentSlug?: string,
): UICategory {
  const slug = item.SLUG ?? String(item.ID_TAXONOMY);
  const href = generateCategoryHref(slug, parentSlug);

  // Transform children (level 2 and 3) to subcategories
  const subcategories: UISubcategory[] = [];

  if (item.children && item.children.length > 0) {
    for (const child of item.children) {
      subcategories.push(transformToSubcategory(child, slug));

      // Also include level 3 children (subgrupo) as flat subcategories
      if (child.children && child.children.length > 0) {
        for (const grandchild of child.children) {
          const childSlug = child.SLUG ?? String(child.ID_TAXONOMY);
          subcategories.push(
            transformToSubcategory(grandchild, `${slug}/${childSlug}`),
          );
        }
      }
    }
  }

  return {
    id: String(item.ID_TAXONOMY ?? 0),
    name: item.TAXONOMIA ?? "",
    slug,
    href,
    subcategories: subcategories.length > 0 ? subcategories : undefined,
  };
}

/**
 * Transforms TblTaxonomyWebMenu array to UICategory array
 * Preserves three-level hierarchy (família, grupo, subgrupo)
 */
export function transformCategoryMenu(
  menu: TblTaxonomyWebMenu[],
): UICategory[] {
  return menu.map((item) => transformToCategory(item));
}


/**
 * Finds a category by slug in the hierarchical structure
 * Returns both the category and subcategory if applicable
 */
export function findCategoryBySlug(
  categories: UICategory[],
  categorySlug: string,
  subcategorySlug?: string,
): CategoryLookupResult | null {
  // Find the main category
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    return null;
  }

  // If no subcategory slug, return just the category
  if (!subcategorySlug) {
    return { category, subcategory: null };
  }

  // Find the subcategory
  const subcategory = category.subcategories?.find(
    (s) => s.slug === subcategorySlug,
  );

  if (!subcategory) {
    return null;
  }

  return { category, subcategory };
}

/**
 * Finds a category by its taxonomy ID in the hierarchical structure
 */
export function findCategoryById(
  categories: UICategory[],
  categoryId: string,
): UICategory | null {
  for (const category of categories) {
    if (category.id === categoryId) {
      return category;
    }
  }
  return null;
}

/**
 * Finds a subcategory by its ID within a category
 */
export function findSubcategoryById(
  category: UICategory,
  subcategoryId: string,
): UISubcategory | null {
  return category.subcategories?.find((s) => s.id === subcategoryId) ?? null;
}
