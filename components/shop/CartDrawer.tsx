'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useCart } from '@/lib/store/cart';
import { getProductById, PRODUCTS, type Product } from '@/lib/products';
import { fmtPrice, toFa, fmtPriceShort } from '@/lib/format';
import { toast } from 'sonner';
import { EASE } from '@/lib/motion';

const FREE_SHIPPING = 500000;
type CartLine = { id: string; qty: number; p: Product };

function ShippingBar({ total }: { total: number }) {
  const pct = Math.min(100, (total / FREE_SHIPPING) * 100);
  const remaining = FREE_SHIPPING - total;
  return (
    <div className="border-b border-line bg-paper px-5 py-3.5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-[11px] text-muted">
          <Truck className="w-3.5 h-3.5 text-cypress" />
          {pct >= 100 ? (
            <span className="font-medium text-cypress">ارسال رایگان اعمال شد</span>
          ) : (
            <span>{fmtPrice(remaining)} تا ارسال رایگان</span>
          )}
        </div>
        <span className="text-[10px] text-muted">{toFa(Math.round(pct))}٪</span>
      </div>
      <div className="h-[3px] overflow-hidden bg-line">
        <motion.div
          className="h-full bg-cypress"
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
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  const lines = items
    .map((i) => ({ ...i, p: getProductById(i.id) }))
    .filter((l): l is CartLine => Boolean(l.p));

  const total = lines.reduce((s, l) => s + l.p.packPrice * l.qty, 0);

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
            className="fixed inset-0 z-40 bg-ink/45 backdrop-blur-[2px]"
          />
          <motion.aside
            key="dr"
            data-testid="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.42, ease: EASE }}
            className="fixed right-0 top-0 z-50 flex h-full w-[92%] max-w-[420px] flex-col border-l border-line bg-rice shadow-2xl"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-line flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <h2 id="cart-title" className="text-[18px] font-medium">سبد خرید</h2>
                {lines.length > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] text-rice">
                    {toFa(lines.reduce((s, l) => s + l.qty, 0))}
                  </span>
                )}
              </div>
              <button ref={closeRef} onClick={close} aria-label="بستن" className="flex h-11 w-11 items-center justify-center border border-line bg-paper transition-colors hover:bg-sand">
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>

            {/* Shipping progress */}
            {lines.length > 0 && <ShippingBar total={total} />}

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20 px-8">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center bg-paper text-cypress">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <p className="text-[15px] font-medium text-ink mb-2">سبد خرید خالی است</p>
                  <p className="small-copy text-muted max-w-[220px] leading-relaxed">
                    از فروشگاه کیوان محصول مورد علاقه‌تان را انتخاب کنید
                  </p>
                  <Link
                    href="/shop"
                    onClick={close}
                    className="cta-ink mt-7 inline-flex h-11 items-center justify-center px-8 text-[12px]"
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
                          <Image src={l.p.image} fill sizes="80px" className="object-cover" alt={l.p.title} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium leading-snug">{l.p.title}</p>
                          <p className="small-copy text-muted mt-0.5">{l.p.weight}</p>
                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={() => dec(l.id)}
                              disabled={l.qty <= 1}
                              className="flex h-9 w-9 items-center justify-center border border-line bg-paper text-[14px] transition-colors hover:bg-sand disabled:opacity-35"
                            >
                              <Minus className="h-4 w-4" />
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
                              className="flex h-9 w-9 items-center justify-center border border-line bg-paper text-[14px] transition-colors hover:bg-sand"
                            >
                              <Plus className="h-4 w-4" />
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
                            {fmtPriceShort(l.p.packPrice * l.qty)} تومان
                          </motion.p>
                          <button
                            onClick={() => remove(l.id)}
                            className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-ink"
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
                      <p className="section-eyebrow mb-3 text-cypress">پیشنهاد ویژه</p>
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
              <div className="shrink-0 border-t border-line bg-paper p-5">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[13px] text-muted">جمع</span>
                  <motion.span
                    key={total}
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 1 }}
                    className="text-[16px] font-medium"
                  >
                    {fmtPrice(total)}
                  </motion.span>
                </div>
                <p className="small-copy text-muted mb-5">
                  هزینه ارسال در مرحله تکمیل سفارش مشخص می‌شود؛ مبلغ دیگری بدون تأیید شما اضافه نخواهد شد.
                </p>
                <Link
                  href="/checkout"
                  data-testid="cart-checkout-link"
                  className="cta-ink block w-full py-4 text-center text-[13px] active:scale-[0.99]"
                >
                  تکمیل خرید
                </Link>
                <button onClick={close} className="mt-3 min-h-11 w-full text-[12px] text-muted transition-colors hover:text-ink">
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
  return (
    <div className="flex items-center gap-3 border border-line bg-paper p-2.5">
      <span className="relative w-12 h-14 overflow-hidden bg-sand shrink-0">
        <Image src={product.image} alt={product.title} fill sizes="48px" className="object-cover" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium truncate">{product.title}</p>
        <p className="text-[11px] text-muted mt-0.5">{fmtPriceShort(product.packPrice)} تومان</p>
      </div>
      <button
        onClick={() => {
          add(product.id);
          openCart();
          toast.success('به سبد اضافه شد', { description: product.title });
        }}
        className="h-9 shrink-0 border border-ink px-3 text-[11px] transition-colors hover:bg-ink hover:text-rice"
      >
        افزودن
      </button>
    </div>
  );
}
