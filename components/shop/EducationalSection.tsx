import { ArrowLeft, Clock3, Flame, Ruler } from 'lucide-react';
import Link from 'next/link';

const GUIDES = [
  {
    icon: Ruler,
    label: 'دانه',
    title: 'طول دانه',
    copy: 'دانه بلند و کشیده برای پلو مجلسی بهتر قد می‌کشد؛ دانه متوسط برای مصرف روزانه اقتصادی‌تر است.',
  },
  {
    icon: Flame,
    label: 'عطر',
    title: 'عطر و کهنگی',
    copy: 'برنج کهنه‌تر معمولاً آب بیشتری می‌خواهد و بعد از پخت عطر پایدارتر و دانه جدا‌تری دارد.',
  },
  {
    icon: Clock3,
    label: 'پخت',
    title: 'زمان پخت',
    copy: 'برای طارم و دمسیاه، خیساندن ۴۵ تا ۶۰ دقیقه کمک می‌کند دانه یکنواخت‌تر بپزد.',
  },
];

export function EducationalSection() {
  return (
    <section className="border-y border-line bg-paper py-14 md:py-20">
      <div className="site-shell">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="section-eyebrow mb-3 text-cypress">راهنمای خریدار</p>
            <h2 className="title-lg max-w-[430px]">سه نشانه برای انتخاب دقیق‌تر برنج</h2>
            <p className="body-copy mt-5 max-w-[520px] text-muted">
              مشخصات هر محصول را با شیوه پخت و مصرف سفره خود بسنجید؛ نه فقط با نام برنج.
            </p>
            <Link href="/recipes" className="cta-outline mt-7 inline-flex h-11 items-center gap-2 px-5 text-[13px]">
              دستور پخت‌ها
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="border-t border-line">
          {GUIDES.map((guide, index) => {
            const Icon = guide.icon;
            return (
              <article
                key={guide.title}
                className="grid gap-4 border-b border-line py-6 sm:grid-cols-[54px_120px_1fr] sm:items-start"
              >
                <div className="flex items-center gap-3 text-saffron">
                  <span className="latin text-[12px]">0{index + 1}</span>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="section-eyebrow mb-1 text-cypress">{guide.label}</p>
                  <h3 className="text-[17px] font-medium">{guide.title}</h3>
                </div>
                <p className="small-copy max-w-[560px] text-muted">{guide.copy}</p>
              </article>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
