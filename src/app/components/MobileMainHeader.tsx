"use client";

import { Menu, Search } from "lucide-react";
import Image from "next/image";
import ModeToggle from "@/components/theme/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileMainHeader() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50 md:hidden">
      <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
        {/* Mobile menu + Logo + Theme */}
        <div className="relative flex items-center justify-center w-full">
          {/* Hamburger - esquerda */}
          <div className="absolute left-0 flex items-center">
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
          </div>

          {/* Logo centralizada */}
          <a
            href="/"
            className="inline-flex items-center"
            aria-label="Mundial Megastore - Página inicial"
          >
            <div className="relative w-40 h-8 xs:w-44 xs:h-9">
              <Image
                src="/images/logo/logo-header-mobile.png"
                alt="Mundial Megastore"
                fill
                className="object-contain"
                priority
              />
            </div>
          </a>

          {/* Toggle de tema - direita */}
          <div className="absolute right-0 flex items-center">
            <ModeToggle />
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 w-full max-w-2xl relative">
          <div className="relative">
            <input
              type="text"
              placeholder="O que você procura?"
              className="w-full pl-4 pr-12 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-full px-4 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
