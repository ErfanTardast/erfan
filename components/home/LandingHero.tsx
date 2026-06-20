import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, MapPin, PackageCheck, Truck } from 'lucide-react';
import { assetPath } from '@/lib/asset-path';

const proofs = [
  { icon: MapPin, label: 'منتخب شالیزارهای آمل' },
  { icon: PackageCheck, label: 'بررسی دانه و نتیجه پخت' },
  { icon: Truck, label: 'ارسال رهگیری‌پذیر' },
];

export function LandingHero() {
  return (
    <section className="home-hero relative isolate overflow-hidden bg-cream">
      <Image
        src={assetPath('/images/keyvan/hero-amol-v2.webp')}
        alt="بسته برنج کیوان، کاسه مسی برنج و خوشه برنج ایرانی"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-[20%_center] md:object-center"
      />
      <div className="home-hero-scrim absolute inset-0" />

      <div className="site-shell relative z-10 flex min-h-[calc(100svh-68px)] items-center py-12 md:py-14">
        <div className="home-hero-copy max-w-[690px]">
          <p className="section-eyebrow mb-5 text-cypress">کیوان · انتخاب برنج ایرانی از آمل</p>
          <h1 className="max-w-[680px] text-[clamp(42px,6.2vw,82px)] font-semibold leading-[1.12] text-ink">
            برنج ایرانی منتخب،
            <span className="block">با منشأ و نتیجه پخت روشن</span>
          </h1>
          <p className="mt-6 max-w-[610px] text-[16px] leading-8 text-muted md:text-[17px]">
            هر محصول کیوان با رقم برنج، سال برداشت، کاربرد پیشنهادی و قیمت کامل بسته معرفی می‌شود؛
            برای انتخاب مطمئن خانه، مهمانی و رستوران.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-cypress px-7 text-[14px] font-semibold text-rice transition-colors hover:bg-deep"
            >
              ورود به فروشگاه
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center border border-ink/25 bg-paper/70 px-7 text-[14px] font-medium text-ink transition-colors hover:border-ink hover:bg-paper"
            >
              روش انتخاب کیوان
            </Link>
          </div>

          <div className="mt-7 flex max-w-[610px] items-start gap-3 border-t border-ink/15 pt-5 text-[12px] leading-6 text-ink/70">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-gold" />
            <span>کنترل عطر و یکدستی دانه · بسته‌بندی ایمن · راهنمایی پیش از خرید</span>
          </div>

          <div className="mt-5 grid max-w-[640px] grid-cols-1 gap-2 sm:grid-cols-3">
            {proofs.map((proof) => (
              <div key={proof.label} className="flex min-h-11 items-center gap-2 border border-ink/12 bg-paper/60 px-3 text-[11px] text-ink/72">
                <proof.icon className="h-3.5 w-3.5 shrink-0 text-gold" />
                <span>{proof.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link
        href="/product/tarom-hashemi-premium"
        className="absolute bottom-6 left-6 z-10 hidden min-w-[250px] border-r-2 border-gold bg-paper/92 px-5 py-4 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-paper md:block"
      >
        <span className="block text-[11px] text-cypress">پیشنهاد کیوان برای پلو مجلسی</span>
        <span className="mt-1 flex items-end justify-between gap-6">
          <strong className="text-[15px]">طارم هاشمی ممتاز</strong>
          <span className="text-[12px]">۹۲۵٬۰۰۰ تومان</span>
        </span>
      </Link>
    </section>
  );
}
