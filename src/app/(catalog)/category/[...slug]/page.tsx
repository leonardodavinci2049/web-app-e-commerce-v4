import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  fetchCategoriesAction,
  fetchCategoryBySlugAction,
  fetchProductsByCategoryAction,
} from "@/app/actions/product";
import { ProductGridSkeleton } from "@/components/skeletons";
import { Breadcrumbs } from "../_components/breadcrumbs";
import { CategorySidebar } from "../_components/category-sidebar/category-sidebar";
import { MobileCategoryNav } from "../_components/mobile-category/mobile-category-nav";
import { ProductGrid } from "../_components/products/product-grid";

interface CategoryPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

/**
 * Generate static params for top category pages
 * Pre-renders category pages at build time for cache warming
 */
export async function generateStaticParams() {
  const categories = await fetchCategoriesAction();

  // Generate params for main categories and their subcategories
  const params: { slug: string[] }[] = [];

  for (const category of categories) {
    // Main category page
    params.push({ slug: [category.slug] });

    // Subcategory pages
    if (category.subcategories) {
      for (const subcategory of category.subcategories) {
        params.push({ slug: [category.slug, subcategory.slug] });
      }
    }
  }

  return params;
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

// Componente interno para encapsular a lógica de dados
async function CategoryContent({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  // Resolver params DENTRO do boundary Suspense
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
          <ProductGrid
            products={filteredProducts}
            categoryId={category.id}
            subcategoryId={subcategory?.id}
          />
        </div>
      </div>
    </div>
  );
}

// Componente de fallback para o loading
function CategoryPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Skeleton */}
        <div className="w-full lg:w-64 space-y-4 animate-pulse">
          <div className="h-8 bg-muted rounded" />
          <div className="h-64 bg-muted rounded" />
        </div>

        <div className="flex-1 space-y-8">
          {/* Breadcrumb Skeleton */}
          <div className="h-6 w-48 bg-muted rounded animate-pulse" />

          {/* Header Skeleton */}
          <div className="space-y-2 animate-pulse">
            <div className="h-10 w-64 bg-muted rounded" />
            <div className="h-6 w-32 bg-muted rounded" />
          </div>

          {/* Grid Skeleton - using standardized component */}
          <ProductGridSkeleton count={6} />
        </div>
      </div>
    </div>
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryPageSkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
