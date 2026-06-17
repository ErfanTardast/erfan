'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Trash2, ShoppingBag, Truck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/store/cart';
import { getProductById, PRODUCTS } from '@/lib/products';
import { fmtPrice, toFa, fmtPriceShort } from '@/lib/format';
import { useUI } from '@/lib/store/ui';
import { EASE } from '@/lib/motion';

const FREE_SHIPPING = 500000;

function ShippingBar({ total }: { total: number }) {
  const pct = Math.min(100, (total / FREE_SHIPPING) * 100);
  const remaining = FREE_SHIPPING - total;
  return (
    <div className="px-5 py-3.5 bg-[#f0ebe0] border-b border-line">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-[11px] text-[#5a6057]">
          <Truck className="w-3.5 h-3.5" />
          {pct >= 100 ? (
            <span className="text-[#3d6b42] font-medium">ارسال رایگان اعمال شد ✓</span>
          ) : (
            <span>{fmtPrice(remaining)} تا ارسال رایگان</span>
          )}
        </div>
        <span className="text-[10px] text-muted">{toFa(Math.round(pct))}٪</span>
      </div>
      <div className="h-[3px] bg-[#ddd8ce] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#4a7550] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { items, isOpen, close, inc, dec, remove } = useCart();
  const showToast = useUI((s) => s.showToast);
  void showToast;
  const [giftWrap, setGiftWrap] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const lines = items
    .map((i) => ({ ...i, p: getProductById(i.id) }))
    .filter((l) => l.p);

  const total = lines.reduce((s, l) => s + l.p!.price * l.qty, 0);

  const cartIds = new Set(items.map((i) => i.id));
  const recommendations = PRODUCTS.filter((p) => !cartIds.has(p.id) && p.inStock && p.isFeatured).slice(0, 2);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
          />
          <motion.aside
            key="dr"
            data-testid="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.42, ease: EASE }}
            className="fixed top-0 right-0 z-50 h-full w-[92%] max-w-[420px] bg-[#f8f4ec] border-l border-line flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-line flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <h2 className="text-[18px] font-medium">سبد خرید</h2>
                {lines.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-ink text-white text-[10px] flex items-center justify-center">
                    {toFa(lines.reduce((s, l) => s + l.qty, 0))}
                  </span>
                )}
              </div>
              <button onClick={close} aria-label="بستن" className="p-1.5 hover:bg-[#ede8df] rounded-full transition-colors">
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>

            {/* Shipping progress */}
            {lines.length > 0 && <ShippingBar total={total} />}

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20 px-8">
                  <div className="w-16 h-16 rounded-full bg-[#ede8df] flex items-center justify-center mb-5">
                    <ShoppingBag className="w-7 h-7 text-[#b0a898]" />
                  </div>
                  <p className="text-[15px] font-medium text-ink mb-2">سبد خرید خالی است</p>
                  <p className="small-copy text-muted max-w-[220px] leading-relaxed">
                    از فروشگاه کیوان محصول مورد علاقه‌تان را انتخاب کنید
                  </p>
                  <Link
                    href="/shop"
                    onClick={close}
                    className="mt-7 bg-ink text-white px-8 py-3 text-[12px] tracking-wider hover:bg-[var(--terra)] transition-colors"
                  >
                    رفتن به فروشگاه
                  </Link>
                </div>
              ) : (
                <div className="p-5 space-y-4">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.div
                        key={l.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="flex gap-3 border-b border-line pb-4"
                      >
                        <div className="relative w-20 h-24 shrink-0 overflow-hidden bg-sand">
                          <img src={l.p!.image} className="w-full h-full object-cover" alt={l.p!.title} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium leading-snug">{l.p!.title}</p>
                          <p className="small-copy text-[#77776f] mt-0.5">{l.p!.weight}</p>
                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={() => dec(l.id)}
                              disabled={l.qty <= 1}
                              className="w-7 h-7 border border-line bg-white flex items-center justify-center text-[14px] hover:bg-paper disabled:opacity-35 transition-colors"
                            >
                              −
                            </button>
                            <motion.span
                              key={l.qty}
                              initial={{ scale: 1.25, opacity: 0.5 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className="text-[13px] w-6 text-center tabular-nums"
                            >
                              {toFa(l.qty)}
                            </motion.span>
                            <button
                              onClick={() => inc(l.id)}
                              className="w-7 h-7 border border-line bg-white flex items-center justify-center text-[14px] hover:bg-paper transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="shrink-0 flex flex-col items-end justify-between">
                          <motion.p
                            key={l.qty}
                            initial={{ opacity: 0.5, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[13px] font-medium"
                          >
                            {fmtPriceShort(l.p!.price * l.qty)} ت
                          </motion.p>
                          <button
                            onClick={() => remove(l.id)}
                            className="text-[#b0a898] hover:text-ink transition-colors p-0.5"
                            aria-label="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Recommendations */}
                  {recommendations.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[11px] tracking-[0.18em] text-muted mb-3">پیشنهاد ویژه</p>
                      <div className="space-y-2.5">
                        {recommendations.map((r) => (
                          <RecoItem key={r.id} product={r} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && (
              <div className="border-t border-line p-5 shrink-0 bg-[#f3ede3]">
                {/* Extras */}
                <div className="space-y-2.5 mb-5">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div>
                      <p className="text-[12px] font-medium">بسته‌بندی هدیه</p>
                      <p className="text-[10px] text-muted mt-0.5">کاغذ کرافت، روبان طلایی، کارت دست‌نویس</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-muted">+{toFa(25000)} ت</span>
                      <button
                        onClick={() => setGiftWrap(v => !v)}
                        className={`w-10 h-[22px] rounded-full relative transition-colors ${giftWrap ? 'bg-deep' : 'bg-[#cad0c4]'}`}
                        aria-pressed={giftWrap}
                        type="button"
                      >
                        <span className={`absolute top-1 w-[14px] h-[14px] rounded-full bg-white shadow transition-all ${giftWrap ? 'right-1' : 'right-[22px]'}`} />
                      </button>
                    </div>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div>
                      <p className="text-[12px] font-medium">اشتراک ماهانه</p>
                      <p className="text-[10px] text-muted mt-0.5">هر ماه تحویل، ۱۰٪ تخفیف دائمی</p>
                    </div>
                    <button
                      onClick={() => setSubscribed(v => !v)}
                      className={`w-10 h-[22px] rounded-full relative transition-colors shrink-0 mr-2 ${subscribed ? 'bg-deep' : 'bg-[#cad0c4]'}`}
                      aria-pressed={subscribed}
                      type="button"
                    >
                      <span className={`absolute top-1 w-[14px] h-[14px] rounded-full bg-white shadow transition-all ${subscribed ? 'right-1' : 'right-[22px]'}`} />
                    </button>
                  </label>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[13px] text-muted">جمع</span>
                  <motion.span
                    key={total + (giftWrap ? 25000 : 0)}
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 1 }}
                    className="text-[16px] font-medium"
                  >
                    {fmtPrice(total + (giftWrap ? 25000 : 0))}
                  </motion.span>
                </div>
                <p className="small-copy text-[#77776f] mb-5">
                  مالیات و هزینه ارسال در مرحله پرداخت محاسبه می‌شود
                </p>
                <Link
                  href="/checkout"
                  onClick={close}
                  data-testid="cart-checkout-link"
                  className="block w-full text-center bg-ink text-white py-4 text-[13px] tracking-[0.08em] hover:bg-[var(--terra)] transition-colors active:scale-[0.99]"
                >
                  تکمیل خرید
                </Link>
                <button onClick={close} className="w-full mt-3 text-[12px] text-muted hover:text-ink transition-colors py-1">
                  ادامه خرید
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function RecoItem({ product }: { product: import('@/lib/products').Product }) {
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const showToast = useUI((s) => s.showToast);
  return (
    <div className="flex items-center gap-3 bg-white/60 p-2.5 border border-line">
      <img src={product.image} alt={product.title} className="w-12 h-14 object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium truncate">{product.title}</p>
        <p className="text-[11px] text-muted mt-0.5">{fmtPriceShort(product.price)} ت</p>
      </div>
      <button
        onClick={() => {
          add(product.id);
          openCart();
          showToast('به سبد اضافه شد', product.title);
        }}
        className="text-[11px] border border-deep px-2.5 py-1.5 hover:bg-deep hover:text-white transition-colors shrink-0"
      >
        افزودن
      </button>
    </div>
  );
}
