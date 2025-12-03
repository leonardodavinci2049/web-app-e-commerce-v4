"use client";

import { MessageCircle, Moon, ShoppingCart, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { useCart } from "@/hooks/useCart";
/**
 * Minimal client component for user-specific header actions
 * Handles cart count, user menu, and authentication state
 * Isolated from server-rendered header for cache optimization
 */
export function UserActions() {
  const { theme, setTheme } = useTheme();
  const { uniqueItems, openCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

      {/* Theme Toggle */}
      <button
        type="button"
        className="flex flex-col items-center gap-1 hover:text-primary transition-colors group"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {mounted && theme === "dark" ? (
          <Sun className="w-6 h-6 group-hover:scale-110 transition-transform" />
        ) : (
          <Moon className="w-6 h-6 group-hover:scale-110 transition-transform" />
        )}
        <span className="hidden lg:inline">Tema</span>
      </button>

      <button
        type="button"
        onClick={openCart}
        className="flex flex-col items-center gap-1 hover:text-primary transition-colors group relative"
        aria-label="Abrir carrinho de compras"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
          {uniqueItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {uniqueItems > 99 ? "99+" : uniqueItems}
            </span>
          )}
        </div>
        <span className="hidden lg:inline">Carrinho</span>
      </button>
    </div>
  );
}
