import Link from 'next/link';
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
      <main className="bg-cream min-h-screen">
        <section className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 py-14 md:py-20">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-end border-b border-line pb-10 md:pb-14">
            <div>
              <p className="section-eyebrow text-olive mb-4">{facet.englishLabel}</p>
              <h1 className="title-lg text-ink">{facet.label}</h1>
            </div>
            <div className="lg:max-w-[560px]">
              <p className="body-copy text-muted leading-[2.1]">{facet.description}</p>
              <div className="flex flex-wrap gap-3 mt-7">
                <Link
                  href={facet.shopHref}
                  className="bg-ink text-cream px-7 py-3 text-[12px] tracking-[0.12em] hover:bg-[var(--terra)] transition-colors"
                >
                  خرید این دسته
                </Link>
                <Link
                  href="/shop"
                  className="border border-line px-7 py-3 text-[12px] tracking-[0.12em] hover:border-ink transition-colors"
                >
                  همه محصولات
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 pb-20 md:pb-28">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <p className="section-eyebrow text-olive mb-3">محصولات مرتبط</p>
              <h2 className="title-md">{products.length} انتخاب آماده خرید</h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product) => (
              <article key={product.id} className="group">
                <Link href={`/product/${product.slug}`} className="block">
                  <div className="aspect-[4/5] overflow-hidden bg-sand mb-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="section-eyebrow text-olive mb-2">{product.kicker}</p>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="product-title group-hover:text-olive transition-colors">{product.title}</h3>
                    <p className="text-[13px] whitespace-nowrap text-ink">{fmtPrice(product.price)}</p>
                  </div>
                  <p className="small-copy text-muted mt-2 line-clamp-2">{product.shortNote}</p>
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
