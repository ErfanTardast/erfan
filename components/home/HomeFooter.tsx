import { Instagram, Leaf, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function HomeFooter() {
  return (
    <footer className="border-t border-rice/15 bg-deep text-rice">
      <div className="site-shell flex flex-col gap-7 py-8 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="صفحه اصلی کیوان">
          <span className="flex h-10 w-10 items-center justify-center border border-rice/20 text-saffron">
            <Leaf className="h-4 w-4" />
          </span>
          <span>
            <span className="latin block text-[27px] leading-none">Keyvan</span>
            <span className="mt-1 block text-[10px] text-rice/55">برنج ایرانی با معیار انتخاب روشن</span>
          </span>
        </Link>

        <nav className="flex flex-wrap gap-x-5 gap-y-3 text-[12px] text-rice/65" aria-label="پیوندهای پایین صفحه">
          <Link href="/shop" className="hover:text-rice">فروشگاه</Link>
          <Link href="/about" className="hover:text-rice">درباره ما</Link>
          <Link href="/contact" className="hover:text-rice">تماس</Link>
          <Link href="/shipping" className="hover:text-rice">ارسال</Link>
          <Link href="/terms" className="hover:text-rice">شرایط فروش</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="flex h-11 w-11 items-center justify-center border border-rice/20 text-rice/70 hover:border-saffron hover:text-saffron"
            aria-label="تماس مستقیم با کیوان"
          >
            <MessageCircle className="h-4 w-4" />
          </Link>
          <a
            href="https://instagram.com/keyvanrice"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center border border-rice/20 text-rice/70 hover:border-saffron hover:text-saffron"
            aria-label="اینستاگرام کیوان"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-rice/10">
        <div className="site-shell py-4 text-[10px] text-rice/40">© ۱۴۰۵ کیوان. تمام حقوق محفوظ است.</div>
      </div>
    </footer>
  );
}
