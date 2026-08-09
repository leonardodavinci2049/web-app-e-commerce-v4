"use client";

import { MessageCircle } from "lucide-react";
import { trackGenerateLead } from "@/components/analytics";
import { formatSingleProductMessage, getWhatsAppLink } from "@/lib/whatsapp";

interface WhatsAppProductButtonProps {
  productId: string;
  productName: string;
  price: number;
  inStock: boolean;
}

export function WhatsAppProductButton({
  productId,
  productName,
  price,
  inStock,
}: WhatsAppProductButtonProps) {
  const handleWhatsAppClick = () => {
    // TODO: Integrar com o QuantitySelector para pegar a quantidade selecionada
    // Por enquanto, usa quantidade 1 como padrão
    const quantity = 1;

    const message = formatSingleProductMessage(productName, price, quantity);
    const link = getWhatsAppLink(message);

    trackGenerateLead("whatsapp", "product_detail", {
      value: price * quantity,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price,
          quantity,
        },
      ],
    });

    window.open(link, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleWhatsAppClick}
      disabled={!inStock}
      className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      aria-label="Comprar via WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      Comprar pelo WhatsApp
    </button>
  );
}
