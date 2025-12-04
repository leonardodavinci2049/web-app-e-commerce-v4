"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, type KeyboardEvent, useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  placeholder = "O que você procura?",
  className,
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const isValidSearchTerm = (term: string): boolean => {
    return term.trim().length > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    performSearch();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch();
    }
  };

  const performSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (!isValidSearchTerm(trimmedTerm)) {
      return;
    }
    const encodedTerm = encodeURIComponent(trimmedTerm);
    router.push(`/products?q=${encodedTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex-1 w-full max-w-2xl relative ${className ?? ""}`}
    >
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-4 pr-12 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 bg-primary text-primary-foreground rounded-r-lg hover:bg-primary/90 transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
