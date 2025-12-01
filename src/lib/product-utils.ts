import type {
  Category,
  CategoryMap,
  RawProduct,
  TransformedProduct,
} from "@/types/product";

/**
 * Transforma produtos brutos (com IDs) em produtos com nomes resolvidos
 * Esta função é executada no servidor para evitar processamento no cliente
 */
export function transformProducts(
  rawProducts: RawProduct[],
  categories: Category[],
): TransformedProduct[] {
  return rawProducts.map((product) => {
    const categoryObj = categories.find((c) => c.id === product.categoryId);
    const categoryName = categoryObj?.name || "";

    let subcategoryName = "";
    if (categoryObj?.subcategories) {
      const subObj = categoryObj.subcategories.find((s) =>
        s.id.endsWith(`-${product.subcategoryId}`),
      );
      subcategoryName = subObj?.name || "";
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: categoryName,
      subcategory: subcategoryName,
      inStock: product.inStock,
      brand: product.brand,
      discount: product.discount,
      isNew: product.isNew,
      specifications: product.specifications,
      shipping: product.shipping,
    };
  });
}

/**
 * Extrai lista única de nomes de categorias dos produtos
 */
export function extractUniqueCategories(
  rawProducts: RawProduct[],
  categories: Category[],
): string[] {
  const uniqueCategoryIds = new Set(rawProducts.map((p) => p.categoryId));
  return Array.from(uniqueCategoryIds)
    .map((id) => categories.find((c) => c.id === id)?.name || "")
    .filter((name) => name !== "")
    .sort();
}

/**
 * Gera mapa de categoria -> subcategorias para lookup rápido no cliente
 */
export function extractCategoryMap(
  rawProducts: RawProduct[],
  categories: Category[],
): CategoryMap {
  const categoryMap: CategoryMap = {};

  for (const category of categories) {
    // Encontrar subcategorias que têm produtos
    const productsInCategory = rawProducts.filter(
      (p) => p.categoryId === category.id,
    );
    const uniqueSubcategoryIds = new Set(
      productsInCategory.map((p) => p.subcategoryId),
    );

    const subcategoryNames = Array.from(uniqueSubcategoryIds)
      .map((subId) => {
        const subObj = category.subcategories?.find((s) =>
          s.id.endsWith(`-${subId}`),
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
