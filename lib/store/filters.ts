'use client';
import { create } from 'zustand';
import type { RiceType, Region, Aroma, GrainLength } from '@/lib/products';

export type SortKey = 'featured' | 'newest' | 'price-asc' | 'price-desc';

type FilterState = {
  types: Set<RiceType>;
  regions: Set<Region>;
  aromas: Set<Aroma>;
  grains: Set<GrainLength>;
  weights: Set<2 | 3 | 5 | 10>;
  priceMin: number;
  priceMax: number;
  organic: boolean;
  premium: boolean;
  inStockOnly: boolean;
  search: string;
  sort: SortKey;
  toggleType: (t: RiceType) => void;
  toggleRegion: (r: Region) => void;
  toggleAroma: (a: Aroma) => void;
  toggleGrain: (g: GrainLength) => void;
  toggleWeight: (w: 2 | 3 | 5 | 10) => void;
  setOrganic: (v: boolean) => void;
  setPremium: (v: boolean) => void;
  setSearch: (v: string) => void;
  setSort: (s: SortKey) => void;
  setPriceRange: (min: number, max: number) => void;
  clear: () => void;
};

const ALL_PRICE_MIN = 140000;
const ALL_PRICE_MAX = 240000;

const toggleSet = <T>(set: Set<T>, v: T): Set<T> => {
  const next = new Set(set);
  if (next.has(v)) next.delete(v);
  else next.add(v);
  return next;
};

export const useFilters = create<FilterState>((set) => ({
  types: new Set<RiceType>(),
  regions: new Set<Region>(),
  aromas: new Set<Aroma>(),
  grains: new Set<GrainLength>(),
  weights: new Set<2 | 3 | 5 | 10>(),
  priceMin: ALL_PRICE_MIN,
  priceMax: ALL_PRICE_MAX,
  organic: false,
  premium: false,
  inStockOnly: false,
  search: '',
  sort: 'featured',
  toggleType: (t) => set((s) => ({ types: toggleSet(s.types, t) })),
  toggleRegion: (r) => set((s) => ({ regions: toggleSet(s.regions, r) })),
  toggleAroma: (a) => set((s) => ({ aromas: toggleSet(s.aromas, a) })),
  toggleGrain: (g) => set((s) => ({ grains: toggleSet(s.grains, g) })),
  toggleWeight: (w) => set((s) => ({ weights: toggleSet(s.weights, w) })),
  setOrganic: (v) => set({ organic: v }),
  setPremium: (v) => set({ premium: v }),
  setSearch: (v) => set({ search: v }),
  setSort: (s) => set({ sort: s }),
  setPriceRange: (min, max) => set({ priceMin: min, priceMax: max }),
  clear: () =>
    set({
      types: new Set(),
      regions: new Set(),
      aromas: new Set(),
      grains: new Set(),
      weights: new Set(),
      priceMin: ALL_PRICE_MIN,
      priceMax: ALL_PRICE_MAX,
      organic: false,
      premium: false,
      inStockOnly: false,
      search: '',
      sort: 'featured',
    }),
}));

export const PRICE_BOUNDS = { min: ALL_PRICE_MIN, max: ALL_PRICE_MAX };
