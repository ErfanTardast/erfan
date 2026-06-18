'use client';
import { Search, ChevronDown, LayoutGrid, Grid3x3 } from 'lucide-react';
import { useState } from 'react';
import { useFilters, type SortKey } from '@/lib/store/filters';
import { toFa } from '@/lib/format';

const SORT_LABELS: Record<SortKey, string> = {
  featured: 'پیشنهادی',
  newest: 'جدیدترین',
  'price-asc': 'ارزان‌تر',
  'price-desc': 'گران‌تر',
  rating: 'بیشترین امتیاز',
};

type Props = { count: number; gridCols: 2 | 3; onGridChange: (n: 2 | 3) => void };

export function Toolbar({ count, gridCols, onGridChange }: Props) {
  const { sort, setSort, search, setSearch } = useFilters();
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="harvest-card bg-paper p-4 md:p-5 mb-8">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
        <div>
          <p className="section-eyebrow text-cypress mb-2">کاتالوگ محصولات</p>
          <h2 className="title-md text-ink">همه محصولات</h2>
          <p className="small-copy text-muted mt-1">{toFa(count)} محصول آماده خرید</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <label className="min-h-11 border border-line bg-rice flex items-center gap-2 px-3 min-w-[240px]">
            <Search className="w-4 h-4 text-muted shrink-0" />
            <span className="sr-only">جستجو در محصولات</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="bg-transparent text-[13px] flex-1 outline-none"
              placeholder="جستجو در محصولات"
            />
          </label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setSortOpen((value) => !value)}
              className="min-h-11 border border-line bg-rice px-4 text-[13px] flex items-center justify-between gap-4 hover:border-ink transition-colors min-w-[170px]"
              aria-expanded={sortOpen}
            >
              <span>{SORT_LABELS[sort]}</span>
              <ChevronDown className="w-4 h-4 text-muted" />
            </button>
            {sortOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setSortOpen(false)} />
                <div className="absolute top-full right-0 mt-1 bg-paper border border-line min-w-[190px] z-30 shadow-lg">
                  {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setSort(key);
                        setSortOpen(false);
                      }}
                      className={`block w-full text-right px-4 py-3 text-[13px] hover:bg-rice transition-colors ${
                        sort === key ? 'text-cypress font-semibold' : 'text-muted'
                      }`}
                    >
                      {SORT_LABELS[key]}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => onGridChange(2)}
              aria-label="نمای دو ستون"
              className={`w-11 h-11 border inline-flex items-center justify-center transition-colors ${
                gridCols === 2 ? 'border-ink bg-ink text-rice' : 'border-line bg-rice hover:border-ink'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onGridChange(3)}
              aria-label="نمای سه ستون"
              className={`w-11 h-11 border inline-flex items-center justify-center transition-colors ${
                gridCols === 3 ? 'border-ink bg-ink text-rice' : 'border-line bg-rice hover:border-ink'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
