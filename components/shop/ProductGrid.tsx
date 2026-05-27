'use client';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PRODUCTS, type Product } from '@/lib/products';
import { useFilters } from '@/lib/store/filters';
import { ProductCard } from './ProductCard';
import { EditorialBanner } from './EditorialBanner';
import { Toolbar } from './Toolbar';
import { ActiveFilters } from './ActiveFilters';

function applyFilters(list: Product[], f: ReturnType<typeof useFilters.getState>): Product[] {
  return list.filter((p) => {
    if (f.types.size > 0 && !f.types.has(p.type)) return false;
    if (f.regions.size > 0 && !f.regions.has(p.region)) return false;
    if (f.aromas.size > 0 && !f.aromas.has(p.aroma)) return false;
    if (f.grains.size > 0 && !f.grains.has(p.grain)) return false;
    if (f.weights.size > 0 && !f.weights.has(p.weightKg)) return false;
    if (p.price < f.priceMin || p.price > f.priceMax) return false;
    if (f.organic && !p.organic) return false;
    if (f.premium && !p.premium) return false;
    if (f.inStockOnly && !p.inStock) return false;
    if (f.search.trim()) {
      const q = f.search.trim().toLowerCase();
      const hay = (p.title + ' ' + p.kicker + ' ' + p.shortNote).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function applySort(list: Product[], sort: ReturnType<typeof useFilters.getState>['sort']): Product[] {
  const copy = [...list];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return copy.sort((a, b) => Number(b.isNew || 0) - Number(a.isNew || 0));
    default:
      return copy.sort((a, b) => Number(b.isFeatured || 0) - Number(a.isFeatured || 0));
  }
}

export function ProductGrid() {
  const filters = useFilters();
  const [gridCols, setGridCols] = useState<2 | 3>(3);

  const visible = useMemo(() => applySort(applyFilters(PRODUCTS, filters), filters.sort), [filters]);

  return (
    <section>
      <Toolbar count={visible.length} gridCols={gridCols} onGridChange={setGridCols} />
      <ActiveFilters />

      {visible.length === 0 ? (
        <div className="border border-line py-20 text-center">
          <p className="text-[15px] mb-2">محصولی با این فیلترها پیدا نشد</p>
          <p className="small-copy text-muted mb-6">فیلترها را تغییر دهید یا پاک کنید</p>
          <button
            onClick={filters.clear}
            className="border border-deep px-6 py-2.5 text-[12px] hover:bg-deep hover:text-white transition-all"
          >
            پاک کردن فیلترها
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className={`grid sm:grid-cols-2 ${gridCols === 3 ? 'xl:grid-cols-3' : ''} gap-x-6 gap-y-14`}
        >
          <AnimatePresence mode="popLayout">
            {visible.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
            {visible.length > 4 && <EditorialBanner key="banner" />}
            {visible.slice(4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <div className="text-center mt-16 pt-10 border-t border-line">
        <p className="small-copy text-muted mb-5">
          نمایش {visible.length === PRODUCTS.length ? 'همه' : visible.length} محصول
        </p>
      </div>
    </section>
  );
}
