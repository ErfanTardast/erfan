'use client';
import { ArrowLeft, ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, type Product } from '@/lib/products';
import { fmtPriceShort, toFa } from '@/lib/format';
import { useCart } from '@/lib/store/cart';
import { toast } from 'sonner';

const PICKS = ['1', '3', '5', '2'];

export function FeaturedProducts() {
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const products = PICKS.map((id) => PRODUCTS.find((p) => p.id === id)).filter((p): p is Product => Boolean(p));

  return (
    <section className="bg-paper py-14 md:py-20 border-y border-line">
      <div className="site-shell">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-9">
          <div>
            <p className="section-eyebrow text-cypress mb-3">محصولات منتخب</p>
            <h2 className="title-lg text-ink">خرید سریع از پرفروش‌های کیوان</h2>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 text-[14px] text-cypress hover:text-ink transition-colors">
            مشاهده همه محصولات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {products.map((product) => (
            <FeaturedCard
              key={product.id}
              product={product}
              onAdd={() => {
                add(product.id);
                openCart();
                toast.success('به سبد اضافه شد', { description: product.title });
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const [adding, setAdding] = useState(false);
  const filled = Math.round(product.rating);

  const handleAdd = () => {
    setAdding(true);
    onAdd();
    setTimeout(() => setAdding(false), 450);
  };

  return (
    <article className="group harvest-card bg-rice flex flex-col">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/4.6] overflow-hidden bg-sand">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {product.badge && (
            <span className="absolute top-3 right-3 bg-paper/95 text-ink border border-line px-3 py-1.5 text-[11px]">
              {product.badge.label}
            </span>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[12px] text-cypress mb-2">{product.kicker}</p>
        <Link href={`/product/${product.slug}`} className="product-title text-ink hover:text-cypress transition-colors">
          {product.title}
        </Link>
        <p className="small-copy text-muted mt-2 line-clamp-2">{product.shortNote}</p>

        <div className="flex items-center gap-1.5 mt-3 text-[12px] text-muted">
          <span className="flex gap-0.5 text-saffron" aria-label={`${toFa(product.rating)} از ۵`}>
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} className={`w-3.5 h-3.5 ${index < filled ? 'fill-current' : ''}`} />
            ))}
          </span>
          <span>({toFa(product.reviewCount)})</span>
        </div>

        <div className="mt-auto pt-4 flex items-center gap-3">
          <p className="text-[15px] font-semibold text-ink whitespace-nowrap">
            {fmtPriceShort(product.price)} <span className="text-[11px] text-muted font-normal">ت</span>
          </p>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.inStock || adding}
            className="cta-ink mr-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-4 h-4" />
            {adding ? '...' : product.inStock ? 'افزودن' : 'ناموجود'}
          </button>
        </div>
      </div>
    </article>
  );
}
