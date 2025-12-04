"use client";

import {
  Menu as MenuIcon,
  PackageSearch,
  ShoppingCart,
  Table2,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CategoryMenuAccordion } from "@/components/category-menu/CategoryMenuAccordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import type { UICategory } from "@/lib/transformers";

interface MobileBottomMenuProps {
  categories: UICategory[];
}

export function MobileBottomMenu({ categories }: MobileBottomMenuProps) {
  const { uniqueItems, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = () => {
    setMenuOpen(false);
  };

  const otherMenuItems = [
    {
      id: "catalogo",
      label: "Catalogo",
      icon: PackageSearch,
      href: "#catalogo",
    },
    { id: "tabela", label: "Tabela", icon: Table2, href: "#tabela" },
    { id: "conta", label: "Conta", icon: UserRound, href: "#conta" },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 md:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-2 text-xs text-muted-foreground">
        {/* Menu Hambúrguer - Isolado no lado esquerdo */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Abrir menu de categorias"
              className="relative flex flex-1 flex-col items-center justify-center gap-1 px-1 py-1.5 text-[11px] leading-tight"
            >
              <div className="relative flex items-center justify-center">
                <MenuIcon className="h-5 w-5" />
              </div>
              <span>Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
            <SheetHeader className="px-6 py-4 border-b">
              <SheetTitle>Todas as Categorias</SheetTitle>
            </SheetHeader>
            <div className="px-4 py-4 overflow-y-auto max-h-[calc(100vh-80px)]">
              <CategoryMenuAccordion
                categories={categories}
                onNavigate={handleNavigate}
              />
            </div>
          </SheetContent>
        </Sheet>

        {/* Outros itens do menu */}
        {otherMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 px-1 py-1.5 text-[11px] leading-tight"
            >
              <div className="relative flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Carrinho */}
        <button
          type="button"
          onClick={openCart}
          className="relative flex flex-1 flex-col items-center justify-center gap-1 px-1 py-1.5 text-[11px] leading-tight"
          aria-label="Abrir carrinho de compras"
        >
          <div className="relative flex items-center justify-center">
            <ShoppingCart className="h-5 w-5" />
            {uniqueItems > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                {uniqueItems > 99 ? "99+" : uniqueItems}
              </span>
            )}
          </div>
          <span>Carrinho</span>
        </button>
      </div>
    </nav>
  );
}
