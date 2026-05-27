'use client';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export function ShopHero() {
  return (
    <section className="relative min-h-[580px] md:min-h-[700px] overflow-hidden flex items-end">
      <img
        src="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=1800&q=80"
        alt="مزارع برنج"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative max-w-[1500px] mx-auto w-full px-5 md:px-8 lg:px-12 pb-16 md:pb-24 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
          className="max-w-[800px]"
        >
          <div className="flex items-center gap-2 text-[11px] text-white/70 mb-6">
            <a href="/" className="hover:text-white transition-colors">خانه</a>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-white">فروشگاه</span>
          </div>
          <span className="inline-block border border-white/35 px-3.5 py-1.5 text-[10px] tracking-[0.18em] mb-5 uppercase">
            کلکسیون بهار ۱۴۰۳
          </span>
          <p className="section-eyebrow text-white/80 mb-5">برنج‌های ممتاز ایرانی</p>
          <h1 className="title-xl max-w-[760px]">
            مجموعه کامل<br />برنج‌های اصیل
          </h1>
          <p className="body-copy text-white/85 max-w-[560px] mt-6 leading-loose">
            از مزارع سبز شمال ایران تا سفره شما — هر دانه با دقت انتخاب شده، با عشق بسته‌بندی شده است.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
