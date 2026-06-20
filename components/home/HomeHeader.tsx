'use client';

import { Leaf, Menu, Search, ShoppingBag } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { useCart } from '@/lib/store/cart';
import { toFa } from '@/lib/format';
import { useMobileMenuStore } from '@/stores/mobile-menu-store';
import { useSearchStore } from '@/stores/search-store';

const SearchOverlay = dynamic(
  () => import('@/components/shop/SearchOverlay').then((module) => ({ default: module.SearchOverlay })),
  { ssr: false }
);
const MobileMenuDrawer = dynamic(
  () => import('@/components/shop/MobileMenuDrawer').then((module) => ({ default: module.MobileMenuDrawer })),
  { ssr: false }
);

const links = [
  { label: 'فروشگاه', href: '/shop' },
  { label: 'محصولات', href: '/shop#products' },
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس', href: '/contact' },
];

export function HomeHeader() {
  const [hydrated, setHydrated] = useState(false);
  const items = useCart((state) => state.items);
  const openCart = useCart((state) => state.open);
  const openMenu = useMobileMenuStore((state) => state.open);
  const menuOpen = useMobileMenuStore((state) => state.isOpen);
  const openSearch = useSearchStore((state) => state.open);
  const searchOpen = useSearchStore((state) => state.isOpen);
  const cartCount = items.reduce((count, item) => count + item.qty, 0);

  useEffect(() => setHydrated(true), []);

  return (
    <>
      <header className="home-header sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="site-shell flex min-h-[68px] items-center justify-between gap-4">
          <Link href="/" className="flex min-h-11 items-center gap-3" aria-label="صفحه اصلی کیوان">
            <span className="flex h-10 w-10 items-center justify-center bg-cypress text-rice">
              <Leaf className="h-5 w-5" />
            </span>
            <span>
              <span className="latin block text-[27px] leading-none text-ink">Keyvan</span>
              <span className="mt-1 block text-[10px] text-muted">برنج اصیل آمل، مازندران</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-[13px] text-ink lg:flex" aria-label="ناوبری اصلی">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="home-nav-link flex min-h-11 items-center">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/shop"
              className="hidden min-h-11 items-center justify-center bg-cypress px-5 text-[12px] font-semibold text-rice transition-colors hover:bg-deep sm:inline-flex"
            >
              خرید برنج
            </Link>
            <button
              type="button"
              onClick={openSearch}
              disabled={!hydrated}
              data-hydrated={hydrated}
              className="inline-flex h-11 w-11 items-center justify-center transition-colors hover:bg-cream disabled:cursor-wait disabled:opacity-60"
              aria-label="جستجو"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              onClick={openCart}
              disabled={!hydrated}
              data-hydrated={hydrated}
              className="relative inline-flex h-11 w-11 items-center justify-center transition-colors hover:bg-cream disabled:cursor-wait disabled:opacity-60"
              aria-label="سبد خرید"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute left-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ink px-1 text-[10px] text-rice">
                  {toFa(cartCount)}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={openMenu}
              disabled={!hydrated}
              data-hydrated={hydrated}
              className="inline-flex h-11 w-11 items-center justify-center border border-line disabled:cursor-wait disabled:opacity-60 lg:hidden"
              aria-label="باز کردن منو"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <CartDrawer />
      {searchOpen && <SearchOverlay />}
      {menuOpen && <MobileMenuDrawer />}
    </>
  );
}
