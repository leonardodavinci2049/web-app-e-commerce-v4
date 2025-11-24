/**
 * MobileHeader Component
 * Simplified mobile header with logo and theme toggle only
 */

"use client";

import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ModeToggle from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { envs } from "@/core/config/envs";
import { navigationItems } from "@/data/mock-data";

export default function MobileHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card border-b border-border py-3 px-4 md:hidden">
      <div className="flex items-center justify-between">
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

        {/* Logo and Company Name */}
        <div className="flex items-center gap-2 flex-1 justify-center">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo/logo-header.png"
              alt={`${envs.NEXT_PUBLIC_COMPANY_NAME} Logo`}
              width={64}
              height={32}
              className="h-8 w-16"
            />
          </Link>
          <h1 className="text-lg font-bold text-primary">
            {envs.NEXT_PUBLIC_COMPANY_NAME}
          </h1>
        </div>

        {/* Theme Toggle */}
        <ModeToggle />
      </div>
    </header>
  );
}
