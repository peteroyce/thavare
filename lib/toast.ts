// lib/toast.ts
import { create } from 'zustand';

export type ToastType = 'cart-add' | 'cart-update' | 'wishlist-add' | 'wishlist-remove';

export interface Toast {
  id: string;
  type: ToastType;
  productName: string;
  count?: number;    // total cart items OR total wishlist items
  quantity?: number; // for cart-update: new qty of this specific product
}

interface ToastStore {
  toasts: Toast[];
  add: (toast: Omit<Toast, 'id'>) => void;
  remove: (id: string) => void;
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  add: (toast) =>
    set((state) => ({
      toasts: [
        { ...toast, id: Date.now().toString(36) + Math.random().toString(36).slice(2) },
        ...state.toasts,
      ].slice(0, 3),
    })),
  remove: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
