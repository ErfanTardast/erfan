'use client';
import { create } from 'zustand';

type MobileMenuState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setOpen: (isOpen: boolean) => void;
};

export const useMobileMenuStore = create<MobileMenuState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setOpen: (isOpen) => set({ isOpen }),
}));
