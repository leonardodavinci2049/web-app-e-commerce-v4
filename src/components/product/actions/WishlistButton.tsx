"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

interface WishlistButtonProps {
  productId: string;
}

/**
 * Minimal client component for wishlist toggle
 * Isolated from server-rendered ProductCard for cache optimization
 */
export function WishlistButton({ productId }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleWishlist = async () => {
    setIsLoading(true);

    // TODO: Integrate with wishlist store/API when available
    await new Promise((resolve) => setTimeout(resolve, 200));

    setIsWishlisted((prev) => !prev);
    console.log(
      isWishlisted ? "Removed from wishlist:" : "Added to wishlist:",
      productId,
    );

    setIsLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleToggleWishlist}
      disabled={isLoading}
      className={`p-2 bg-white/80 rounded-full transition-all hover:bg-white ${
        isWishlisted ? "text-red-500" : "hover:text-red-500"
      } disabled:opacity-50`}
      aria-label={
        isWishlisted ? "Remover dos favoritos" : "Adicionar aos favoritos"
      }
    >
      <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
    </button>
  );
}
