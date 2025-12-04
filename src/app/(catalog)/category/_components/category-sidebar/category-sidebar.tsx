import { CategoryItem } from "./components/category-item";

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  href: string;
  children?: Subcategory[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  iconName?: string;
  href: string;
  subcategories?: Subcategory[];
}

interface CategorySidebarProps {
  categories: Category[];
}

export function CategorySidebar({ categories }: CategorySidebarProps) {
  return (
    <aside className="w-64 shrink-0 hidden lg:block space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight">Categorias</h2>
        <nav className="flex flex-col gap-2">
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
