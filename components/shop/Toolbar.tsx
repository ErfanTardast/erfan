'use client';
import { Search, ChevronDown, LayoutGrid, Grid3x3 } from 'lucide-react';
import { useState } from 'react';
import { useFilters, type SortKey } from '@/lib/store/filters';
import { toFa } from '@/lib/format';

const SORT_LABELS: Record<SortKey, string> = {
  featured: 'پیشنهادی',
  newest: 'جدیدترین',
  'price-asc': 'قیمت: کم به زیاد',
  'price-desc': 'قیمت: زیاد به کم',
  rating: 'بیشترین امتیاز',
};

type Props = { count: number; gridCols: 2 | 3; onGridChange: (n: 2 | 3) => void };

export function Toolbar({ count, gridCols, onGridChange }: Props) {
  const { sort, setSort, search, setSearch } = useFilters();
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
      <div>
        <p className="section-eyebrow text-olive mb-3">مجموعه بهاره ۱۴۰۳</p>
        <h2 className="title-lg">همه محصولات</h2>
        <p className="small-copy text-muted mt-2">{toFa(count)} محصول برگزیده</p>
      </div>
      <div className="hidden md:flex items-center gap-3">
        <div className="border-b border-[#cfc7bb] flex items-center gap-2 pb-2 min-w-[200px]">
          <Search className="w-4 h-4 text-[#7b7b70] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-[12px] flex-1 outline-none"
            placeholder="جستجو در مجموعه"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setSortOpen((v) => !v)}
            className="border border-[#d2cabd] px-4 py-3 text-[12px] flex items-center gap-3 hover:border-[#b0a898] transition-colors"
          >
            <span>{SORT_LABELS[sort]}</span>
            <ChevronDown className="w-4 h-4 opacity-60" />
          </button>
          {sortOpen && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setSortOpen(false)} />
              <div className="absolute top-full right-0 mt-1 bg-paper border border-line min-w-[210px] z-30 shadow-lg">
                {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      setSort(k);
                      setSortOpen(false);
                    }}
                    className={`block w-full text-right px-4 py-2.5 text-[12px] hover:bg-[#f0ebe0] transition-colors ${
                      sort === k ? 'text-olive font-medium' : ''
                    }`}
                  >
                    {SORT_LABELS[k]}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <button
          onClick={() => onGridChange(2)}
          aria-label="نمای ۲ ستون"
          className={`p-3 transition-colors ${
            gridCols === 2 ? 'border border-deep bg-deep text-white' : 'border border-[#d2cabd] hover:bg-[#ede8df]'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
        <button
          onClick={() => onGridChange(3)}
          aria-label="نمای ۳ ستون"
          className={`p-3 transition-colors ${
            gridCols === 3 ? 'border border-deep bg-deep text-white' : 'border border-[#d2cabd] hover:bg-[#ede8df]'
          }`}
        >
          <Grid3x3 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
