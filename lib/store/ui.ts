'use client';
import { create } from 'zustand';
import type { Product } from '@/lib/products';

type UIState = {
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  mobileFilterOpen: boolean;
  mobileSortOpen: boolean;
  quickViewProduct: Product | null;
  toast: { title: string; sub: string; key: number } | null;
  recentlyViewed: string[];
  recentSearches: string[];
  setSearch: (v: boolean) => void;
  setMobileMenu: (v: boolean) => void;
  setMobileFilter: (v: boolean) => void;
  setMobileSort: (v: boolean) => void;
  setQuickView: (p: Product | null) => void;
  showToast: (title: string, sub: string) => void;
  closeAll: () => void;
  addRecentlyViewed: (id: string) => void;
  addRecentSearch: (q: string) => void;
};

export const useUI = create<UIState>((set) => ({
  searchOpen: false,
  mobileMenuOpen: false,
  mobileFilterOpen: false,
  mobileSortOpen: false,
  quickViewProduct: null,
  toast: null,
  recentlyViewed: [],
  recentSearches: [],
  setSearch: (v) => set({ searchOpen: v }),
  setMobileMenu: (v) => set({ mobileMenuOpen: v }),
  setMobileFilter: (v) => set({ mobileFilterOpen: v }),
  setMobileSort: (v) => set({ mobileSortOpen: v }),
  setQuickView: (p) => set({ quickViewProduct: p }),
  showToast: (title, sub) => set({ toast: { title, sub, key: Date.now() } }),
  closeAll: () =>
    set({
      searchOpen: false,
      mobileMenuOpen: false,
      mobileFilterOpen: false,
      mobileSortOpen: false,
      quickViewProduct: null,
    }),
  addRecentlyViewed: (id) =>
    set((s) => ({ recentlyViewed: [id, ...s.recentlyViewed.filter((x) => x !== id)].slice(0, 8) })),
  addRecentSearch: (q) =>
    set((s) => ({ recentSearches: [q, ...s.recentSearches.filter((x) => x !== q)].slice(0, 6) })),
}));
