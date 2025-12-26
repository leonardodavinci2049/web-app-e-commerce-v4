"use client";

import { Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { SearchInput } from "@/components/search/SearchInput";
import { Button } from "@/components/ui/button";

// Context para compartilhar estado
const SearchContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
} | null>(null);

// Provider que envolve o header
export function MobileSearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Fecha o search quando a rota muda
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname change should close search
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <SearchContext.Provider
      value={{ isOpen, toggle: () => setIsOpen(!isOpen) }}
    >
      {children}
    </SearchContext.Provider>
  );
}

// Botão de toggle
export function MobileSearchButton() {
  const context = useContext(SearchContext);
  if (!context) return null;

  const { isOpen, toggle } = context;

  return (
    <Button
      variant="ghost"
      className="rounded-full w-10"
      onClick={toggle}
      aria-label={isOpen ? "Fechar pesquisa" : "Abrir pesquisa"}
      aria-expanded={isOpen}
    >
      {isOpen ? <X className="size-5" /> : <Search className="size-5" />}
    </Button>
  );
}

// Container do SearchInput
export function MobileSearchContainer() {
  const context = useContext(SearchContext);
  if (!context || !context.isOpen) return null;

  return (
    <div className="px-4 py-3 bg-card border-t border-border">
      <SearchInput />
    </div>
  );
}
