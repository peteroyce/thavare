import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './products';
import { shopifyFetch } from './shopify';
import { CART_CREATE } from './shopify-queries';

export type CartItem = {
  product:   Product;
  quantity:  number;
  variantId: string;   // Shopify variant GID
};

type CartStore = {
  items:                 CartItem[];
  shopifyCartId:         string | null;
  addItem:               (product: Product) => void;
  removeItem:            (productId: string) => void;
  updateQuantity:        (productId: string, quantity: number) => void;
  clearCart:             () => void;
  totalItems:            () => number;
  totalPrice:            () => number;
  createShopifyCheckout: () => Promise<void>;
};

// Debounce guard: prevent rapid double-fires from touch events
// Exported for test access (clear between tests)
export const addItemCooldowns = new Map<string, number>();
const ADD_COOLDOWN_MS = 300;

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      shopifyCartId: null,

      addItem: (product) => {
        const now = Date.now();
        const lastAdd = addItemCooldowns.get(product.id) ?? 0;
        if (now - lastAdd < ADD_COOLDOWN_MS) return; // skip duplicate rapid fire
        addItemCooldowns.set(product.id, now);

        const existing = get().items.find(i => i.product.id === product.id);
        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }));
        } else {
          set(state => ({ items: [...state.items, { product, quantity: 1, variantId: product.variantId }] }));
        }
      },

      removeItem: (productId) => {
        set(state => ({ items: state.items.filter(i => i.product.id !== productId) }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set(state => ({
          items: state.items.map(i =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], shopifyCartId: null }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      createShopifyCheckout: async () => {
        const { items } = get();
        if (items.length === 0) return;

        const lines = items.map(i => ({
          merchandiseId: i.variantId,
          quantity: i.quantity,
        }));

        const data = await shopifyFetch<{
          cartCreate: {
            cart: { id: string; checkoutUrl: string } | null;
            userErrors: Array<{ field: string; message: string }>;
          };
        }>(CART_CREATE, { lines }, 'no-store');

        if (data.cartCreate.userErrors.length > 0) {
          throw new Error(data.cartCreate.userErrors[0].message);
        }

        const cart = data.cartCreate.cart;
        if (!cart) throw new Error('Shopify returned no cart');
        const { id, checkoutUrl } = cart;
        set({ shopifyCartId: id });
        window.location.href = checkoutUrl;
      },
    }),
    {
      name: 'thavare-cart',
      partialize: state => ({ items: state.items, shopifyCartId: state.shopifyCartId }),
    }
  )
);
