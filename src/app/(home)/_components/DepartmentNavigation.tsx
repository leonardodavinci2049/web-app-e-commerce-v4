import { CATEGORIES } from "@/data/mock-data";

export function DepartmentNavigation() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
          Compre por Departamento
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <a
                key={category.id}
                href={category.href}
                className="group flex flex-col items-center justify-center p-6 bg-card border border-border rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <span className="text-sm font-medium text-center text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
