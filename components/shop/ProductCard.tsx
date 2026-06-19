'use client';

import { Heart, MapPin, ScanEye, ShoppingBag, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AROMA_LABELS,
  REGION_LABELS,
  RICE_TYPE_LABELS,
  type Product,
} from '@/lib/products';
import { fmtPackPrice, fmtUnitPrice } from '@/lib/format';
import { useCart } from '@/lib/store/cart';
import { useWishlist } from '@/lib/store/wishlist';
import { useQuickViewStore } from '@/stores/quick-view-store';
import { useHistory } from '@/lib/store/history';
import { toast } from 'sonner';

const TONE_CLASSES: Record<NonNullable<Product['badge']>['tone'], string> = {
  neutral: 'bg-paper text-ink border-line',
  olive: 'bg-cypress text-rice border-cypress',
  gold: 'bg-saffron text-deep border-saffron',
  ink: 'bg-indigo text-rice border-indigo',
};

export function ProductCard({
  product,
  compact = false,
  featured = false,
}: {
  product: Product;
  compact?: boolean;
  featured?: boolean;
}) {
  const add = useCart((state) => state.add);
  const openCart = useCart((state) => state.open);
  const wished = useWishlist((state) => state.ids.includes(product.id));
  const toggleWish = useWishlist((state) => state.toggle);
  const openQuickView = useQuickViewStore((state) => state.open);
  const addRecentlyViewed = useHistory((state) => state.addRecentlyViewed);
  const [adding, setAdding] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const handleAdd = () => {
    setAdding(true);
    add(product.id);
    openCart();
    toast.success('به سبد اضافه شد', { description: product.title });
    window.setTimeout(() => setAdding(false), 350);
  };

  const handleQuickView = () => {
    addRecentlyViewed(product.id);
    openQuickView(product);
  };

  return (
    <article className={`group h-full overflow-hidden border border-line bg-paper transition-[box-shadow,border-color] duration-200 hover:border-gold hover:shadow-[0_24px_70px_rgba(19,37,30,0.11)] ${featured ? 'md:grid md:grid-cols-[1.08fr_0.92fr]' : 'flex flex-col'}`}>
      <div className="relative">
        <Link href={`/product/${product.slug}`} className={`relative block overflow-hidden bg-sand ${featured ? 'min-h-[420px] md:h-full' : 'aspect-[4/5]'}`}>
          <Image
            src={product.image}
            alt={`بسته ${product.title} کیوان`}
            fill
            sizes={featured ? '(min-width: 1024px) 42vw, 100vw' : '(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw'}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        </Link>

        <div className="absolute right-3 top-3 flex flex-wrap gap-2">
          {product.badge && (
            <span className={`border px-3 py-1.5 text-[11px] ${TONE_CLASSES[product.badge.tone]}`}>
              {product.badge.label}
            </span>
          )}
          <span className="border border-paper/70 bg-paper/92 px-3 py-1.5 text-[11px] text-cypress backdrop-blur-sm">
            کنترل کیفیت
          </span>
        </div>

        <div className="absolute left-3 top-3 flex gap-2">
          <button
            type="button"
            disabled={!hydrated}
            onClick={() => {
              toggleWish(product.id);
              toast.success(wished ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد', { description: product.title });
            }}
            aria-label={wished ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
            className={`flex h-11 w-11 items-center justify-center border backdrop-blur-sm transition-colors disabled:cursor-wait disabled:opacity-60 ${
              wished ? 'border-ink bg-ink text-rice' : 'border-paper/70 bg-paper/92 text-ink hover:border-gold'
            }`}
          >
            <Heart className="h-4 w-4" fill={wished ? 'currentColor' : 'none'} />
          </button>
          <button
            type="button"
            onClick={handleQuickView}
            disabled={!hydrated}
            data-testid={`quick-view-${product.id}`}
            data-hydrated={hydrated ? 'true' : 'false'}
            aria-label={`نمای سریع ${product.title}`}
            className="flex h-11 w-11 items-center justify-center border border-paper/70 bg-paper/92 text-ink backdrop-blur-sm transition-colors hover:border-gold disabled:cursor-wait disabled:opacity-60"
          >
            <ScanEye className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${featured ? 'justify-center p-6 md:p-8' : 'p-5'}`}>
        <div className="mb-3 flex items-center justify-between gap-3 text-[12px]">
          <span className="font-semibold text-cypress">{RICE_TYPE_LABELS[product.type]}</span>
          <span className="flex items-center gap-1.5 text-muted">
            <MapPin className="h-3.5 w-3.5 text-indigo" />
            {REGION_LABELS[product.region]}
          </span>
        </div>

        <Link href={`/product/${product.slug}`} className={`${featured ? 'text-[30px] leading-[1.35]' : 'text-[19px] leading-7'} font-semibold text-ink transition-colors hover:text-cypress`}>
          {product.title}
        </Link>

        {featured && <p className="mt-4 text-[14px] leading-8 text-muted">{product.copy}</p>}

        {!compact && (
          <>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line/70 py-3 text-[12px] text-muted">
              <span>{product.weight}</span>
              <span className="h-3 w-px bg-line" />
              <span>{AROMA_LABELS[product.aroma]}</span>
              <span className="h-3 w-px bg-line" />
              <span className="flex items-center gap-1.5 text-ink">
                <Sparkles className="h-3.5 w-3.5 text-saffron" />
                {product.recommendedUse}
              </span>
            </div>
          </>
        )}

        <div className="mt-auto pt-5">
          <p className="text-[15px] font-semibold tabular-nums text-ink">{fmtPackPrice(product.packPrice, product.weightKg)}</p>
          <p className="mt-1 text-[12px] text-muted">{fmtUnitPrice(product.price)}</p>
        </div>

        <button
          type="button"
          data-testid={`add-product-${product.id}`}
          onClick={handleAdd}
          disabled={!hydrated || !product.inStock || adding}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-cypress px-4 text-[13px] font-semibold text-rice transition-colors hover:bg-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingBag className="h-4 w-4" />
          {adding ? 'در حال افزودن...' : product.inStock ? 'افزودن به سبد' : 'ناموجود'}
        </button>
      </div>
    </article>
  );
}
