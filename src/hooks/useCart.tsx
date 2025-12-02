"use client";

import { useCartStore } from "@/contexts/CartContext";

export function useCart() {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const paymentMethod = useCartStore((state) => state.paymentMethod);
  const isOpen = useCartStore((state) => state.isOpen);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const setPaymentMethod = useCartStore((state) => state.setPaymentMethod);
  const clearCart = useCartStore((state) => state.clearCart);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);

  return {
    items,
    totalItems,
    totalPrice,
    paymentMethod,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    setPaymentMethod,
    clearCart,
    openCart,
    closeCart,
  };
}
