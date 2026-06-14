'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type HistoryState = {
  recentlyViewed: string[];
  recentSearches: string[];
  addRecentlyViewed: (id: string) => void;
  addRecentSearch: (q: string) => void;
  clearHistory: () => void;
};

export const useHistory = create<HistoryState>()(
  persist(
    (set) => ({
      recentlyViewed: [],
      recentSearches: [],
      addRecentlyViewed: (id) =>
        set((s) => ({
          recentlyViewed: [id, ...s.recentlyViewed.filter((x) => x !== id)].slice(0, 8),
        })),
      addRecentSearch: (q) =>
        set((s) => ({
          recentSearches: [q, ...s.recentSearches.filter((x) => x !== q)].slice(0, 6),
        })),
      clearHistory: () => set({ recentlyViewed: [], recentSearches: [] }),
    }),
    {
      name: 'keyvan-history',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
