'use client';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { selectProducts } from '@/lib/catalog/selectors';
import { useFilters } from '@/lib/store/filters';
import { ProductCard } from './ProductCard';
import { EditorialBanner } from './EditorialBanner';
import { Toolbar } from './Toolbar';
import { ActiveFilters } from './ActiveFilters';

export function ProductGrid() {
  const filters = useFilters();
  const [gridCols, setGridCols] = useState<2 | 3>(3);

  const visible = useMemo(() => selectProducts(filters, filters.sort), [filters]);

  return (
    <section>
      <Toolbar count={visible.length} gridCols={gridCols} onGridChange={setGridCols} />
      <ActiveFilters />

      {visible.length === 0 ? (
        <div className="harvest-card field-pattern py-20 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center bg-paper text-cypress">
            <SearchX className="h-6 w-6" />
          </div>
          <p className="text-[16px] font-medium mb-2">محصولی پیدا نشد</p>
          <p className="small-copy text-muted mb-8 max-w-[260px] mx-auto leading-relaxed">
            فیلترهای انتخابی با هیچ محصولی مطابقت ندارد. فیلترها را تغییر دهید یا پاک کنید.
          </p>
          <button
            onClick={filters.clear}
            className="cta-ink inline-flex h-11 items-center justify-center px-7 text-[12px]"
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
