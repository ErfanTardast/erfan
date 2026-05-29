'use client';
import { motion } from 'framer-motion';

const STATS = [
  { num: '۳۶', label: 'سال تجربه' },
  { num: '۸', label: 'نوع برنج' },
  { num: '۳', label: 'استان شمالی' },
  { num: '۱۰۰٪', label: 'اصیل ایرانی' },
];

export function BrandStory() {
  return (
    <section className="bg-cream py-16 md:py-20 border-b border-sand">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="section-eyebrow text-olive mb-4">— داستان ما —</p>
            <h2 className="title-lg mb-5 max-w-[400px]">
              از دل مزارع شمال،<br />مستقیم به سفره شما
            </h2>
            <p className="body-copy text-muted leading-loose max-w-[380px]">
              از ۱۳۸۷ با کشاورزان نسل‌های شمال ایران کار می‌کنیم تا بهترین دانه‌ها، بدون واسطه، به دست شما برسد.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-px bg-line">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-cream p-7 md:p-10"
              >
                <p className="latin text-[clamp(34px,5vw,54px)] leading-none font-medium text-ink mb-1.5">
                  {s.num}
                </p>
                <p className="text-[11px] tracking-[0.14em] text-muted">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
