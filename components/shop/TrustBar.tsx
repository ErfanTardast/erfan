import { Truck, ShieldCheck, RefreshCcw, Headphones } from 'lucide-react';

const ITEMS = [
  { icon: Truck, title: 'ارسال قابل پیگیری', sub: 'بسته‌بندی امن برای سراسر ایران' },
  { icon: ShieldCheck, title: 'منشأ روشن', sub: 'نوع برنج، منطقه کشت و سال برداشت' },
  { icon: RefreshCcw, title: 'بازگشت ۷ روزه', sub: 'در صورت مغایرت کیفیت یا سفارش' },
  { icon: Headphones, title: 'پشتیبانی خرید', sub: 'راهنمای انتخاب قبل و بعد از سفارش' },
];

export function TrustBar() {
  return (
    <section className="bg-ink text-rice py-10 md:py-12">
      <div className="site-shell">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-rice/15 border border-rice/15">
          {ITEMS.map((item) => (
            <div key={item.title} className="bg-ink p-5 md:p-6 min-h-[140px]">
              <span className="w-11 h-11 border border-rice/20 text-saffron inline-flex items-center justify-center mb-5">
                <item.icon className="w-5 h-5" />
              </span>
              <p className="text-[16px] font-semibold">{item.title}</p>
              <p className="text-[13px] leading-7 text-rice/65 mt-2">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
