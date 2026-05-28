'use client';
import { motion } from 'framer-motion';
import { PRODUCTS } from '@/lib/products';
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
    .filter(Boolean)
    .slice(0, 4);

  if (list.length === 0) return null;

  return (
    <section className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-20 border-t border-sand">
      <div className="flex justify-between items-end mb-10">
        <div>
          <p className="section-eyebrow text-olive mb-3">بازدیدهای اخیر</p>
          <h2 className="title-lg">اخیراً دیده‌اید</h2>
        </div>
      </div>
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid sm:grid-cols-2 md:grid-cols-4 gap-6"
      >
        {list.map((p) => (
          <motion.article
            key={p!.id}
            variants={fadeUp}
            className="group cursor-pointer"
            onClick={() => setQuickView(p!)}
          >
            <div className="aspect-[3/2] overflow-hidden bg-sand mb-4">
              <motion.img
                src={p!.image}
                alt={p!.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.65, ease: EASE }}
              />
            </div>
            <p className="section-eyebrow text-olive mb-1">{p!.kicker}</p>
            <p className="text-[14px] font-medium group-hover:text-olive transition-colors">{p!.title}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-[12px] text-muted">{fmtPrice(p!.price)}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  add(p!.id);
                  openCart();
                  showToast('به سبد اضافه شد', p!.title);
                }}
                className="text-[11px] border border-line px-2.5 py-1 hover:bg-ink hover:text-white hover:border-ink transition-all"
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
