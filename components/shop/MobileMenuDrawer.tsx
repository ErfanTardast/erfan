'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useUI } from '@/lib/store/ui';

export function MobileMenuDrawer() {
  const open = useUI((s) => s.mobileMenuOpen);
  const setOpen = useUI((s) => s.setMobileMenu);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-y-0 right-0 z-50 w-[84%] max-w-[360px] bg-paper p-7 border-l border-line"
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="latin text-[30px] tracking-tighter">Darya</div>
                <div className="text-[9px] tracking-[0.22em] mt-1 text-olive">PERSIAN RICE</div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="بستن" className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-6 text-[24px] font-light">
              <Link href="/shop" onClick={() => setOpen(false)} className="block w-full text-right hover:text-olive transition-colors">فروشگاه</Link>
              <Link href="/shop" onClick={() => setOpen(false)} className="block w-full text-right hover:text-olive transition-colors">کلکسیون‌ها</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="block w-full text-right hover:text-olive transition-colors">داستان ما</Link>
              <Link href="/recipes" onClick={() => setOpen(false)} className="block w-full text-right hover:text-olive transition-colors">دستور پخت</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="block w-full text-right hover:text-olive transition-colors">تماس با ما</Link>
            </nav>
            <div className="absolute bottom-6 right-7 left-7 border-t border-line pt-5 small-copy text-[#76766d] leading-loose">
              ارسال رایگان برای سفارش‌های بالای ۵۰۰،۰۰۰ تومان<br />
              پشتیبانی: ۰۲۱-۱۲۳۴۵۶۷۸
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
