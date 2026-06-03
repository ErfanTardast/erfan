import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';

const COLLECTIONS = [
  { id: 'chef-choice',      label: 'انتخاب سرآشپز',  en: "Chef's Choice" },
  { id: 'rare-harvest',     label: 'برداشت نادر',     en: 'Rare Harvest' },
  { id: 'limited-seasonal', label: 'فصلی محدود',      en: 'Limited Seasonal' },
  { id: 'aged-reserve',     label: 'ذخیره اعلا',      en: 'Aged Reserve' },
] as const;

export function CollectionsStrip() {
  return (
    <section className="bg-sand border-t border-ink/8 py-5">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="flex items-center gap-3 flex-wrap">
          <p className="flex items-center gap-2 text-[10px] tracking-[0.18em] text-muted shrink-0 ml-1">
            <span className="w-5 h-px bg-[var(--terra)] inline-block" />
            دسته‌بندی‌ها
          </p>
          {COLLECTIONS.map((col) => {
            const count = PRODUCTS.filter((p) => p.collection === col.id).length;
            return (
              <Link
                key={col.id}
                href={`/shop?collection=${col.id}`}
                className="group inline-flex flex-col items-start px-4 py-1.5 border border-ink/15 hover:border-[var(--terra)]/50 hover:bg-cream transition-colors duration-200"
              >
                <span className="flex items-center gap-1.5 text-[12px] tracking-[0.04em] text-ink leading-tight">
                  {col.label}
                  {count > 0 && <span className="text-[10px] text-muted">({count})</span>}
                </span>
                <span className="latin text-[8px] tracking-[0.14em] text-muted group-hover:text-[var(--terra)] transition-colors">{col.en}</span>
              </Link>
            );
          })}
          <Link
            href="/shop"
            className="mr-auto text-[11px] tracking-[0.12em] text-olive hover:text-ink transition-colors duration-150"
          >
            همه محصولات ←
          </Link>
        </div>
      </div>
    </section>
  );
}
