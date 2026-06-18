import Link from 'next/link';
import { ArrowLeft, ChevronLeft, SlidersHorizontal } from 'lucide-react';

export function ShopHero() {
  return (
    <section className="bg-rice border-b border-line field-pattern">
      <div className="site-shell py-10 md:py-16">
        <nav className="flex items-center gap-2 text-[12px] text-muted mb-8">
          <Link href="/" className="hover:text-ink transition-colors">خانه</Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-ink">فروشگاه</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 items-end">
          <div>
            <p className="section-eyebrow text-cypress mb-4">فروشگاه کیوان</p>
            <h1 className="text-[clamp(42px,7vw,92px)] leading-[1.05] font-semibold text-ink max-w-[820px]">
              انتخاب برنج بر اساس عطر، پخت و سفره
            </h1>
            <p className="body-copy text-muted max-w-[620px] mt-5 leading-[2]">
              محصولات را بر اساس نوع برنج، منطقه کشت، وزن بسته‌بندی و کاربرد انتخاب کنید. هر کارت محصول مستقیم به خرید، جزئیات و علاقه‌مندی متصل است.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link href="/brand/keyvan-premium" className="cta-ink inline-flex items-center justify-center gap-2 px-6 py-3 text-[13px]">
                کیوان ممتاز
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link href="/use-case/daily-cooking" className="cta-outline inline-flex items-center justify-center px-6 py-3 text-[13px]">
                پخت روزانه
              </Link>
              <Link href="/use-case/organic-family" className="cta-outline inline-flex items-center justify-center px-6 py-3 text-[13px]">
                ارگانیک
              </Link>
            </div>
          </div>

          <div className="harvest-card bg-paper p-5 md:p-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-11 h-11 bg-cypress text-rice flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5" />
              </span>
              <div>
                <p className="text-[15px] font-semibold">راهنمای سریع انتخاب</p>
                <p className="text-[12px] text-muted mt-1">سه مسیر اصلی برای پیدا کردن محصول</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                ['مجلس', 'دمسیاه و طارم ممتاز'],
                ['روزانه', 'شیرودی و لنگرودی'],
                ['طبیعی', 'گزینه‌های ارگانیک'],
              ].map(([label, desc]) => (
                <div key={label} className="border border-line bg-rice p-3">
                  <p className="text-[13px] font-semibold text-ink">{label}</p>
                  <p className="text-[11px] leading-5 text-muted mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
