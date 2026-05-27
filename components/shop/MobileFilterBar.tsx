'use client';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUI } from '@/lib/store/ui';
import { useFilters, type SortKey } from '@/lib/store/filters';
import { toFa } from '@/lib/format';

const SORT_LABELS: Record<SortKey, string> = {
  featured: 'پیشنهادی',
  newest: 'جدیدترین',
  'price-asc': 'قیمت: کم به زیاد',
  'price-desc': 'قیمت: زیاد به کم',
  rating: 'بیشترین امتیاز',
};

export function MobileFilterBar({ activeCount }: { activeCount: number }) {
  const setMobileFilter = useUI((s) => s.setMobileFilter);
  const sortOpen = useUI((s) => s.mobileSortOpen);
  const setSortOpen = useUI((s) => s.setMobileSort);
  const { sort, setSort } = useFilters();

  return (
    <>
      <div className="lg:hidden sticky top-[74px] z-30 bg-cream/95 backdrop-blur border-y border-line -mx-5 px-5 py-3 mb-7 flex justify-between items-center">
        <button onClick={() => setMobileFilter(true)} className="flex items-center gap-2 text-[13px]">
          <SlidersHorizontal className="w-4 h-4" />
          <span>فیلترها</span>
          {activeCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-deep text-white text-[9px] flex items-center justify-center">
              {toFa(activeCount)}
            </span>
          )}
        </button>
        <button onClick={() => setSortOpen(true)} className="flex items-center gap-2 text-[13px]">
          <span>{SORT_LABELS[sort]}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <AnimatePresence>
        {sortOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSortOpen(false)}
              className="fixed inset-0 z-[59] bg-black/30"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-x-0 bottom-0 z-[60] bg-paper border-t border-line p-6"
            >
              <h3 className="text-[18px] font-medium mb-4">مرتب‌سازی</h3>
              <div className="space-y-1">
                {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      setSort(k);
                      setSortOpen(false);
                    }}
                    className={`block w-full text-right py-3 text-[14px] ${sort === k ? 'text-olive font-medium' : ''}`}
                  >
                    {SORT_LABELS[k]}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
