import { create } from "zustand";
import type { Product } from "@/types/product";

interface Category {
  id: string;
  name: string;
  subcategories?: { id: string; name: string }[];
}

interface ProductState {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  selectedSubcategory: string;
  displayCount: number;
  loading: boolean;

  // Actions
  setInitialData: (products: Product[], categories: Category[]) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedSubcategory: (subcategory: string) => void;
  loadMore: () => void;
  reset: () => void;
}

const PRODUCTS_PER_PAGE = 20;

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  categories: [],
  selectedCategory: "",
  selectedSubcategory: "",
  displayCount: PRODUCTS_PER_PAGE,
  loading: false,

  setInitialData: (products, categories) => set({ products, categories }),

  setSelectedCategory: (category) =>
    set({
      selectedCategory: category,
      selectedSubcategory: "",
      displayCount: PRODUCTS_PER_PAGE,
    }),

  setSelectedSubcategory: (subcategory) =>
    set({
      selectedSubcategory: subcategory,
      displayCount: PRODUCTS_PER_PAGE,
    }),

  loadMore: () => {
    set({ loading: true });
    // Simulate delay inside the action or component?
    // Usually async actions are fine in Zustand.
    setTimeout(() => {
      set((state) => ({
        displayCount: state.displayCount + PRODUCTS_PER_PAGE,
        loading: false,
      }));
    }, 500);
  },

  reset: () =>
    set({
      selectedCategory: "",
      selectedSubcategory: "",
      displayCount: PRODUCTS_PER_PAGE,
      loading: false,
    }),
}));
