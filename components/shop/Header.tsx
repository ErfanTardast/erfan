'use client';
import { Menu, Search, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/store/cart';
import { useWishlist } from '@/lib/store/wishlist';
import { useUI } from '@/lib/store/ui';
import { toFa } from '@/lib/format';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const cartItems = useCart((s) => s.items);
  const wishIds = useWishlist((s) => s.ids);
  const openCart = useCart((s) => s.open);
  const setSearch = useUI((s) => s.setSearch);
  const setMobileMenu = useUI((s) => s.setMobileMenu);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', on, { passive: true });
    on();
    return () => window.removeEventListener('scroll', on);
  }, []);

  const cartCount = cartItems.reduce((n, i) => n + i.qty, 0);

  return (
    <header
      className={`nav-glass sticky top-0 z-40 border-b border-white/40 ${scrolled ? 'scrolled' : ''}`}
    >
      <div
        className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12 flex items-center justify-between transition-all duration-300"
        style={{ height: scrolled ? 62 : 74 }}
      >
        <div className="flex items-center gap-4">
          <button onClick={() => setMobileMenu(true)} className="lg:hidden p-1" aria-label="منو">
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="block">
            <div className={`latin leading-none tracking-tighter text-ink transition-all duration-300 ${scrolled ? 'text-[26px]' : 'text-[30px]'}`}>Darya</div>
            <div className={`text-[9px] tracking-[0.18em] text-olive transition-all duration-300 ${scrolled ? 'opacity-0 mt-0 h-0 overflow-hidden' : 'opacity-100 mt-[3px]'}`}>PERSIAN RICE</div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-9 text-[13px]">
          <div className="relative group">
            <Link href="/shop" className="py-7 flex items-center gap-1.5 hover:text-olive transition-colors">
              فروشگاه <ChevronDown className="w-3 h-3 opacity-50 mt-0.5" />
            </Link>
            <div className="absolute top-full right-0 w-[740px] bg-paper border border-line soft-shadow p-7 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(.2,.7,.2,1)]">
              <div className="grid grid-cols-[1fr_1fr_1.15fr] gap-7">
                <div>
                  <p className="section-eyebrow text-muted mb-5">انواع برنج</p>
                  <div className="space-y-3.5 text-[14px]">
                    <Link href="/shop" className="block hover:text-olive transition-colors">طارم هاشمی</Link>
                    <Link href="/shop" className="block hover:text-olive transition-colors">شیرودی</Link>
                    <Link href="/shop" className="block hover:text-olive transition-colors">دمسیاه</Link>
                    <Link href="/shop" className="block hover:text-olive transition-colors">علی‌کاظمی</Link>
                    <Link href="/shop" className="block hover:text-olive transition-colors">لنگرودی</Link>
                  </div>
                </div>
                <div>
                  <p className="section-eyebrow text-muted mb-5">کاربرد</p>
                  <div className="space-y-3.5 text-[14px]">
                    <Link href="/shop" className="block hover:text-olive transition-colors">پلو مجلسی</Link>
                    <Link href="/shop" className="block hover:text-olive transition-colors">چلو روزانه</Link>
                    <Link href="/shop" className="block hover:text-olive transition-colors">ارگانیک</Link>
                    <Link href="/shop" className="block hover:text-olive transition-colors">بسته هدیه</Link>
                  </div>
                </div>
                <div className="relative min-h-[200px] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=420&q=80"
                    alt="مزارع برنج"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/28" />
                  <p className="absolute right-4 bottom-4 text-white small-copy max-w-[155px] leading-relaxed">
                    مزارع سبز شمال ایران، منشأ بهترین برنج‌های جهان
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Link href="/shop" className="hover:text-olive transition-colors">کلکسیون‌ها</Link>
          <Link href="/about" className="hover:text-olive transition-colors">داستان ما</Link>
          <Link href="/recipes" className="hover:text-olive transition-colors">دستور پخت</Link>
          <Link href="/contact" className="hover:text-olive transition-colors">تماس با ما</Link>
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <button onClick={() => setSearch(true)} className="p-1" aria-label="جستجو">
            <Search className="w-4 h-4" />
          </button>
          <button className="hidden sm:block p-1 relative" aria-label="علاقه‌مندی‌ها">
            <Heart className="w-4 h-4" />
            {wishIds.length > 0 && (
              <span className="absolute -top-1.5 -left-1.5 bg-deep text-white rounded-full w-[16px] h-[16px] text-[9px] flex items-center justify-center">
                {toFa(wishIds.length)}
              </span>
            )}
          </button>
          <button onClick={openCart} className="relative p-1" aria-label="سبد خرید">
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -left-1.5 bg-deep text-white rounded-full w-[18px] h-[18px] text-[9px] flex items-center justify-center font-medium">
                {toFa(cartCount)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
