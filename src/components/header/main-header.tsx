/**
 * MainHeader Component
 * Main header with logo, search bar and action icons
 */

"use client";

import { ChevronDown, Menu, Search, Table, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import CartSidebar from "@/components/cart/cart-sidebar";
import ModeToggle from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { envs } from "@/core/config/envs";
import { navigationItems } from "@/data/mock-data";

export default function MainHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    [],
  );

  const handleSearchSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const normalizedValue = searchValue.trim();
      const params = new URLSearchParams();

      if (normalizedValue) {
        params.set("search", normalizedValue);
      }

      const queryString = params.toString();
      router.push(`/products${queryString ? `?${queryString}` : ""}`);
    },
    [router, searchValue],
  );

  useEffect(() => {
    if (pathname !== "/products") {
      return;
    }

    const currentSearch = searchParams.get("search") ?? "";
    setSearchValue(currentSearch);
  }, [pathname, searchParams]);

  return (
    <header className="hidden md:block bg-card border-b border-border py-4 px-4">
      <div className="container mx-auto max-w-7xl flex items-center gap-4">
        {/* Mobile Menu Hamburger */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 border-2 shadow-md hover:shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 hover:bg-accent flex flex-col items-center gap-1 h-auto py-2 px-3"
            >
              <Menu className="h-4 w-4" />
              <span className="text-xs font-medium">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle className="text-primary text-left">
                Menu de Navegação
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6">
              <ul className="space-y-1">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 hover:bg-muted rounded-lg transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Link>
                    {/* Dropdown items for mobile */}
                    {item.hasDropdown && item.dropdownItems && (
                      <ul className="ml-4 mt-2 space-y-1 border-l-2 border-muted pl-4">
                        {item.dropdownItems.map((subItem) => (
                          <li key={subItem.id}>
                            <Link
                              href={subItem.href}
                              className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2">
          <Image
            src="/images/logo/logo-header.png"
            alt={`${envs.NEXT_PUBLIC_COMPANY_NAME} Logo`}
            width={64}
            height={32}
            className="h-8 w-16 sm:h-10 sm:w-20"
          />
          <h1 className="text-xl font-bold text-primary sm:text-2xl">
            {envs.NEXT_PUBLIC_COMPANY_NAME}
          </h1>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-2xl flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="O que você procura?"
              className="w-full pl-10 bg-background"
              value={searchValue}
              onChange={handleInputChange}
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="h-10 justify-center px-5 font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Buscar
          </Button>
        </form>

        {/* Action Icons */}
        <div className="flex items-center gap-4 shrink-0">
          <Button
            variant="default"
            size="sm"
            className="hidden lg:flex h-10 min-w-[140px] items-center justify-center gap-2 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-md hover:shadow-lg transition-all duration-200"
            asChild
          >
            <Link href="/tabela">
              <Table className="h-4 w-4" />
              <span className="text-sm">Ver Tabela</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            asChild
          >
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="text-sm hidden md:inline">
                Entre / Cadastre-se
              </span>
            </Link>
          </Button>

          {/* Cart Sidebar */}
          <CartSidebar />

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
