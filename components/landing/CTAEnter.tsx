'use client';
import { motion } from 'framer-motion';
import { PageTransitionTrigger } from '@/components/ui/PageTransition';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowLeft } from 'lucide-react';

export function CTAEnter() {
  return (
    <section className="bg-ink text-cream relative overflow-hidden grain-overlay">
      <div className="absolute inset-0 opacity-30">
        <img
          src="https://images.unsplash.com/photo-1468078809804-4c7b3e60a478?auto=format&fit=crop&w=2000&q=85"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />

      <div className="relative max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 py-32 md:py-48 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="section-eyebrow text-olive2 mb-8"
        >
          — آماده‌ای؟ —
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          className="title-xl !text-[clamp(48px,10vw,160px)] !leading-[0.95] !tracking-tight max-w-[1100px] mx-auto"
        >
          ورود به کلکسیون
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="latin text-olive2 text-[14px] tracking-[0.36em] mt-6 uppercase"
        >
          Enter the Collection
        </motion.p>

        <PageTransitionTrigger>
          {(navigate) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-16 flex justify-center"
            >
              <MagneticButton
                onClick={() => navigate('/shop')}
                className="group relative inline-flex items-center justify-center w-44 h-44 md:w-56 md:h-56 rounded-full border border-cream/40 hover:border-cream transition-colors text-cream"
              >
                <span className="flex flex-col items-center gap-3">
                  <span className="text-[16px] tracking-wider">ورود</span>
                  <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
                </span>
                <span className="absolute inset-0 rounded-full border border-cream/15 scale-110 group-hover:scale-125 transition-transform duration-500" />
                <span className="absolute inset-0 rounded-full border border-cream/10 scale-125 group-hover:scale-150 transition-transform duration-700" />
              </MagneticButton>
            </motion.div>
          )}
        </PageTransitionTrigger>

        <p className="mt-20 text-cream/40 text-[11px] tracking-[0.28em] uppercase">
          ۸ محصول · ارسال رایگان · تضمین اصالت
        </p>
      </div>
    </section>
  );
}
