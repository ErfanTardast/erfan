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
import { assetPath } from '@/lib/asset-path';

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
    <header className={`nav-glass sticky top-0 z-40 border-b border-line ${scrolled ? 'scrolled' : ''}`}>
      <div className="tile-rule h-[3px] w-full" />
      <div className="site-shell flex items-center justify-between gap-5 transition-all duration-300" style={{ minHeight: scrolled ? 64 : 72 }}>
        <div className="flex items-center gap-3">
          <button
            onClick={openMobileMenu}
            className="inline-flex h-11 w-11 items-center justify-center border border-line bg-paper transition-colors hover:border-gold lg:hidden"
            aria-label="باز کردن منو"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="group flex items-center gap-3" aria-label="Keyvan home">
            <span className="inline-flex h-11 w-11 items-center justify-center border border-cypress bg-cypress text-rice">
              <Leaf className="w-5 h-5" />
            </span>
            <span className="leading-none">
              <span className="latin block text-[29px] text-ink">Keyvan</span>
              <span className="mt-1 block text-[10px] text-muted">مرجع انتخاب برنج ایرانی از آمل</span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 text-[13px] text-ink lg:flex">
          <div className="relative group">
            <Link href="/shop" className="flex h-[72px] items-center gap-1.5 border-b-2 border-transparent transition-colors hover:border-gold hover:text-cypress">
              فروشگاه
              <ChevronDown className="w-3.5 h-3.5 text-muted" />
            </Link>
            <div className="invisible absolute right-0 top-full w-[780px] translate-y-2 border border-line bg-paper p-7 opacity-0 shadow-[0_26px_80px_rgba(19,37,30,0.16)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-[1fr_1fr_1.2fr] gap-7">
                <div>
                  <p className="section-eyebrow mb-4 text-indigo">نوع برنج</p>
                  <div className="space-y-3">
                    {riceLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="block hover:text-cypress transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="section-eyebrow mb-4 text-indigo">انتخاب بر اساس مصرف</p>
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
                    src={assetPath('/images/keyvan/tarom-premium.webp')}
                    alt="دانه‌های برنج کیوان"
                    fill
                    sizes="312px"
                    className="object-cover opacity-80 transition-transform duration-500 group-hover/card:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/18 to-transparent" />
                  <div className="absolute bottom-4 right-4 left-4">
                    <p className="section-eyebrow text-rice/70 mb-2">کیوان ممتاز</p>
                    <p className="text-[17px] leading-7">محصولات ممتاز برای مهمانی و هدیه</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <Link href="/brand/keyvan-premium" className="border-b-2 border-transparent py-6 transition-colors hover:border-gold hover:text-cypress">کیوان ممتاز</Link>
          <Link href="/recipes" className="hover:text-cypress transition-colors">دستور پخت</Link>
          <Link href="/about" className="hover:text-cypress transition-colors">درباره ما</Link>
          <Link href="/contact" className="hover:text-cypress transition-colors">تماس</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            className="hidden h-11 items-center justify-center bg-saffron px-5 text-[12px] font-semibold text-deep transition-colors hover:bg-ink hover:text-rice md:inline-flex"
          >
            خرید برنج
          </Link>
          <button onClick={openSearch} className="hidden h-11 w-11 items-center justify-center transition-colors hover:bg-sand sm:inline-flex" aria-label="جستجو">
            <Search className="w-[18px] h-[18px]" />
          </button>
          <Link href="/wishlist" className="relative hidden h-11 w-11 items-center justify-center transition-colors hover:bg-sand sm:inline-flex" aria-label="علاقه‌مندی‌ها">
            <Heart className="w-[18px] h-[18px]" />
            {wishIds.length > 0 && (
              <span className="absolute top-1 left-1 bg-clay text-white rounded-full min-w-[17px] h-[17px] px-1 text-[10px] flex items-center justify-center">
                {toFa(wishIds.length)}
              </span>
            )}
          </Link>
          <Link href={user ? '/account' : '/login'} className="relative hidden h-11 w-11 items-center justify-center transition-colors hover:bg-sand sm:inline-flex" aria-label={user ? 'حساب کاربری' : 'ورود'}>
            <User className="w-[18px] h-[18px]" />
            {user && <span className="absolute top-2 left-2 bg-olive rounded-full w-2 h-2" />}
          </Link>
          <button onClick={openCart} className="relative inline-flex h-11 w-11 items-center justify-center transition-colors hover:bg-sand" aria-label="سبد خرید">
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
