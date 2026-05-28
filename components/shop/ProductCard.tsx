'use client';
import { Heart, ScanEye, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { type Product } from '@/lib/products';
import { fmtPriceShort, toFa } from '@/lib/format';
import { useCart } from '@/lib/store/cart';
import { useWishlist } from '@/lib/store/wishlist';
import { useUI } from '@/lib/store/ui';
import { EASE } from '@/lib/motion';

const TONE_CLASSES: Record<NonNullable<Product['badge']>['tone'], string> = {
  neutral: 'bg-white/90 backdrop-blur-sm text-ink',
  olive: 'bg-olive text-white',
  gold: 'bg-gold text-white',
  ink: 'bg-ink text-white',
};

const HOVER_IMAGES: Record<string, string> = {
  '1': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=720&q=80',
  '2': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=720&q=80',
  '3': 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=720&q=80',
  '4': 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=720&q=80',
  '5': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=720&q=80',
  '6': 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=720&q=80',
  '7': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=720&q=80',
  '8': 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=720&q=80',
  '9': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=720&q=80',
  '10': 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=720&q=80',
};

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const openCartDrawer = useCart((s) => s.open);
  const wished = useWishlist((s) => s.ids.includes(product.id));
  const toggleWish = useWishlist((s) => s.toggle);
  const showToast = useUI((s) => s.showToast);
  const openQuickView = useUI((s) => s.setQuickView);
  const addRecentlyViewed = useUI((s) => s.addRecentlyViewed);
  const [hovered, setHovered] = useState(false);
  const [adding, setAdding] = useState(false);

  const hoverImage = HOVER_IMAGES[product.id];

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdding(true);
    add(product.id);
    openCartDrawer();
    showToast('به سبد اضافه شد', product.title);
    setTimeout(() => setAdding(false), 600);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    addRecentlyViewed(product.id);
    openQuickView(product);
  };

  const filled = Math.round(product.rating);
  const stars = Array.from({ length: 5 }, (_, i) => i < filled);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-sand card-shadow">
        {/* Primary image */}
        <motion.img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1, opacity: hovered && hoverImage ? 0 : 1 }}
          transition={{ duration: 0.85, ease: EASE }}
        />
        {/* Secondary image */}
        {hoverImage && (
          <motion.img
            src={hoverImage}
            alt=""
            loading="lazy"
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.04 : 1.08 }}
            transition={{ duration: 0.7, ease: EASE }}
          />
        )}

        {/* Top badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.badge && (
            <span className={`text-[10px] tracking-[0.1em] px-2.5 py-1.5 ${TONE_CLASSES[product.badge.tone]}`}>
              {product.badge.label}
            </span>
          )}
          {product.isNew && (
            <span className="bg-gold text-white text-[10px] tracking-[0.1em] px-2.5 py-1.5">
              جدید
            </span>
          )}
          {!product.inStock && (
            <span className="bg-ink/80 text-white text-[10px] px-2.5 py-1.5">
              ناموجود
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWish(product.id); }}
          aria-label="علاقه‌مندی"
          className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
            wished ? 'bg-ink text-white scale-110' : 'bg-white/85 text-ink hover:bg-white hover:scale-105'
          }`}
        >
          <Heart className="w-4 h-4" fill={wished ? 'currentColor' : 'none'} />
        </button>

        {/* Hover actions */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="absolute right-3 left-3 bottom-3 flex gap-2"
            >
              <motion.button
                onClick={handleAdd}
                disabled={!product.inStock || adding}
                animate={adding ? { scale: [1, 0.96, 1.02, 1] } : {}}
                transition={{ duration: 0.35 }}
                className="flex-1 py-3.5 text-[12px] tracking-[0.06em] bg-ink text-white hover:bg-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                {adding ? '...' : 'افزودن به سبد'}
              </motion.button>
              <button
                onClick={handleQuickView}
                aria-label="نمای سریع"
                className="bg-white/95 w-11 flex items-center justify-center hover:bg-paper transition-colors shrink-0 backdrop-blur-sm"
              >
                <ScanEye className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product info */}
      <div className="pt-4 pb-1">
        <p className="section-eyebrow text-olive mb-2">{product.kicker}</p>
        <div className="flex justify-between items-start gap-3">
          <h3 className="product-title group-hover:text-olive transition-colors duration-300">{product.title}</h3>
          <p className="text-[13px] whitespace-nowrap pt-0.5 text-muted">
            {fmtPriceShort(product.price)} ت
          </p>
        </div>
        <p className="small-copy text-muted mt-1.5 line-clamp-2">{product.shortNote}</p>
        <div className="flex items-center gap-1.5 mt-2.5">
          <div className="flex gap-0.5">
            {stars.map((f, i) => (
              <span key={i} className={`text-[12px] ${f ? 'text-gold' : 'text-[#d9d3ca]'}`}>★</span>
            ))}
          </div>
          <span className="text-[11px] text-muted">({toFa(product.reviewCount)})</span>
        </div>
      </div>
    </motion.article>
  );
}
