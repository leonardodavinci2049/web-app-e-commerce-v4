import type { Metadata } from "next";
import { Suspense } from "react";
import {
  fetchCategoriesAction,
  fetchProductsByTaxonomyAction,
} from "@/app/actions/product";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/seo";
import { ProductGridSkeleton } from "@/components/skeletons";
import { envs } from "@/core/config";
import { getProductPath } from "@/lib/slug";
import { toTitleCase } from "@/lib/text-utils";
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

/**
 * Busca o nome real da categoria na API pela slug.
 * Percorre até 3 níveis de hierarquia (família, grupo, subgrupo).
 */
function findCategoryName(
  categories: Awaited<ReturnType<typeof fetchCategoriesAction>>,
  taxonomySlug: string,
): string | undefined {
  for (const cat of categories) {
    if (cat.slug === taxonomySlug) return cat.name;
    if (cat.subcategories) {
      for (const sub of cat.subcategories) {
        if (sub.slug === taxonomySlug) return sub.name;
        if (sub.children) {
          for (const child of sub.children) {
            if (child.slug === taxonomySlug) return child.name;
          }
        }
      }
    }
  }
  return undefined;
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slugParts = resolvedParams.slug;
  const taxonomySlug = slugParts[slugParts.length - 1];

  // Buscar nome real da categoria via API
  const categories = await fetchCategoriesAction();
  const rawName = findCategoryName(categories, taxonomySlug);
  const title = toTitleCase(
    rawName ||
      taxonomySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  );

  // Verificar se há filtros ativos
  const sortCol = typeof resolvedSearchParams.sort_col === "string";
  const sortOrd = typeof resolvedSearchParams.sort_ord === "string";
  const stockOnly = resolvedSearchParams.stock === "1";

  // Contar filtros ativos
  const filterCount = [sortCol, sortOrd, stockOnly].filter(Boolean).length;

  // Estratégia: noindex se houver 2 ou mais filtros (evitar thin content)
  const shouldNoindex = filterCount >= 2;

  const categoryUrl = `/category/${slugParts.join("/")}`;
  const fullUrl = `${envs.NEXT_PUBLIC_BASE_URL_APP}${categoryUrl}`;

  const pageTitle = `${title} | Compre na ${envs.NEXT_PUBLIC_COMPANY_NAME}`;
  const pageDescription = `Encontre os melhores ${title} na ${envs.NEXT_PUBLIC_COMPANY_NAME}. Preços imbatíveis, parcele em até ${envs.NEXT_PUBLIC_PAY_IN_UP_TO}x sem juros. Entrega para todo o Brasil!`;

  const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: fullUrl,
      siteName: envs.NEXT_PUBLIC_COMPANY_NAME,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: "/images/logo/logo-horizontal-header1.png",
          width: 1200,
          height: 630,
          alt: `${title} - ${envs.NEXT_PUBLIC_COMPANY_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: ["/images/logo/logo-horizontal-header1.png"],
    },
  };

  // Adicionar noindex se houver múltiplos filtros
  if (shouldNoindex) {
    metadata.robots = {
      index: false,
      follow: true,
    };
  }

  return metadata;
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
    parentName: string | undefined;
    parentSlug: string | undefined;
  } => {
    for (const cat of categories) {
      // Level 1 - Família
      if (cat.slug === taxonomySlug || cat.id === taxonomySlug) {
        return {
          id: Number(cat.id),
          slug: cat.slug,
          name: cat.name,
          parentName: undefined,
          parentSlug: undefined,
        };
      }
      if (cat.subcategories) {
        for (const sub of cat.subcategories) {
          // Level 2 - Grupo
          if (sub.slug === taxonomySlug || sub.id === taxonomySlug) {
            return {
              id: Number(sub.id),
              slug: sub.slug,
              name: sub.name,
              parentName: cat.name,
              parentSlug: cat.slug,
            };
          }
          // Level 3 - Subgrupo
          if (sub.children) {
            for (const child of sub.children) {
              if (child.slug === taxonomySlug || child.id === taxonomySlug) {
                return {
                  id: Number(child.id),
                  slug: child.slug,
                  name: child.name,
                  parentName: sub.name,
                  parentSlug: sub.slug,
                };
              }
            }
          }
        }
      }
    }
    return {
      id: undefined,
      slug: undefined,
      name: undefined,
      parentName: undefined,
      parentSlug: undefined,
    };
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

  // Título da página - usar nome da categoria se encontrado, senão formatar o slug
  const pageTitle = toTitleCase(
    taxonomyInfo.name ||
      slugParts[slugParts.length - 1]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
  );

  // Construir breadcrumbs com hierarquia
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...(taxonomyInfo.parentName && taxonomyInfo.parentSlug
      ? [
          {
            label: toTitleCase(taxonomyInfo.parentName),
            href: `/category/${taxonomyInfo.parentSlug}`,
          },
        ]
      : []),
    { label: pageTitle, href: `/category/${effectiveSlug}` },
  ];

  const breadcrumbJsonLdItems = breadcrumbItems.map((item) => ({
    name: item.label,
    url: item.href,
  }));

  return (
    <div className="container mx-auto px-4 py-2">
      {/* Breadcrumb JSON-LD para rich results */}
      <BreadcrumbJsonLd items={breadcrumbJsonLdItems} />
      {/* ItemList JSON-LD para rich results de listagem */}
      {products.length > 0 && (
        <ItemListJsonLd
          name={pageTitle}
          items={products.slice(0, 30).map((p, i) => ({
            name: toTitleCase(p.name),
            url: getProductPath(p.name, p.id),
            position: i + 1,
          }))}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar (Desktop) */}
        <CategorySidebar categories={categories} />

        <div className="flex-1">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} />
          {/* Header */}
          <div className="mb-2">
            <h1 className="text-xl lg:text-3xl font-bold tracking-tight py-3 lg:py-0 -mx-4 lg:mx-0 px-4 lg:px-0 text-center lg:text-left bg-primary lg:bg-transparent text-primary-foreground lg:text-foreground lg:mb-2">
              {pageTitle}
            </h1>
          </div>
          {/* Mobile Navigation */}
          <MobileCategoryNav categories={categories} />
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
