/**
 * Advantages Component
 * Section displaying company advantages and benefits
 */

import { Headphones, Star, Tag, Truck } from "lucide-react";
import { advantages } from "@/data/mock-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  truck: Truck,
  tag: Tag,
  headphones: Headphones,
  star: Star,
};

import { cn } from "@/lib/utils";

interface AdvantagesProps {
  className?: string;
}

export default function Advantages({ className }: AdvantagesProps) {
  return (
    <section className={cn("py-12 px-4 bg-background", className)}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Por que escolher a MUNDIAL MEGASTORE?
          </h2>
          <p className="text-muted-foreground">
            Vantagens que fazem a diferença
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {advantages.map((advantage) => {
            const Icon = iconMap[advantage.icon] || Star;
            return (
              <div
                key={advantage.id}
                className="bg-card border border-border rounded-lg p-6 text-center space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-foreground">{advantage.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
