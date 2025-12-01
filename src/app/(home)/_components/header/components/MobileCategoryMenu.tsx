"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileCategoryMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Abrir menu de categorias"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background p-2 text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Todas as Categorias</SheetTitle>
        </SheetHeader>
        <nav className="px-4 pb-4">
          <ul className="space-y-1">
            {[
              "Eletrônicos",
              "Informática",
              "Gamer",
              "Casa Inteligente",
              "Ferramentas",
              "Automotivo",
            ].map((item) => (
              <li key={item}>
                <a
                  href="/"
                  className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
