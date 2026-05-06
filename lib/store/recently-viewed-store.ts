import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentlyViewedStore {
  productIds: string[];
  addProduct: (productId: string) => void;
  getRecentProducts: () => string[];
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      productIds: [],

      addProduct: (productId) => {
        set((state) => {
          // Remove if already exists
          const filtered = state.productIds.filter((id) => id !== productId);
          // Add to beginning, keep only last 8
          return { productIds: [productId, ...filtered].slice(0, 8) };
        });
      },

      getRecentProducts: () => {
        return get().productIds;
      },
    }),
    {
      name: "recently-viewed-storage",
    }
  )
);
