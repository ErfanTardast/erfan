'use client';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

const GUIDES = [
  {
    n: '۰۱',
    title: 'شناخت انواع دانه',
    copy: 'طارم هاشمی با دانه‌های ظریف ۷ میلی‌متری، دمسیاه با دانه‌های کشیده و شفاف، شیرودی با سفیدی مرواریدی — هر کدام برای آشپزی متفاوت.',
    tag: 'مقدماتی',
  },
  {
    n: '۰۲',
    title: 'پروفایل عطر ایرانی',
    copy: 'ترکیب طبیعی ۲-استیل-۱-پیرولین، همان مولکولی که عطر منحصربه‌فرد برنج‌های شمالی را می‌سازد. چطور آن را تشخیص دهید؟',
    tag: 'تخصصی',
  },
  {
    n: '۰۳',
    title: 'هنر پخت مجلسی',
    copy: 'خیساندن ۴۵ دقیقه، آبکشی با نمک، حرارت ملایم با دمکنی — سه مرحله‌ای که پلو را از خوب به شاهکار تبدیل می‌کنند.',
    tag: 'آشپزی',
  },
];

export function EducationalSection() {
  return (
    <section className="bg-[#ece5d9] overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 py-20 md:py-32">
        {/* Header row */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-16 md:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="section-eyebrow text-olive mb-4"
            >
              — راهنمای خریدار —
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="title-lg max-w-[600px]"
            >
              رازهای برنج ایرانی
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="shrink-0 border border-[#b5ac9f] px-7 py-3 text-[12px] tracking-[0.1em] text-[#5a5650] hover:bg-[#d9d0c3] hover:text-ink transition-all duration-300 hidden md:block"
          >
            راهنمای کامل
          </motion.button>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
          {/* Featured image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=85"
                alt="دانه برنج ایرانی"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -left-6 bottom-8 bg-ink text-cream p-6 w-[200px]"
            >
              <p className="latin text-[38px] font-medium tracking-tighter leading-none">03</p>
              <p className="text-[9px] tracking-[0.2em] text-olive2 mt-1">راز پخت کامل</p>
              <p className="small-copy text-cream/55 mt-3 leading-relaxed">
                از خیساندن تا دم — هر مرحله اهمیت دارد.
              </p>
            </motion.div>
          </motion.div>

          {/* Guide cards */}
          <div>
            <p className="body-copy text-[#686c63] max-w-[480px] leading-loose mb-10 lg:mb-12">
              آنچه هر دوستدار برنج باید بداند — از طول دانه تا پروفایل عطر، از منطقه کشت تا هنر پخت.
            </p>
            <div className="space-y-0">
              {GUIDES.map((g, i) => (
                <motion.div
                  key={g.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.75, delay: i * 0.1, ease: EASE }}
                  className="border-t border-[#c5bdb0] py-7 first:border-t-0 group cursor-default"
                >
                  <div className="flex items-start gap-5">
                    <span className="latin text-[28px] text-olive/60 font-medium leading-none mt-1 shrink-0">
                      {g.n}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2.5">
                        <h3 className="text-[17px] font-medium group-hover:text-olive transition-colors duration-300">
                          {g.title}
                        </h3>
                        <span className="text-[8px] tracking-[0.14em] border border-[#bdb5a5] px-2 py-0.5 text-[#857f76]">
                          {g.tag}
                        </span>
                      </div>
                      <p className="small-copy text-[#706d66] leading-[2]">{g.copy}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 md:hidden border border-[#b5ac9f] px-7 py-3 text-[12px] tracking-[0.1em] text-[#5a5650] hover:bg-[#d9d0c3] transition-all"
            >
              راهنمای کامل
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
