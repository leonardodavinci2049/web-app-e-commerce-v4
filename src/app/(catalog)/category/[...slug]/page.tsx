import type { Metadata } from "next";
import { Suspense } from "react";
import {
  fetchCategoriesAction,
  fetchProductsByTaxonomyAction,
} from "@/app/actions/product";
import { ProductGridSkeleton } from "@/components/skeletons";
import { envs } from "@/core/config";
import { Breadcrumbs } from "../_components/breadcrumbs";
import { CategorySidebar } from "../_components/category-sidebar/category-sidebar";
import { MobileCategoryNav } from "../_components/mobile-category/mobile-category-nav";

import { CategoryProductListing } from "../_components/products/CategoryProductListing";

interface CategoryPageProps {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slugParts = resolvedParams.slug;
  const title = slugParts[slugParts.length - 1]
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const categoryUrl = `/category/${slugParts.join("/")}`;
  const fullUrl = `${envs.NEXT_PUBLIC_BASE_URL_APP}${categoryUrl}`;

  return {
    title: `${title} | ${envs.NEXT_PUBLIC_COMPANY_NAME}`,
    description: `Confira nossa seleção de ${title}. Os melhores produtos com os melhores preços. Parcele em até ${envs.NEXT_PUBLIC_PAY_IN_UP_TO}x sem juros!`,
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: fullUrl,
      siteName: envs.NEXT_PUBLIC_COMPANY_NAME,
      title: `${title} | ${envs.NEXT_PUBLIC_COMPANY_NAME}`,
      description: `Confira nossa seleção de ${title}. Os melhores produtos com os melhores preços.`,
      images: [
        {
          url: "/images/logo/logo-horizontal-header.png",
          width: 1200,
          height: 630,
          alt: `${title} - ${envs.NEXT_PUBLIC_COMPANY_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${envs.NEXT_PUBLIC_COMPANY_NAME}`,
      description: `Confira nossa seleção de ${title}. Os melhores produtos com os melhores preços.`,
      images: ["/images/logo/logo-horizontal-header.png"],
    },
  };
}

// Componente interno para encapsular a lógica de dados
async function CategoryContent({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const sortCol =
    typeof resolvedSearchParams.sort_col === "string"
      ? Number(resolvedSearchParams.sort_col)
      : undefined;
  const sortOrd =
    typeof resolvedSearchParams.sort_ord === "string"
      ? Number(resolvedSearchParams.sort_ord)
      : undefined;
  const stockOnly = resolvedSearchParams.stock === "1";

  const slugParts = resolvedParams.slug;

  // Usar o último segmento do slug para filtrar produtos
  const taxonomySlug = slugParts[slugParts.length - 1];

  // Buscar categorias primeiro para obter o ID e slug real
  const categories = await fetchCategoriesAction();

  // Tentar encontrar a categoria pelo slug para obter o ID, slug real e nome (busca em 3 níveis)
  const findTaxonomyInfo = (): {
    id: number | undefined;
    slug: string | undefined;
    name: string | undefined;
  } => {
    for (const cat of categories) {
      // Level 1 - Família
      if (cat.slug === taxonomySlug || cat.id === taxonomySlug) {
        return { id: Number(cat.id), slug: cat.slug, name: cat.name };
      }
      if (cat.subcategories) {
        for (const sub of cat.subcategories) {
          // Level 2 - Grupo
          if (sub.slug === taxonomySlug || sub.id === taxonomySlug) {
            return { id: Number(sub.id), slug: sub.slug, name: sub.name };
          }
          // Level 3 - Subgrupo
          if (sub.children) {
            for (const child of sub.children) {
              if (child.slug === taxonomySlug || child.id === taxonomySlug) {
                return {
                  id: Number(child.id),
                  slug: child.slug,
                  name: child.name,
                };
              }
            }
          }
        }
      }
    }
    return { id: undefined, slug: undefined, name: undefined };
  };

  const taxonomyInfo = findTaxonomyInfo();

  // Usar o slug real da categoria se encontrado, senão usar o da URL
  const effectiveSlug = taxonomyInfo.slug || taxonomySlug;
  const taxonomyId = taxonomyInfo.id;

  // Buscar produtos por slug ou ID
  const products = await fetchProductsByTaxonomyAction(
    effectiveSlug,
    taxonomyId,
    undefined, // limit
    undefined, // page
    sortCol,
    sortOrd,
    stockOnly,
  );

  // Construir breadcrumbs a partir dos slugs
  const breadcrumbs = slugParts.map((slug, index) => {
    const label = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const href = `/category/${slugParts.slice(0, index + 1).join("/")}`;
    return { label, href };
  });

  // Título da página - usar nome da categoria se encontrado, senão formatar o slug
  const pageTitle =
    taxonomyInfo.name ||
    slugParts[slugParts.length - 1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

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
          <div className="mb-2">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {pageTitle}
            </h1>
            {/* <p className="text-muted-foreground">
              {products.length} produtos encontrados
            </p> OLD LOCATION */}
          </div>
          {/* Product Listing with Toggle */}
          <CategoryProductListing
            products={products}
            categoryId={effectiveSlug}
            taxonomyId={taxonomyId}
            sortCol={sortCol}
            sortOrd={sortOrd}
            stockOnly={stockOnly}
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

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryPageSkeleton />}>
      <CategoryContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
