"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  image?: string;
  category?: string;
}

/**
 * Minimal client component for cart interaction
 * Isolated from server-rendered ProductCard for cache optimization
 */
export function AddToCartButton({
  productId,
  productName,
  price,
  image = "/images/product/no-image.jpeg",
  category = "Geral",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);

    addItem({
      id: `${productId}-${Date.now()}`,
      productId,
      name: productName,
      price,
      image,
      category,
    });

    toast.success(`${productName} adicionado ao carrinho!`);

    setIsAdding(false);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isAdding}
      className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      aria-label={`Adicionar ${productName} ao carrinho`}
    >
      <ShoppingCart className="w-4 h-4" />
      {isAdding ? "Adicionando..." : "Adicionar"}
    </button>
  );
}
