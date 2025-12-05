import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Cpu,
  Gift,
  Headphones,
  Home,
  Layers,
  LayoutGrid,
  type LucideIcon,
  Monitor,
  Package,
  Percent,
  Smartphone,
  Sparkles,
  Tag,
  Watch,
  Wrench,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { fetchCategoriesAction } from "@/app/actions/product";

// Mapeamento de ícones por slug da categoria
const categoryIconMap: Record<string, LucideIcon> = {
  // Tecnologia e Eletrônicos
  "informatica-eletronico": Monitor,
  eletronicos: Cpu,
  "linha-celular": Smartphone,
  celulares: Smartphone,
  "acessorios-eletronicos": Headphones,
  "smart-watch": Watch,
  // Casa e Decoração
  "casa-decoracao": Home,
  "utilidades-domesticas": Home,
  // Perfumaria e Beleza
  "perfumaria-e-beleza": Sparkles,
  "perfumes-importados": Sparkles,
  // Acessórios e Ferramentas
  ferramentas: Wrench,
  acessorios: Package,
  // Presentes e Promoções
  presentes: Gift,
  promocoes: Tag,
};

// Ícone padrão para categorias sem mapeamento
const DefaultCategoryIcon = Layers;

// Função para obter o ícone baseado no slug
function getCategoryIcon(slug: string): LucideIcon {
  // Verifica correspondência exata
  if (categoryIconMap[slug]) {
    return categoryIconMap[slug];
  }
  // Verifica correspondência parcial
  for (const [key, icon] of Object.entries(categoryIconMap)) {
    if (slug.includes(key) || key.includes(slug)) {
      return icon;
    }
  }
  return DefaultCategoryIcon;
}

export async function NavigationMenu() {
  const categories = await fetchCategoriesAction();

  return (
    <nav className="bg-primary text-primary-foreground shadow-md hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          {/* All Categories Dropdown Trigger */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-2 bg-gradient-to-r from-primary-foreground/15 to-primary-foreground/5 px-6 py-3 font-bold hover:from-primary-foreground/25 hover:to-primary-foreground/15 transition-all duration-300 cursor-pointer border-r border-primary-foreground/10"
            >
              <LayoutGrid className="w-5 h-5" />
              <span>Todas as Categorias</span>
              <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300" />
            </button>

            {/* Dropdown Content */}
            <div className="absolute top-full left-0 w-72 bg-card text-card-foreground shadow-2xl rounded-b-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-border/50 overflow-hidden">
              {/* Header do dropdown */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-3 border-b border-border/30">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Navegue por Departamento
                </span>
              </div>

              {/* Lista de categorias */}
              <ul className="py-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                {categories.map((category, index) => {
                  const IconComponent = getCategoryIcon(category.slug);
                  const hasSubcategories =
                    category.subcategories && category.subcategories.length > 0;

                  return (
                    <li key={category.id}>
                      <Link
                        href={category.href}
                        className="group/item flex items-center gap-3 px-4 py-2.5 hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent transition-all duration-200"
                      >
                        {/* Ícone com background sutil */}
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/50 group-hover/item:bg-primary/10 group-hover/item:text-primary transition-all duration-200">
                          <IconComponent className="w-4 h-4" />
                        </span>

                        {/* Nome da categoria */}
                        <span className="flex-1 text-sm font-medium group-hover/item:text-primary transition-colors duration-200">
                          {category.name}
                        </span>

                        {/* Seta indicando subcategorias */}
                        {hasSubcategories && (
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/item:text-primary group-hover/item:translate-x-0.5 transition-all duration-200" />
                        )}
                      </Link>

                      {/* Separador sutil entre itens */}
                      {index < categories.length - 1 && (
                        <div className="mx-4 border-b border-border/20" />
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Footer do dropdown */}
              <div className="bg-gradient-to-r from-muted/50 to-muted/30 px-4 py-2.5 border-t border-border/30">
                <Link
                  href="/products"
                  className="flex items-center justify-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Package className="w-3.5 h-3.5" />
                  Ver todos os produtos
                </Link>
              </div>
            </div>
          </div>

          {/* Horizontal Links */}
          <ul className="flex items-center ml-2">
            {[
              { label: "Home", href: "/", icon: Home },
              { label: "Lançamentos", href: "/products", icon: Zap },
              { label: "Ofertas", href: "/products", icon: Percent },
              {
                label: "Eletrônicos",
                href:
                  categories.find((c) => c.slug === "eletronicos")?.href ||
                  "/category/informatica-eletronico",
                icon: Cpu,
              },
              {
                label: "Celulares",
                href:
                  categories.find((c) => c.slug === "linha-celular")?.href ||
                  "/category/linha-celular",
                icon: Smartphone,
              },
              {
                label: "Perfumes",
                href:
                  categories.find((c) => c.slug === "perfumes-importados")
                    ?.href || "/category/perfumaria-e-beleza",
                icon: Sparkles,
              },
              {
                label: "Catálogo",
                href: "/products",
                icon: BookOpen,
              },
            ].map((item) => {
              const IconNav = item.icon;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group/nav flex items-center gap-1.5 px-3.5 py-3 text-sm font-medium hover:bg-primary-foreground/15 transition-all duration-200 whitespace-nowrap relative overflow-hidden"
                  >
                    <IconNav className="w-4 h-4 opacity-70 group-hover/nav:opacity-100 group-hover/nav:scale-110 transition-all duration-200" />
                    <span className="group-hover/nav:translate-x-0.5 transition-transform duration-200">
                      {item.label}
                    </span>
                    {/* Underline animado */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-foreground/50 group-hover/nav:w-4/5 transition-all duration-300 rounded-full" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
