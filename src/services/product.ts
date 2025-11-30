import { CATEGORIES, PRODUCTS } from "@/data/mock-data";

export const productService = {
  async getProducts() {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return PRODUCTS;
  },

  async getCategories() {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return CATEGORIES;
  },

  async getProductBySlug(slug: string[]) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // O slug vem como array, ex: ["smartphone-galaxy-s24-ultra-512gb", "1"]
    // Ou pode vir como ["smartphone-galaxy-s24-ultra-512gb-1"]
    const fullSlug = slug.join("/");

    // Extrai o ID do final do slug
    const parts = fullSlug.split("-");
    const id = parts[parts.length - 1];

    // Busca o produto pelo ID
    return PRODUCTS.find((p) => p.id === id);
  },

  async getRelatedProducts(productId: string, categoryId: string) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Produtos relacionados (mesma categoryId, excluindo o atual)
    return PRODUCTS.filter(
      (p) => p.categoryId === categoryId && p.id !== productId,
    );
  },

  async getCategoryBySlug(categorySlug: string, subcategorySlug?: string) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const category = CATEGORIES.find((c) => c.slug === categorySlug);

    if (!category) return null;

    let subcategory = null;
    if (subcategorySlug) {
      subcategory = category.subcategories?.find(
        (s) => s.slug === subcategorySlug,
      );
      if (!subcategory) return null; // Subcategoria inválida
    }

    return { category, subcategory };
  },

  async getProductsByCategory(categoryId: string, subcategoryId?: string) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return PRODUCTS.filter((product) => {
      const matchCategory = product.categoryId === categoryId;
      const matchSubcategory = subcategoryId
        ? product.subcategoryId === subcategoryId
        : true;

      return matchCategory && matchSubcategory;
    });
  },
};
