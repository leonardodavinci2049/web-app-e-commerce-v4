import { CreditCard, QrCode, ShieldCheck, Truck } from "lucide-react";

export function MethodsSection() {
  return (
    <div className="border-t border-border bg-card">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 space-y-2">
            <div className="flex justify-center">
              <QrCode className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm font-medium">PIX</p>
            <p className="text-xs text-muted-foreground">5% desconto à vista</p>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex justify-center">
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm font-medium">Cartões</p>
            <p className="text-xs text-muted-foreground">Parcele até 12x</p>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex justify-center">
              <Truck className="h-8 w-8 text-secondary" />
            </div>
            <p className="text-sm font-medium">Frete Grátis</p>
            <p className="text-xs text-muted-foreground">Acima de R$299</p>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex justify-center">
              <ShieldCheck className="h-8 w-8 text-foreground" />
            </div>
            <p className="text-sm font-medium">Segurança</p>
            <p className="text-xs text-muted-foreground">Site 100% seguro</p>
          </div>
        </div>
      </div>
    </div>
  );
}
