import { Header } from '@/components/shop/Header';
import { Footer } from '@/components/shop/Footer';
export const metadata = { title: 'شرایط فروش — Keyvan Rice' };
export default function TermsPage() {
  const sections = [
    { title: 'سفارش و پرداخت', body: 'سفارش‌ها پس از تأیید پرداخت آنلاین پردازش می‌شوند. قیمت‌ها به تومان هستند و شامل مالیات می‌باشند.' },
    { title: 'ارسال و تحویل', body: 'ارسال به سراسر ایران. سفارش‌های بالای ۵۰۰,۰۰۰ تومان ارسال رایگان دارند. زمان تحویل ۳ تا ۷ روز کاری.' },
    { title: 'بازگشت کالا', body: 'در صورت دریافت کالای آسیب‌دیده یا اشتباه، تا ۷ روز پس از دریافت می‌توانید درخواست بازگشت ثبت کنید.' },
    { title: 'کیفیت محصولات', body: 'تمام محصولات کیوان ۱۰۰٪ اصیل و بدون افزودنی هستند. در صورت عدم رضایت از کیفیت، با پشتیبانی تماس بگیرید.' },
    { title: 'پشتیبانی', body: 'تیم پشتیبانی ما شنبه تا پنج‌شنبه از ساعت ۹ تا ۱۸ پاسخگوی سؤالات شما هستند.' },
  ];
  return (
    <>
      <Header />
      <main className="bg-[var(--cream)] min-h-screen">
        <div className="max-w-[760px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <p className="text-[var(--olive)] text-[10px] tracking-[0.24em] mb-6">— شرایط فروش —</p>
          <h1 className="text-[var(--ink)] font-light mb-12" style={{ fontSize: 'clamp(32px,5vw,48px)' }}>شرایط و ضوابط فروش</h1>
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
