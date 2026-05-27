'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { useUI } from '@/lib/store/ui';
import { useCart } from '@/lib/store/cart';
import { useWishlist } from '@/lib/store/wishlist';
import { fmtPrice, toFa } from '@/lib/format';

export function QuickViewModal() {
  const p = useUI((s) => s.quickViewProduct);
  const setQuickView = useUI((s) => s.setQuickView);
  const showToast = useUI((s) => s.showToast);
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const wishHas = useWishlist((s) => (p ? s.ids.includes(p.id) : false));
  const toggleWish = useWishlist((s) => s.toggle);

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          key="bd"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickView(null)}
          className="fixed inset-0 z-50 bg-black/55 flex items-center justify-center p-4"
        >
          <motion.div
            key="panel"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
            className="bg-paper max-w-[960px] w-full grid md:grid-cols-2 relative max-h-[90vh] overflow-auto"
          >
            <button
              onClick={() => setQuickView(null)}
              aria-label="بستن"
              className="absolute top-4 left-4 z-10 bg-white/85 rounded-full w-9 h-9 flex items-center justify-center hover:bg-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="aspect-square md:aspect-auto bg-sand min-h-[360px]">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-7 md:p-10 flex flex-col">
              <p className="section-eyebrow text-olive mb-4">{p.kicker}</p>
              <h2 className="title-md">{p.title}</h2>
              <p className="text-[18px] mt-4">{fmtPrice(p.price)}</p>
              <p className="text-[11px] text-[#c4a35a] mt-2">
                {'★★★★★'.slice(0, Math.round(p.rating))}
                {'☆☆☆☆☆'.slice(0, 5 - Math.round(p.rating))}
                <span className="text-muted mr-2">
                  ({toFa(p.rating.toFixed(1))} از ۵ — {toFa(p.reviewCount)} نظر)
                </span>
              </p>
              <p className="body-copy text-[#74756d] mt-5 leading-loose flex-1">{p.copy}</p>
              <div className="mt-auto pt-6 flex gap-3">
                <button
                  onClick={() => {
                    add(p.id);
                    openCart();
                    showToast('به سبد اضافه شد', p.title);
                    setQuickView(null);
                  }}
                  className="flex-1 bg-ink text-white py-4 text-[13px] hover:bg-deep transition-colors"
                >
                  افزودن به سبد خرید
                </button>
                <button
                  onClick={() => toggleWish(p.id)}
                  aria-label="علاقه‌مندی"
                  className={`w-12 flex items-center justify-center transition-colors ${
                    wishHas ? 'bg-deep text-white border border-deep' : 'border border-line hover:border-olive'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={wishHas ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
