"use client";

import { X } from "lucide-react";

interface ProductFiltersProps {
  categories: string[];
  subcategories: string[];
  selectedCategory: string;
  selectedSubcategory: string;
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string) => void;
}

export function ProductFilters({
  categories,
  subcategories,
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="bg-card border-y border-border py-4">
      <div className="container mx-auto px-4">
        {/* Filtro de Categorias */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Categorias
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onCategoryChange("")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === ""
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Todasxx
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
                {selectedCategory === category && (
                  <X
                    className="w-3 h-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCategoryChange("");
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro de Subcategorias */}
        {selectedCategory && subcategories.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Subcategorias
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onSubcategoryChange("")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSubcategory === ""
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Todas
              </button>
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  type="button"
                  onClick={() => onSubcategoryChange(subcategory)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedSubcategory === subcategory
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {subcategory}
                  {selectedSubcategory === subcategory && (
                    <X
                      className="w-3 h-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSubcategoryChange("");
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
