import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CATALOG_COLLECTIONS, countProductsByPredicate } from '@/lib/catalog';
import { toFa } from '@/lib/format';

const ACCENTS = ['text-cypress', 'text-indigo', 'text-clay', 'text-gold'];

export function CollectionsStrip() {
  return (
    <section className="border-b border-line bg-cream py-16 md:py-24">
      <div className="site-shell">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-eyebrow mb-4 text-indigo">راهنمای انتخاب</p>
            <h2 className="max-w-[420px] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.15] text-ink">
              بر اساس سفره انتخاب کنید.
            </h2>
            <p className="body-copy mt-5 max-w-[430px] text-muted">
              اگر نام رقم‌ها را نمی‌دانید، از کاربرد شروع کنید؛ مهمانی، مصرف روزانه، برداشت محدود یا ذخیره اعلا.
            </p>
            <Link href="/shop" className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-ink text-[13px] font-semibold text-ink transition-colors hover:border-gold hover:text-cypress">
              ورود به فروشگاه
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="border-t border-line">
            {CATALOG_COLLECTIONS.map((collection, index) => {
              const count = countProductsByPredicate(collection.match);
              return (
                <Link
                  key={collection.slug}
                  href={collection.shopHref}
                  className="group grid min-h-[150px] grid-cols-[56px_1fr_auto] items-center gap-4 border-b border-line py-6 transition-colors hover:bg-paper md:grid-cols-[80px_1fr_140px]"
                >
                  <span className={`latin text-[24px] ${ACCENTS[index]}`}>{toFa(index + 1).padStart(2, '۰')}</span>
                  <span>
                    <span className="block text-[24px] font-semibold text-ink transition-transform duration-200 group-hover:-translate-x-1 md:text-[30px]">
                      {collection.label}
                    </span>
                    <span className="mt-2 block max-w-[540px] text-[13px] leading-7 text-muted">{collection.description}</span>
                  </span>
                  <span className="flex items-center justify-end gap-3 text-[12px] text-muted">
                    <span className="hidden md:inline">{count} محصول</span>
                    <ArrowLeft className="h-4 w-4 text-cypress transition-transform duration-200 group-hover:-translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
