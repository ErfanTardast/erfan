'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Heart, Minus, Plus, ShieldCheck, Star, Truck, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuickViewStore } from '@/stores/quick-view-store';
import { toast } from 'sonner';
import { useCart } from '@/lib/store/cart';
import { useWishlist } from '@/lib/store/wishlist';
import { fmtPrice, toFa } from '@/lib/format';
import { EASE, modalScale } from '@/lib/motion';

const GALLERY_EXTRA = [
  'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=900&q=80',
];

export function QuickViewModal() {
  const p = useQuickViewStore((s) => s.product);
  const openQuickView = useQuickViewStore((s) => s.open);
  const closeQuickView = useQuickViewStore((s) => s.close);
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
    toast.success('به سبد اضافه شد', { description: p.title });
    closeQuickView();
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
          onClick={closeQuickView}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/65 p-4 backdrop-blur-sm md:p-8"
        >
          <motion.div
            key="panel"
            variants={modalScale}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative grid max-h-[92vh] w-full max-w-[1000px] overflow-hidden border border-line bg-paper shadow-2xl md:grid-cols-[1.1fr_1fr]"
          >
            {/* Close */}
            <button
              onClick={closeQuickView}
              aria-label="بستن"
              className="absolute left-4 top-4 z-10 flex h-11 w-11 items-center justify-center border border-line bg-paper/92 shadow-sm backdrop-blur-sm transition-colors hover:bg-rice"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Gallery */}
            <div className="bg-sand flex flex-col">
              <div className="relative aspect-square overflow-hidden">
                <Image
                    key={images[activeImg]}
                    src={images[activeImg]}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 52vw, 100vw"
                    className="object-cover"
                  />
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 bg-paper p-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative h-16 w-14 shrink-0 overflow-hidden transition-all duration-200 ${
                      activeImg === i ? 'ring-2 ring-cypress ring-offset-1' : 'opacity-65 hover:opacity-95'
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="56px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="p-7 md:p-9 flex flex-col overflow-y-auto max-h-[92vh]">
              {p.badge && (
                <span className={`mb-4 self-start px-2.5 py-1 text-[10px] ${
                  p.badge.tone === 'gold' ? 'bg-gold text-white' :
                  p.badge.tone === 'olive' ? 'bg-olive text-white' :
                  'bg-sand text-ink'
                }`}>
                  {p.badge.label}
                </span>
              )}
              <span className="block h-px w-10 bg-[var(--terra)] mb-4" />
              <p className="section-eyebrow text-olive mb-3">{p.kicker}</p>
              <h2 className="title-md leading-tight">{p.title}</h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex gap-0.5">
                  {stars.map((f, i) => (
                    <Star key={i} className={`h-4 w-4 ${f ? 'fill-saffron text-saffron' : 'text-line'}`} />
                  ))}
                </div>
                <span className="text-[12px] text-muted">
                  {toFa(p.rating.toFixed(1))} ({toFa(p.reviewCount)} نظر)
                </span>
              </div>

              <p className="text-[22px] font-light mt-4">{fmtPrice(p.price)}</p>

              <p className="body-copy mt-5 leading-loose text-muted">{p.copy}</p>

              {/* Quantity */}
              <div className="mt-6">
                <p className="section-eyebrow mb-3 text-muted">تعداد</p>
                <div className="inline-flex items-center border border-line">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="flex h-11 w-11 items-center justify-center text-[18px] transition-colors hover:bg-sand disabled:opacity-40"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex h-11 w-11 items-center justify-center border-x border-line text-[14px] tabular-nums">
                    {toFa(qty)}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex h-11 w-11 items-center justify-center text-[18px] transition-colors hover:bg-sand"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleAdd}
                  disabled={!p.inStock}
                  className="cta-ink flex-1 py-4 text-[13px] active:scale-[0.99] disabled:opacity-50"
                >
                  {p.inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
                </button>
                <button
                  onClick={() => {
                    toggleWish(p.id);
                    toast.success(wishHas ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد', {
                      description: p.title,
                    });
                  }}
                  aria-label="علاقه‌مندی"
                  className={`flex w-12 items-center justify-center border transition-all ${
                    wishHas ? 'bg-ink text-white border-ink' : 'border-line hover:border-olive'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={wishHas ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Trust */}
              <div className="mt-6 pt-5 border-t border-line space-y-3">
                <div className="flex items-center gap-2.5 text-[12px] text-muted">
                  <Truck className="w-4 h-4 shrink-0 text-olive" />
                  <span>تحویل ۳ تا ۵ روز کاری · ارسال رایگان از ۵۰۰ هزار تومان</span>
                </div>
                <div className="flex items-center gap-2.5 text-[12px] text-muted">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-olive" />
                  <span>ضمانت اصالت محصول · بازگشت ۷ روزه</span>
                </div>
                <Link
                  href={`/product/${p.slug}`}
                  onClick={closeQuickView}
                  className="mt-1 block border-t border-line pt-4 text-center text-[12px] text-muted transition-colors hover:text-ink"
                >
                  مشاهده صفحه کامل محصول
                  <ArrowLeft className="mr-2 inline h-4 w-4 align-middle" />
                </Link>
              </div>

              {/* Luxury product details */}
              {(p.flavorNotes || p.originStory || p.pairings || p.chefNote) && (
                <div className="mt-5 pt-5 border-t border-line space-y-5">
                  {p.harvestYear && (
                    <div className="flex items-center gap-2">
                      <span className="section-eyebrow text-muted">برداشت</span>
                      <span className="text-[13px] font-medium">{p.harvestYear}</span>
                      {p.collection === 'limited-seasonal' && (
                        <span className="border border-gold/30 bg-gold/15 px-2 py-0.5 text-[9px] text-gold">
                          محدود
                        </span>
                      )}
                      {p.collection === 'rare-harvest' && (
                        <span className="border border-ink/20 bg-ink/10 px-2 py-0.5 text-[9px] text-ink">
                          نادر
                        </span>
                      )}
                      {p.collection === 'chef-choice' && (
                        <span className="border border-olive/30 bg-olive/15 px-2 py-0.5 text-[9px] text-olive">
                          انتخاب سرآشپز
                        </span>
                      )}
                    </div>
                  )}
                  {p.flavorNotes && (
                    <div>
                      <p className="section-eyebrow mb-2.5 text-muted">پروفایل طعم</p>
                      <div className="flex flex-wrap gap-2">
                        {p.flavorNotes.map((note, i) => (
                          <span key={i} className="text-[11px] border border-line px-3 py-1.5 text-ink/80 bg-paper">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {p.pairings && (
                    <div>
                      <p className="section-eyebrow mb-2.5 text-muted">پیشنهاد همراهی</p>
                      <p className="text-[12px] text-ink/70 leading-relaxed">{p.pairings.join(' · ')}</p>
                    </div>
                  )}
                  {p.originStory && (
                    <div>
                      <p className="section-eyebrow mb-2 text-muted">داستان منشأ</p>
                      <p className="text-[12px] text-ink/70 leading-relaxed italic">{p.originStory}</p>
                    </div>
                  )}
                  {p.chefNote && (
                    <div className="border-r-2 border-cypress bg-rice p-4">
                      <p className="section-eyebrow mb-1.5 text-cypress">توصیه سرآشپز</p>
                      <p className="text-[12px] text-ink/80 leading-relaxed">{p.chefNote}</p>
                    </div>
                  )}
                  {p.cookingTip && (
                    <div>
                      <p className="section-eyebrow mb-1.5 text-muted">راز پخت</p>
                      <p className="text-[12px] text-ink/70 leading-relaxed">{p.cookingTip}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
