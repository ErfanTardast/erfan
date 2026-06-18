'use client';
import { Menu, Search, Heart, ShoppingBag, ChevronDown, User, Leaf } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/store/cart';
import { useWishlist } from '@/lib/store/wishlist';
import { useSearchStore } from '@/stores/search-store';
import { useMobileMenuStore } from '@/stores/mobile-menu-store';
import { useAccount } from '@/lib/store/account';
import { toFa } from '@/lib/format';

const riceLinks = [
  { label: 'طارم هاشمی', href: '/category/tarom' },
  { label: 'دمسیاه شمالی', href: '/category/domsiah' },
  { label: 'شیرودی', href: '/category/shirudi' },
  { label: 'علی‌کاظمی', href: '/category/alikazemi' },
];

const intentLinks = [
  { label: 'سفره مهمانی', href: '/use-case/guest-table' },
  { label: 'پخت روزانه', href: '/use-case/daily-cooking' },
  { label: 'خانواده ارگانیک', href: '/use-case/organic-family' },
  { label: 'هدیه و پذیرایی', href: '/use-case/gift-pack' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const cartItems = useCart((s) => s.items);
  const wishIds = useWishlist((s) => s.ids);
  const openCart = useCart((s) => s.open);
  const openSearch = useSearchStore((s) => s.open);
  const openMobileMenu = useMobileMenuStore((s) => s.open);
  const user = useAccount((s) => s.user);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cartCount = cartItems.reduce((count, item) => count + item.qty, 0);

  return (
    <header className={`nav-glass sticky top-0 z-40 border-b border-line/70 ${scrolled ? 'scrolled' : ''}`}>
      <div className="site-shell flex items-center justify-between gap-5 transition-all duration-300" style={{ minHeight: scrolled ? 64 : 76 }}>
        <div className="flex items-center gap-3">
          <button
            onClick={openMobileMenu}
            className="lg:hidden w-11 h-11 inline-flex items-center justify-center border border-line bg-paper"
            aria-label="باز کردن منو"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="group flex items-center gap-3" aria-label="Keyvan home">
            <span className="w-11 h-11 border border-ink bg-ink text-rice inline-flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </span>
            <span className="leading-none">
              <span className="latin block text-[27px] text-ink">Keyvan</span>
              <span className="block mt-1 text-[10px] text-muted">برنج اصیل ایرانی</span>
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-[13px] text-ink">
          <div className="relative group">
            <Link href="/shop" className="h-[76px] flex items-center gap-1.5 hover:text-cypress transition-colors">
              فروشگاه
              <ChevronDown className="w-3.5 h-3.5 text-muted" />
            </Link>
            <div className="absolute top-full right-0 w-[780px] bg-paper border border-line shadow-[0_22px_70px_rgba(23,33,26,0.14)] p-6 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
              <div className="grid grid-cols-[1fr_1fr_1.2fr] gap-7">
                <div>
                  <p className="section-eyebrow text-muted mb-4">نوع برنج</p>
                  <div className="space-y-3">
                    {riceLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="block hover:text-cypress transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="section-eyebrow text-muted mb-4">انتخاب بر اساس مصرف</p>
                  <div className="space-y-3">
                    {intentLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="block hover:text-cypress transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link href="/shop?premium=true" className="relative min-h-[210px] overflow-hidden bg-ink text-rice group/card">
                  <Image
                    src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=520&q=80"
                    alt="دانه‌های برنج کیوان"
                    fill
                    sizes="312px"
                    className="object-cover opacity-80 transition-transform duration-500 group-hover/card:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <div className="absolute bottom-4 right-4 left-4">
                    <p className="section-eyebrow text-rice/70 mb-2">کیوان ممتاز</p>
                    <p className="text-[17px] leading-7">محصولات ممتاز برای مهمانی و هدیه</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <Link href="/brand/keyvan-premium" className="hover:text-cypress transition-colors">کیوان ممتاز</Link>
          <Link href="/recipes" className="hover:text-cypress transition-colors">دستور پخت</Link>
          <Link href="/about" className="hover:text-cypress transition-colors">درباره ما</Link>
          <Link href="/contact" className="hover:text-cypress transition-colors">تماس</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center justify-center h-11 px-5 bg-cypress text-rice text-[12px] hover:bg-ink transition-colors"
          >
            خرید برنج
          </Link>
          <button onClick={openSearch} className="hidden w-11 h-11 items-center justify-center sm:inline-flex" aria-label="جستجو">
            <Search className="w-[18px] h-[18px]" />
          </button>
          <Link href="/wishlist" className="hidden sm:inline-flex w-11 h-11 items-center justify-center relative" aria-label="علاقه‌مندی‌ها">
            <Heart className="w-[18px] h-[18px]" />
            {wishIds.length > 0 && (
              <span className="absolute top-1 left-1 bg-clay text-white rounded-full min-w-[17px] h-[17px] px-1 text-[10px] flex items-center justify-center">
                {toFa(wishIds.length)}
              </span>
            )}
          </Link>
          <Link href={user ? '/account' : '/login'} className="relative hidden w-11 h-11 items-center justify-center sm:inline-flex" aria-label={user ? 'حساب کاربری' : 'ورود'}>
            <User className="w-[18px] h-[18px]" />
            {user && <span className="absolute top-2 left-2 bg-olive rounded-full w-2 h-2" />}
          </Link>
          <button onClick={openCart} className="w-11 h-11 inline-flex items-center justify-center relative" aria-label="سبد خرید">
            <ShoppingBag className="w-[18px] h-[18px]" />
            {cartCount > 0 && (
              <span className="absolute top-1 left-1 bg-ink text-white rounded-full min-w-[18px] h-[18px] px-1 text-[10px] flex items-center justify-center font-medium">
                {toFa(cartCount)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
