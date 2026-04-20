import { Home, ShoppingBag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada | 404",
  description:
    "A página que você está procurando não foi encontrada. Navegue pela nossa loja para encontrar o que precisa.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <p className="text-8xl font-bold text-primary/20 select-none">404</p>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Página não encontrada
        </h1>

        <p className="mt-3 text-base text-muted-foreground">
          A página que você está procurando não existe, foi removida ou o
          endereço pode estar incorreto.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <Home className="h-4 w-4" />
            Página Inicial
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent"
          >
            <ShoppingBag className="h-4 w-4" />
            Ver Produtos
          </Link>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm font-medium text-muted-foreground mb-4">
            Páginas que podem te ajudar
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link
              href="/products"
              className="text-primary hover:underline underline-offset-4"
            >
              Produtos
            </Link>
            <Link
              href="/about"
              className="text-primary hover:underline underline-offset-4"
            >
              Sobre Nós
            </Link>
            <Link
              href="/contact"
              className="text-primary hover:underline underline-offset-4"
            >
              Contato
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
