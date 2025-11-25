import { Building2, Factory, Users } from "lucide-react";
import { TESTIMONIALS } from "../data/mock-data";

export function Testimonials() {
  const icons = {
    "Pessoa Física": Users,
    "Pequenas Empresas": Building2,
    "Grandes Empresas": Factory,
  };

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12 text-foreground">
          Departamentos dos Clientes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => {
            const Icon = icons[item.title as keyof typeof icons] || Users;
            return (
              <div
                key={item.id}
                className="bg-card p-8 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-6">{item.description}</p>
                <button
                  type="button"
                  className="mt-auto px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Saiba Mais
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
