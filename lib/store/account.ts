'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Address = {
  id: string;
  title: string;       // e.g. «خانه», «محل کار»
  recipient: string;
  phone: string;
  province: string;
  city: string;
  line: string;
  postal: string;
};

export type OrderItem = {
  id: string;
  title: string;
  weight: string;
  qty: number;
  price: number;
};

export type Order = {
  num: string;
  date: string;        // ISO
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  payMethod: string;
  status: 'processing' | 'shipped' | 'delivered';
  address?: string;
};

export type User = { name: string; email: string; phone: string };

type StoredAccount = User & {
  pass: string;
  addresses: Address[];
  orders: Order[];
};

type Result = { ok: boolean; error?: string };

type AccountState = {
  user: User | null;
  addresses: Address[];
  orders: Order[];
  _db: Record<string, StoredAccount>;
  signup: (name: string, email: string, phone: string, pass: string) => Result;
  login: (email: string, pass: string) => Result;
  logout: () => void;
  updateProfile: (patch: Partial<User>) => void;
  addAddress: (a: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  addOrder: (o: Order) => void;
};

// Trivial obfuscation — this is a client-side demo, NOT real security.
const enc = (s: string) => (typeof window !== 'undefined' ? btoa(unescape(encodeURIComponent(s))) : s);
const norm = (e: string) => e.trim().toLowerCase();

export const useAccount = create<AccountState>()(
  persist(
    (set, get) => ({
      user: null,
      addresses: [],
      orders: [],
      _db: {},

      signup: (name, email, phone, pass) => {
        const key = norm(email);
        if (!name.trim() || !key || !pass) return { ok: false, error: 'لطفاً همه فیلدها را پر کنید' };
        if (get()._db[key]) return { ok: false, error: 'این ایمیل قبلاً ثبت شده است' };
        const account: StoredAccount = {
          name: name.trim(), email: key, phone: phone.trim(),
          pass: enc(pass), addresses: [], orders: [],
        };
        set((s) => ({
          _db: { ...s._db, [key]: account },
          user: { name: account.name, email: account.email, phone: account.phone },
          addresses: [], orders: [],
        }));
        return { ok: true };
      },

      login: (email, pass) => {
        const key = norm(email);
        const acct = get()._db[key];
        if (!acct) return { ok: false, error: 'حسابی با این ایمیل یافت نشد' };
        if (acct.pass !== enc(pass)) return { ok: false, error: 'رمز عبور اشتباه است' };
        set({
          user: { name: acct.name, email: acct.email, phone: acct.phone },
          addresses: acct.addresses ?? [],
          orders: acct.orders ?? [],
        });
        return { ok: true };
      },

      logout: () => set({ user: null, addresses: [], orders: [] }),

      updateProfile: (patch) =>
        set((s) => {
          if (!s.user) return {};
          const key = s.user.email;
          const updated = { ...s.user, ...patch, email: key };
          return {
            user: updated,
            _db: { ...s._db, [key]: { ...s._db[key], ...updated } },
          };
        }),

      addAddress: (a) =>
        set((s) => {
          if (!s.user) return {};
          const key = s.user.email;
          const addr: Address = { ...a, id: Date.now().toString(36) };
          const addresses = [...s.addresses, addr];
          return { addresses, _db: { ...s._db, [key]: { ...s._db[key], addresses } } };
        }),

      removeAddress: (id) =>
        set((s) => {
          if (!s.user) return {};
          const key = s.user.email;
          const addresses = s.addresses.filter((x) => x.id !== id);
          return { addresses, _db: { ...s._db, [key]: { ...s._db[key], addresses } } };
        }),

      addOrder: (o) =>
        set((s) => {
          const orders = [o, ...s.orders];
          if (!s.user) return { orders };
          const key = s.user.email;
          return { orders, _db: { ...s._db, [key]: { ...s._db[key], orders } } };
        }),
    }),
    {
      name: 'darya-account',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
