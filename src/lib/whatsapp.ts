import type { CartItem, PaymentMethod } from "@/types/cart";

const SHIPPING_COST = 15;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatWhatsAppMessage(
  items: CartItem[],
  total: number,
  paymentMethod: PaymentMethod,
): string {
  const itemsList = items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} - ${item.quantity}x ${formatCurrency(item.price)} = ${formatCurrency(item.price * item.quantity)}`,
    )
    .join("\n");

  const message =
    `Olá! Gostaria de realizar um pedido. Itens:\n` +
    `${itemsList}\n\n` +
    `Subtotal: ${formatCurrency(total)}\n` +
    `Frete: ${formatCurrency(SHIPPING_COST)}\n` +
    `Total: ${formatCurrency(total + SHIPPING_COST)}\n\n` +
    `Forma de pagamento: ${paymentMethod}`;

  return encodeURIComponent(message);
}

export function getWhatsAppLink(message: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5516997275438";
  return `https://wa.me/${phone}?text=${message}`;
}
