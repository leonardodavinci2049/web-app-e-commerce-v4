import { Check } from "lucide-react";
import { AddToCartButton } from "@/components/product/actions/AddToCartButton";
import { QuantitySelector } from "@/components/product/actions/QuantitySelector";
import { WhatsAppProductButton } from "@/components/product/actions/WhatsAppProductButton";

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    sku?: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    category: string;
    subcategory: string;
    brand?: string;
    inStock: boolean;
    stock: number;
  };
}

/**
 * Server Component - renders static product information
 * Client Components (AddToCartButton, WishlistButton, QuantitySelector)
 * are imported as islands for interactive functionality
 */
export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-2 lg:space-y-4">
      {/* Título */}
      <h1 className="hidden lg:block text-xl md:text-3xl font-bold text-foreground">
        {product.name}
      </h1>

      {/* SKU */}
      {/*     <div className="text-sm text-muted-foreground">
        SKU: {product.sku || "N/A"}
      </div> */}

      {/* Avaliações */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((starId, i) => (
            <svg
              key={starId}
              className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>{i < 4 ? "Estrela preenchida" : "Estrela vazia"}</title>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">(42 avaliações)</span>
      </div>

      {/* Preço */}
      <div className="space-y-0.5">
        {product.discount && product.originalPrice && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground line-through">
              De:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.originalPrice)}
            </span>
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              -{product.discount}%
            </span>
          </div>
        )}
        <div className="text-2xl md:text-4xl font-bold text-primary">
          Por:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.price)}
        </div>
        {product.discount && (
          <div className="text-xs text-green-600 font-medium">
            Economize{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format((product.originalPrice || product.price) - product.price)}
          </div>
        )}
      </div>

      {/* Benefícios */}
      <div className="space-y-1 text-xs">
        <div className="flex items-center gap-2 text-green-600">
          <Check className="w-3.5 h-3.5" />
          <span>À vista no Pix e em até 10x no Cartão</span>
        </div>
        <div className="flex items-center gap-2 text-green-600">
          <Check className="w-3.5 h-3.5" />
          <span>Entrega a partir de R$ 15,00 - Região de Ribeirão Preto</span>
        </div>
      </div>

      {/* Seletor de Quantidade e Status de Estoque */}
      <div className="flex items-center justify-between">
        <QuantitySelector price={product.price} maxQuantity={product.stock} />

        {/* Status de Estoque */}
        {product.inStock ? (
          <div className="flex items-center gap-1.5 text-green-600">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Em estoque</span>
          </div>
        ) : (
          <div className="text-red-600 text-sm font-medium">
            Produto indisponível
          </div>
        )}
      </div>

      {/* Botões de Ação */}
      <div className="space-y-2">
        {/* Add to Cart - Client Island */}
        <AddToCartButton
          productId={product.id}
          productName={product.name}
          price={product.price}
          category={product.category}
        />

        {/* WhatsApp - Client Island */}
        <WhatsAppProductButton
          productName={product.name}
          price={product.price}
          inStock={product.inStock}
        />
      </div>
    </div>
  );
}
