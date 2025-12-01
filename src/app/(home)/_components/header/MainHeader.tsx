import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UserActions } from "@/app/(home)/_components/header/components/UserActions";

/**
 * Server Component - renders static header structure
 * UserActions is imported as Client Island for user-specific content
 */
export function MainHeader() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40 hidden md:block">
      <div className="container mx-auto px-4 py-4 flex flex-row items-center gap-4 justify-between">
        {/* Logo */}
        <div className="shrink-0 flex items-center justify-start">
          <Link
            href="/"
            className="inline-flex items-center"
            aria-label="Mundial Megastore - Página inicial"
          >
            <div className="relative w-40 h-8 sm:w-48 sm:h-10 lg:w-56 lg:h-12">
              <Image
                src="/images/logo/logo-horizontal-header.png"
                alt="Mundial Megastore"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 w-full max-w-2xl relative">
          <div className="relative">
            <input
              type="text"
              placeholder="O que você procura?"
              className="w-full pl-4 pr-12 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-full px-4 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User Actions - Client Island */}
        <div className="hidden md:flex">
          <UserActions />
        </div>
      </div>
    </header>
  );
}
