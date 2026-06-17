import Link from 'next/link';
import { CATALOG_COLLECTIONS, countProductsByPredicate } from '@/lib/catalog';

export function CollectionsStrip() {
  return (
    <section className="bg-sand border-t border-ink/8 py-5">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="flex items-center gap-3 flex-wrap">
          <p className="flex items-center gap-2 text-[10px] tracking-[0.18em] text-muted shrink-0 ml-1">
            <span className="w-5 h-px bg-[var(--terra)] inline-block" />
            دسته‌بندی‌ها
          </p>
          {CATALOG_COLLECTIONS.map((collection) => {
            const count = countProductsByPredicate(collection.match);
            return (
              <Link
                key={collection.slug}
                href={collection.shopHref}
                className="group inline-flex flex-col items-start px-4 py-1.5 border border-ink/15 hover:border-[var(--terra)]/50 hover:bg-cream transition-colors duration-200"
              >
                <span className="flex items-center gap-1.5 text-[12px] tracking-[0.04em] text-ink leading-tight">
                  {collection.label}
                  {count > 0 && <span className="text-[10px] text-muted">({count})</span>}
                </span>
                <span className="latin text-[8px] tracking-[0.14em] text-muted group-hover:text-[var(--terra)] transition-colors">
                  {collection.englishLabel}
                </span>
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
