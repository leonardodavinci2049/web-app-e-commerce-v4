import type { Metadata } from "next";
import { Suspense } from "react";
import {
  fetchProductBySlugAction,
  fetchProductsAction,
} from "@/app/actions/product";
import { ProductDetailSkeleton } from "@/components/skeletons";
import { envs } from "@/core/config";
import { generateSlug } from "@/lib/slug";
import { ProductDetailContainer } from "../_components/ProductDetailContainer";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

/**
 * Trunca texto para um limite máximo de caracteres
 * Corta no último espaço antes do limite para não quebrar palavras
 */
function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  return lastSpace > 0
    ? `${truncated.slice(0, lastSpace)}...`
    : `${truncated}...`;
}

/**
 * Gera metadados dinâmicos para a página de produto
 * Inclui title, description, Open Graph, Twitter Cards e canonical URL
 */
export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlugAction(slug);

  // Fallback se o produto não for encontrado
  if (!product) {
    return {
      title: `Produto não encontrado | ${envs.NEXT_PUBLIC_COMPANY_NAME}`,
      description: `O produto solicitado não foi encontrado em nossa loja.`,
    };
  }

  // Construir título otimizado para SEO
  const brandSuffix = product.brand ? ` ${product.brand}` : "";
  const pageTitle = `${product.name}${brandSuffix} | ${envs.NEXT_PUBLIC_COMPANY_NAME}`;

  // Descrição otimizada (≤160 chars para melhor exibição no Google)
  const rawDescription =
    product.description ||
    `Compre ${product.name} na ${envs.NEXT_PUBLIC_COMPANY_NAME}. Confira preços e condições especiais.`;
  const metaDescription = truncateText(rawDescription, 157);

  // URL canônica do produto (sem parâmetros)
  const productSlug = generateSlug(product.name, product.id);
  const canonicalUrl = `${envs.NEXT_PUBLIC_BASE_URL_APP}/product/${productSlug}`;

  // Preço formatado para exibição
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  // Descrição para Open Graph (pode ser um pouco mais longa)
  const ogDescription = truncateText(
    product.description ||
      `${product.name} por apenas ${formattedPrice}. Compre agora na ${envs.NEXT_PUBLIC_COMPANY_NAME}!`,
    200,
  );

  return {
    title: pageTitle,
    description: metaDescription,

    // Canonical URL para evitar conteúdo duplicado
    alternates: {
      canonical: canonicalUrl,
    },

    // Open Graph para compartilhamentos no Facebook, LinkedIn, etc.
    openGraph: {
      title: pageTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: envs.NEXT_PUBLIC_COMPANY_NAME,
      images: product.image
        ? [
            {
              url: product.image,
              width: 800,
              height: 800,
              alt: product.name,
            },
          ]
        : [],
      locale: "pt_BR",
      type: "website",
    },

    // Twitter Card para compartilhamentos no Twitter/X
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: metaDescription,
      images: product.image ? [product.image] : [],
    },

    // Robots - garantir indexação
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Generate static params for all product pages
 * Pre-renders product detail pages at build time for cache warming
 * Returns empty array if API is unavailable (pages will be generated on-demand)
 */
export async function generateStaticParams() {
  try {
    const products = await fetchProductsAction();

    // If no products, return empty array - pages will be generated on-demand
    if (!products || products.length === 0) {
      return [];
    }

    return products.map((product) => ({
      slug: [generateSlug(product.name, product.id)],
    }));
  } catch (_error) {
    // Return empty array on error - pages will be generated on-demand at runtime
    console.warn(
      "[generateStaticParams] Skipping pre-render - API unavailable during build",
    );
    return [];
  }
}

/**
 * Product detail page with Suspense boundary
 * Uses ProductDetailSkeleton as fallback for better UX
 */
export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return (
    <div className="min-h-screen bg-background font-sans pb-12">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailContainer params={params} />
      </Suspense>
    </div>
  );
}
