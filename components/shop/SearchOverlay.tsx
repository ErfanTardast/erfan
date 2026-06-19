'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { useSearchStore } from '@/stores/search-store';
import { useQuickViewStore } from '@/stores/quick-view-store';
import { useHistory } from '@/lib/store/history';
import { PRODUCTS } from '@/lib/products';
import { fmtPackPrice } from '@/lib/format';
import { EASE } from '@/lib/motion';
import { useDebounce } from '@/hooks/useDebounce';

const TRENDING = ['طارم هاشمی', 'برنج ارگانیک', 'بسته هدیه', 'دمسیاه', 'کشت اول'];

export function SearchOverlay() {
  const open = useSearchStore((s) => s.isOpen);
  const setSearch = useSearchStore((s) => s.setOpen);
  const openQuickView = useQuickViewStore((s) => s.open);
  const addRecentSearch = useHistory((s) => s.addRecentSearch);
  const recentSearches = useHistory((s) => s.recentSearches);
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState('');
  const [focused, setFocused] = useState(-1);
  const deferredQuery = useDebounce(q, 180);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
    else { setQ(''); setFocused(-1); }
  }, [open]);

  const results = deferredQuery.trim()
    ? PRODUCTS.filter((p) =>
        (p.title + p.kicker + p.shortNote).toLowerCase().includes(deferredQuery.trim().toLowerCase())
      ).slice(0, 6)
    : [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') { setSearch(false); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocused((f) => Math.min(f + 1, results.length - 1)); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); setFocused((f) => Math.max(f - 1, -1)); return; }
    if (e.key === 'Enter' && results.length > 0) {
      const target = results[Math.max(0, focused)];
      addRecentSearch(q.trim());
      setSearch(false);
      openQuickView(target);
    }
  };

  const selectResult = (p: (typeof PRODUCTS)[0]) => {
    addRecentSearch(q.trim() || p.title);
    setSearch(false);
    openQuickView(p);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-rice/97 backdrop-blur-xl"
          onClick={(e) => { if (e.target === e.currentTarget) setSearch(false); }}
        >
          <div className="max-w-[960px] mx-auto px-5 py-8">
            <div className="flex justify-between items-center mb-16 md:mb-24">
              <div className="flex items-center gap-3.5">
                <span className="block h-px w-12 bg-[var(--terra)]" />
                <p className="section-eyebrow text-olive">جستجو</p>
                <span className="latin italic text-[14px] text-muted">Search</span>
              </div>
              <button
                onClick={() => setSearch(false)}
                aria-label="بستن"
                className="flex h-11 w-11 items-center justify-center border border-line bg-paper transition-colors hover:bg-sand"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input */}
            <div className="flex items-center gap-4 border-b border-line pb-5">
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => { setQ(e.target.value); setFocused(-1); }}
                onKeyDown={handleKeyDown}
                className="bg-transparent text-[clamp(24px,5vw,52px)] font-light flex-1 outline-none text-ink placeholder-ink/30"
                placeholder="جستجو کنید..."
                aria-label="جستجو"
              />
              {q && (
                <button onClick={() => setQ('')} aria-label="پاک کردن جستجو" className="flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-ink">
                  <X className="w-4 h-4" />
                </button>
              )}
              <Search className="w-5 h-5 text-muted shrink-0" />
            </div>

            {/* Results area */}
            <div className="mt-8">
              {q.trim() === '' ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Recent searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 section-eyebrow text-muted">
                          <Clock className="w-3.5 h-3.5" />
                          <span>جستجوهای اخیر</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((s) => (
                          <button
                            key={s}
                            onClick={() => setQ(s)}
                            className="min-h-11 border border-line bg-paper px-3.5 text-[12px] transition-all hover:border-cypress hover:bg-sand"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Trending */}
                  <div>
                    <div className="flex items-center gap-2 section-eyebrow text-muted mb-4">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>محبوب‌ترین‌ها</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING.map((t) => (
                        <button
                          key={t}
                          onClick={() => setQ(t)}
                          className="min-h-11 border border-line bg-paper px-3.5 text-[12px] transition-all hover:border-cypress hover:bg-sand"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-[16px] text-muted mb-2">نتیجه‌ای پیدا نشد</p>
                  <p className="small-copy text-muted">جستجوی دیگری امتحان کنید</p>
                </div>
              ) : (
                <div>
                  <p className="section-eyebrow text-muted mb-5">
                    {results.length} نتیجه یافت شد
                  </p>
                  <div className="space-y-1">
                    {results.map((p, i) => (
                      <motion.button
                        key={p.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3, ease: EASE }}
                        onClick={() => selectResult(p)}
                        className={`w-full text-right flex gap-4 items-center py-3 px-3 transition-colors ${
                          focused === i ? 'bg-sand' : 'hover:bg-paper'
                        }`}
                      >
                        <span className="relative w-14 h-16 shrink-0 overflow-hidden bg-sand">
                          <Image src={p.image} alt={p.title} fill sizes="56px" className="object-cover" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium">{p.title}</p>
                          <p className="small-copy text-muted mt-0.5 truncate">{p.shortNote}</p>
                        </div>
                        <p className="shrink-0 text-[12px] text-muted">{fmtPackPrice(p.packPrice, p.weightKg)}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
