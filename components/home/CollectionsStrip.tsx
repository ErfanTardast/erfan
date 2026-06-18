import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CATALOG_COLLECTIONS, countProductsByPredicate } from '@/lib/catalog';

export function CollectionsStrip() {
  return (
    <section className="bg-rice py-14 md:py-20 field-pattern">
      <div className="site-shell">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start">
          <div>
            <p className="section-eyebrow text-cypress mb-3">کلکسیون‌ها</p>
            <h2 className="title-md text-ink">انتخاب سریع بر اساس حال و هوای سفره</h2>
            <Link href="/shop" className="mt-5 inline-flex items-center gap-2 text-[13px] text-cypress hover:text-ink transition-colors">
              همه محصولات
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {CATALOG_COLLECTIONS.map((collection) => {
              const count = countProductsByPredicate(collection.match);
              return (
                <Link
                  key={collection.slug}
                  href={collection.shopHref}
                  className="harvest-card bg-paper p-5 min-h-[168px] flex flex-col hover:border-cypress transition-colors"
                >
                  <span className="text-[12px] text-muted latin">{collection.englishLabel}</span>
                  <span className="text-[18px] font-semibold text-ink mt-2">{collection.label}</span>
                  <span className="small-copy text-muted mt-3 leading-7">{collection.description}</span>
                  <span className="mt-auto pt-4 text-[12px] text-cypress">{count} محصول</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
