import { Check } from "lucide-react";
import { AddToCartButton } from "@/components/product/actions/AddToCartButton";
import { QuantitySelector } from "@/components/product/actions/QuantitySelector";
import { WishlistButton } from "@/components/product/actions/WishlistButton";

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

/**
 * Server Component - renders static product information
 * Client Components (AddToCartButton, WishlistButton, QuantitySelector)
 * are imported as islands for interactive functionality
 */
export function ProductInfo({ product }: ProductInfoProps) {
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

      {/* Seletor de Quantidade - Client Island */}
      <QuantitySelector price={product.price} />

      {/* Botões de Ação */}
      <div className="space-y-3">
        {/* Add to Cart - Client Island */}
        <AddToCartButton
          productId={product.id}
          productName={product.name}
          price={product.price}
          category={product.category}
        />

        <button
          type="button"
          disabled={!product.inStock}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Comprar pelo WhatsApp
        </button>

        {/* Wishlist - Client Island */}
        <div className="w-full border border-border py-3 rounded-lg font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
          <WishlistButton productId={product.id} />
          <span>Adicionar aos Favoritos</span>
        </div>
      </div>
    </div>
  );
}
