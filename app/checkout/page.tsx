'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, ShoppingBag, MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/lib/store/cart';
import { useAccount } from '@/lib/store/account';
import { PRODUCTS, getProductById } from '@/lib/products';
import { fmtPrice, toFa } from '@/lib/format';
import { Header } from '@/components/shop/Header';
import { Footer } from '@/components/shop/Footer';
import { EASE } from '@/lib/motion';

type Step = 1 | 2 | 3 | 4;

const STEPS = [
  { n: 1 as Step, label: 'اطلاعات تماس', icon: ShoppingBag },
  { n: 2 as Step, label: 'آدرس تحویل', icon: MapPin },
  { n: 3 as Step, label: 'پرداخت', icon: CreditCard },
  { n: 4 as Step, label: 'تأیید', icon: CheckCircle2 },
];

const PAYMENT_METHODS = [
  { id: 'card', label: 'پرداخت آنلاین', sub: 'درگاه پرداخت زرین‌پال' },
  { id: 'cod', label: 'پرداخت در محل', sub: 'هنگام تحویل مرسوله' },
  { id: 'transfer', label: 'کارت به کارت', sub: 'واریز به حساب دریا رایس' },
];

function Field({
  label, id, type = 'text', placeholder, value, onChange, required = true,
}: {
  label: string; id: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[10px] tracking-[0.18em] text-muted mb-2">
        {label}{required && <span className="text-gold mr-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border border-line bg-transparent px-4 py-3.5 text-[13px] outline-none focus:border-ink transition-colors placeholder-muted/60"
      />
    </div>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postal, setPostal] = useState('');
  const [payMethod, setPayMethod] = useState('card');
  const [orderNum] = useState(() => toFa(Math.floor(100000 + Math.random() * 900000)));

  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const close = useCart((s) => s.close);
  const user = useAccount((s) => s.user);
  const savedAddresses = useAccount((s) => s.addresses);
  const addOrder = useAccount((s) => s.addOrder);

  // Prefill contact + address from the signed-in account
  useEffect(() => {
    if (!user) return;
    setName((v) => v || user.name);
    setPhone((v) => v || user.phone);
    setEmail((v) => v || user.email);
    const a = savedAddresses[0];
    if (a) {
      setProvince((v) => v || a.province);
      setCity((v) => v || a.city);
      setAddress((v) => v || a.line);
      setPostal((v) => v || a.postal);
    }
  }, [user, savedAddresses]);

  const lines = items
    .map(i => ({ ...i, p: getProductById(i.id) }))
    .filter(l => l.p) as { id: string; qty: number; p: NonNullable<ReturnType<typeof getProductById>> }[];

  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const shipping = subtotal >= 500000 ? 0 : 45000;
  const total = subtotal + shipping;

  const nextStep = () => setStep(s => Math.min(4, s + 1) as Step);
  const prevStep = () => setStep(s => Math.max(1, s - 1) as Step);

  const handleConfirm = () => {
    addOrder({
      num: orderNum,
      date: new Date().toISOString(),
      items: lines.map((l) => ({ id: l.p.id, title: l.p.title, weight: l.p.weight, qty: l.qty, price: l.p.price })),
      subtotal,
      shipping,
      total,
      payMethod: payMethod === 'card' ? 'پرداخت آنلاین' : payMethod === 'cod' ? 'پرداخت در محل' : 'کارت به کارت',
      status: 'processing',
      address: [province, city, address].filter(Boolean).join('، '),
    });
    clear();
    close();
    setStep(4);
  };

  if (items.length === 0 && step !== 4) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex items-center justify-center bg-cream">
          <div className="text-center px-5">
            <div className="w-16 h-16 rounded-full border border-line flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-6 h-6 text-muted" />
            </div>
            <p className="section-eyebrow text-olive mb-3">سبد خرید</p>
            <h1 className="title-md mb-5">سبد خرید شما خالی است</h1>
            <Link
              href="/shop"
              className="inline-block border border-ink px-8 py-3 text-[13px] tracking-wider hover:bg-ink hover:text-white transition-all"
            >
              مشاهده محصولات
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-5">
          <nav className="flex items-center gap-2 text-[11px] text-muted">
            <Link href="/" className="hover:text-ink transition-colors">خانه</Link>
            <ChevronLeft className="w-3 h-3" />
            <Link href="/shop" className="hover:text-ink transition-colors">فروشگاه</Link>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-ink">تکمیل خرید</span>
          </nav>
        </div>

        <div className="max-w-[1200px] mx-auto px-5 md:px-8 pb-24">
          <div className="mb-10">
            <p className="section-eyebrow text-olive mb-3">تکمیل سفارش</p>
            <h1 className="title-lg">تکمیل خرید</h1>
          </div>

          {/* Step indicator */}
          {step < 4 && (
            <div className="flex items-center gap-0 mb-12 max-w-[560px]">
              {STEPS.filter(s => s.n < 4).map((s, i) => (
                <div key={s.n} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium transition-all ${
                        step > s.n
                          ? 'bg-deep text-white'
                          : step === s.n
                          ? 'bg-ink text-white'
                          : 'border border-line text-muted'
                      }`}
                    >
                      {step > s.n ? <Check className="w-3.5 h-3.5" /> : toFa(s.n)}
                    </div>
                    <span className={`text-[9px] tracking-[0.1em] whitespace-nowrap ${step >= s.n ? 'text-ink' : 'text-muted'}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className={`flex-1 h-px mx-2 mb-5 transition-colors ${step > s.n ? 'bg-deep' : 'bg-line'}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="grid lg:grid-cols-[1fr_380px] gap-10 xl:gap-14 items-start">
            {/* Left: step forms */}
            <div>
              <AnimatePresence mode="wait">
                {/* STEP 1: Contact */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <h2 className="text-[18px] font-medium mb-7">اطلاعات تماس</h2>
                    <div className="space-y-5">
                      <Field label="نام و نام‌خانوادگی" id="name" placeholder="رضا محمدی" value={name} onChange={setName} />
                      <Field label="شماره موبایل" id="phone" type="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" value={phone} onChange={setPhone} />
                      <Field label="آدرس ایمیل" id="email" type="email" placeholder="email@example.com" value={email} onChange={setEmail} required={false} />
                    </div>
                    <button
                      onClick={() => { if (name && phone) nextStep(); }}
                      disabled={!name || !phone}
                      className="mt-8 w-full bg-ink text-white py-4 text-[13px] tracking-[0.08em] hover:bg-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      ادامه — آدرس تحویل
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: Address */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <h2 className="text-[18px] font-medium mb-7">آدرس تحویل</h2>
                    <div className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="استان" id="province" placeholder="گیلان" value={province} onChange={setProvince} />
                        <Field label="شهر" id="city" placeholder="رشت" value={city} onChange={setCity} />
                      </div>
                      <Field label="آدرس دقیق" id="address" placeholder="خیابان، کوچه، پلاک، طبقه، واحد" value={address} onChange={setAddress} />
                      <Field label="کد پستی" id="postal" placeholder="۱۲۳۴۵۶۷۸۹۰" value={postal} onChange={setPostal} required={false} />
                    </div>
                    <div className="flex gap-3 mt-8">
                      <button
                        onClick={prevStep}
                        className="px-7 py-4 border border-line text-[13px] hover:border-ink transition-colors"
                      >
                        بازگشت
                      </button>
                      <button
                        onClick={() => { if (province && city && address) nextStep(); }}
                        disabled={!province || !city || !address}
                        className="flex-1 bg-ink text-white py-4 text-[13px] tracking-[0.08em] hover:bg-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        ادامه — انتخاب پرداخت
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Payment */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <h2 className="text-[18px] font-medium mb-7">روش پرداخت</h2>
                    <div className="space-y-3">
                      {PAYMENT_METHODS.map(m => (
                        <button
                          key={m.id}
                          onClick={() => setPayMethod(m.id)}
                          className={`w-full text-right flex items-center gap-4 p-5 border transition-all ${
                            payMethod === m.id ? 'border-ink bg-paper' : 'border-line hover:border-ink/40'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all ${
                              payMethod === m.id ? 'border-ink bg-ink' : 'border-muted'
                            }`}
                          />
                          <div>
                            <p className="text-[14px] font-medium">{m.label}</p>
                            <p className="text-[11px] text-muted mt-0.5">{m.sub}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Order summary confirmation */}
                    <div className="mt-8 bg-paper border border-line p-6 space-y-3">
                      <p className="text-[11px] tracking-[0.16em] text-muted mb-4">خلاصه سفارش</p>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-muted">مجموع کالا</span>
                        <span>{fmtPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-muted">هزینه ارسال</span>
                        <span>{shipping === 0 ? 'رایگان' : fmtPrice(shipping)}</span>
                      </div>
                      <div className="flex justify-between text-[14px] font-medium border-t border-line pt-3 mt-3">
                        <span>مبلغ قابل پرداخت</span>
                        <span>{fmtPrice(total)}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={prevStep}
                        className="px-7 py-4 border border-line text-[13px] hover:border-ink transition-colors"
                      >
                        بازگشت
                      </button>
                      <button
                        onClick={handleConfirm}
                        className="flex-1 bg-ink text-white py-4 text-[13px] tracking-[0.08em] hover:bg-deep transition-colors"
                      >
                        ثبت و پرداخت — {fmtPrice(total)}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Confirmation */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="py-10 text-center max-w-[500px] mx-auto"
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
                      className="w-16 h-16 rounded-full border-2 border-olive flex items-center justify-center mx-auto mb-8"
                    >
                      <Check className="w-7 h-7 text-olive" />
                    </motion.div>
                    <p className="section-eyebrow text-olive mb-4">سفارش ثبت شد</p>
                    <h2 className="title-md mb-4">ممنون از خرید شما!</h2>
                    <p className="body-copy text-muted mb-3 leading-relaxed">
                      سفارش شما با موفقیت ثبت شد و به زودی پردازش خواهد شد.
                    </p>
                    <div className="inline-block border border-line px-6 py-3 text-[12px] text-muted mb-8">
                      شماره سفارش: <span className="font-medium text-ink">{orderNum}</span>
                    </div>
                    <p className="small-copy text-muted mb-8">
                      {email ? `پیامک تأیید به ${phone} و ایمیل به ${email} ارسال خواهد شد.` : `پیامک تأیید به ${phone} ارسال خواهد شد.`}
                    </p>
                    <div className="flex flex-col gap-3">
                      {user && (
                        <Link
                          href="/account"
                          className="w-full border border-ink bg-ink text-white py-3.5 text-[13px] tracking-wider hover:bg-deep transition-all block text-center"
                        >
                          مشاهده سفارش‌ها
                        </Link>
                      )}
                      <Link
                        href="/shop"
                        className={`w-full py-3.5 text-[13px] tracking-wider transition-all block text-center ${user ? 'border border-line text-muted hover:border-ink hover:text-ink' : 'border border-ink bg-ink text-white hover:bg-deep'}`}
                      >
                        ادامه خرید
                      </Link>
                      <Link
                        href="/"
                        className="w-full border border-line py-3.5 text-[13px] tracking-wider hover:border-ink transition-all block text-center text-muted hover:text-ink"
                      >
                        بازگشت به صفحه اصلی
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: order summary sidebar */}
            {step < 4 && (
              <motion.aside
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
                className="bg-paper border border-line p-7 lg:sticky lg:top-24"
              >
                <p className="text-[11px] tracking-[0.18em] text-muted mb-6">سبد خرید</p>
                <div className="space-y-5">
                  {lines.map(l => (
                    <div key={l.id} className="flex gap-4 items-start">
                      <div className="w-16 h-16 bg-sand overflow-hidden shrink-0">
                        <img src={l.p.image} alt={l.p.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium leading-snug">{l.p.title}</p>
                        <p className="text-[11px] text-muted mt-0.5">{l.p.weight}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-[11px] text-muted">× {toFa(l.qty)}</span>
                          <span className="text-[12px]">{fmtPrice(l.p.price * l.qty)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-line mt-7 pt-5 space-y-3">
                  <div className="flex justify-between text-[12px] text-muted">
                    <span>جمع</span>
                    <span>{fmtPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[12px] text-muted">
                    <span>ارسال</span>
                    <span className={shipping === 0 ? 'text-olive' : ''}>{shipping === 0 ? 'رایگان' : fmtPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-[14px] font-medium border-t border-line pt-3">
                    <span>مجموع</span>
                    <span>{fmtPrice(total)}</span>
                  </div>
                </div>
              </motion.aside>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
