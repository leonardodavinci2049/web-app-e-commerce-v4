"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="p-1 -ml-2 mr-1 rounded-full hover:bg-muted transition-colors text-foreground"
      aria-label="Voltar"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}
