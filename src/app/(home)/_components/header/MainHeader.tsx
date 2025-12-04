import Image from "next/image";
import Link from "next/link";
import { UserActions } from "@/app/(home)/_components/header/components/UserActions";
import { SearchInput } from "@/components/search/SearchInput";

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
        <SearchInput />

        {/* User Actions - Client Island */}

        <div className="hidden md:flex">
          <UserActions />
        </div>
      </div>
    </header>
  );
}
