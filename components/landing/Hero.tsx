'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Marquee } from '@/components/ui/Marquee';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const overlayOp = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const textOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink grain-overlay"
    >
      <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
        <img
          src="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=2200&q=85"
          alt="مزارع برنج شمال ایران"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <motion.div className="absolute inset-0 bg-ink" style={{ opacity: overlayOp }} />

      <motion.div
        className="relative h-full max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 flex flex-col justify-end pb-32 md:pb-40 text-cream"
        style={{ y: textY, opacity: textOp }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.8 }}
          className="section-eyebrow text-cream/70 mb-6"
        >
          از زمین تا سفره
        </motion.p>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '120%' }}
            animate={{ y: '0%' }}
            transition={{ delay: 2.5, duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
            className="latin font-medium text-[clamp(72px,16vw,260px)] leading-[0.85] tracking-tighter"
          >
            Darya
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.7 }}
          className="mt-6 max-w-[520px] flex items-start gap-6"
        >
          <span className="block w-12 h-px bg-cream mt-3 shrink-0" />
          <p className="body-copy text-cream/85 leading-loose">
            از مزارع سبز شمال ایران تا سفره شما — هر دانه با دقت انتخاب شده، با عشق بسته‌بندی شده است.
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 3.5, duration: 0.6 }}
        className="absolute bottom-6 right-1/2 translate-x-1/2 flex flex-col items-center gap-2 text-cream/70 text-[10px] tracking-[0.3em]"
      >
        <span>پایین بکشید</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-cream/40 block"
        />
      </motion.div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 inset-x-0 border-t border-cream/15 py-4 text-cream/80 text-[12px] tracking-[0.22em] bg-ink/30 backdrop-blur-sm">
        <Marquee
          speed="normal"
          items={[
            <span key="1">کشت اصیل ایرانی</span>,
            <span key="2" className="latin">100% NATURAL</span>,
            <span key="3">از مزارع گیلان</span>,
            <span key="4" className="latin">SINCE 1387</span>,
            <span key="5">تضمین اصالت محصول</span>,
            <span key="6" className="latin">FROM EARTH TO TABLE</span>,
            <span key="7">عطر بهشتی شمال ایران</span>,
          ]}
        />
      </div>
    </section>
  );
}
