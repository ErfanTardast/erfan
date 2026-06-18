'use client';
import { create } from 'zustand';

type UIState = {
  mobileFilterOpen: boolean;
  mobileSortOpen: boolean;
  setMobileFilter: (v: boolean) => void;
  setMobileSort: (v: boolean) => void;
  closeAll: () => void;
};

export const useUI = create<UIState>((set) => ({
  mobileFilterOpen: false,
  mobileSortOpen: false,
  setMobileFilter: (v) => set({ mobileFilterOpen: v }),
  setMobileSort: (v) => set({ mobileSortOpen: v }),
  closeAll: () =>
    set({
      mobileFilterOpen: false,
      mobileSortOpen: false,
    }),
}));
