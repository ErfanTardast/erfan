import Image from 'next/image';
import { Headphones, PackageCheck, ShieldCheck, Truck } from 'lucide-react';
import { assetPath } from '@/lib/asset-path';

const ITEMS = [
  { icon: ShieldCheck, title: 'منشأ ثبت‌شده', sub: 'رقم، منطقه کشت و سال برداشت در معرفی هر محصول' },
  { icon: PackageCheck, title: 'کنترل دانه و عطر', sub: 'بررسی یکدستی دانه، عطر و سلامت بسته پیش از ارسال' },
  { icon: Truck, title: 'ارسال قابل پیگیری', sub: 'بسته‌بندی ایمن برای سفارش‌های سراسر ایران' },
  { icon: Headphones, title: 'راهنمای انتخاب', sub: 'پشتیبانی برای انتخاب برنج روزانه یا مجلسی' },
];

export function TrustBar() {
  return (
    <section className="bg-deep text-rice">
      <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative min-h-[420px] overflow-hidden lg:min-h-[620px]">
          <Image
            src={assetPath('/images/keyvan/about-quality.webp')}
            alt="بررسی کیفیت دانه‌های برنج کیوان"
            fill
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep/55 via-transparent to-transparent" />
          <p className="absolute bottom-6 right-6 left-6 text-[12px] leading-7 text-rice/72">
            کنترل دانه و بسته‌بندی پیش از خروج هر سفارش
          </p>
        </div>

        <div className="flex flex-col justify-center px-6 py-14 md:px-12 lg:px-[clamp(48px,7vw,110px)] lg:py-20">
          <p className="section-eyebrow mb-4 text-saffron">چرا کیوان</p>
          <h2 className="max-w-[620px] text-[clamp(34px,5vw,68px)] font-semibold leading-[1.16]">
            کیفیت هر محموله، پیش از ارسال بررسی می‌شود.
          </h2>
          <p className="mt-5 max-w-[560px] text-[15px] leading-8 text-rice/65">
            اطلاعات منشأ، کاربرد و نتیجه پخت پیش از خرید در دسترس شماست. سپس سلامت بسته و کیفیت ظاهری محصول پیش از ارسال دوباره کنترل می‌شود.
          </p>

          <div className="mt-10 grid gap-x-8 gap-y-0 sm:grid-cols-2">
            {ITEMS.map((item) => (
              <div key={item.title} className="border-t border-rice/18 py-6">
                <item.icon className="mb-4 h-5 w-5 text-saffron" />
                <p className="text-[17px] font-semibold">{item.title}</p>
                <p className="mt-2 text-[13px] leading-7 text-rice/58">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
