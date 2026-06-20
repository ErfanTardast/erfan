'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowLeft, Heart, Leaf, ShoppingBag, User, X } from 'lucide-react';
import Link from 'next/link';
import { useMobileMenuStore } from '@/stores/mobile-menu-store';
import { useAccount } from '@/lib/store/account';

const primaryLinks = [
  { label: 'فروشگاه', href: '/shop' },
  { label: 'برنج طارم', href: '/category/tarom' },
  { label: 'برنج دمسیاه', href: '/category/domsiah' },
  { label: 'برنج روزانه', href: '/use-case/daily-cooking' },
  { label: 'پذیرایی و هدیه', href: '/use-case/gift-pack' },
];

const supportLinks = [
  { label: 'دستور پخت', href: '/recipes' },
  { label: 'ارسال و تحویل', href: '/shipping' },
  { label: 'سوالات رایج', href: '/faq' },
  { label: 'درباره کیوان', href: '/about' },
  { label: 'تماس', href: '/contact' },
];

export function MobileMenuDrawer() {
  const open = useMobileMenuStore((s) => s.isOpen);
  const setOpen = useMobileMenuStore((s) => s.setOpen);
  const user = useAccount((s) => s.user);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-ink/45"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="منوی اصلی"
            className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-[390px] flex-col overflow-y-auto border-l border-line bg-rice"
          >
            <div className="border-b border-line bg-paper p-5">
              <div className="flex items-start justify-between gap-4">
                <Link href="/" onClick={close} className="flex items-center gap-3" aria-label="Keyvan home">
                  <span className="flex h-11 w-11 items-center justify-center bg-ink text-rice">
                    <Leaf className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="latin block text-[30px] leading-none text-ink">Keyvan</span>
                    <span className="mt-1 block text-[11px] text-muted">انتخاب برنج ایرانی از آمل</span>
                  </span>
                </Link>
                <button ref={closeRef} onClick={close} aria-label="بستن" className="flex h-11 w-11 items-center justify-center border border-line bg-rice">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <Link href="/shop" onClick={close} className="cta-ink mt-5 flex h-12 items-center justify-center gap-2 text-[13px]">
                <ShoppingBag className="h-4 w-4" />
                خرید برنج
              </Link>
            </div>

            <nav className="flex-1 p-5">
              <div className="space-y-1">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="flex min-h-12 items-center justify-between border-b border-line/70 text-[17px] text-ink transition-colors hover:text-cypress"
                  >
                    {link.label}
                    <ArrowLeft className="h-4 w-4 text-muted" />
                  </Link>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-2">
                <Link href={user ? '/account' : '/login'} onClick={close} className="harvest-card flex min-h-24 flex-col justify-between p-4">
                  <User className="h-5 w-5 text-cypress" />
                  <span className="text-[13px]">{user ? 'حساب کاربری' : 'ورود / ثبت‌نام'}</span>
                </Link>
                <Link href="/wishlist" onClick={close} className="harvest-card flex min-h-24 flex-col justify-between p-4">
                  <Heart className="h-5 w-5 text-clay" />
                  <span className="text-[13px]">علاقه‌مندی‌ها</span>
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 text-[13px] text-muted">
                {supportLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={close} className="min-h-10 hover:text-ink">
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="border-t border-line bg-paper p-5 text-[12px] leading-7 text-muted">
              ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان
              <br />
              پشتیبانی: info@keyvanrice.ir
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
