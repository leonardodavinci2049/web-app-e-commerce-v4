import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  title: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    isNew?: boolean;
    discount?: number;
    category: string;
  }>;
}

export function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-foreground relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-1 after:bg-primary after:rounded-full">
            {title}
          </h2>
          <a
            href="#"
            className="text-primary hover:underline font-medium text-sm"
          >
            Ver todos
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
