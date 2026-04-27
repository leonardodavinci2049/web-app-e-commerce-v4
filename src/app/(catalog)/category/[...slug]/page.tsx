import DOMPurify from "isomorphic-dompurify";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  fetchCategoriesAction,
  fetchProductsByTaxonomyAction,
} from "@/app/actions/product";
import { PaginationNav } from "@/components/product/PaginationNav";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/seo";
import { ProductGridSkeleton } from "@/components/skeletons";
import { envs } from "@/core/config";
import { getProductPath } from "@/lib/slug";
import { toTitleCase } from "@/lib/text-utils";
import {
  getCategoryDetailsWithRelatedById,
  getCategoryDetailsWithRelatedBySlug,
  type TblTaxonomyFindById,
  type TblTaxonomyRelated,
} from "@/services/api-main/category";
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
 * Formata a slug para fallback visual quando a API não retorna nome.
 */
function formatCategoryNameFromSlug(taxonomySlug: string): string {
  return taxonomySlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeText(value: string | null | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : undefined;
}

const DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: [
    "p",
    "br",
    "strong",
    "b",
    "i",
    "em",
    "u",
    "s",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "a",
    "span",
    "div",
  ],
  ALLOWED_ATTR: ["href", "target", "rel", "class", "style"],
};

function containsHtml(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content);
}

function sanitizeCategoryNotes(notes: string): {
  content: string;
  isHtml: boolean;
} {
  const isHtml = containsHtml(notes);

  return {
    content: isHtml ? DOMPurify.sanitize(notes, DOMPURIFY_CONFIG) : notes,
    isHtml,
  };
}

function getRelatedCategoryName(
  category: TblTaxonomyRelated,
): string | undefined {
  return normalizeText(category.TAXONOMIA);
}

function getRelatedCategoryHref(category: TblTaxonomyRelated): string | null {
  const slug = normalizeText(category.SLUG);

  if (slug) {
    return `/category/${slug}`;
  }

  return null;
}

function buildRelatedCategories(
  categories: TblTaxonomyRelated[],
  currentTaxonomyId?: number,
): TblTaxonomyRelated[] {
  const seenKeys = new Set<string>();

  return categories.filter((category) => {
    if (!getRelatedCategoryName(category)) {
      return false;
    }

    if (
      currentTaxonomyId !== undefined &&
      category.ID_TAXONOMY === currentTaxonomyId
    ) {
      return false;
    }

    const key = String(
      category.ID_TAXONOMY ?? category.SLUG ?? category.TAXONOMIA,
    );

    if (seenKeys.has(key)) {
      return false;
    }

    seenKeys.add(key);
    return true;
  });
}

interface ResolvedCategoryPageData {
  detail: TblTaxonomyFindById;
  taxonomyId?: number;
  taxonomySlug: string;
  categoryName: string;
  relatedCategories: TblTaxonomyRelated[];
  categoryNotes?: string;
  categoryNotesIsHtml: boolean;
  metaTitle?: string;
  metaDescription?: string;
  parentName?: string;
  parentPath?: string;
}

async function resolveCategoryPageData(
  slugParts: string[],
): Promise<ResolvedCategoryPageData | null> {
  const taxonomySlug = slugParts[slugParts.length - 1];
  const numericTaxonomyId = Number.parseInt(taxonomySlug, 10);

  const resultBySlug = await getCategoryDetailsWithRelatedBySlug(taxonomySlug);
  const fallbackResultById =
    resultBySlug.detail || Number.isNaN(numericTaxonomyId)
      ? null
      : await getCategoryDetailsWithRelatedById(numericTaxonomyId);
  const detail = resultBySlug.detail ?? fallbackResultById?.detail ?? null;

  if (!detail || detail.INATIVO === 1) {
    return null;
  }

  const categoryName =
    normalizeText(detail.TAXONOMIA) ?? formatCategoryNameFromSlug(taxonomySlug);
  const normalizedNotes = normalizeText(detail.ANOTACOES);
  const categoryNotes = normalizedNotes
    ? sanitizeCategoryNotes(normalizedNotes)
    : undefined;
  const resolvedSlug = normalizeText(detail.SLUG) ?? taxonomySlug;
  const parentName = normalizeText(detail.PARENT_CATEGORY);
  const parentPath =
    slugParts.length > 1 && parentName
      ? `/category/${slugParts.slice(0, -1).join("/")}`
      : undefined;
  const relatedCategories = buildRelatedCategories(
    resultBySlug.detail
      ? resultBySlug.relatedCategories
      : (fallbackResultById?.relatedCategories ?? []),
    detail.ID_TAXONOMY,
  );

  return {
    detail,
    taxonomyId: detail.ID_TAXONOMY,
    taxonomySlug: resolvedSlug,
    categoryName,
    relatedCategories,
    categoryNotes: categoryNotes?.content,
    categoryNotesIsHtml: categoryNotes?.isHtml ?? false,
    metaTitle: normalizeText(detail.META_TITLE),
    metaDescription: normalizeText(detail.META_DESCRIPTION),
    parentName,
    parentPath,
  };
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slugParts = resolvedParams.slug;
  const taxonomySlug = slugParts[slugParts.length - 1];
  const page =
    typeof resolvedSearchParams.page === "string"
      ? Math.max(1, Number(resolvedSearchParams.page))
      : 1;
  const categoryData = await resolveCategoryPageData(slugParts);

  const categoryName =
    categoryData?.categoryName ?? formatCategoryNameFromSlug(taxonomySlug);
  const title = toTitleCase(categoryName);

  // Verificar se há filtros ativos
  const sortCol = typeof resolvedSearchParams.sort_col === "string";
  const sortOrd = typeof resolvedSearchParams.sort_ord === "string";
  const stockOnly = resolvedSearchParams.stock === "1";

  // Contar filtros ativos
  const filterCount = [sortCol, sortOrd, stockOnly].filter(Boolean).length;

  // Estratégia: noindex se houver 2 ou mais filtros (evitar thin content)
  const shouldNoindex = filterCount >= 2;

  const categoryUrl = `/category/${slugParts.join("/")}`;
  // Canonical aponta para si mesma (cada página paginada é canônica)
  const canonicalUrl = page > 1 ? `${categoryUrl}?page=${page}` : categoryUrl;
  const fullUrl = `${envs.NEXT_PUBLIC_BASE_URL_APP}${canonicalUrl}`;

  const pageTitle =
    categoryData?.metaTitle ??
    `${title} | Compre na ${envs.NEXT_PUBLIC_COMPANY_NAME}`;
  const pageDescription =
    categoryData?.metaDescription ??
    `Encontre os melhores ${title} na ${envs.NEXT_PUBLIC_COMPANY_NAME}. Preços imbatíveis, parcele em até ${envs.NEXT_PUBLIC_PAY_IN_UP_TO}x sem juros. Entrega para todo o Brasil!`;

  const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
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
  const page =
    typeof resolvedSearchParams.page === "string"
      ? Math.max(1, Number(resolvedSearchParams.page))
      : 1;

  const ITEMS_PER_PAGE = 30;
  const slugParts = resolvedParams.slug;

  const [categories, categoryData] = await Promise.all([
    fetchCategoriesAction(),
    resolveCategoryPageData(slugParts),
  ]);

  if (!categoryData) {
    notFound();
  }

  const effectiveSlug = categoryData.taxonomySlug;
  const taxonomyId = categoryData.taxonomyId;

  // Buscar produtos por slug ou ID (com paginação)
  const productsRaw = await fetchProductsByTaxonomyAction(
    effectiveSlug,
    taxonomyId,
    ITEMS_PER_PAGE + 1, // limit: +1 para detectar se há próxima página
    page, // page
    sortCol,
    sortOrd,
    stockOnly,
  );

  const hasNextPage = productsRaw.length > ITEMS_PER_PAGE;
  const products = hasNextPage
    ? productsRaw.slice(0, ITEMS_PER_PAGE)
    : productsRaw;

  const pageTitle = categoryData.categoryName;

  // Construir breadcrumbs com hierarquia
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...(categoryData.parentName && categoryData.parentPath
      ? [
          {
            label: categoryData.parentName,
            href: categoryData.parentPath,
          },
        ]
      : []),
    { label: pageTitle, href: `/category/${slugParts.join("/")}` },
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
            position: (page - 1) * ITEMS_PER_PAGE + i + 1,
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
            {categoryData.categoryNotes ? (
              categoryData.categoryNotesIsHtml ? (
                <div
                  className="prose prose-sm max-w-none text-muted-foreground mt-3 dark:prose-invert"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML is sanitized on the server via DOMPurify
                  dangerouslySetInnerHTML={{
                    __html: categoryData.categoryNotes,
                  }}
                />
              ) : (
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed mt-3">
                  {categoryData.categoryNotes}
                </p>
              )
            ) : null}
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
          {/* Pagination Nav for crawlability */}
          <PaginationNav
            currentPage={page}
            hasNextPage={hasNextPage}
            basePath={`/category/${slugParts.join("/")}`}
            params={{
              ...(sortCol !== undefined && {
                sort_col: String(sortCol),
              }),
              ...(sortOrd !== undefined && {
                sort_ord: String(sortOrd),
              }),
              ...(stockOnly && { stock: "1" }),
            }}
          />
          <RelatedCategoriesSection
            categories={categoryData.relatedCategories}
          />
        </div>
      </div>
    </div>
  );
}

function RelatedCategoriesSection({
  categories,
}: {
  categories: TblTaxonomyRelated[];
}) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 border-t border-border pt-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Categorias relacionadas
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => {
          const name = getRelatedCategoryName(category);

          if (!name) {
            return null;
          }

          const href = getRelatedCategoryHref(category);
          const key = String(category.ID_TAXONOMY ?? category.SLUG ?? name);
          const cardClassName =
            "flex min-h-20 items-center rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground";

          if (href) {
            return (
              <Link key={key} href={href} className={cardClassName}>
                {name}
              </Link>
            );
          }

          return (
            <div key={key} className={cardClassName}>
              {name}
            </div>
          );
        })}
      </div>
    </section>
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
