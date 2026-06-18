import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/shop/Header';
import { Footer } from '@/components/shop/Footer';
import type { CatalogFacet } from '@/lib/catalog/facets';
import type { Product } from '@/lib/products';
import { fmtPrice } from '@/lib/format';

export function CatalogLandingPage({
  facet,
  products,
}: {
  facet: CatalogFacet;
  products: Product[];
}) {
  return (
    <>
      <Header />
      <main className="bg-rice min-h-screen field-pattern">
        <section className="site-shell py-12 md:py-20">
          <div className="grid lg:grid-cols-[1fr_430px] gap-8 lg:gap-12 items-end border-b border-line pb-10">
            <div>
              <p className="section-eyebrow text-cypress mb-4">{facet.englishLabel}</p>
              <h1 className="text-[clamp(42px,7vw,86px)] leading-[1.06] font-semibold text-ink max-w-[860px]">
                {facet.label}
              </h1>
              <p className="body-copy text-muted leading-[2] max-w-[620px] mt-5">{facet.description}</p>
            </div>
            <div className="harvest-card bg-paper p-5">
              <p className="section-eyebrow text-cypress mb-3">مسیر خرید</p>
              <p className="small-copy text-muted leading-7 mb-5">
                این صفحه محصولات مرتبط را خلاصه می‌کند. برای فیلتر کامل، وارد فروشگاه شوید.
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link href={facet.shopHref} className="cta-ink inline-flex items-center justify-center gap-2 px-6 py-3 text-[13px]">
                  خرید این دسته
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <Link href="/shop" className="cta-outline inline-flex items-center justify-center px-6 py-3 text-[13px]">
                  مشاهده همه محصولات
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="site-shell pb-20 md:pb-28">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <p className="section-eyebrow text-cypress mb-3">محصولات مرتبط</p>
              <h2 className="title-md text-ink">{products.length} انتخاب آماده خرید</h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {products.map((product) => (
              <article key={product.id} className="group harvest-card bg-paper overflow-hidden">
                <Link href={`/product/${product.slug}`} className="block">
                  <div className="aspect-[4/5] overflow-hidden bg-sand">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[12px] text-cypress mb-2">{product.kicker}</p>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="product-title group-hover:text-cypress transition-colors">{product.title}</h3>
                      <p className="text-[13px] whitespace-nowrap text-ink">{fmtPrice(product.price)}</p>
                    </div>
                    <p className="small-copy text-muted mt-2 line-clamp-2">{product.shortNote}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
