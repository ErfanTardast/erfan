'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronLeft } from 'lucide-react';

export function ShopHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const overlayOp = useTransform(scrollYProgress, [0, 1], [0.5, 0.75]);

  return (
    <section
      ref={ref}
      className="relative min-h-[580px] md:min-h-[700px] overflow-hidden flex items-end grain-overlay"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: imgY, scale: imgScale }}
      >
        <img
          src="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=1800&q=80"
          alt="مزارع برنج"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-ink"
        style={{ opacity: overlayOp }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />

      <motion.div
        className="relative max-w-[1500px] mx-auto w-full px-5 md:px-8 lg:px-12 pb-20 md:pb-28 text-white"
        style={{ y: textY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
          className="max-w-[800px]"
        >
          <div className="flex items-center gap-2 text-[11px] text-white/60 mb-8">
            <a href="/" className="hover:text-white transition-colors">خانه</a>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-white/90">فروشگاه</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="inline-block border border-white/30 px-3 py-1 text-[9px] tracking-[0.16em] text-white/80">
              کلکسیون بهار ۱۴۰۳
            </span>
            <span className="w-px h-4 bg-white/25" />
            <span className="text-[9px] tracking-[0.16em] text-white/60">برداشت تازه</span>
          </div>

          <p className="section-eyebrow text-white/70 mb-5">برنج‌های ممتاز ایرانی</p>
          <h1 className="title-xl max-w-[760px]">
            مجموعه کامل<br />برنج‌های اصیل
          </h1>
          <p className="body-copy text-white/80 max-w-[520px] mt-6 leading-loose">
            از مزارع سبز شمال ایران تا سفره شما — هر دانه با دقت انتخاب شده، با عشق بسته‌بندی شده است.
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom stat strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-0 inset-x-0 border-t border-white/10 bg-ink/40 backdrop-blur-sm py-3 px-5 md:px-8 lg:px-12"
      >
        <div className="max-w-[1500px] mx-auto flex items-center gap-6 md:gap-10 text-white/60 text-[10px] tracking-[0.16em]">
          <span>۸ محصول منتخب</span>
          <span className="hidden md:block">·</span>
          <span className="hidden md:block">ارسال رایگان بالای ۵۰۰٬۰۰۰ ت</span>
          <span className="hidden md:block">·</span>
          <span className="hidden md:block">تضمین اصالت ۱۴۰۳</span>
          <span className="md:hidden">ارسال رایگان · تضمین اصالت</span>
        </div>
      </motion.div>
    </section>
  );
}
