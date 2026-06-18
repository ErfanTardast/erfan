'use client';
import { Heart, ScanEye, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { type Product } from '@/lib/products';
import { fmtPriceShort, toFa } from '@/lib/format';
import { useCart } from '@/lib/store/cart';
import { useWishlist } from '@/lib/store/wishlist';
import { useUI } from '@/lib/store/ui';
import { useHistory } from '@/lib/store/history';
import { EASE } from '@/lib/motion';

const TONE_CLASSES: Record<NonNullable<Product['badge']>['tone'], string> = {
  neutral: 'bg-paper text-ink border-line',
  olive: 'bg-cypress text-rice border-cypress',
  gold: 'bg-saffron text-ink border-saffron',
  ink: 'bg-ink text-rice border-ink',
};

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const openCartDrawer = useCart((s) => s.open);
  const wished = useWishlist((s) => s.ids.includes(product.id));
  const toggleWish = useWishlist((s) => s.toggle);
  const showToast = useUI((s) => s.showToast);
  const openQuickView = useUI((s) => s.setQuickView);
  const addRecentlyViewed = useHistory((s) => s.addRecentlyViewed);
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    setAdding(true);
    add(product.id);
    openCartDrawer();
    showToast('به سبد اضافه شد', product.title);
    setTimeout(() => setAdding(false), 450);
  };

  const handleQuickView = () => {
    addRecentlyViewed(product.id);
    openQuickView(product);
  };

  const filled = Math.round(product.rating);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="group harvest-card bg-rice overflow-hidden"
    >
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="block aspect-[4/5] overflow-hidden bg-sand">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.045]"
          />
        </Link>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.badge && (
            <span className={`border px-2.5 py-1.5 text-[10px] ${TONE_CLASSES[product.badge.tone]}`}>
              {product.badge.label}
            </span>
          )}
          {product.isNew && (
            <span className="bg-saffron text-ink border border-saffron px-2.5 py-1.5 text-[10px]">
              جدید
            </span>
          )}
        </div>

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <button
            onClick={() => toggleWish(product.id)}
            aria-label="افزودن به علاقه‌مندی"
            className={`w-11 h-11 flex items-center justify-center border backdrop-blur-sm transition-colors ${
              wished ? 'bg-ink text-rice border-ink' : 'bg-paper/90 text-ink border-line hover:border-ink'
            }`}
          >
            <Heart className="w-4 h-4" fill={wished ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleQuickView}
            aria-label="نمای سریع محصول"
            className="w-11 h-11 flex items-center justify-center border border-line bg-paper/90 text-ink backdrop-blur-sm hover:border-ink transition-colors"
          >
            <ScanEye className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[12px] text-cypress mb-2">{product.kicker}</p>
        <div className="flex items-start justify-between gap-3">
          <Link href={`/product/${product.slug}`} className="product-title text-ink hover:text-cypress transition-colors">
            {product.title}
          </Link>
          <p className="text-[14px] font-semibold whitespace-nowrap pt-0.5 text-ink">
            {fmtPriceShort(product.price)} <span className="text-[11px] font-normal text-muted">ت</span>
          </p>
        </div>
        <p className="small-copy text-muted mt-2 line-clamp-2">{product.shortNote}</p>

        <div className="flex items-center justify-between gap-3 mt-4">
          <div className="flex items-center gap-1.5 text-[11px] text-muted">
            <span className="flex gap-0.5 text-saffron">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className={`w-3.5 h-3.5 ${index < filled ? 'fill-current' : ''}`} />
              ))}
            </span>
            <span>({toFa(product.reviewCount)})</span>
          </div>
          <button
            onClick={handleAdd}
            disabled={!product.inStock || adding}
            className="cta-ink inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-4 h-4" />
            {adding ? '...' : product.inStock ? 'افزودن' : 'ناموجود'}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
