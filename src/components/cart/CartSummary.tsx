"use client";

import { useCart } from "@/hooks/useCart";

const SHIPPING_COST = 15;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function CartSummary() {
  const { totalPrice, totalItems } = useCart();

  const total = totalPrice + SHIPPING_COST;

  return (
    <div className="space-y-3 pt-4 border-t border-border">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          Subtotal ({totalItems} {totalItems === 1 ? "item" : "itens"})
        </span>
        <span className="font-medium">{formatCurrency(totalPrice)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Frete</span>
        <span className="font-medium">{formatCurrency(SHIPPING_COST)}</span>
      </div>

      <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
        <span>Total</span>
        <span className="text-primary">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
