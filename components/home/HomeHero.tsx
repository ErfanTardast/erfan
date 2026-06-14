'use client';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-ink grain-overlay" style={{ height: 'clamp(420px, 62vh, 680px)' }}>
      <img
        src="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=1600&q=80"
        alt="مزارع برنج شمال ایران"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/58" />

      <div className="relative h-full max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 flex flex-col justify-center text-cream">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-eyebrow text-cream/55 mb-5"
        >
          از زمین تا سفره — شمال ایران
        </motion.p>

        <div className="overflow-hidden mb-5">
          <motion.h1
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1] }}
            className="latin font-medium leading-[0.9] tracking-tighter text-[clamp(64px,13vw,180px)]"
          >
            Keyvan
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="body-copy text-cream/70 max-w-[400px] leading-loose mb-9"
        >
          برنج‌های اصیل ایرانی از مزارع سبز شمال — هر دانه با دقت انتخاب شده است.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="flex items-center gap-5 flex-wrap"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2.5 bg-cream text-ink text-[13px] tracking-[0.08em] px-7 py-3.5 hover:bg-sand transition-colors duration-200"
          >
            <ShoppingBag className="w-4 h-4" />
            مشاهده محصولات
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-cream/65 text-[12px] tracking-[0.06em] hover:text-cream transition-colors duration-200"
          >
            <span>۸ محصول برتر</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
