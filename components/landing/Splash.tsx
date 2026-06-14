'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Splash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('keyvan_splash')) return;
    sessionStorage.setItem('keyvan_splash', '1');
    setShow(true);
    const t = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const letters = ['D', 'a', 'r', 'y', 'a'];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[200] bg-ink flex flex-col items-center justify-center cursor-pointer"
          onClick={() => setShow(false)}
          initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          exit={{
            clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)',
            transition: { duration: 0.95, ease: [0.7, 0, 0.3, 1] },
          }}
        >
          <div className="overflow-hidden">
            <h1 className="latin text-cream text-[clamp(64px,15vw,180px)] leading-none tracking-tighter font-medium flex">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '120%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                  className="inline-block"
                >
                  {l}
                </motion.span>
              ))}
            </h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="text-olive2 text-[11px] tracking-[0.36em] mt-6 uppercase"
          >
            برنج ایرانی · از ۱۳۸۷
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.05, duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-px bg-cream/40 origin-left"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-16 text-cream/60 text-[10px] tracking-widest"
          >
            برای رد کردن کلیک کنید
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
