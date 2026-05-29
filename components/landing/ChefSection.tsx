'use client';
import { motion } from 'framer-motion';
import { PageTransitionTrigger } from '@/components/ui/PageTransition';

const PICKS = [
  {
    id: '1',
    name: 'طارم هاشمی ممتاز',
    reason: 'برای پلوهای مجلسی، هیچ چیز جایگزین نمی‌شود. عطرش کل خانه را پر می‌کند.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=480&q=85',
  },
  {
    id: '3',
    name: 'دمسیاه شمالی',
    reason: 'نادرترین دانه شمال — برای کسانی که تفاوت را با اولین لقمه حس می‌کنند.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=480&q=85',
  },
  {
    id: '7',
    name: 'کشت اول بهاره',
    reason: 'فقط یک بار در سال. هر دانه‌اش لحظه‌ای از بهار شمال ایران است.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=480&q=85',
  },
];

export function ChefSection() {
  return (
    <section className="bg-[#1a221a] text-cream py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="section-eyebrow text-olive2 mb-4"
            >
              — انتخاب سرآشپز —
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
              className="title-lg max-w-[520px]"
            >
              سه برنج که هر آشپزی باید بشناسد
            </motion.h2>
          </div>
          {/* Chef signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center gap-4 md:pb-2"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden bg-[#2a3a2a] shrink-0">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=120&q=80"
                alt="سرآشپز"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[14px] font-medium">مهران حسینی</p>
              <p className="small-copy text-cream/50">سرآشپز · رستوران دریای شمال · تهران</p>
            </div>
          </motion.div>
        </div>

        {/* Product picks grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {PICKS.map((pick, i) => (
            <motion.div
              key={pick.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
              className="group relative overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <motion.img
                  src={pick.image}
                  alt={pick.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.85, ease: [0.2, 0.7, 0.2, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a221a]/90 via-transparent to-transparent" />
              </div>
              {/* Content */}
              <div className="absolute bottom-0 inset-x-0 p-6">
                <span className="inline-block text-[9px] tracking-[0.18em] bg-olive/30 text-olive2 px-2.5 py-1 mb-3 border border-olive/20">
                  انتخاب سرآشپز
                </span>
                <h3 className="text-[18px] font-light mb-2">{pick.name}</h3>
                <p className="small-copy text-cream/60 leading-relaxed hidden md:block">{pick.reason}</p>
              </div>
              {/* Number */}
              <div className="absolute top-4 right-4 latin text-[56px] font-medium text-cream/[0.07] leading-none tracking-tighter select-none">
                {String(i + 1).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <PageTransitionTrigger>
            {(navigate) => (
              <button
                onClick={() => navigate('/shop')}
                className="border border-cream/30 hover:border-cream px-10 py-4 text-[13px] tracking-wider transition-all duration-300 hover:bg-cream/5"
              >
                مشاهده همه محصولات
              </button>
            )}
          </PageTransitionTrigger>
        </motion.div>
      </div>
    </section>
  );
}
