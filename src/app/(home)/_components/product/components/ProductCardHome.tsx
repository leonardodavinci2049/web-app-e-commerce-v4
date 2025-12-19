import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/product/actions/AddToCartButton";
import { WishlistButton } from "@/components/product/actions/WishlistButton";
import { ProductRating } from "@/components/product/ProductRating";
import { envs } from "@/core/config";
import { getProductPath } from "@/lib/slug";

interface ProductCardProps {
  product: {
    id: string;
    sku?: string;
    name: string;
    price: number;
    image: string;
    isNew?: boolean;
    discount?: number;
    category: string;
    brand?: string;
    inStock?: boolean;
  };
}

/**
 * Server Component - renders all static content
 * Client Components (AddToCartButton, WishlistButton) are imported as islands
 * for interactive functionality while keeping the card cacheable
 */
export function ProductCardHome({ product }: ProductCardProps) {
  const productUrl = getProductPath(product.name, product.id);
  const maxInstallments = envs.NEXT_PUBLIC_PAY_IN_UP_TO;

  const originalPrice = product.price;
  const finalPrice = product.discount
    ? originalPrice * (1 - product.discount / 100)
    : originalPrice;

  // Stock logic
  const isOutOfStock = product.inStock === false;

  return (
    <div className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isNew && (
          <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            NOVO
          </span>
        )}
        {product.discount && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button - Client Island */}
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <WishlistButton productId={product.id} />
      </div>

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
            className={`object-contain transition-transform duration-500 ${
              isOutOfStock ? "grayscale opacity-70" : "group-hover:scale-110"
            }`}
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        <div className="mb-2">
          <Link
            href={productUrl}
            className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors text-sm mb-1"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Product Rating */}
          <ProductRating productId={product.id} className="mb-1" />

          {/* Brand and SKU below name */}
          <div className="flex flex-col gap-0.5">
            {product.brand && !product.brand.toLowerCase().includes("none") && (
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                {product.brand}
              </p>
            )}
            {product.sku && (
              <p className="text-[10px] text-muted-foreground">
                SKU: {product.sku}
              </p>
            )}
          </div>
        </div>

        <div className="mt-auto pt-2 border-t border-border/50">
          <div className="flex flex-col mb-3">
            {product.discount && (
              <span className="text-xs text-muted-foreground line-through">
                De:{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(originalPrice)}
              </span>
            )}
            <span className="text-lg font-bold text-primary">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(finalPrice)}
            </span>
            <span className="text-[10px] text-muted-foreground">
              À vista no Pix ou em até {maxInstallments}x no Cartão
            </span>
          </div>

          {/* Add to Cart Button - Client Island */}
          <AddToCartButton
            productId={product.id}
            productName={product.name}
            price={finalPrice}
            image={product.image}
            category={product.category}
            disabled={isOutOfStock}
          />
        </div>
      </div>
    </div>
  );
}
