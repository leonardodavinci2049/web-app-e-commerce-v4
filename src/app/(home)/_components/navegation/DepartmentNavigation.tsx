import {
  Camera,
  Home,
  type LucideIcon,
  Monitor,
  Smartphone,
  Star,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { fetchCategoriesAction } from "@/app/actions/product";

// Icon mapping for category icons
const iconMap: Record<string, LucideIcon> = {
  Camera,
  Monitor,
  Smartphone,
  Star,
  Home,
  Sun,
};

/**
 * Async Server Component - fetches categories via Server Action
 * Cached for 1 hour via navigation cache tag
 */
export async function DepartmentNavigation() {
  const categories = await fetchCategoriesAction();

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold tracking-tight mb-8 text-foreground">
          Navegue por Departamentos
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const Icon = iconMap[category.iconName];

            if (!Icon) {
              console.warn(`Icon "${category.iconName}" not found in iconMap`);
              return null;
            }

            return (
              <Link
                key={category.id}
                href={category.href}
                className="group flex flex-col items-center p-6 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <span className="text-sm font-medium text-center text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
