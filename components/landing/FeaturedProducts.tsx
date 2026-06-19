import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PRODUCTS, type Product } from '@/lib/products';
import { ProductCard } from '@/components/shop/ProductCard';

const PICKS = ['1', '3', '5', '2'];

export function FeaturedProducts() {
  const products = PICKS.map((id) => PRODUCTS.find((product) => product.id === id)).filter(
    (product): product is Product => Boolean(product)
  );

  return (
    <section id="featured-products" className="paper-texture border-b border-line py-16 md:py-24">
      <div className="site-shell">
        <div className="mb-10 flex flex-col gap-5 border-b border-line pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-eyebrow mb-3 text-indigo">انتخاب از دفتر برداشت</p>
            <h2 className="title-lg max-w-[760px] font-semibold text-ink">چهار برنج، برای چهار نوع سفره</h2>
            <p className="body-copy mt-3 max-w-[650px] text-muted">
              هر محصول با کاربرد، عطر، منطقه کشت و قیمت کامل بسته معرفی شده است.
            </p>
          </div>
          <Link href="/shop" className="inline-flex min-h-11 items-center gap-2 text-[14px] text-cypress hover:text-ink">
            مشاهده همه محصولات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <ProductCard product={products[0]} featured />
          <div className="grid gap-5 sm:grid-cols-2">
            {products.slice(1, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="lg:col-span-2">
            <ProductCard product={products[3]} featured />
          </div>
        </div>
      </div>
    </section>
  );
}
