import { Calendar, Package, Star, Users } from "lucide-react";

const STATS_DATA = [
  {
    icon: Package,
    value: "5000+",
    label: "Produtos Disponíveis",
  },
  {
    icon: Users,
    value: "20000+",
    label: "Clientes Satisfeitos",
  },
  {
    icon: Calendar,
    value: "25+",
    label: "Anos de Experiência",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Avaliação dos Clientes",
  },
] as const;

export function StatsSection() {
  return (
    <section className="bg-muted/50 py-12 sm:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {STATS_DATA.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 sm:mb-4 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                  <Icon className="h-6 w-6 text-primary sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                </div>
                <div className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
