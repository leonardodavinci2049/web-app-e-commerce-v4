import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, PRODUCTS } from "@/data/mock-data";
import { CategorySidebar } from "../../_components/category-sidebar";
import { MobileCategoryNav } from "../../_components/mobile-category-nav";
import { ProductGrid } from "../../_components/product-grid";
import { Breadcrumbs } from "../../_components/breadcrumbs";

interface CategoryPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Função auxiliar para encontrar categoria e subcategoria
function getCategoryData(slug: string[]) {
  const [categorySlug, subcategorySlug] = slug;

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
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const data = getCategoryData(resolvedParams.slug);

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
  const data = getCategoryData(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  const { category, subcategory } = data;

  // Filtragem e mapeamento de produtos
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchCategory = product.categoryId === category.id;
    const matchSubcategory = subcategory
      ? product.subcategoryId === subcategory.id
      : true;

    return matchCategory && matchSubcategory;
  }).map((product) => {
    // Encontrar nomes de categoria e subcategoria para o produto
    const prodCategory = CATEGORIES.find((c) => c.id === product.categoryId);
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
        <CategorySidebar />

        <div className="flex-1">
          {/* Mobile Navigation */}
          <MobileCategoryNav />

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
