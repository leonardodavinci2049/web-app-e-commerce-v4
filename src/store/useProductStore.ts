import { create } from "zustand";

interface ProductState {
  selectedCategory: string;
  selectedSubcategory: string;
  displayCount: number;
  loading: boolean;

  // Actions
  setSelectedCategory: (category: string) => void;
  setSelectedSubcategory: (subcategory: string) => void;
  loadMore: () => void;
  reset: () => void;
}

const PRODUCTS_PER_PAGE = 20;

export const useProductStore = create<ProductState>((set) => ({
  selectedCategory: "",
  selectedSubcategory: "",
  displayCount: PRODUCTS_PER_PAGE,
  loading: false,

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
