'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User as UserIcon } from 'lucide-react';
import { Header } from '@/components/shop/Header';
import { Footer } from '@/components/shop/Footer';
import { useAccount } from '@/lib/store/account';

type Mode = 'login' | 'signup';

export default function LoginPage() {
  const router = useRouter();
  const login = useAccount((s) => s.login);
  const signup = useAccount((s) => s.signup);

  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = mode === 'login' ? login(email, pass) : signup(name, email, phone, pass);
    if (res.ok) {
      router.push('/account');
    } else {
      setError(res.error ?? 'خطایی رخ داد');
    }
  };

  const tab = (m: Mode, label: string) => (
    <button
      type="button"
      disabled={!hydrated}
      data-testid={`account-tab-${m}`}
      data-hydrated={hydrated ? 'true' : 'false'}
      onClick={() => { setMode(m); setError(''); }}
      className={`flex-1 pb-3 text-[13px] tracking-[0.08em] border-b-2 transition-colors disabled:cursor-wait disabled:opacity-60 ${
        mode === m ? 'border-[var(--ink)] text-[var(--ink)]' : 'border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)]'
      }`}
    >
      {label}
    </button>
  );

  const input = (
    id: string, label: string, value: string, set: (v: string) => void,
    type = 'text', ph = '',
  ) => (
    <div>
      <label htmlFor={id} className="block text-[10px] tracking-[0.18em] text-[var(--muted)] mb-2">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => set(e.target.value)}
        placeholder={ph}
        required
        className="w-full border border-[var(--line)] bg-transparent px-4 py-3.5 text-[13px] outline-none focus:border-[var(--ink)] transition-colors placeholder-[var(--muted)]/50"
      />
    </div>
  );

  return (
    <>
      <Header />
      <main className="bg-[var(--cream)] min-h-screen flex items-start justify-center py-16 md:py-24 px-5">
        <div className="w-full max-w-[420px]">
          <div className="text-center mb-10">
            <div className="w-12 h-12 rounded-full bg-[var(--ink)] text-[var(--cream)] flex items-center justify-center mx-auto mb-5">
              <UserIcon className="w-5 h-5" />
            </div>
            <h1 className="title-md mb-3">حساب کاربری کیوان</h1>
            <span className="block h-px w-10 bg-[var(--terra)] mx-auto mb-3" />
            <p className="text-[var(--muted)] text-[13px]">
              {mode === 'login' ? 'به حساب خود وارد شوید' : 'حساب جدید بسازید'}
            </p>
            <p className="latin italic text-[13px] text-[var(--muted)]/70 mt-1">Keyvan Account</p>
          </div>

          <div className="flex gap-0 mb-8">
            {tab('login', 'ورود')}
            {tab('signup', 'ثبت‌نام')}
          </div>

          <form onSubmit={submit} className="space-y-5">
            {mode === 'signup' && input('account-name', 'نام و نام خانوادگی', name, setName, 'text', 'مثلاً علی رضایی')}
            {input('account-email', 'ایمیل', email, setEmail, 'email', 'you@example.com')}
            {mode === 'signup' && input('account-phone', 'شماره موبایل', phone, setPhone, 'tel', '۰۹۱۲۳۴۵۶۷۸۹')}
            {input('account-password', 'رمز عبور', pass, setPass, 'password', '••••••••')}

            {error && <p className="text-[var(--terra)] text-[12px]">{error}</p>}

            <button
              type="submit"
              disabled={!hydrated}
              className="w-full bg-[var(--ink)] text-[var(--cream)] py-4 text-[13px] tracking-[0.1em] hover:bg-[var(--terra)] transition-colors flex items-center justify-center gap-2"
            >
              {mode === 'login' ? 'ورود به حساب' : 'ساخت حساب'}
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-[11px] text-[var(--muted)] leading-relaxed mt-8">
            اطلاعات حساب شما فقط روی همین دستگاه و به‌صورت محلی ذخیره می‌شود.
          </p>

          <div className="text-center mt-6">
            <Link href="/shop" className="text-[12px] text-[var(--olive)] hover:text-[var(--ink)] transition-colors">
              ادامه بدون حساب ←
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
