/**
 * Cart Types
 * All interfaces for shopping cart
 */

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  discount?: number;
}

export type PaymentMethod = "PIX" | "Cartão" | "Dinheiro";

export interface CartState {
  items: CartItem[];
  uniqueItems: number;
  totalItems: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  isOpen: boolean;
}

export interface CartActions {
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export type CartStore = CartState & CartActions;
