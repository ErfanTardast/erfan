'use client';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, type Product } from '@/lib/products';
import { fmtPriceShort } from '@/lib/format';
import { useCart } from '@/lib/store/cart';
import { useUI } from '@/lib/store/ui';
import { EASE } from '@/lib/motion';
import { PageTransitionTrigger } from '@/components/ui/PageTransition';

const PICKS = ['1', '3', '2'];

const COLLECTION_FA: Record<string, string> = {
  'chef-choice': 'انتخاب سرآشپز',
  'rare-harvest': 'برداشت نادر',
  'limited-seasonal': 'فصلی محدود',
  'aged-reserve': 'ذخیره اعلا',
};

export function FeaturedProducts() {
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const showToast = useUI((s) => s.showToast);

  const products = PICKS.map((id) => PRODUCTS.find((p) => p.id === id)).filter((p): p is Product => Boolean(p));

  return (
    <section className="bg-cream py-14 md:py-20 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="section-eyebrow text-olive mb-3">— سفارش مستقیم —</p>
            <h2 className="title-lg !text-[clamp(32px,5.5vw,72px)] !leading-[1.08] max-w-[560px]">
              پیشنهادهای ویژه
            </h2>
          </div>
          <PageTransitionTrigger>
            {(navigate) => (
              <button
                onClick={() => navigate('/shop')}
                className="group flex items-center gap-2 text-[13px] tracking-[0.12em] text-olive hover:text-ink transition-colors shrink-0"
              >
                <span>مشاهده همه محصولات</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>
            )}
          </PageTransitionTrigger>
        </div>

        {/* Product cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, i) => (
            <FeaturedCard
              key={product.id}
              product={product}
              index={i}
              onAdd={() => {
                add(product.id);
                openCart();
                showToast('به سبد اضافه شد', product.title);
              }}
            />
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-12 pt-8 border-t border-ink/10 flex flex-wrap gap-8 justify-center text-[11px] tracking-[0.2em] text-muted">
          {['ارسال رایگان از ۳۰۰ هزار تومان', 'تضمین اصالت محصول', 'بسته‌بندی حرفه‌ای', 'پشتیبانی ۷ روزه'].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-olive inline-block" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({
  product,
  index,
  onAdd,
}: {
  product: Product;
  index: number;
  onAdd: () => void;
}) {
  const [adding, setAdding] = useState(false);
  const openQuickView = useUI((s) => s.setQuickView);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdding(true);
    onAdd();
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      className="group"
    >
      {/* Image */}
      <div
        className="relative aspect-[4/5] overflow-hidden bg-sand cursor-pointer"
        onClick={() => openQuickView(product)}
      >
        <motion.img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.75, ease: EASE }}
        />
        {product.collection && (
          <span className="absolute top-3 right-3 text-[10px] tracking-[0.1em] bg-white/90 backdrop-blur-sm text-ink px-2.5 py-1.5">
            {COLLECTION_FA[product.collection] ?? product.collection}
          </span>
        )}
        {product.badge && (
          <span className="absolute top-3 right-3 text-[10px] tracking-[0.1em] bg-olive text-white px-2.5 py-1.5">
            {product.badge.label}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="pt-5">
        <p className="section-eyebrow text-olive mb-1.5">{product.kicker}</p>
        <div className="flex justify-between items-start gap-3 mb-3">
          <Link
            href={`/product/${product.slug}`}
            className="text-[16px] font-medium leading-snug hover:text-olive transition-colors"
          >
            {product.title}
          </Link>
          <p className="text-[13px] whitespace-nowrap text-muted pt-0.5">
            {fmtPriceShort(product.price)} ت
          </p>
        </div>
        <p className="small-copy text-muted mb-4 line-clamp-2">{product.shortNote}</p>

        <motion.button
          onClick={handleAdd}
          disabled={!product.inStock || adding}
          animate={adding ? { scale: [1, 0.96, 1.02, 1] } : {}}
          transition={{ duration: 0.35 }}
          className="w-full py-3.5 text-[12px] tracking-[0.08em] bg-ink text-white hover:bg-olive transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          {adding ? '...' : product.inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
        </motion.button>
      </div>
    </motion.article>
  );
}
