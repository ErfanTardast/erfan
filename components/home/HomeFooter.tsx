import Link from 'next/link';
import { Instagram, Twitter, Youtube } from 'lucide-react';

export function HomeFooter() {
  return (
    <footer className="bg-ink text-cream/65 border-t border-cream/10">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 lg:px-16 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="latin text-[30px] text-cream mb-1.5">Keyvan</p>
            <p className="text-[10px] text-olive mb-5">برنج ایرانی · از ۱۳۸۷</p>
            <p className="small-copy text-cream/40 leading-loose max-w-[230px]">
              از مزارع سبز شمال ایران تا سفره شما، هر دانه با عشق انتخاب شده است.
            </p>
          </div>

          {/* Nav links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="section-eyebrow text-cream/35 mb-5">فروشگاه</p>
              <nav className="space-y-3 text-[13px]">
                <Link href="/shop" className="block hover:text-cream transition-colors duration-150">همه محصولات</Link>
                <Link href="/shop?collection=chef-choice" className="block hover:text-cream transition-colors duration-150">انتخاب سرآشپز</Link>
                <Link href="/shop?collection=rare-harvest" className="block hover:text-cream transition-colors duration-150">برداشت نادر</Link>
                <Link href="/shop?collection=limited-seasonal" className="block hover:text-cream transition-colors duration-150">فصلی محدود</Link>
              </nav>
            </div>
            <div>
              <p className="section-eyebrow text-cream/35 mb-5">کیوان</p>
              <nav className="space-y-3 text-[13px]">
                <Link href="/about" className="block hover:text-cream transition-colors duration-150">داستان ما</Link>
                <Link href="/recipes" className="block hover:text-cream transition-colors duration-150">دستور پخت</Link>
                <Link href="/recipes" className="block hover:text-cream transition-colors duration-150">مجله</Link>
                <Link href="/contact" className="block hover:text-cream transition-colors duration-150">تماس با ما</Link>
              </nav>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="section-eyebrow text-cream/35 mb-5">ما را دنبال کنید</p>
            <div className="flex items-center gap-2.5 mb-7">
              {[
                { label: 'اینستاگرام', Icon: Instagram, href: 'https://instagram.com/keyvanrice' },
                { label: 'توییتر', Icon: Twitter, href: 'https://x.com/keyvanrice' },
                { label: 'یوتیوب', Icon: Youtube, href: 'https://youtube.com/@keyvanrice' },
              ].map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 border border-cream/15 hover:border-cream/40 flex items-center justify-center transition-colors duration-150"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-[11px] text-cream/30 leading-loose">
              برای دریافت پیشنهادات ویژه<br />اینستاگرام ما را دنبال کنید
            </p>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-cream/28">© ۱۴۰۳ کیوان — همه حقوق محفوظ است</p>
          <div className="flex gap-5 text-[11px] text-cream/28">
            <Link href="/privacy" className="hover:text-cream/60 transition-colors">حریم خصوصی</Link>
            <Link href="/terms" className="hover:text-cream/60 transition-colors">قوانین و مقررات</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
