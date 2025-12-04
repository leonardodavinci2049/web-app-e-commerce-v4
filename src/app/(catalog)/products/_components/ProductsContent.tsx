import { ProductListingContainer } from "./ProductListingContainer";

interface ProductsContentProps {
  searchParams: Promise<{ q?: string }>;
}

export async function ProductsContent({ searchParams }: ProductsContentProps) {
  const params = await searchParams;
  const searchTerm = params.q ? decodeURIComponent(params.q) : undefined;

  // Sanitize search term for display (prevent XSS)
  const sanitizedSearchTerm = searchTerm
    ? searchTerm.replace(/[<>]/g, "")
    : undefined;

  const pageTitle = sanitizedSearchTerm
    ? `Resultados para "${sanitizedSearchTerm}"`
    : "Nossos Produtos";

  return (
    <>
      {/* Título */}
      <section className="bg-background py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {pageTitle}
          </h1>
        </div>
      </section>

      <ProductListingContainer searchTerm={searchTerm} />
    </>
  );
}
