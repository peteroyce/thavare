import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './products';

type WishlistStore = {
  items: Product[];
  toggle: (product: Product) => void;
  has: (productId: string) => boolean;
  clear: () => void;
};

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.some(p => p.id === product.id);
        set(state => ({
          items: exists
            ? state.items.filter(p => p.id !== product.id)
            : [...state.items, product],
        }));
      },
      has: (productId) => get().items.some(p => p.id === productId),
      clear: () => set({ items: [] }),
    }),
    { name: 'thavare-wishlist' }
  )
);
