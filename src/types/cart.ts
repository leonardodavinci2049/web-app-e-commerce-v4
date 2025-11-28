/**
 * Cart Types
 * All interfaces for shopping cart
 */

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
  maxQuantity?: number;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
  installments?: {
    count: number;
    value: number;
  };
}

export interface CouponInfo {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
}

export interface DeliveryInfo {
  estimate: string;
  guaranteed: boolean;
}
