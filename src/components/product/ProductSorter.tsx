"use client";

import { Check, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const sortOptions = [
  {
    label: "Nome A-Z",
    value: "name_asc",
    col: 1,
    ord: 1,
  },
  {
    label: "Nome Z-A",
    value: "name_desc",
    col: 1,
    ord: 2,
  },
  {
    label: "Mais Recente",
    value: "date_desc",
    col: 2,
    ord: 2,
  },
  {
    label: "Menor Preço",
    value: "price_asc",
    col: 3,
    ord: 1,
  },
  {
    label: "Maior Preço",
    value: "price_desc",
    col: 3,
    ord: 2,
  },
];

export function ProductSorter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  // Get current sort state from URL or default to Name A-Z
  const currentCol = Number(searchParams.get("sort_col")) || 1;
  const currentOrd = Number(searchParams.get("sort_ord")) || 1;

  const currentSort =
    sortOptions.find(
      (option) => option.col === currentCol && option.ord === currentOrd,
    ) || sortOptions[0];

  const handleSort = (option: (typeof sortOptions)[0]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort_col", option.col.toString());
    params.set("sort_ord", option.ord.toString());

    // Reset page to 1 when sorting changes (if pagination is implemented)
    // params.delete("page");

    router.push(`?${params.toString()}`);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between"
        >
          {currentSort.label}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {sortOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => handleSort(option)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentSort.value === option.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
