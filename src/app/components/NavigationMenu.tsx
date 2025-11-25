import { Menu, ChevronDown } from "lucide-react";

export function NavigationMenu() {
  return (
    <nav className="bg-primary text-primary-foreground shadow-md hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          {/* All Categories Dropdown Trigger */}
          <div className="relative group">
            <button className="flex items-center gap-2 bg-primary-foreground/10 px-6 py-3 font-bold hover:bg-primary-foreground/20 transition-colors cursor-pointer">
              <Menu className="w-5 h-5" />
              <span>Todas as Categorias</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>

            {/* Dropdown Content (Mock) */}
            <div className="absolute top-full left-0 w-64 bg-card text-card-foreground shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 border border-border">
              <ul className="py-2">
                {[
                  "Eletrônicos",
                  "Informática",
                  "Gamer",
                  "Casa Inteligente",
                  "Ferramentas",
                  "Automotivo",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-muted transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Horizontal Links */}
          <ul className="flex items-center gap-1 ml-4">
            {[
              "Home",
              "Lançamentos",
              "Ofertas do Dia",
              "Celulares & Smartphones",
              "Hardware",
              "Perfumes",
            ].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="px-4 py-3 text-sm font-medium hover:bg-primary-foreground/10 transition-colors block whitespace-nowrap"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
