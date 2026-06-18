'use client';
import { motion } from 'framer-motion';
import { PRODUCTS } from '@/lib/products';
import type { Product } from '@/lib/products';
import { fmtPrice } from '@/lib/format';
import { useUI } from '@/lib/store/ui';
import { useHistory } from '@/lib/store/history';
import { useCart } from '@/lib/store/cart';
import { EASE, stagger, fadeUp } from '@/lib/motion';

export function RecentlyViewed() {
  const recentlyViewed = useHistory((s) => s.recentlyViewed);
  const setQuickView = useUI((s) => s.setQuickView);
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const showToast = useUI((s) => s.showToast);

  const list = recentlyViewed
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 4);

  if (list.length === 0) return null;

  return (
    <section className="site-shell border-t border-line py-12 md:py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="section-eyebrow mb-3 text-cypress">بازدیدهای اخیر</p>
          <h2 className="title-lg">اخیراً دیده‌اید</h2>
        </div>
      </div>
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-5 sm:grid-cols-2 md:grid-cols-4"
      >
        {list.map((p) => (
          <motion.article
            key={p.id}
            variants={fadeUp}
            className="harvest-card group cursor-pointer overflow-hidden"
            onClick={() => setQuickView(p)}
          >
            <div className="aspect-[4/3] overflow-hidden bg-sand">
              <motion.img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.65, ease: EASE }}
              />
            </div>
            <div className="p-4">
              <p className="section-eyebrow mb-1 text-cypress">{p.kicker}</p>
              <p className="text-[14px] font-medium transition-colors group-hover:text-cypress">{p.title}</p>
            </div>
            <div className="flex items-center justify-between border-t border-line px-4 py-3">
              <p className="text-[12px] text-muted">{fmtPrice(p.price)}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  add(p.id);
                  openCart();
                  showToast('به سبد اضافه شد', p.title);
                }}
                className="min-h-11 border border-line px-3 text-[12px] transition-all hover:border-ink hover:bg-ink hover:text-white"
              >
                افزودن
              </button>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
