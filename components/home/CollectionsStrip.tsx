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
          <p className="text-[10px] tracking-[0.18em] text-muted shrink-0 ml-1">دسته‌بندی‌ها:</p>
          {COLLECTIONS.map((col) => {
            const count = PRODUCTS.filter((p) => p.collection === col.id).length;
            return (
              <Link
                key={col.id}
                href={`/shop?collection=${col.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-ink/15 hover:border-ink/40 hover:bg-cream transition-colors duration-150 text-[12px] tracking-[0.06em] text-ink"
              >
                <span>{col.label}</span>
                {count > 0 && (
                  <span className="text-[10px] text-muted">({count})</span>
                )}
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
