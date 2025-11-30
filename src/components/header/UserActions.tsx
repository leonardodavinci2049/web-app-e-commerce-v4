"use client";

import { MessageCircle, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Minimal client component for user-specific header actions
 * Handles cart count, user menu, and authentication state
 * Isolated from server-rendered header for cache optimization
 */
export function UserActions() {
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated] = useState(false);

  // Simulate loading cart count from storage/API
  useEffect(() => {
    // TODO: Integrate with cart store when available
    // For now, simulate a cart count
    const storedCount =
      typeof window !== "undefined" ? localStorage.getItem("cartCount") : null;
    setCartCount(storedCount ? Number.parseInt(storedCount, 10) : 0);
  }, []);

  return (
    <div className="flex items-center gap-6 text-sm font-medium text-foreground">
      <a
        href="/"
        className="flex flex-col items-center gap-1 hover:text-primary transition-colors group"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="hidden lg:inline">Fale Conosco</span>
      </a>

      <a
        href={isAuthenticated ? "/account" : "/login"}
        className="flex flex-col items-center gap-1 hover:text-primary transition-colors group"
      >
        <User className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="hidden lg:inline">
          {isAuthenticated ? "Minha Conta" : "Entre / Cadastre-se"}
        </span>
      </a>

      <a
        href="/cart"
        className="flex flex-col items-center gap-1 hover:text-primary transition-colors group relative"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </div>
        <span className="hidden lg:inline">Carrinho</span>
      </a>
    </div>
  );
}
