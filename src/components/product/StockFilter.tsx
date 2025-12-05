"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface StockFilterProps {
  className?: string;
}

export function StockFilter({ className }: StockFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const stockOnly = searchParams.get("stock") === "1";

  const handleToggle = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.set("stock", "1");
    } else {
      params.delete("stock");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Switch
        id="stock-filter"
        checked={stockOnly}
        onCheckedChange={handleToggle}
        aria-label="Filtrar produtos com estoque"
      />
      <Label
        htmlFor="stock-filter"
        className="text-sm font-medium cursor-pointer select-none"
      >
        Estoque
      </Label>
    </div>
  );
}
