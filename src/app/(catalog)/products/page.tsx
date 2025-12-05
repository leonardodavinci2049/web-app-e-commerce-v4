import { Suspense } from "react";
import { ProductsContent } from "./_components/ProductsContent";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
