import DOMPurify from "isomorphic-dompurify";
import dynamic from "next/dynamic";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { BreadcrumbJsonLd } from "@/components/seo";
import { ProductGridSkeleton } from "@/components/skeletons";
import { generateSlug } from "@/lib/slug";
import { toTitleCase } from "@/lib/text-utils";
import {
  getCategoriesData,
  getProductData,
} from "../[...slug]/get-product-data";
import { BackButton } from "./BackButton";
import { ProductGalleryWrapper } from "./imagegallery/ProductGalleryWrapper";
import { ProductInfo } from "./ProductInfo";
import { ProductJsonLd } from "./ProductJsonLd";
import { RelatedProducts } from "./RelatedProducts";

// Lazy-load ProductTabs — below the fold on mobile, deferring its JS reduces
// initial bundle size and frees up CPU/bandwidth for the LCP image.
const ProductTabs = dynamic(
  () => import("./ProductTabs").then((m) => ({ default: m.ProductTabs })),
  {
    loading: () => (
      <div className="h-48 bg-muted/30 animate-pulse rounded-lg" />
    ),
  },
);

interface ProductDetailContainerProps {
  params: Promise<{
    slug: string[];
  }>;
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
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
  ],
  ALLOWED_ATTR: ["href", "target", "rel", "class", "style"],
};

function containsHtml(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content);
}

function sanitizeDescription(description: string): {
  sanitizedHtml: string;
  isHtml: boolean;
} {
  const isHtml = containsHtml(description);
  return {
    sanitizedHtml: isHtml
      ? DOMPurify.sanitize(description, DOMPURIFY_CONFIG)
      : description,
    isHtml,
  };
}

// Skeleton for gallery section with optional placeholder image.
// Keeps one temporary thumbnail to preserve gallery layout while
// API thumbnails are loading.
function GallerySkeleton({ placeholderImage }: { placeholderImage?: string }) {
  const imageSrc = placeholderImage || "/images/product/no-image.jpeg";

  return (
    <div className="flex flex-row gap-2 md:gap-4">
      <div className="flex flex-col gap-2 w-16 md:w-20 shrink-0 h-75 md:h-125 overflow-y-auto no-scrollbar scroll-smooth">
        <div className="relative aspect-square bg-white rounded-lg border-2 border-primary overflow-hidden shrink-0">
          <Image
            src={imageSrc}
            alt="Carregando miniatura"
            fill
            sizes="80px"
            className="object-contain p-1"
            unoptimized
          />
        </div>
      </div>

      <div className="relative flex-1 aspect-square bg-white rounded-lg border border-border overflow-hidden">
        <Image
          src={imageSrc}
          alt="Carregando..."
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain p-4 md:p-8"
          loading="eager"
          unoptimized
        />
      </div>
    </div>
  );
}

// Skeleton for product info section
function InfoSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-4 bg-muted rounded w-24" />
      <div className="h-8 bg-muted rounded w-3/4" />
      <div className="h-10 bg-muted rounded w-32" />
      <div className="h-12 bg-muted rounded w-full" />
      <div className="h-12 bg-muted rounded w-full" />
    </div>
  );
}

export async function ProductDetailContainer({
  params,
}: ProductDetailContainerProps) {
  const { slug } = await params;
  const slugKey = slug.join("/");

  const [productData, categories] = await Promise.all([
    getProductData(slugKey),
    getCategoriesData(),
  ]);

  if (!productData) {
    notFound();
  }

  const { product, relatedProducts } = productData;

  // Redirect to canonical slug if the URL text doesn't match
  const canonicalSlug = generateSlug(product.name, product.id);
  const currentSlug = slug.join("/");
  if (currentSlug !== canonicalSlug) {
    redirect(`/product/${canonicalSlug}`);
  }

  // resolve nomes de categoria / subcategoria a partir dos IDs
  const getCategoryName = (categoryId?: string) =>
    categories.find((c) => c.id === categoryId)?.name || "—";

  const getSubcategoryName = (categoryId?: string, subId?: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat?.subcategories) return "—";
    return (
      cat.subcategories.find(
        (s) =>
          s.id === `${categoryId}-${subId}` ||
          s.id.split("-")[1] === String(subId),
      )?.name || "—"
    );
  };

  // adiciona campos category/subcategory com nomes para compatibilidade
  const productWithNames = {
    ...product,
    category: getCategoryName(product.categoryId),
    subcategory: getSubcategoryName(product.categoryId, product.subcategoryId),
  };

  const relatedWithNames = relatedProducts.map((p) => ({
    ...p,
    category: getCategoryName(p.categoryId),
    subcategory: getSubcategoryName(p.categoryId, p.subcategoryId),
  }));

  // Dados padrão para especificações e entrega
  const defaultSpecifications: Record<string, string> = {
    Marca: product.brand || "Genérica",
    Categoria: getCategoryName(product.categoryId),
    Subcategoria: getSubcategoryName(product.categoryId, product.subcategoryId),
    Condição: product.isNew ? "Novo" : "Usado",
  };

  // Converte especificações do produto para Record<string, string>
  const productSpecifications: Record<string, string> = product.specifications
    ? Object.fromEntries(
        Object.entries(product.specifications)
          .filter(([, v]) => v !== null && v !== undefined)
          .map(([k, v]) => [k, String(v)]),
      )
    : defaultSpecifications;

  const defaultShipping = {
    freeShippingMinValue: 199.9,
    estimatedDays: "3 a 7 dias úteis",
    returnDays: 7,
  };

  // Converte shipping do produto para o formato esperado
  const productShipping = product.shipping
    ? {
        freeShippingMinValue:
          Number(product.shipping.freeShippingMinValue) || 199.9,
        estimatedDays:
          String(product.shipping.estimatedDays) || "3 a 7 dias úteis",
        returnDays: Number(product.shipping.returnDays) || 7,
      }
    : defaultShipping;

  // Sanitize description on the server to keep DOMPurify out of the client bundle
  const descriptionData = sanitizeDescription(
    product.description || "Sem descrição disponível.",
  );

  return (
    <div className="container mx-auto px-4 py-2 lg:py-8">
      {/* JSON-LD Structured Data para SEO */}
      <ProductJsonLd
        product={{
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          inStock: product.inStock,
          brand: product.brand,
          sku: product.sku,
          isNew: product.isNew,
          category: productWithNames.category,
          subcategory: productWithNames.subcategory,
          gtin: product.ean || undefined,
        }}
      />
      {/* Breadcrumb JSON-LD para rich results */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Produtos", url: "/products" },
          ...(product.taxonomy?.map((t) => ({
            name: toTitleCase(t.name),
            url: t.slug ? `/category/${t.slug}` : "/products",
          })) ?? []),
          {
            name: toTitleCase(product.name),
            url: `/product/${generateSlug(product.name, product.id)}`,
          },
        ]}
      />
      {/* Breadcrumb */}
      <nav className="hidden md:flex items-center text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap">
        <a href="/" className="hover:text-primary transition-colors">
          Home
        </a>
        <span className="mx-2">/</span>
        <a href="/products" className="hover:text-primary transition-colors">
          Produtos
        </a>
        {product.taxonomy?.map((t) => (
          <span key={t.id} className="contents">
            <span className="mx-2">/</span>
            {t.slug ? (
              <a
                href={`/category/${t.slug}`}
                className="hover:text-primary transition-colors"
              >
                {toTitleCase(t.name)}
              </a>
            ) : (
              <span>{toTitleCase(t.name)}</span>
            )}
          </span>
        ))}
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">
          {toTitleCase(product.name)}
        </span>
      </nav>
      <div className="flex items-start lg:hidden mb-4">
        <BackButton />
        <h1 className="text-xl lg:text-3xl font-bold text-foreground flex-1 pt-0.5">
          {toTitleCase(product.name)}
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 mb-16">
        {/* Galeria de Imagens with Streaming - Progressive loading with placeholder */}
        <Suspense
          fallback={<GallerySkeleton placeholderImage={product.image} />}
        >
          <ProductGalleryWrapper
            productId={product.id}
            fallbackImage={product.image}
            productName={product.name}
          />
        </Suspense>

        {/* Informações do Produto with Suspense */}
        <Suspense fallback={<InfoSkeleton />}>
          <ProductInfo product={productWithNames} />
        </Suspense>
      </div>
      {/* Tabs de Informações */}
      <div className="mb-16">
        <ProductTabs
          description={descriptionData.sanitizedHtml}
          isHtmlContent={descriptionData.isHtml}
          specifications={productSpecifications}
          shipping={productShipping}
        />
      </div>
      {/* Produtos Relacionados — deferred rendering via content-visibility */}
      <div
        style={{ contentVisibility: "auto", containIntrinsicSize: "0 500px" }}
      >
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <RelatedProducts products={relatedWithNames} />
        </Suspense>
      </div>
      {/* Breadcrumb mobile — abaixo dos produtos relacionados */}
      {product.taxonomy && product.taxonomy.length > 0 && (
        <nav className="flex md:hidden flex-wrap items-center text-xs text-muted-foreground mt-8 gap-y-1">
          <a href="/" className="hover:text-primary transition-colors">
            Home
          </a>
          <span className="mx-1.5">/</span>
          <a href="/products" className="hover:text-primary transition-colors">
            Produtos
          </a>
          {product.taxonomy.map((t) => (
            <span key={t.id} className="contents">
              <span className="mx-1.5">/</span>
              {t.slug ? (
                <a
                  href={`/category/${t.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {toTitleCase(t.name)}
                </a>
              ) : (
                <span>{toTitleCase(t.name)}</span>
              )}
            </span>
          ))}
        </nav>
      )}
    </div>
  );
}
