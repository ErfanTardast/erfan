import { Shield, Package, Headphones, Truck, CreditCard } from 'lucide-react';

const SERVICES = [
  {
    icon: Shield,
    title: 'ضمانت اصالت کالا',
    desc: 'تضمین اصل بودن تمام محصولات',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Package,
    title: 'خرید عمده و تکی',
    desc: 'فروش به صورت عمده و خرده',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Headphones,
    title: 'پشتیبانی سریع',
    desc: '۷ روز هفته، ۲۴ ساعته',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Truck,
    title: 'ارسال سریع',
    desc: 'به سراسر ایران',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    icon: CreditCard,
    title: 'پرداخت امن بانکی',
    desc: 'درگاه پرداخت معتبر',
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
] as const;

export function ServiceHighlights() {
  return (
    <section className="bg-white border border-gray-100 rounded-lg md:rounded-xl mt-3 md:mt-4 overflow-hidden">
      {/* Mobile: 3+2 grid; sm+: 5 columns */}
      <div className="grid grid-cols-3 md:grid-cols-5 divide-y divide-gray-100 md:divide-y-0 md:divide-x md:divide-x-reverse">
        {/* First row: 3 items */}
        {SERVICES.slice(0, 3).map((s, i) => (
          <ServiceItem key={i} s={s} />
        ))}
        {/* Second row on mobile: 2 items centered via col-start */}
        <div className="col-span-3 md:hidden grid grid-cols-2 border-t border-gray-100 divide-x divide-x-reverse divide-gray-100">
          {SERVICES.slice(3).map((s, i) => (
            <ServiceItem key={i + 3} s={s} center />
          ))}
        </div>
        {/* md+ shows last 2 normally */}
        {SERVICES.slice(3).map((s, i) => (
          <div key={i + 3} className="hidden md:block divide-x divide-x-reverse divide-gray-100">
            <ServiceItem s={s} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ServiceItem({
  s,
  center = false,
}: {
  s: (typeof SERVICES)[number];
  center?: boolean;
}) {
  const Icon = s.icon;
  return (
    <div
      className={`flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-4 py-3 sm:py-4 hover:bg-gray-50 transition-colors ${
        center ? 'justify-center' : ''
      }`}
    >
      <div
        className={`w-8 h-8 sm:w-10 sm:h-10 ${s.bg} rounded-lg flex items-center justify-center flex-shrink-0`}
      >
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${s.color}`} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] sm:text-xs md:text-[13px] font-semibold text-gray-800 leading-tight">
          {s.title}
        </p>
        <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5 leading-tight hidden sm:block">
          {s.desc}
        </p>
      </div>
    </div>
  );
}
