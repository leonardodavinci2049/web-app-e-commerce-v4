import { ADVANTAGES } from "@/data/mock-data";

export function Advantages() {
  return (
    <section className="py-12 border-y border-border bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10 text-foreground">
          Por que escolher a MUNDIAL MEGASTORE?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {ADVANTAGES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-1 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
