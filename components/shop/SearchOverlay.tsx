'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useUI } from '@/lib/store/ui';
import { PRODUCTS } from '@/lib/products';
import { fmtPrice } from '@/lib/format';

const POPULAR = ['طارم هاشمی', 'برنج ارگانیک', 'بسته هدیه', 'دمسیاه', 'کشت اول'];

export function SearchOverlay() {
  const open = useUI((s) => s.searchOpen);
  const setSearch = useUI((s) => s.setSearch);
  const setQuickView = useUI((s) => s.setQuickView);
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState('');

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
    else setQ('');
  }, [open]);

  const results = q.trim()
    ? PRODUCTS.filter((p) => (p.title + p.kicker + p.shortNote).toLowerCase().includes(q.trim().toLowerCase())).slice(0, 5)
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#f6f1e8]/96 backdrop-blur-lg"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearch(false);
          }}
        >
          <div className="max-w-[1100px] mx-auto px-5 py-8">
            <div className="flex justify-between items-center mb-20">
              <p className="section-eyebrow text-olive">جستجو</p>
              <button onClick={() => setSearch(false)} aria-label="بستن" className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="border-b border-[#bab2a6] flex items-center gap-4 pb-5">
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="bg-transparent text-[32px] md:text-[52px] font-light flex-1 outline-none text-ink"
                placeholder="جستجو برنج، دستور پخت، هدیه..."
              />
              <Search className="w-6 h-6 text-[#687064] shrink-0" />
            </div>

            <div className="mt-9">
              {q.trim() === '' ? (
                <>
                  <p className="section-eyebrow text-muted mb-4">جستجوهای محبوب</p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR.map((p) => (
                      <button
                        key={p}
                        onClick={() => setQ(p)}
                        className="border border-line px-4 py-2 text-[12px] hover:bg-[#ede8df] hover:border-[#b0a898] transition-all"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </>
              ) : results.length === 0 ? (
                <p className="text-muted text-[14px]">نتیجه‌ای یافت نشد</p>
              ) : (
                <div className="space-y-3">
                  <p className="section-eyebrow text-muted mb-4">نتایج ({results.length})</p>
                  {results.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSearch(false);
                        setQuickView(p);
                      }}
                      className="w-full text-right flex gap-4 items-center border-t border-line pt-3 hover:bg-paper/50 transition-colors p-2"
                    >
                      <img src={p.image} alt={p.title} className="w-14 h-16 object-cover" />
                      <div className="flex-1">
                        <p className="text-[14px] font-medium">{p.title}</p>
                        <p className="small-copy text-muted">{p.shortNote}</p>
                      </div>
                      <p className="text-[13px]">{fmtPrice(p.price)}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
