import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "../types";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number, color: string, size: string) => void;
  removeItem: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity, color, size) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.selectedColor === color &&
              item.selectedSize === size
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                item.selectedColor === color &&
                item.selectedSize === size
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                product,
                quantity,
                selectedColor: color,
                selectedSize: size,
              },
            ],
          };
        });
      },

      removeItem: (productId, color, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedColor === color &&
                item.selectedSize === size
              )
          ),
        }));
      },

      updateQuantity: (productId, color, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, color, size);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
