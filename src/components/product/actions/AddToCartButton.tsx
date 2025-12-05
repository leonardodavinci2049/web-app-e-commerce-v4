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
  disabled?: boolean;
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
  disabled = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (disabled) return;
    setIsAdding(true);

    addItem({
      id: `${productId}-${Date.now()}`,
      productId,
      name: productName,
      price,
      image,
      category,
    });

    toast.success(`${productName} adicionado ao carrinho!`, {
      duration: 1000,
    });

    setIsAdding(false);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isAdding || disabled}
      className={`w-full py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
        disabled
          ? "bg-muted text-muted-foreground cursor-not-allowed"
          : "bg-primary text-primary-foreground hover:bg-primary/90"
      }`}
      aria-label={
        disabled
          ? `Produto ${productName} indisponível`
          : `Adicionar ${productName} ao carrinho`
      }
    >
      <ShoppingCart className="w-4 h-4" />
      {isAdding ? "Adicionando..." : disabled ? "Indisponível" : "Adicionar"}
    </button>
  );
}
