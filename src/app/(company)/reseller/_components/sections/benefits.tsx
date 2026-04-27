import { CheckCircle, Package } from "lucide-react";

const BENEFITS_DATA = [
  {
    title: "Preços para Atacado e Varejo",
    description: "Margens competitivas para maximizar seus lucros",
  },
  {
    title: "Catálogo Exclusivo",
    description: "Acesso a produtos exclusivos para revendedores cadastrados",
  },
  {
    title: "Suporte Especializado",
    description: "Equipe dedicada para apoiar seu crescimento",
  },
  {
    title: "Condições Especiais",
    description: "Prazos de pagamento flexíveis e descontos por volume",
  },
] as const;

export function BenefitsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Vantagens Exclusivas para Revendedores
            </h2>
            <div className="space-y-4">
              {BENEFITS_DATA.map((benefit) => (
                <div key={benefit.title} className="flex items-start space-x-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:h-6 sm:w-6" />
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">
                      {benefit.title}
                    </h4>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-linear-to-br from-primary/10 via-background to-muted/60">
              <div className="text-center">
                <Package className="mx-auto mb-3 h-16 w-16 text-primary sm:mb-4 sm:h-20 sm:w-20 lg:h-24 lg:w-24" />
                <p className="text-base sm:text-lg font-semibold">
                  Area Restrita
                </p>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Catalogo Exclusivo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
