import type { UICategory, UIProduct } from "@/lib/transformers";
import type {
  Category,
  CategoryMap,
  RawProduct,
  TransformedProduct,
} from "@/types/product";

/**
 * Transforma produtos brutos (com IDs) em produtos com nomes resolvidos
 * Esta função é executada no servidor para evitar processamento no cliente
 * Suporta tanto RawProduct (mock) quanto UIProduct (API)
 */
export function transformProducts(
  rawProducts: (RawProduct | UIProduct)[],
  categories: (Category | UICategory)[],
): TransformedProduct[] {
  return rawProducts.map((product) => {
    const categoryObj = categories.find((c) => c.id === product.categoryId);
    const categoryName = categoryObj?.name || "";

    let subcategoryName = "";
    if (categoryObj?.subcategories) {
      const subObj = categoryObj.subcategories.find(
        (s) =>
          s.id === product.subcategoryId ||
          s.id.endsWith(`-${product.subcategoryId}`),
      );
      subcategoryName = subObj?.name || "";
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description ?? "",
      price: product.price,
      image: product.image,
      category: categoryName,
      subcategory: subcategoryName,
      inStock: product.inStock,
      brand: product.brand ?? undefined,
      discount: product.discount,
      isNew: product.isNew,
      specifications: product.specifications as Record<string, string>,
      shipping: product.shipping as TransformedProduct["shipping"],
    };
  });
}

/**
 * Extrai lista única de nomes de categorias dos produtos
 * Suporta tanto RawProduct (mock) quanto UIProduct (API)
 */
export function extractUniqueCategories(
  rawProducts: (RawProduct | UIProduct)[],
  categories: (Category | UICategory)[],
): string[] {
  const uniqueCategoryIds = new Set(rawProducts.map((p) => p.categoryId));
  return Array.from(uniqueCategoryIds)
    .map((id) => categories.find((c) => c.id === id)?.name || "")
    .filter((name) => name !== "")
    .sort();
}

/**
 * Gera mapa de categoria -> subcategorias para lookup rápido no cliente
 * Suporta tanto Category (mock) quanto UICategory (API)
 */
export function extractCategoryMap(
  rawProducts: (RawProduct | UIProduct)[],
  categories: (Category | UICategory)[],
): CategoryMap {
  const categoryMap: CategoryMap = {};

  for (const category of categories) {
    // Encontrar subcategorias que têm produtos
    const productsInCategory = rawProducts.filter(
      (p) => p.categoryId === category.id,
    );
    const uniqueSubcategoryIds = new Set(
      productsInCategory.map((p) => p.subcategoryId).filter(Boolean),
    );

    const subcategoryNames = Array.from(uniqueSubcategoryIds)
      .map((subId) => {
        const subObj = category.subcategories?.find(
          (s) => s.id === subId || s.id.endsWith(`-${subId}`),
        );
        return subObj?.name || "";
      })
      .filter((name) => name !== "")
      .sort();

    if (subcategoryNames.length > 0) {
      categoryMap[category.name] = subcategoryNames;
    }
  }

  return categoryMap;
}
