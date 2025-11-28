import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProductPath } from "@/lib/slug";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    isNew?: boolean;
    discount?: number;
    category: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const productUrl = getProductPath(product.name, product.id);

  return (
    <div className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isNew && (
          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            NOVO
          </span>
        )}
        {product.discount && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        className="absolute top-2 right-2 z-10 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-red-500"
      >
        <Heart className="w-5 h-5" />
      </button>

      {/* Image */}
      <Link
        href={productUrl}
        className="relative aspect-square overflow-hidden bg-white p-4 block"
      >
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <Link
          href={productUrl}
          className="font-medium text-foreground line-clamp-2 mb-2 grow hover:text-primary transition-colors"
          title={product.name}
        >
          {product.name}
        </Link>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-lg font-bold text-primary">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </span>
            {product.discount && (
              <span className="text-sm text-muted-foreground line-through">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price * (1 + product.discount / 100))}
              </span>
            )}
          </div>

          <button
            type="button"
            className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
