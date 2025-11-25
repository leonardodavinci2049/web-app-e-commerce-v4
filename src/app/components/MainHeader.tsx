import { Search, MessageCircle, User, ShoppingCart } from "lucide-react";
import Image from "next/image";

export function MainHeader() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center gap-4 justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-primary tracking-tight">
            MUNDIAL MEGASTORE
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 w-full max-w-2xl relative">
          <div className="relative">
            <input
              type="text"
              placeholder="O que você procura?"
              className="w-full pl-4 pr-12 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-sm font-medium text-foreground">
          <a
            href="#"
            className="flex flex-col items-center gap-1 hover:text-primary transition-colors group"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="hidden lg:inline">Fale Conosco</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-1 hover:text-primary transition-colors group"
          >
            <User className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="hidden lg:inline">Entre / Cadastre-se</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-1 hover:text-primary transition-colors group relative"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </div>
            <span className="hidden lg:inline">Carrinho</span>
          </a>
        </div>
      </div>
    </header>
  );
}
