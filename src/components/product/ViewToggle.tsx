import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  viewMode: "grid" | "list";
  onToggle: (mode: "grid" | "list") => void;
  className?: string;
}

export function ViewToggle({ viewMode, onToggle, className }: ViewToggleProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={() => onToggle("grid")}
        className={cn(
          "p-2 rounded-md transition-all",
          viewMode === "grid"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-background text-muted-foreground hover:bg-muted",
        )}
        aria-label="Visualização em grade"
        title="Grade"
      >
        <LayoutGrid size={20} />
      </button>
      <button
        type="button"
        onClick={() => onToggle("list")}
        className={cn(
          "p-2 rounded-md transition-all",
          viewMode === "list"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-background text-muted-foreground hover:bg-muted",
        )}
        aria-label="Visualização em lista"
        title="Lista"
      >
        <List size={20} />
      </button>
    </div>
  );
}
