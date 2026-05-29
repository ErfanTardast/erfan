'use client';
import { Search, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/store/cart';
import { useUI } from '@/lib/store/ui';
import { toFa } from '@/lib/format';

export function StickyMobileBar() {
  const cartItems = useCart((s) => s.items);
  const openCart = useCart((s) => s.open);
  const setSearch = useUI((s) => s.setSearch);
  const setMobileFilter = useUI((s) => s.setMobileFilter);

  const cartCount = cartItems.reduce((n, i) => n + i.qty, 0);

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-ink/95 backdrop-blur-md border-t border-cream/10 safe-area-pb"
    >
      <div className="flex items-center h-[60px] px-2">
        <button
          onClick={() => setSearch(true)}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-cream/70 hover:text-cream transition-colors"
          aria-label="جستجو"
        >
          <Search className="w-5 h-5" />
          <span className="text-[9px] tracking-[0.1em]">جستجو</span>
        </button>

        <button
          onClick={() => setMobileFilter(true)}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-cream/70 hover:text-cream transition-colors"
          aria-label="فیلترها"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="text-[9px] tracking-[0.1em]">فیلترها</span>
        </button>

        <button
          onClick={openCart}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 relative text-cream/70 hover:text-cream transition-colors"
          aria-label="سبد خرید"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[9px] tracking-[0.1em]">سبد خرید</span>
          {cartCount > 0 && (
            <span className="absolute top-1.5 right-[calc(50%-14px)] bg-gold text-ink rounded-full w-[16px] h-[16px] text-[9px] flex items-center justify-center font-bold leading-none">
              {toFa(cartCount)}
            </span>
          )}
        </button>
      </div>
    </motion.div>
  );
}
