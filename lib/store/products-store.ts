import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types";
import { products as initialProducts } from "../data/products";

interface ProductsStore {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  getAllProducts: () => Product[];
  searchProducts: (query: string) => Product[];
  getProductsByCategory: (category: string) => Product[];
}

export const useProductsStore = create<ProductsStore>()(
  persist(
    (set, get) => ({
      products: initialProducts,

      addProduct: (product) => {
        set((state) => ({
          products: [...state.products, product],
        }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      getProductById: (id) => {
        return get().products.find((p) => p.id === id);
      },

      getProductBySlug: (slug) => {
        return get().products.find((p) => p.slug === slug);
      },

      getAllProducts: () => {
        return get().products;
      },

      searchProducts: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().products.filter(
          (p) =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
        );
      },

      getProductsByCategory: (category) => {
        return get().products.filter((p) => p.category === category);
      },
    }),
    {
      name: "products-storage",
    }
  )
);
