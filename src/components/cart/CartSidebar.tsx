"use client";

import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { WhatsAppCheckoutButton } from "./WhatsAppCheckoutButton";

export function CartSidebar() {
  const {
    items,
    totalItems,
    isOpen,
    closeCart,
    paymentMethod,
    setPaymentMethod,
  } = useCart();

  const isEmpty = items.length === 0;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-3/4 sm:max-w-md flex flex-col px-4"
        role="dialog"
        aria-label="Carrinho de compras"
      >
        <SheetHeader className="border-b border-border pb-4 -mx-4 px-4">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingCart className="w-5 h-5" />
            Meu Carrinho
            {totalItems > 0 && (
              <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Gerencie os itens do seu carrinho de compras
          </SheetDescription>
        </SheetHeader>

        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-6">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Seu carrinho está vazio
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Adicione produtos para continuar
              </p>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Continuar comprando
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-2">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4 -mx-4 px-4 pb-4">
              <PaymentMethodSelector
                value={paymentMethod}
                onChange={setPaymentMethod}
              />
              <CartSummary />
              <WhatsAppCheckoutButton />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
