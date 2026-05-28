'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/store/cart';
import { getProductById } from '@/lib/products';
import { fmtPrice, toFa, fmtPriceShort } from '@/lib/format';

export function CartDrawer() {
  const { items, isOpen, open, close, inc, dec, remove } = useCart();
  void open;

  const lines = items
    .map((i) => ({ ...i, p: getProductById(i.id) }))
    .filter((l) => l.p);

  const total = lines.reduce((s, l) => s + l.p!.price * l.qty, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/40"
          />
          <motion.aside
            key="dr"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 z-50 h-full w-[92%] max-w-[420px] bg-[#f8f4ec] border-l border-line flex flex-col"
          >
            <div className="p-5 border-b border-line flex items-center justify-between shrink-0">
              <h2 className="text-[20px] font-medium">سبد خرید</h2>
              <button onClick={close} aria-label="بستن" className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20 text-muted">
                  <ShoppingBag className="w-10 h-10 text-[#c5bdb5] mb-4" />
                  <p className="text-[14px] text-ink">سبد خرید شما خالی است</p>
                  <p className="small-copy mt-2">با افزودن محصول، خرید را آغاز کنید</p>
                  <button
                    onClick={close}
                    className="mt-6 border border-deep px-6 py-2.5 text-[12px] hover:bg-deep hover:text-white transition-all"
                  >
                    ادامه خرید
                  </button>
                </div>
              ) : (
                lines.map((l) => (
                  <div key={l.id} className="flex gap-3 border-b border-line pb-5 mb-5">
                    <img src={l.p!.image} className="w-20 h-24 object-cover shrink-0" alt={l.p!.title} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium">{l.p!.title}</p>
                      <p className="small-copy text-[#77776f] mt-1">{l.p!.weight}</p>
                      <div className="flex items-center gap-2 mt-2.5">
                        <button
                          onClick={() => dec(l.id)}
                          disabled={l.qty <= 1}
                          className="w-6 h-6 border border-line bg-white flex items-center justify-center text-[13px] hover:bg-paper disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                          −
                        </button>
                        <span className="text-[12px] w-5 text-center">{toFa(l.qty)}</span>
                        <button
                          onClick={() => inc(l.id)}
                          className="w-6 h-6 border border-line bg-white flex items-center justify-center text-[13px] hover:bg-paper transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-left shrink-0">
                      <p className="text-[12px]">{fmtPriceShort(l.p!.price * l.qty)}</p>
                      <button
                        onClick={() => remove(l.id)}
                        className="mt-2 text-[#9a9891] hover:text-ink transition-colors block"
                        aria-label="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-line p-5 shrink-0 bg-[#f8f4ec]">
                <div className="flex justify-between text-[13px] mb-1.5">
                  <span>جمع سبد</span>
                  <span>{fmtPrice(total)}</span>
                </div>
                <p className="small-copy text-[#77776f] mb-4">
                  {total >= 500000
                    ? 'ارسال رایگان برای این سفارش ✓'
                    : `${fmtPrice(500000 - total)} تا ارسال رایگان`}
                </p>
                <button className="w-full bg-ink text-white py-4 text-[13px] hover:bg-deep transition-colors">
                  تکمیل خرید
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
