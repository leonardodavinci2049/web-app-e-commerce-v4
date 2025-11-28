import Image from "next/image";
import { ProductCard } from "./ProductCard";

interface SpecificCategoryProps {
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

export function SpecificCategory({ title, products }: SpecificCategoryProps) {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <div className="h-px bg-border grow"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Banner */}
          <div className="hidden lg:block lg:col-span-1 relative rounded-xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=500"
              alt="Gamer"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-3xl font-bold mb-2">Mundo Gamer</h3>
              <p className="mb-4 text-gray-200">
                Setup completo para sua vitória
              </p>
              <button
                type="button"
                className="text-accent font-bold hover:underline"
              >
                Ver tudo &rarr;
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
