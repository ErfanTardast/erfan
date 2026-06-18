'use client';
import { create } from 'zustand';

type SearchState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setOpen: (isOpen: boolean) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setOpen: (isOpen) => set({ isOpen }),
}));
