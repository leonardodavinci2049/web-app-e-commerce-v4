import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchCategoriesAction,
  fetchCategoryBySlugAction,
  fetchProductsByCategoryAction,
} from "@/app/actions/product";
import { Breadcrumbs } from "../_components/breadcrumbs";
import { CategorySidebar } from "../_components/category-sidebar";
import { MobileCategoryNav } from "../_components/mobile-category-nav";
import { ProductGrid } from "../_components/product-grid";

interface CategoryPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const [categorySlug, subcategorySlug] = resolvedParams.slug;

  const data = await fetchCategoryBySlugAction(categorySlug, subcategorySlug);

  if (!data) {
    return {
      title: "Categoria não encontrada",
    };
  }

  const { category, subcategory } = data;
  const title = subcategory
    ? `${subcategory.name} - ${category.name}`
    : category.name;

  return {
    title: `${title} | Store Name`,
    description: `Confira nossa seleção de ${title}. Os melhores produtos com os melhores preços.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const [categorySlug, subcategorySlug] = resolvedParams.slug;

  const data = await fetchCategoryBySlugAction(categorySlug, subcategorySlug);

  if (!data) {
    notFound();
  }

  const { category, subcategory } = data;

  // Buscar produtos e categorias
  const [products, categories] = await Promise.all([
    fetchProductsByCategoryAction(category.id, subcategory?.id),
    fetchCategoriesAction(),
  ]);

  // Mapear produtos com nomes de categoria/subcategoria
  const filteredProducts = products.map((product) => {
    // Encontrar nomes de categoria e subcategoria para o produto
    const prodCategory = categories.find((c) => c.id === product.categoryId);
    const prodSubcategory = prodCategory?.subcategories?.find(
      (s) => s.id === product.subcategoryId,
    );

    return {
      ...product,
      category: prodCategory?.name || "",
      subcategory: prodSubcategory?.name || "",
    };
  });

  // Breadcrumbs
  const breadcrumbs = [{ label: category.name, href: category.href }];

  if (subcategory) {
    breadcrumbs.push({ label: subcategory.name, href: subcategory.href });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar (Desktop) */}
        <CategorySidebar categories={categories} />

        <div className="flex-1">
          {/* Mobile Navigation */}
          <MobileCategoryNav categories={categories} />

          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} />

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {subcategory ? subcategory.name : category.name}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} produtos encontrados
            </p>
          </div>

          {/* Product Grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
