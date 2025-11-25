import { Phone } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-muted text-muted-foreground py-2 text-xs sm:text-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-primary transition-colors">
            Atendimento ao Cliente
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>Televendas: (11) 9999-9999</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Theme Toggle placeholder - assuming next-themes or similar will be wired up later or just static for now */}
          <span className="cursor-pointer hover:text-primary">Dark Mode</span>
        </div>
      </div>
    </div>
  );
}
