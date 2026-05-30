'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, MapPin, User as UserIcon, LogOut, Plus, Trash2, Heart, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/shop/Header';
import { useAccount, type Address } from '@/lib/store/account';
import { useWishlist } from '@/lib/store/wishlist';
import { fmtPrice, toFa } from '@/lib/format';

const STATUS_FA: Record<string, string> = {
  processing: 'در حال پردازش',
  shipped: 'ارسال شده',
  delivered: 'تحویل شده',
};

function faDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

export default function AccountPage() {
  const router = useRouter();
  const user = useAccount((s) => s.user);
  const orders = useAccount((s) => s.orders);
  const addresses = useAccount((s) => s.addresses);
  const logout = useAccount((s) => s.logout);
  const addAddress = useAccount((s) => s.addAddress);
  const removeAddress = useAccount((s) => s.removeAddress);
  const wishCount = useWishlist((s) => s.ids.length);

  const [mounted, setMounted] = useState(false);
  const [showAddr, setShowAddr] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && !user) router.replace('/login');
  }, [mounted, user, router]);

  if (!mounted || !user) {
    return (
      <>
        <Header />
        <main className="bg-[var(--cream)] min-h-screen" />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-[var(--cream)] min-h-screen">
        <div className="max-w-[1100px] mx-auto px-5 md:px-10 lg:px-12 py-12 md:py-16">

          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-10 pb-8 border-b border-[var(--line)]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--ink)] text-[var(--cream)] flex items-center justify-center text-[18px] font-medium">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-[22px] font-medium leading-tight">{user.name}</h1>
                <p className="text-[13px] text-[var(--muted)]">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); router.push('/'); }}
              className="flex items-center gap-2 text-[12px] text-[var(--muted)] hover:text-[var(--terra)] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">خروج</span>
            </button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { icon: Package, label: 'سفارش‌ها', value: toFa(orders.length) },
              { icon: MapPin, label: 'آدرس‌ها', value: toFa(addresses.length) },
              { icon: Heart, label: 'علاقه‌مندی', value: toFa(wishCount) },
            ].map((s) => (
              <div key={s.label} className="bg-[var(--paper)] border border-[var(--line)] p-5 text-center">
                <s.icon className="w-5 h-5 text-[var(--olive)] mx-auto mb-3" />
                <p className="text-[22px] font-medium">{s.value}</p>
                <p className="text-[11px] tracking-[0.12em] text-[var(--muted)] mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Orders */}
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <Package className="w-4 h-4 text-[var(--olive)]" />
              <h2 className="text-[16px] font-medium">سفارش‌های من</h2>
            </div>
            {orders.length === 0 ? (
              <div className="bg-[var(--paper)] border border-[var(--line)] p-10 text-center">
                <p className="text-[var(--muted)] text-[14px] mb-5">هنوز سفارشی ثبت نکرده‌اید</p>
                <Link href="/shop" className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--cream)] text-[12px] tracking-[0.1em] px-6 py-3 hover:bg-[var(--deep)] transition-colors">
                  <ShoppingBag className="w-3.5 h-3.5" /> شروع خرید
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.num} className="bg-[var(--paper)] border border-[var(--line)] p-5">
                    <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[var(--line)]">
                      <div>
                        <p className="text-[13px] font-medium">سفارش #{o.num}</p>
                        <p className="text-[11px] text-[var(--muted)] mt-0.5">{faDate(o.date)}</p>
                      </div>
                      <span className="text-[11px] tracking-[0.1em] px-3 py-1.5 bg-[var(--olive)]/15 text-[var(--olive)] rounded-full">
                        {STATUS_FA[o.status]}
                      </span>
                    </div>
                    <div className="py-4 space-y-2">
                      {o.items.map((it) => (
                        <div key={it.id} className="flex justify-between text-[12px] text-[var(--muted)]">
                          <span>{it.title} <span className="text-[var(--muted)]/70">× {toFa(it.qty)}</span></span>
                          <span>{fmtPrice(it.price * it.qty)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-[13px] font-medium pt-3 border-t border-[var(--line)]">
                      <span>مجموع</span>
                      <span>{fmtPrice(o.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Addresses */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--olive)]" />
                <h2 className="text-[16px] font-medium">آدرس‌های من</h2>
              </div>
              <button
                onClick={() => setShowAddr((v) => !v)}
                className="flex items-center gap-1.5 text-[12px] text-[var(--olive)] hover:text-[var(--ink)] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> افزودن آدرس
              </button>
            </div>

            {showAddr && (
              <AddressForm
                onAdd={(a) => { addAddress(a); setShowAddr(false); }}
                onCancel={() => setShowAddr(false)}
              />
            )}

            {addresses.length === 0 && !showAddr ? (
              <div className="bg-[var(--paper)] border border-[var(--line)] p-8 text-center text-[var(--muted)] text-[14px]">
                هنوز آدرسی ثبت نکرده‌اید
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {addresses.map((a) => (
                  <div key={a.id} className="bg-[var(--paper)] border border-[var(--line)] p-5 relative">
                    <button
                      onClick={() => removeAddress(a.id)}
                      className="absolute top-4 left-4 text-[var(--muted)] hover:text-[var(--terra)] transition-colors"
                      aria-label="حذف آدرس"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-[12px] tracking-[0.1em] text-[var(--olive)] mb-2">{a.title}</p>
                    <p className="text-[13px] font-medium mb-1">{a.recipient} · {a.phone}</p>
                    <p className="text-[12px] text-[var(--muted)] leading-relaxed">
                      {a.province}، {a.city}، {a.line}
                      {a.postal && <span className="block mt-1">کد پستی: {toFa(a.postal)}</span>}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

function AddressForm({ onAdd, onCancel }: { onAdd: (a: Omit<Address, 'id'>) => void; onCancel: () => void }) {
  const [f, setF] = useState({ title: 'خانه', recipient: '', phone: '', province: '', city: '', line: '', postal: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.recipient || !f.province || !f.city || !f.line) return;
    onAdd(f);
  };

  const cls = 'w-full border border-[var(--line)] bg-[var(--cream)] px-3.5 py-3 text-[13px] outline-none focus:border-[var(--ink)] transition-colors';

  return (
    <form onSubmit={submit} className="bg-[var(--paper)] border border-[var(--line)] p-5 mb-4 grid sm:grid-cols-2 gap-3">
      <input className={cls} placeholder="عنوان (خانه/کار)" value={f.title} onChange={set('title')} />
      <input className={cls} placeholder="نام گیرنده" value={f.recipient} onChange={set('recipient')} required />
      <input className={cls} placeholder="شماره تماس" value={f.phone} onChange={set('phone')} />
      <input className={cls} placeholder="استان" value={f.province} onChange={set('province')} required />
      <input className={cls} placeholder="شهر" value={f.city} onChange={set('city')} required />
      <input className={cls} placeholder="کد پستی" value={f.postal} onChange={set('postal')} />
      <input className={`${cls} sm:col-span-2`} placeholder="آدرس کامل" value={f.line} onChange={set('line')} required />
      <div className="sm:col-span-2 flex gap-3">
        <button type="submit" className="bg-[var(--ink)] text-[var(--cream)] px-6 py-3 text-[12px] tracking-[0.1em] hover:bg-[var(--deep)] transition-colors">ذخیره آدرس</button>
        <button type="button" onClick={onCancel} className="border border-[var(--line)] px-6 py-3 text-[12px] text-[var(--muted)] hover:border-[var(--ink)] transition-colors">انصراف</button>
      </div>
    </form>
  );
}
