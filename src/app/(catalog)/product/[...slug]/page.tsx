import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductDetailSkeleton } from "@/components/skeletons";
import { envs } from "@/core/config";
import { generateSlug } from "@/lib/slug";
import { toTitleCase } from "@/lib/text-utils";
import { ProductDetailContainer } from "../_components/ProductDetailContainer";
import { getProductData } from "./get-product-data";

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
  const data = await getProductData(slug.join("/"));
  const product = data?.product;

  // Fallback se o produto não for encontrado
  if (!product) {
    return {
      title: `Produto não encontrado | ${envs.NEXT_PUBLIC_COMPANY_NAME}`,
      description: `O produto solicitado não foi encontrado em nossa loja.`,
    };
  }

  // Construir título otimizado para SEO
  const productName = toTitleCase(product.name);
  const brandSuffix = product.brand ? ` ${product.brand}` : "";
  const fallbackTitle = `${productName}${brandSuffix} | Compre na ${envs.NEXT_PUBLIC_COMPANY_NAME}`;
  const pageTitle = product.metaTitle?.trim() || fallbackTitle;

  // Descrição otimizada (≤160 chars para melhor exibição no Google)
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  const apiMetaDescription = product.metaDescription?.trim();
  const fallbackDescription =
    product.description ||
    `${productName} por ${formattedPrice}. Compre na ${envs.NEXT_PUBLIC_COMPANY_NAME}. Parcele em até ${envs.NEXT_PUBLIC_PAY_IN_UP_TO}x. Frete grátis acima de R$ ${envs.NEXT_PUBLIC_FREE_SHIPPING_OVER}.`;
  const metaDescription =
    apiMetaDescription && apiMetaDescription.length > 0
      ? apiMetaDescription
      : truncateText(fallbackDescription, 157);

  // URL canônica do produto (sem parâmetros)
  const productSlug = generateSlug(product.name, product.id);
  const canonicalUrl = `${envs.NEXT_PUBLIC_BASE_URL_APP}/product/${productSlug}`;

  // Preço formatado para exibição
  // (já calculado acima para descrição)

  // Open Graph sem truncamento para preservar o texto completo da API
  const ogDescription =
    apiMetaDescription ||
    product.description ||
    `${productName} por apenas ${formattedPrice}. Compre agora na ${envs.NEXT_PUBLIC_COMPANY_NAME}!`;

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
              alt: productName,
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
