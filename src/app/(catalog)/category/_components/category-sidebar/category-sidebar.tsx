import type { UICategory } from "@/lib/transformers";
import { CategoryMenu } from "./category-menu";

interface CategorySidebarProps {
  categories: UICategory[];
}

export function CategorySidebar({ categories }: CategorySidebarProps) {
  return (
    <aside className="w-64 shrink-0 hidden lg:block space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight">Categorias</h2>
        <CategoryMenu categories={categories} />
      </div>
    </aside>
  );
}
