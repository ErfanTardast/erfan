import { Header } from '@/components/shop/Header';
import { Footer } from '@/components/shop/Footer';
export const metadata = { title: 'حریم خصوصی — Darya Rice' };
export default function PrivacyPage() {
  const sections = [
    { title: 'جمع‌آوری اطلاعات', body: 'ما فقط اطلاعاتی را که برای پردازش سفارش شما نیاز است جمع‌آوری می‌کنیم، از جمله نام، آدرس، و شماره تماس.' },
    { title: 'استفاده از اطلاعات', body: 'اطلاعات شما صرفاً برای ارسال سفارش و ارتباط با شما در مورد خریدتان استفاده می‌شود. اطلاعات شما به هیچ طرف ثالثی فروخته نمی‌شود.' },
    { title: 'امنیت اطلاعات', body: 'ما از روش‌های استاندارد صنعتی برای محافظت از اطلاعات شما استفاده می‌کنیم. تمام تراکنش‌های مالی از طریق درگاه‌های پرداخت معتبر انجام می‌شود.' },
    { title: 'کوکی‌ها', body: 'سایت ما از کوکی‌ها برای بهبود تجربه کاربری و حفظ محتوای سبد خرید شما استفاده می‌کند.' },
    { title: 'تماس', body: 'برای هرگونه سؤال در مورد حریم خصوصی، با ما از طریق صفحه تماس در ارتباط باشید.' },
  ];
  return (
    <>
      <Header />
      <main className="bg-[var(--cream)] min-h-screen">
        <div className="max-w-[760px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <p className="text-[var(--olive)] text-[10px] tracking-[0.24em] mb-6">— حریم خصوصی —</p>
          <h1 className="text-[var(--ink)] font-light mb-12" style={{ fontSize: 'clamp(32px,5vw,48px)' }}>سیاست حریم خصوصی</h1>
          <div className="space-y-10">
            {sections.map(s => (
              <div key={s.title} className="border-t border-[var(--line)] pt-8">
                <h2 className="text-[var(--ink)] text-[16px] font-medium mb-3">{s.title}</h2>
                <p className="text-[var(--muted)] text-[14px] leading-loose">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
