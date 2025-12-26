"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface QuantitySelectorProps {
  initialQuantity?: number;
  maxQuantity?: number;
  price: number;
  onQuantityChange?: (quantity: number) => void;
}

/**
 * Minimal client component for quantity selection
 * Isolated from server-rendered ProductInfo for cache optimization
 */
export function QuantitySelector({
  initialQuantity = 1,
  maxQuantity,
  price,
  onQuantityChange,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    if (maxQuantity && quantity >= maxQuantity) return;
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = Math.max(1, Number.parseInt(e.target.value, 10) || 1);
    if (maxQuantity) {
      newQuantity = Math.min(newQuantity, maxQuantity);
    }
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  const totalPrice = price * quantity;

  return (
    <div className="space-y-2">
      <label
        htmlFor="quantity-input"
        className="text-sm font-medium text-foreground"
      >
        Quantidade:
      </label>
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-border rounded-lg">
          <button
            type="button"
            onClick={handleDecrement}
            className="p-3 hover:bg-muted transition-colors"
            disabled={quantity <= 1}
            aria-label="Diminuir quantidade"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            id="quantity-input"
            type="number"
            value={quantity}
            onChange={handleChange}
            className="w-16 text-center border-x border-border bg-transparent focus:outline-none"
            min="1"
          />
          <button
            type="button"
            onClick={handleIncrement}
            className="p-3 hover:bg-muted transition-colors"
            aria-label="Aumentar quantidade"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {quantity > 1 && (
          <span className="text-sm text-muted-foreground">
            Total:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalPrice)}
          </span>
        )}
      </div>
      {maxQuantity && quantity >= maxQuantity && (
        <p className="text-xs text-red-600 font-medium">
          Limite de {maxQuantity} unidades atingido
        </p>
      )}
    </div>
  );
}
