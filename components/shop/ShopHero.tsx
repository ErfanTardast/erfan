import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, MapPin } from 'lucide-react';

const ROUTES = [
  { label: 'مجلسی', sub: 'طارم و دمسیاه', href: '/use-case/guest-table' },
  { label: 'مصرف روزانه', sub: 'شیرودی و ندا', href: '/use-case/daily-cooking' },
  { label: 'کشت طبیعی', sub: 'انتخاب‌های ارگانیک', href: '/use-case/organic-family' },
];

export function ShopHero() {
  return (
    <section className="border-b border-line bg-cream">
      <div className="site-shell py-6">
        <nav className="mb-5 flex items-center gap-2 text-[12px] text-muted">
          <Link href="/" className="transition-colors hover:text-ink">خانه</Link>
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="text-ink">فروشگاه</span>
        </nav>

        <div className="grid overflow-hidden border border-line bg-paper lg:grid-cols-[0.62fr_1.38fr]">
          <div className="relative min-h-[300px] lg:min-h-[420px]">
            <Image
              src="/images/keyvan/hero-ledger.webp"
              alt="برنج‌های منتخب فروشگاه کیوان"
              fill
              priority
              sizes="(min-width: 1024px) 32vw, 100vw"
              className="object-cover object-left"
            />
          </div>

          <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
            <div className="flex items-center gap-3 text-[12px] text-indigo">
              <MapPin className="h-4 w-4" />
              آمل، مازندران
            </div>
            <h1 className="mt-5 max-w-[760px] text-[clamp(38px,6vw,78px)] font-semibold leading-[1.08] text-ink">
              برنج را با نتیجه پخت انتخاب کنید.
            </h1>
            <p className="mt-5 max-w-[650px] text-[15px] leading-8 text-muted">
              نوع برنج، عطر، منطقه کشت، وزن بسته و قیمت کامل در یک نگاه؛ بدون حدس‌زدن و قیمت مبهم.
            </p>

            <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
              {ROUTES.map((route) => (
                <Link key={route.href} href={route.href} className="group bg-paper p-4 transition-colors hover:bg-rice">
                  <span className="block text-[15px] font-semibold text-ink">{route.label}</span>
                  <span className="mt-1 block text-[11px] text-muted">{route.sub}</span>
                  <ArrowLeft className="mt-4 h-4 w-4 text-cypress transition-transform group-hover:-translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
