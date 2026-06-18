'use client';
import { Search, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/store/cart';
import { useUI } from '@/lib/store/ui';
import { useSearchStore } from '@/stores/search-store';
import { toFa } from '@/lib/format';

export function StickyMobileBar() {
  const cartItems = useCart((s) => s.items);
  const openCart = useCart((s) => s.open);
  const openSearch = useSearchStore((s) => s.open);
  const setMobileFilter = useUI((s) => s.setMobileFilter);

  const cartCount = cartItems.reduce((n, i) => n + i.qty, 0);

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/96 shadow-[0_-12px_40px_rgba(23,33,26,0.12)] backdrop-blur lg:hidden safe-area-pb"
    >
      <div className="flex h-[64px] items-center px-2">
        <button
          onClick={openSearch}
          className="flex min-h-12 flex-1 flex-col items-center justify-center gap-1 text-muted transition-colors hover:text-ink"
          aria-label="جستجو"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px]">جستجو</span>
        </button>

        <button
          onClick={() => setMobileFilter(true)}
          className="flex min-h-12 flex-1 flex-col items-center justify-center gap-1 text-muted transition-colors hover:text-ink"
          aria-label="فیلترها"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="text-[10px]">فیلترها</span>
        </button>

        <button
          onClick={openCart}
          className="relative flex min-h-12 flex-1 flex-col items-center justify-center gap-1 text-muted transition-colors hover:text-ink"
          aria-label="سبد خرید"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px]">سبد خرید</span>
          {cartCount > 0 && (
            <span className="absolute top-1.5 right-[calc(50%-14px)] flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-ink px-1 text-[9px] font-bold leading-none text-rice">
              {toFa(cartCount)}
            </span>
          )}
        </button>
      </div>
    </motion.div>
  );
}
