'use client';
import { Instagram, Twitter, Youtube } from 'lucide-react';

export function MiniFooter() {
  return (
    <footer className="bg-ink text-cream/70 border-t border-cream/10">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-right">
          <p className="latin text-[24px] tracking-tighter text-cream">Darya</p>
          <p className="text-[10px] tracking-[0.3em] text-olive2 mt-1">PERSIAN RICE · SINCE 1387</p>
        </div>

        <nav className="flex items-center gap-8 text-[12px] tracking-wider">
          <a href="#" className="hover:text-cream transition-colors">داستان</a>
          <a href="#" className="hover:text-cream transition-colors">دستور پخت</a>
          <a href="#" className="hover:text-cream transition-colors">مجله</a>
          <a href="/shop" className="hover:text-cream transition-colors">فروشگاه</a>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#" aria-label="اینستاگرام" className="w-9 h-9 border border-cream/20 hover:border-cream/60 transition-colors flex items-center justify-center">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" aria-label="توییتر" className="w-9 h-9 border border-cream/20 hover:border-cream/60 transition-colors flex items-center justify-center">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" aria-label="یوتیوب" className="w-9 h-9 border border-cream/20 hover:border-cream/60 transition-colors flex items-center justify-center">
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>
      <p className="text-center text-[10px] tracking-[0.3em] text-cream/30 pb-6">© ۱۴۰۳ DARYA RICE</p>
    </footer>
  );
}
