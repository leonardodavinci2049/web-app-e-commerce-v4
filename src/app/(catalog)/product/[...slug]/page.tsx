import { Suspense } from "react";
import { ProductDetailContainer } from "../_components/ProductDetailContainer";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return (
    <div className="min-h-screen bg-background font-sans pb-12">
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-muted-foreground">Carregando produto...</p>
          </div>
        }
      >
        <ProductDetailContainer params={params} />
      </Suspense>
    </div>
  );
}
