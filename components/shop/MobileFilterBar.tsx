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
};

export function MobileFilterBar({ activeCount }: { activeCount: number }) {
  const setMobileFilter = useUI((s) => s.setMobileFilter);
  const sortOpen = useUI((s) => s.mobileSortOpen);
  const setSortOpen = useUI((s) => s.setMobileSort);
  const { sort, setSort } = useFilters();

  return (
    <>
      <div className="sticky top-[74px] z-30 -mx-5 mb-7 flex items-center justify-between border-y border-line bg-rice/95 px-5 py-3 backdrop-blur lg:hidden">
        <button onClick={() => setMobileFilter(true)} className="flex min-h-11 items-center gap-2 text-[13px]">
          <SlidersHorizontal className="w-4 h-4" />
          <span>فیلترها</span>
          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] text-rice">
              {toFa(activeCount)}
            </span>
          )}
        </button>
        <button onClick={() => setSortOpen(true)} className="flex min-h-11 items-center gap-2 text-[13px]">
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
              className="fixed inset-0 z-[59] bg-ink/45"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
              className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-paper p-6 shadow-[0_-22px_70px_rgba(23,33,26,0.18)]"
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
                    className={`block min-h-11 w-full text-right text-[14px] ${sort === k ? 'text-cypress font-medium' : 'text-muted'}`}
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
