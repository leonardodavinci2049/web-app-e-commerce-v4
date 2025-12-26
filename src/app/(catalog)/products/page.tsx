import type { Metadata } from "next";
import { Suspense } from "react";
import { envs } from "@/core/config";
import { ProductsContent } from "./_components/ProductsContent";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const searchTerm =
    typeof params.q === "string" ? decodeURIComponent(params.q) : undefined;
  const sortCol = typeof params.sort_col === "string";
  const sortOrd = typeof params.sort_ord === "string";
  const stockOnly = params.stock === "1";

  // Contar quantos filtros estão ativos (exceto busca)
  const filterCount = [sortCol, sortOrd, stockOnly].filter(Boolean).length;

  // Estratégia de indexação:
  // - Página base sem filtros: indexar normalmente
  // - Página com busca (q=): indexar com canonical para /products
  // - Página com 2+ filtros: noindex (evitar thin content)
  const shouldNoindex = filterCount >= 2;

  // Canonical sempre aponta para URL limpa
  const canonicalUrl = "/products";

  // Título dinâmico baseado na busca
  const title = searchTerm
    ? `Busca: ${searchTerm} | ${envs.NEXT_PUBLIC_COMPANY_NAME}`
    : `Todos os Produtos | ${envs.NEXT_PUBLIC_COMPANY_NAME}`;

  const description = searchTerm
    ? `Encontre ${searchTerm} com os melhores preços. Parcele em até ${envs.NEXT_PUBLIC_PAY_IN_UP_TO}x sem juros!`
    : `Confira todos os produtos de ${envs.NEXT_PUBLIC_COMPANY_NAME}. Informática, Eletrônicos e Perfumes Importados com os melhores preços!`;

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: `${envs.NEXT_PUBLIC_BASE_URL_APP}${canonicalUrl}`,
      siteName: envs.NEXT_PUBLIC_COMPANY_NAME,
      title,
      description,
      images: [
        {
          url: "/images/logo/logo-horizontal-header1.png",
          width: 1200,
          height: 630,
          alt: `${envs.NEXT_PUBLIC_COMPANY_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <main className="grow">
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-12 text-center">
              <p className="text-muted-foreground">Carregando produtos...</p>
            </div>
          }
        >
          <ProductsContent searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
