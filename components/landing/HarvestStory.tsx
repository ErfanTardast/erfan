'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const STEPS = [
  {
    num: '۰۱',
    season: 'اردیبهشت',
    title: 'نشا و کاشت',
    copy: 'در اواخر بهار، کشاورزان نشاهای سبز را یک‌به‌یک در آب و گل می‌کارند. هر نشا، امید یک فصل.',
  },
  {
    num: '۰۲',
    season: 'تیر و مرداد',
    title: 'رشد و پرورش',
    copy: 'زیر آفتاب تابستان شمال، خوشه‌ها آرام سنگین می‌شوند. کشاورز هر روز آب را می‌پاید.',
  },
  {
    num: '۰۳',
    season: 'شهریور',
    title: 'برداشت با دست',
    copy: 'هنوز هم با داس و دست. ماشین نمی‌تواند ظرافت این لحظه را درک کند.',
  },
  {
    num: '۰۴',
    season: 'مهر',
    title: 'خشک و پاک‌سازی',
    copy: 'زیر آفتاب ملایم پاییز خشک می‌شود، سپس پاک‌سازی دستی — هر دانه‌ی ناقص کنار گذاشته می‌شود.',
  },
];

export function HarvestStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={ref} className="bg-[#0f160f] text-cream overflow-hidden relative grain-overlay">
      {/* Full-width cinematic image */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          <img
            src="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=1400&q=75"
            alt="برداشت برنج شمال ایران"
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f160f]/40 via-transparent to-[#0f160f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f160f]/60 via-transparent to-transparent" />

        <div className="relative h-full flex flex-col justify-end pb-16 md:pb-24 px-5 md:px-10 lg:px-16 max-w-[1500px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="section-eyebrow text-olive2 mb-4"
          >
            — داستان برداشت —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            className="title-xl max-w-[780px] leading-tight"
          >
            از خاک شمال<br />تا سفره شما
          </motion.h2>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 py-20 md:py-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              className="border-t border-cream/15 pt-8 pb-10 px-0 md:px-6 first:pr-0 last:pl-0"
            >
              <div className="flex items-baseline gap-3 mb-5">
                <span className="latin text-[44px] md:text-[56px] leading-none font-medium text-olive2/60 tracking-tighter">
                  {step.num}
                </span>
                <span className="text-[11px] tracking-[0.2em] text-gold/80">{step.season}</span>
              </div>
              <h3 className="text-[20px] font-light mb-4">{step.title}</h3>
              <p className="small-copy text-cream/55 leading-[2]">{step.copy}</p>
            </motion.div>
          ))}
        </div>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2 }}
          className="mt-20 md:mt-28 border-t border-cream/10 pt-16 md:pt-20 max-w-[900px] mx-auto text-center"
        >
          <p className="latin text-[clamp(48px,8vw,120px)] leading-none tracking-tighter text-cream/10 mb-8 select-none">
            "
          </p>
          <blockquote className="title-md !text-[clamp(20px,3vw,32px)] !font-light text-cream/80 leading-relaxed max-w-[700px] mx-auto -mt-8">
            هنوز هم با دست برداشت می‌کنیم. چون ماشین نمی‌داند کدام خوشه آماده است.
          </blockquote>
          <p className="mt-8 text-[11px] tracking-[0.24em] text-olive2">حاج رضا محمدی · کشاورز نسل سوم · رشت، گیلان</p>
        </motion.div>
      </div>
    </section>
  );
}
