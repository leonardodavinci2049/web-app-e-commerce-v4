import { envs } from "@/core/config/envs";
import { getHighlightSectionProducts } from "../../actions";
import { ProductCardHome } from "./components/ProductCardHome";

export default async function ProductSectionHighlights() {
  const products = await getHighlightSectionProducts();

  // Transform products to match ProductCardHome props
  const displayProducts = products.map((p) => ({
    ...p,
    sku: p.sku?.toString(),
  }));

  return (
    <section id="home-produtos-destaque" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-foreground relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-primary after:rounded-full">
            {envs.HOME_SECTION_1_TITLE}
          </h2>
          <a
            href="/products"
            className="text-primary hover:underline font-medium text-sm"
          >
            Ver todos
          </a>
        </div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCardHome key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-border rounded-lg p-10 text-center">
            <p className="text-muted-foreground text-sm md:text-base">
              Nenhum produto em destaque disponível no momento.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
