"use client";

import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";
import { persist } from "zustand/middleware";
import type { CartStore, PaymentMethod } from "@/types/cart";

const CART_STORAGE_KEY = "cart-storage";

const createCartStore = () =>
  createStore<CartStore>()(
    persist(
      (set, get) => ({
        items: [],
        uniqueItems: 0,
        totalItems: 0,
        totalPrice: 0,
        paymentMethod: "PIX",
        isOpen: false,

        addItem: (item) => {
          const { items } = get();
          const existingItem = items.find(
            (i) => i.productId === item.productId,
          );

          if (existingItem) {
            set({
              items: items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            });
          } else {
            set({
              items: [...items, { ...item, quantity: 1 }],
            });
          }

          const updatedItems = get().items;
          set({
            uniqueItems: updatedItems.length,
            totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: updatedItems.reduce(
              (sum, i) => sum + i.price * i.quantity,
              0,
            ),
          });
        },

        removeItem: (productId) => {
          const { items } = get();
          const updatedItems = items.filter((i) => i.productId !== productId);
          set({
            items: updatedItems,
            uniqueItems: updatedItems.length,
            totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: updatedItems.reduce(
              (sum, i) => sum + i.price * i.quantity,
              0,
            ),
          });
        },

        updateQuantity: (productId, quantity) => {
          if (quantity < 1) return;
          const { items } = get();
          const updatedItems = items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i,
          );
          set({
            items: updatedItems,
            uniqueItems: updatedItems.length,
            totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
            totalPrice: updatedItems.reduce(
              (sum, i) => sum + i.price * i.quantity,
              0,
            ),
          });
        },

        setPaymentMethod: (method: PaymentMethod) => {
          set({ paymentMethod: method });
        },

        clearCart: () => {
          set({
            items: [],
            uniqueItems: 0,
            totalItems: 0,
            totalPrice: 0,
            paymentMethod: "PIX",
          });
        },

        openCart: () => set({ isOpen: true }),
        closeCart: () => set({ isOpen: false }),
      }),
      {
        name: CART_STORAGE_KEY,
        partialize: (state) => ({
          items: state.items,
          uniqueItems: state.uniqueItems,
          totalItems: state.totalItems,
          totalPrice: state.totalPrice,
          paymentMethod: state.paymentMethod,
        }),
      },
    ),
  );

type CartStoreApi = ReturnType<typeof createCartStore>;

const CartContext = createContext<CartStoreApi | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<CartStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createCartStore();
  }

  return (
    <CartContext.Provider value={storeRef.current}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartStore<T>(selector: (state: CartStore) => T): T {
  const store = useContext(CartContext);
  if (!store) {
    throw new Error("useCartStore must be used within CartProvider");
  }
  return useStore(store, selector);
}
