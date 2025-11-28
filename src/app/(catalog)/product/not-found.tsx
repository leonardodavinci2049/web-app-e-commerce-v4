import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-muted rounded-full p-4 mb-4">
        <AlertCircle className="w-12 h-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Produto não encontrado
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Desculpe, não conseguimos encontrar o produto que você está procurando.
        Ele pode ter sido removido ou o link está incorreto.
      </p>
      <Link
        href="/products"
        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Voltar para Produtos
      </Link>
    </div>
  );
}
