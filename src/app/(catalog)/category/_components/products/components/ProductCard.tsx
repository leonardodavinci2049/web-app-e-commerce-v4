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
    category?: string;
    brand?: string;
    inStock?: boolean;
  };
}

/**
 * Server Component - renders all static content
 * Client Components (AddToCartButton, WishlistButton) are imported as islands
 * for interactive functionality while keeping the card cacheable
 */
export function ProductCard({
  product,
  variant = "grid",
}: ProductCardProps & { variant?: "grid" | "list" }) {
  const productUrl = getProductPath(product.name, product.id);
  const maxInstallments = envs.NEXT_PUBLIC_PAY_IN_UP_TO;

  // Logic check:
  // PRODUTO WEB FIND returns VL_VAREJO. transformer maps it to price.
  // if PROMOCAO, transformer calculates discount.
  // So price is likely the FINAL price if no discount, or the discounted price?
  // Let's re-read transformer.
  // price: parsePrice(item.VL_VAREJO)
  // discount: if DECONTO > 0.
  // Usually if discount exists, VL_VAREJO is already the discounted price? Or is DECONTO applied on top?
  // User prompt said: "O valor do desconto caso maior que zero, está ma propriedade """DECONTO""" do objeto produto. é um valor percentual que deve ser aplicado ao valor original do produto na propriedade """VL_VAREJO"""."
  // Wait. "aplicado ao valor original".
  // If DECONTO is percentage, say 10%. VL_VAREJO is 100.
  // If "deve ser aplicado", it means VL_VAREJO is the ORIGINAL price.
  // So Sale Price = VL_VAREJO * (1 - DECONTO/100).
  // Current code in ProductCard has:
  // price -> rendered as main price.
  // discount logic in current code:
  // price * (1 + discount / 100) -> shown as line-through.
  // This implies current `price` is the LOWER (discounted) price, and we calculate the ORIGINAL (higher) price by adding propertion back?
  // Or is it `price` (original) and `price * (1-discount)` (final)?
  // Let's look at existing code again.
  // Existing:
  // <span className="text-lg font-bold text-primary">{format(product.price)}</span>
  // {product.discount && <span line-through>{format(product.price * (1 + product.discount / 100))}</span>}
  // This implies `product.price` IS the discounted price. And the "original" was higher.
  // BUT the prompt says: "DECONTO ... é um valor percentual que deve ser aplicado ao valor original ... VL_VAREJO".
  // If VL_VAREJO is the original price, and DECONTO is applied to it.
  // Then `price` (mapped from VL_VAREJO) should be the ORIGINAL price.
  // And the calculated price should be `price * (1 - discount/100)`.
  //
  // However, the EXISTING code seems to treat `product.price` as the FINAL price.
  // If I change this interpretation I might break things if the current mapping logic was different.
  // Let's check `transformers.ts` again.
  // price: parsePrice(item.VL_VAREJO)
  // discount: parsePrice(item.DECONTO) if > 0.
  //
  // If the prompt says "apply discount TO VL_VAREJO", then VL_VAREJO is the base.
  // So `product.price` (VL_VAREJO) is the "De: R$ 100".
  // And "Por: R$ 90" would be `product.price * (1 - product.discount / 100)`.
  //
  // Let's assume the PROMPT is correct and overrides existing logic if they conflict.
  // Prompt: "O valor do desconto ... deve ser aplicado ao valor original do produto na propriedade VL_VAREJO".
  // So `price` (VL_VAREJO) is ORIGINAL.
  // We need to calculate FINAL price.
  //
  // Wait, if `price` is original, then the existing code:
  // `product.price * (1 + product.discount / 100)` would be even higher. That makes no sense if `price` was already high.
  // The existing code SUGGESTS `price` is the LOW price.
  //
  // Maybe I should stick to the prompt's instruction.
  // "caso não exista desconto exibir apenas o valor normal de venda da propriedade VL_VAREJO".
  //
  // Let's implement:
  // const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;
  // const originalPrice = product.price;
  //
  // WAIT. Is DECONTO a percentage (10) or text? Transformer parses it as number.
  // Prompt says "é um valor percentual".
  //
  // So:
  // If discount exists:
  //   Show `originalPrice` (VL_VAREJO) as "De: ..." (line-through)
  //   Show `finalPrice` (VL_VAREJO * (1 - discount/100)) as "Por: ..."
  //
  // Installments should be calculated on the FINAL price.
  // const installmentValue = finalPrice / maxInstallments;
  //
  // Let's verify this logic.
  // If VL_VAREJO = 100, DECONTO = 10.
  // Final = 90.
  // Installments = 90 / 12 = 7.5.
  // text: "Em até 12x de R$ 7,50 sem juros"
  //
  // This seems robust. I will use this.

  const originalPrice = product.price;
  const finalPrice = product.discount
    ? originalPrice * (1 - product.discount / 100)
    : originalPrice;

  const installmentValue = finalPrice / maxInstallments;

  // Stock logic
  const isOutOfStock = product.inStock === false;

  if (variant === "list") {
    return (
      <div className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-row h-full">
        {/* Badges */}
        <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 z-10 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-blue-500 text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              NOVO
            </span>
          )}
          {product.discount && (
            <span className="bg-red-500 text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Image */}
        <Link
          href={productUrl}
          className="relative w-28 min-w-28 md:w-48 md:min-w-48 bg-white p-2 md:p-4 block shrink-0"
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
        <div className="p-2 md:p-4 flex flex-col grow justify-between">
          <div>
            <div className="flex justify-between items-start mb-1">
              <Link
                href={productUrl}
                className="font-medium text-foreground text-sm md:text-lg mb-1 block hover:text-primary transition-colors line-clamp-2 md:line-clamp-none"
                title={product.name}
              >
                {product.name}
              </Link>
              {/* Wishlist Button - Client Island */}
              <div className="z-10 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0 hidden md:block">
                <WishlistButton productId={product.id} />
              </div>
            </div>

            {/* Product Rating */}
            <ProductRating productId={product.id} className="mb-1" />

            <div className="flex flex-col gap-0.5">
              {product.brand &&
                !product.brand.toLowerCase().includes("none") && (
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                    {product.brand}
                  </span>
                )}
              {product.sku && (
                <p className="text-[10px] text-muted-foreground">
                  SKU: {product.sku}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mt-2">
            <div className="flex flex-col">
              {product.discount && (
                <span className="text-[10px] md:text-xs text-muted-foreground line-through">
                  De:{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(originalPrice)}
                </span>
              )}
              <div className="flex flex-col">
                <span className="text-base md:text-xl font-bold text-primary">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(finalPrice)}
                </span>
                <span className="text-[9px] md:text-[10px] text-muted-foreground">
                  Em até {maxInstallments}x no Cartão
                </span>
              </div>
            </div>

            {/* Add to Cart Button - Client Island */}
            <div className="w-full sm:w-auto sm:min-w-[140px] shrink-0">
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
      </div>
    );
  }

  return (
    <div className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 z-10 flex flex-col gap-1">
        {product.isNew && (
          <span className="bg-blue-500 text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            NOVO
          </span>
        )}
        {product.discount && (
          <span className="bg-red-500 text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
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
        className="relative aspect-square overflow-hidden bg-white p-3 md:p-4 block"
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
      <div className="p-3 md:p-4 flex flex-col grow">
        <div className="mb-2">
          <Link
            href={productUrl}
            className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors text-xs md:text-sm mb-1"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Product Rating */}
          <ProductRating productId={product.id} className="mb-1" />

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
              <span className="text-[10px] md:text-xs text-muted-foreground line-through">
                De:{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(originalPrice)}
              </span>
            )}
            <span className="text-base md:text-lg font-bold text-primary">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(finalPrice)}
            </span>
            <span className="text-[9px] md:text-[10px] text-muted-foreground">
                Em até {maxInstallments}x no Cartão
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
