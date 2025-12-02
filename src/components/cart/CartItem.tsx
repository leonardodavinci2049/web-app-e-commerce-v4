"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { memo } from "react";
import { useCart } from "@/hooks/useCart";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleDecrement = () => {
    if (item.quantity === 1) {
      removeItem(item.productId);
    } else {
      updateQuantity(item.productId, item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    updateQuantity(item.productId, item.quantity + 1);
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="flex gap-3 py-4 border-b border-border">
      <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
        <Image
          src={item.image || "/public/images/product/no-image.jpeg"}
          alt={item.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground line-clamp-2">
          {item.name}
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>
        <p className="text-sm font-semibold text-primary mt-1">
          {formatCurrency(item.price)}
        </p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <button
          type="button"
          onClick={() => removeItem(item.productId)}
          className="p-1 text-muted-foreground hover:text-destructive transition-colors"
          aria-label="Remover item"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDecrement}
            className="w-7 h-7 flex items-center justify-center rounded-md border border-border hover:bg-accent transition-colors"
            aria-label="Diminuir quantidade"
          >
            <Minus className="w-3 h-3" />
          </button>

          <span className="w-8 text-center text-sm font-medium">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={handleIncrement}
            className="w-7 h-7 flex items-center justify-center rounded-md border border-border hover:bg-accent transition-colors"
            aria-label="Aumentar quantidade"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <p className="text-sm font-semibold">{formatCurrency(subtotal)}</p>
      </div>
    </div>
  );
}

export const CartItem = memo(CartItemComponent);
