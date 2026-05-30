'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Clock, ChefHat, Users, ChevronDown } from 'lucide-react';
import { Header } from '@/components/shop/Header';
import { Footer } from '@/components/shop/Footer';

type Recipe = {
  title: string;
  rice: string;
  time: string;
  level: string;
  serves: string;
  image: string;
  intro: string;
  ingredients: string[];
  steps: string[];
};

const RECIPES: Recipe[] = [
  {
    title: 'پلو مجلسی با طارم هاشمی',
    rice: 'طارم هاشمی ممتاز',
    time: '۴۵ دقیقه',
    level: 'متوسط',
    serves: '۴ نفر',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80',
    intro: 'پلوی مجلسی با ته‌دیگ طلایی و دانه‌های جدا — تاج هر سفره‌ی ایرانی.',
    ingredients: [
      '۳ پیمانه برنج طارم هاشمی',
      'آب و نمک به مقدار لازم',
      '۲ قاشق غذاخوری روغن یا کره',
      'کمی زعفران دم‌کرده',
      'یک عدد سیب‌زمینی برای ته‌دیگ (اختیاری)',
    ],
    steps: [
      'برنج را با کمی نمک حدود ۴۵ دقیقه در آب سرد خیس کنید.',
      'آب را در قابلمه به جوش بیاورید، برنج را بریزید و اجازه دهید دانه‌ها نرم اما مغزدار شوند.',
      'برنج را آبکش کنید و با آب ولرم بشویید.',
      'ته قابلمه روغن و زعفران بریزید، برنج را به‌صورت قله‌ای برگردانید.',
      'با دمکنی روی حرارت ملایم ۳۰ تا ۳۵ دقیقه دم بگذارید تا ته‌دیگ طلایی شود.',
    ],
  },
  {
    title: 'کته دمسیاه شمالی',
    rice: 'دمسیاه شمالی',
    time: '۳۵ دقیقه',
    level: 'آسان',
    serves: '۳ نفر',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
    intro: 'کته‌ی سنتی شمالی، ساده و دلنشین — با عطری که خانه را پر می‌کند.',
    ingredients: [
      '۲ پیمانه برنج دمسیاه',
      '۳ پیمانه آب',
      'یک قاشق چای‌خوری نمک',
      '۲ قاشق غذاخوری روغن یا کره',
    ],
    steps: [
      'برنج را دو بار بشویید (نیازی به خیساندن طولانی نیست).',
      'برنج، آب و نمک را در قابلمه بریزید و روی حرارت متوسط بگذارید.',
      'وقتی آب کشیده شد، روغن را اضافه کنید و درِ قابلمه را با دمکنی بپوشانید.',
      'روی حرارت ملایم حدود ۲۵ دقیقه دم بگذارید تا کته جا بیفتد.',
    ],
  },
  {
    title: 'لوبیا پلو با شیرودی',
    rice: 'شیرودی اصیل',
    time: '۶۰ دقیقه',
    level: 'متوسط',
    serves: '۴ نفر',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=900&q=80',
    intro: 'ترکیب گوشت، لوبیا سبز و گوجه با برنج خوش‌پخت شیرودی — یک غذای کامل خانوادگی.',
    ingredients: [
      '۳ پیمانه برنج شیرودی',
      '۳۰۰ گرم گوشت چرخ‌کرده',
      '۴۰۰ گرم لوبیا سبز خردشده',
      '۲ قاشق غذاخوری رب گوجه‌فرنگی',
      'پیاز، دارچین، نمک و فلفل',
    ],
    steps: [
      'پیاز را تفت دهید، گوشت چرخ‌کرده را اضافه و سرخ کنید.',
      'لوبیا سبز و رب گوجه را اضافه کنید و با دارچین تفت دهید تا جا بیفتد.',
      'برنج نیم‌پز شده را با مخلوط لوبیا لایه‌لایه در قابلمه بریزید.',
      'روی حرارت ملایم ۴۵ دقیقه دم بگذارید تا طعم‌ها در هم بنشینند.',
    ],
  },
  {
    title: 'باقالی پلو با علی‌کاظمی',
    rice: 'علی‌کاظمی درجه یک',
    time: '۵۰ دقیقه',
    level: 'متوسط',
    serves: '۴ نفر',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80',
    intro: 'باقالی پلوی معطر با شوید تازه — همراه همیشگی ماهیچه و ماهی.',
    ingredients: [
      '۳ پیمانه برنج علی‌کاظمی',
      '۲ پیمانه باقالی پوست‌کنده',
      'یک پیمانه شوید خشک یا تازه',
      'زعفران، کره و نمک',
    ],
    steps: [
      'برنج را خیس و سپس نیم‌پز و آبکش کنید.',
      'باقالی را جداگانه بپزید تا نرم شود.',
      'برنج، باقالی و شوید را لایه‌لایه در قابلمه بریزید.',
      'کره و زعفران را روی برنج بریزید و ۳۵ دقیقه دم بگذارید.',
    ],
  },
];

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] overflow-hidden">
      <div className="grid sm:grid-cols-[180px_1fr]">
        <div className="aspect-[4/3] sm:aspect-auto sm:h-full overflow-hidden bg-[var(--sand)]">
          <img src={recipe.image} alt={recipe.title} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <h2 className="text-[var(--ink)] text-[18px] font-medium mb-2">{recipe.title}</h2>
          <p className="text-[var(--muted)] text-[13px] leading-[1.9] mb-4">{recipe.intro}</p>
          <div className="flex flex-wrap gap-5 text-[var(--muted)] text-[12px] mb-4">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[var(--olive)]" /> {recipe.time}</span>
            <span className="flex items-center gap-1.5"><ChefHat className="w-3.5 h-3.5 text-[var(--olive)]" /> {recipe.level}</span>
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[var(--olive)]" /> {recipe.serves}</span>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 text-[12px] tracking-[0.08em] text-[var(--olive)] hover:text-[var(--ink)] transition-colors"
          >
            {open ? 'بستن دستور' : 'مشاهده دستور کامل'}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] p-6 grid md:grid-cols-[0.8fr_1.2fr] gap-8">
          <div>
            <p className="text-[var(--olive)] text-[10px] tracking-[0.2em] mb-4">مواد لازم</p>
            <ul className="space-y-2.5">
              {recipe.ingredients.map((ing) => (
                <li key={ing} className="flex items-start gap-2.5 text-[13px] text-[var(--ink)]/85">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--olive)] mt-2 shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[var(--olive)] text-[10px] tracking-[0.2em] mb-4">طرز تهیه</p>
            <ol className="space-y-4">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-4 text-[13px] text-[var(--ink)]/85 leading-[1.9]">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-[var(--ink)] text-[var(--cream)] text-[12px] flex items-center justify-center">
                    {['۱', '۲', '۳', '۴', '۵', '۶'][i]}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RecipesPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--cream)] min-h-screen">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-[var(--olive)] text-[10px] tracking-[0.24em] mb-5 text-center">— دستور پخت —</p>
          <h1 className="text-[var(--ink)] font-light text-center mb-4" style={{ fontSize: 'clamp(32px,5vw,56px)' }}>
            راز پخت برنج ایرانی
          </h1>
          <p className="text-[var(--muted)] text-[14px] text-center max-w-[480px] mx-auto mb-14 leading-loose">
            دستورهای خانگی برای بهره‌گیری از بهترین طعم و عطر برنج دریا.
          </p>

          <div className="space-y-6">
            {RECIPES.map((r) => (
              <RecipeCard key={r.title} recipe={r} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/shop" className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--cream)] text-[13px] tracking-[0.1em] px-9 py-4 hover:bg-[var(--deep)] transition-colors">
              خرید برنج برای این دستورها
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
