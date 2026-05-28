'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Heart, Truck, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useUI } from '@/lib/store/ui';
import { useCart } from '@/lib/store/cart';
import { useWishlist } from '@/lib/store/wishlist';
import { fmtPrice, toFa } from '@/lib/format';
import { EASE, modalScale } from '@/lib/motion';

const GALLERY_EXTRA = [
  'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=900&q=80',
];

export function QuickViewModal() {
  const p = useUI((s) => s.quickViewProduct);
  const setQuickView = useUI((s) => s.setQuickView);
  const showToast = useUI((s) => s.showToast);
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const wishHas = useWishlist((s) => (p ? s.ids.includes(p.id) : false));
  const toggleWish = useWishlist((s) => s.toggle);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  const images = p ? [p.image, ...GALLERY_EXTRA] : [];
  const filled = p ? Math.round(p.rating) : 0;
  const stars = Array.from({ length: 5 }, (_, i) => i < filled);

  const handleAdd = () => {
    if (!p) return;
    for (let i = 0; i < qty; i++) add(p.id);
    openCart();
    showToast('به سبد اضافه شد', p.title);
    setQuickView(null);
    setQty(1);
    setActiveImg(0);
  };

  return (
    <AnimatePresence onExitComplete={() => { setActiveImg(0); setQty(1); }}>
      {p && (
        <motion.div
          key="bd"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setQuickView(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            key="panel"
            variants={modalScale}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="bg-paper max-w-[1000px] w-full grid md:grid-cols-[1.1fr_1fr] relative max-h-[92vh] overflow-hidden shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={() => setQuickView(null)}
              aria-label="بستن"
              className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Gallery */}
            <div className="bg-sand flex flex-col">
              <div className="relative aspect-square overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={images[activeImg]}
                    alt={p.title}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 p-3 bg-[#ede8df]">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-14 h-16 overflow-hidden shrink-0 transition-all duration-200 ${
                      activeImg === i ? 'ring-2 ring-ink ring-offset-1' : 'opacity-60 hover:opacity-90'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="p-7 md:p-9 flex flex-col overflow-y-auto max-h-[92vh]">
              {p.badge && (
                <span className={`self-start text-[10px] tracking-[0.1em] px-2.5 py-1 mb-4 ${
                  p.badge.tone === 'gold' ? 'bg-gold text-white' :
                  p.badge.tone === 'olive' ? 'bg-olive text-white' :
                  'bg-sand text-ink'
                }`}>
                  {p.badge.label}
                </span>
              )}
              <p className="section-eyebrow text-olive mb-3">{p.kicker}</p>
              <h2 className="title-md leading-tight">{p.title}</h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex gap-0.5">
                  {stars.map((f, i) => (
                    <span key={i} className={`text-[14px] ${f ? 'text-gold' : 'text-[#d9d3ca]'}`}>★</span>
                  ))}
                </div>
                <span className="text-[12px] text-muted">
                  {toFa(p.rating.toFixed(1))} ({toFa(p.reviewCount)} نظر)
                </span>
              </div>

              <p className="text-[22px] font-light mt-4">{fmtPrice(p.price)}</p>

              <p className="body-copy text-[#74756d] mt-5 leading-loose">{p.copy}</p>

              {/* Quantity */}
              <div className="mt-6">
                <p className="text-[11px] tracking-[0.18em] text-muted mb-3">تعداد</p>
                <div className="inline-flex items-center border border-line">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="w-10 h-10 flex items-center justify-center hover:bg-sand transition-colors disabled:opacity-40 text-[18px]"
                  >
                    −
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center text-[14px] border-x border-line tabular-nums">
                    {toFa(qty)}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-sand transition-colors text-[18px]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleAdd}
                  disabled={!p.inStock}
                  className="flex-1 bg-ink text-white py-4 text-[13px] tracking-wider hover:bg-deep transition-colors active:scale-[0.99] disabled:opacity-50"
                >
                  {p.inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
                </button>
                <button
                  onClick={() => toggleWish(p.id)}
                  aria-label="علاقه‌مندی"
                  className={`w-12 flex items-center justify-center transition-all border ${
                    wishHas ? 'bg-ink text-white border-ink' : 'border-line hover:border-olive'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={wishHas ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Trust */}
              <div className="mt-6 pt-5 border-t border-line space-y-3">
                <div className="flex items-center gap-2.5 text-[12px] text-[#5a6057]">
                  <Truck className="w-4 h-4 shrink-0 text-olive" />
                  <span>تحویل ۳ تا ۵ روز کاری · ارسال رایگان از ۵۰۰ هزار تومان</span>
                </div>
                <div className="flex items-center gap-2.5 text-[12px] text-[#5a6057]">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-olive" />
                  <span>ضمانت اصالت محصول · بازگشت ۷ روزه</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
