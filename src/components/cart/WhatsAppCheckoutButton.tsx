"use client";

import { MessageCircle } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatWhatsAppMessage, getWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppCheckoutButton() {
  const { items, totalPrice, paymentMethod } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;

    const message = formatWhatsAppMessage(items, totalPrice, paymentMethod);
    const link = getWhatsAppLink(message);

    window.open(link, "_blank");

    // Opcional: limpar carrinho e fechar painel após envio
    // clearCart();
    // closeCart();
  };

  const isDisabled = items.length === 0;

  
  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={isDisabled}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Finalizar pedido via WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      Finalizar no WhatsApp
    </button>
  );
}
