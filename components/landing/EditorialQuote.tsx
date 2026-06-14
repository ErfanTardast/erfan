'use client';
import { motion } from 'framer-motion';

export function EditorialQuote() {
  return (
    <section className="bg-cream py-24 md:py-40 overflow-hidden relative">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-[1300px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-center">
          {/* Left: editorial image stack */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=85"
                alt="سفره ایرانی"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -left-8 -bottom-8 bg-ink text-cream p-6 w-[200px]"
            >
              <p className="latin text-[40px] leading-none font-medium tracking-tighter">120</p>
              <p className="text-[10px] tracking-[0.2em] text-olive2 mt-1">سال پیشینه</p>
              <p className="small-copy text-cream/60 mt-3 leading-relaxed">
                از نسل اول تا نسل سوم، همان خاک، همان عشق.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: quote + story */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="section-eyebrow text-olive mb-8"
            >
              — فلسفه کیوان —
            </motion.p>

            <motion.blockquote
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
              className="title-lg !text-[clamp(28px,4.5vw,58px)] !font-light leading-relaxed max-w-[680px]"
            >
              برنج فقط غذا نیست. یک آیین است، یک خاطره، یک هویت.
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-10 grid sm:grid-cols-2 gap-8 border-t border-sand pt-10"
            >
              <div>
                <p className="text-[13px] font-medium mb-2.5">برنج‌پزی سنتی</p>
                <p className="small-copy text-muted leading-[2.1]">
                  در آشپزخانه‌های ایرانی، پختن برنج یک مهارت است که از مادر به دختر منتقل می‌شود. هر خانواده رازی دارد.
                </p>
              </div>
              <div>
                <p className="text-[13px] font-medium mb-2.5">کیوان و تعهد</p>
                <p className="small-copy text-muted leading-[2.1]">
                  ما فقط با کشاورزانی کار می‌کنیم که نام مزرعه‌شان را روی هر کیسه می‌نویسیم. ردپایی که می‌توانید دنبالش کنید.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
