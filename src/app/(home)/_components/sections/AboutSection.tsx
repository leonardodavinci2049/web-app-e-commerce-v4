import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface AboutSectionProps {
  className?: string;
}

export function AboutSection({ className }: AboutSectionProps) {
  return (
    <section className={cn("py-16 bg-background", className)}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              15 anos de tradição
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A MUNDIAL MEGASTORE é referência no mercado de eletrônicos e
              informática, oferecendo produtos de alta qualidade e atendimento
              especializado. Nossa missão é conectar pessoas e empresas com a
              melhor tecnologia disponível.
            </p>

            <ul className="space-y-3">
              {[
                "Produtos 100% Originais",
                "Garantia Estendida",
                "Suporte Técnico Especializado",
                "Entrega Segura",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-foreground"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="text-primary font-bold hover:underline"
            >
              Conheça nossa história &rarr;
            </button>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl relative">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
                alt="Nossa Loja"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-xl border border-border hidden md:block">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <span className="block text-3xl font-bold text-primary">
                    15+
                  </span>
                  <span className="text-xs text-muted-foreground">Anos</span>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div className="text-center">
                  <span className="block text-3xl font-bold text-primary">
                    50k+
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Clientes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
