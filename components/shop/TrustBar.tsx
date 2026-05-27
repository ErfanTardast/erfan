import { Truck, ShieldCheck, RefreshCcw, Headphones } from 'lucide-react';

const ITEMS = [
  { icon: Truck, title: 'ارسال رایگان', sub: 'از ۵۰۰ هزار تومان' },
  { icon: ShieldCheck, title: 'ضمانت اصالت', sub: '۱۰۰٪ محصول اصل' },
  { icon: RefreshCcw, title: 'بازگشت ۷ روزه', sub: 'بدون قید و شرط' },
  { icon: Headphones, title: 'پشتیبانی ۲۴/۷', sub: 'همیشه در کنار شما' },
];

export function TrustBar() {
  return (
    <div className="bg-paper border-b border-sand">
      <div className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {ITEMS.map((it, i) => (
            <div
              key={it.title}
              className={`flex items-center gap-3 justify-center py-4 ${
                i < ITEMS.length - 1 ? 'md:border-l border-sand' : ''
              } ${i < 2 ? 'border-b md:border-b-0 border-sand' : ''}`}
            >
              <it.icon className="w-4 h-4 text-olive shrink-0" />
              <div>
                <p className="text-[12px] font-medium">{it.title}</p>
                <p className="text-[10px] text-muted">{it.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
