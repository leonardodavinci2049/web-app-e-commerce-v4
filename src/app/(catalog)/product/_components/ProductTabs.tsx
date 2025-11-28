import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductTabsProps {
  description: string;
  specifications: Record<string, string>;
  shipping: {
    freeShippingMinValue: number;
    estimatedDays: string;
    returnDays: number;
  };
}

export function ProductTabs({
  description,
  specifications,
  shipping,
}: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Descrição do Produto</TabsTrigger>
        <TabsTrigger value="specifications">Especificações</TabsTrigger>
        <TabsTrigger value="shipping">Entrega</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <div className="prose prose-sm max-w-none">
          <h3 className="text-lg font-semibold mb-4">Sobre o Produto</h3>
          <p className="text-muted-foreground whitespace-pre-line">
            {description}
          </p>
        </div>
      </TabsContent>

      <TabsContent value="specifications" className="mt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">
            Características Principais
          </h3>
          <div className="border border-border rounded-lg divide-y divide-border">
            {Object.entries(specifications).map(([key, value]) => (
              <div
                key={key}
                className="grid grid-cols-2 gap-4 p-4 hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-foreground">{key}</span>
                <span className="text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="shipping" className="mt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Informações de Entrega</h3>
          <div className="space-y-3 text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium text-foreground">Frete Grátis</p>
                <p className="text-sm">
                  Para compras acima de{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(shipping.freeShippingMinValue)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium text-foreground">Prazo de Entrega</p>
                <p className="text-sm">{shipping.estimatedDays}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium text-foreground">
                  Política de Devolução
                </p>
                <p className="text-sm">
                  Devolução gratuita em até {shipping.returnDays} dias úteis
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium text-foreground">Garantia</p>
                <p className="text-sm">
                  Garantia de fábrica de 12 meses + 3 meses de garantia
                  estendida
                </p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
