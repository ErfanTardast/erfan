'use client';
import { Heart, ScanEye } from 'lucide-react';
import { motion } from 'framer-motion';
import { type Product } from '@/lib/products';
import { fmtPriceShort, toFa } from '@/lib/format';
import { useCart } from '@/lib/store/cart';
import { useWishlist } from '@/lib/store/wishlist';
import { useUI } from '@/lib/store/ui';

const TONE_CLASSES: Record<NonNullable<Product['badge']>['tone'], string> = {
  neutral: 'bg-white/85 backdrop-blur-sm text-ink',
  olive: 'bg-olive text-white',
  gold: 'bg-gold text-white',
  ink: 'bg-ink text-white',
};

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);
  const wished = useWishlist((s) => s.ids.includes(product.id));
  const toggleWish = useWishlist((s) => s.toggle);
  const showToast = useUI((s) => s.showToast);
  const openQuickView = useUI((s) => s.setQuickView);

  const stars = '★★★★★'.slice(0, Math.round(product.rating)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(product.rating));

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      className="group"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand card-shadow">
        <motion.img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWish(product.id);
          }}
          aria-label="علاقه‌مندی"
          className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-sm ${
            wished ? 'bg-deep text-white' : 'bg-white/85 text-ink hover:bg-white'
          }`}
        >
          <Heart className="w-4 h-4" fill={wished ? 'currentColor' : 'none'} />
        </button>

        {product.badge && (
          <span
            className={`absolute top-3 right-3 text-[10px] tracking-[0.12em] px-2.5 py-1.5 ${
              TONE_CLASSES[product.badge.tone]
            }`}
          >
            {product.badge.label}
          </span>
        )}

        <div className="absolute right-3 left-3 bottom-3 flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 md:opacity-0 max-md:opacity-100 max-md:translate-y-0">
          <button
            onClick={() => {
              add(product.id);
              open();
              showToast('به سبد اضافه شد', product.title);
            }}
            className="flex-1 py-3 text-[12px] bg-ink text-white hover:bg-deep transition-colors"
          >
            افزودن به سبد
          </button>
          <button
            onClick={() => openQuickView(product)}
            aria-label="نمای سریع"
            className="bg-white w-11 flex items-center justify-center hover:bg-paper transition-colors"
          >
            <ScanEye className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="pt-4">
        <p className="section-eyebrow text-olive mb-2">{product.kicker}</p>
        <div className="flex justify-between items-start gap-3">
          <h3 className="product-title">{product.title}</h3>
          <p className="text-[13px] whitespace-nowrap pt-0.5">{fmtPriceShort(product.price)} ت</p>
        </div>
        <p className="small-copy text-muted mt-2">{product.shortNote}</p>
        <p className="text-[11px] mt-2.5">
          <span className="text-[#c4a35a]">{stars}</span>{' '}
          <span className="text-muted">
            ({toFa(product.rating.toFixed(1))})
          </span>
        </p>
      </div>
    </motion.article>
  );
}
