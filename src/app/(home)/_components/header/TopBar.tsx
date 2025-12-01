import { Phone } from "lucide-react";
import ModeToggle from "@/components/theme/mode-toggle";
import Link from "next/link";

export function TopBar() {
  return (
    <div className="bg-muted text-muted-foreground py-2 text-xs sm:text-sm hidden md:block">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-primary transition-colors">
            Atendimento ao Cliente
          </Link>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>Televendas: (11) 9999-9999</span>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
