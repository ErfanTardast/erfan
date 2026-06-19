'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Phone } from 'lucide-react';
import Link from 'next/link';
import { CATEGORY_NAV } from '@/lib/ecom-data';

export function EcomHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-red-600 text-white text-[11px] sm:text-xs text-center py-1.5 px-4 leading-relaxed">
        <span className="hidden sm:inline">🚀 ارسال رایگان برای خرید بالای ۵۰۰,۰۰۰ تومان</span>
        <span className="sm:hidden">🚀 ارسال رایگان بالای ۵۰۰ هزار تومان</span>
        <span className="hidden md:inline mx-3 opacity-40">|</span>
        <span className="hidden md:inline">پشتیبانی ۲۴ ساعته: ۰۲۱-۶۱۹۳۰۰۰۰</span>
      </div>

      <header
        className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-sm border-b border-gray-100'
        }`}
      >
        {/* Main header row */}
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-1.5 text-gray-600 hover:text-red-600 transition-colors flex-shrink-0"
            aria-label="باز کردن منو"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="flex flex-col leading-none">
              <span className="text-red-600 font-bold text-lg sm:text-xl md:text-2xl group-hover:text-red-700 transition-colors">
                تسمه سقا
              </span>
              <span className="text-gray-400 text-[9px] sm:text-[10px] font-normal mt-0.5 hidden sm:block">
                فروشگاه اینترنتی
              </span>
            </div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 relative min-w-0">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو در محصولات، برندها و دسته‌بندی‌ها"
              className="w-full border border-gray-200 rounded-lg py-2 sm:py-2.5 px-3 sm:px-4 pe-10 text-xs sm:text-sm text-gray-700 placeholder:text-gray-400 bg-gray-50 focus:bg-white focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
            />
            <button className="absolute start-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors p-1">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop action buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <button className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-red-600 transition-colors min-w-[56px] py-1">
              <User className="w-5 h-5" />
              <span className="text-[10px] whitespace-nowrap">ورود / ثبت‌نام</span>
            </button>
            <div className="w-px h-8 bg-gray-100" />
            <button className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-red-600 transition-colors relative min-w-[56px] py-1">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -left-2 bg-red-600 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
                  ۰
                </span>
              </div>
              <span className="text-[10px]">سبد خرید</span>
            </button>
            <div className="w-px h-8 bg-gray-100 hidden lg:block" />
            <a
              href="tel:02161930000"
              className="hidden lg:flex flex-col items-center gap-0.5 text-gray-600 hover:text-red-600 transition-colors min-w-[56px] py-1"
            >
              <Phone className="w-5 h-5" />
              <span className="text-[10px]">تماس با ما</span>
            </a>
          </div>

          {/* Mobile cart */}
          <button className="md:hidden relative p-1.5 text-gray-600 hover:text-red-600 transition-colors flex-shrink-0">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-0 left-0 bg-red-600 text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold leading-none">
              ۰
            </span>
          </button>
        </div>

        {/* Category nav bar — desktop only */}
        <nav className="hidden md:block border-t border-gray-100">
          <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
            <ul className="flex items-center overflow-x-auto scrollbar-hide">
              {CATEGORY_NAV.map((cat) => (
                <li key={cat.id} className="flex-shrink-0">
                  <Link
                    href={cat.href}
                    className="block whitespace-nowrap px-3 lg:px-4 py-2.5 text-[13px] text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors border-b-2 border-transparent hover:border-red-500 font-medium"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
              <li className="flex-shrink-0 me-auto">
                <button className="flex items-center gap-1 whitespace-nowrap px-3 lg:px-4 py-2.5 text-[13px] text-gray-500 hover:text-red-600 transition-colors border-b-2 border-transparent hover:border-red-500">
                  همه دسته‌بندی‌ها <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 end-0 w-[80vw] max-w-[320px] h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div>
              <span className="font-bold text-red-600 text-lg block leading-none">تسمه سقا</span>
              <span className="text-gray-400 text-[10px]">فروشگاه اینترنتی</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 border-b border-gray-100">
            <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2.5 text-sm font-medium transition-colors">
              <User className="w-4 h-4" />
              ورود / ثبت‌نام
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-3">
              <p className="text-[10px] text-gray-400 font-medium px-3 pt-2 pb-1 uppercase tracking-wider">
                دسته‌بندی‌ها
              </p>
              <div className="space-y-0.5">
                {CATEGORY_NAV.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.href}
                    className="flex items-center gap-3 px-3 py-2.5 text-[13px] text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-3 border-t border-gray-100 mt-2">
              <a
                href="tel:02161930000"
                className="flex items-center gap-3 px-3 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 text-red-500" />
                ۰۲۱-۶۱۹۳۰۰۰۰
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
