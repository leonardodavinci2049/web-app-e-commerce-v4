"use client";

import { Check, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    category: string;
    subcategory: string;
    brand?: string;
    inStock: boolean;
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const totalPrice = product.price * quantity;

  return (
    <div className="space-y-6">
      {/* Categoria e Marca */}
      <div className="text-sm text-muted-foreground">
        {product.category} {product.brand && `• ${product.brand}`}
      </div>

      {/* Título */}
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
        {product.name}
      </h1>

      {/* Avaliações */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((starId, i) => (
            <svg
              key={starId}
              className={`w-5 h-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>{i < 4 ? "Estrela preenchida" : "Estrela vazia"}</title>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">(42 avaliações)</span>
      </div>

      {/* Status de Estoque */}
      {product.inStock ? (
        <div className="flex items-center gap-2 text-green-600">
          <Check className="w-5 h-5" />
          <span className="font-medium">Em estoque</span>
        </div>
      ) : (
        <div className="text-red-600 font-medium">Produto indisponível</div>
      )}

      {/* Preço */}
      <div className="space-y-2">
        {product.discount && product.originalPrice && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground line-through">
              De:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.originalPrice)}
            </span>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{product.discount}%
            </span>
          </div>
        )}
        <div className="text-3xl md:text-4xl font-bold text-primary">
          Por:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.price)}
        </div>
        {product.discount && (
          <div className="text-sm text-green-600 font-medium">
            Economize{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format((product.originalPrice || product.price) - product.price)}
          </div>
        )}
      </div>

      {/* Benefícios */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-green-600">
          <Check className="w-4 h-4" />
          <span>Frete grátis para pedidos acima de R$ 199</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Check className="w-4 h-4" />
          <span>Garantia de 30 dias</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Check className="w-4 h-4" />
          <span>Devolução em até 10 dias úteis</span>
        </div>
      </div>

      {/* Seletor de Quantidade */}
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
              onChange={(e) =>
                setQuantity(
                  Math.max(1, Number.parseInt(e.target.value, 10) || 1),
                )
              }
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
      </div>

      {/* Botões de Ação */}
      <div className="space-y-3">
        <button
          type="button"
          disabled={!product.inStock}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-5 h-5" />
          Adicionar ao Carrinho
        </button>

        <button
          type="button"
          disabled={!product.inStock}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Comprar pelo WhatsApp
        </button>

        <button
          type="button"
          className="w-full border border-border py-3 rounded-lg font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2"
        >
          <Heart className="w-5 h-5" />
          Adicionar aos Favoritos
        </button>
      </div>
    </div>
  );
}
