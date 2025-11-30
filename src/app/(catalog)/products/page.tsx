import { Suspense } from "react";

import { ProductListingContainer } from "./_components/ProductListingContainer";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <main className="grow">
        {/* Título */}
        <section className="bg-background py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Nossos Produtos
            </h1>
          </div>
        </section>

        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-12 text-center">
              <p className="text-muted-foreground">Carregando produtos...</p>
            </div>
          }
        >
          <ProductListingContainer />
        </Suspense>
      </main>
    </div>
  );
}
