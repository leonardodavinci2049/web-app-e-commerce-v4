import { Globe, Shield, Zap } from "lucide-react";
import { envs } from "@/core/config/envs";

const FEATURES_DATA = [
  {
    icon: Shield,
    title: "Qualidade Garantida",
    description:
      "Todos os produtos são originais e passam por rigoroso controle de qualidade antes da entrega",
  },
  {
    icon: Zap,
    title: "Entrega Rápida",
    description:
      "Agilidade no processamento e envio dos pedidos para todo o território nacional",
  },
  {
    icon: Globe,
    title: "Atendimento Nacional",
    description:
      "Distribuímos para todo o Brasil com suporte especializado em cada região",
  },
] as const;

export function WhyChooseUsSection() {
  return (
    <section className="bg-muted/50 py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Por que escolher a {envs.NEXT_PUBLIC_COMPANY_NAME}?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Oferecemos as melhores condições para o seu negócio prosperar
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {FEATURES_DATA.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 sm:mb-6 sm:h-16 sm:w-16">
                  <Icon className="h-7 w-7 text-primary sm:h-8 sm:w-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
