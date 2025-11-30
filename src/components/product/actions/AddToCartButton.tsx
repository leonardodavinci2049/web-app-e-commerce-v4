"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
}

/**
 * Minimal client component for cart interaction
 * Isolated from server-rendered ProductCard for cache optimization
 */
export function AddToCartButton({
  productId,
  productName,
  price,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);

    // TODO: Integrate with cart store/context when available
    // For now, simulate adding to cart
    await new Promise((resolve) => setTimeout(resolve, 300));

    console.log("Added to cart:", { productId, productName, price });

    setIsAdding(false);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isAdding}
      className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
    >
      <ShoppingCart className="w-4 h-4" />
      {isAdding ? "Adicionando..." : "Comprar"}
    </button>
  );
}
