'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CartItem = { id: string; qty: number };

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (id) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === id);
          if (existing) {
            return { items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) };
          }
          return { items: [...s.items, { id, qty: 1 }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      inc: (id) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
        })),
      dec: (id) =>
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    {
      name: 'darya-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
    }
  )
);
