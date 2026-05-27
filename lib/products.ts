export type RiceType = 'tarom' | 'shirudi' | 'domsiah' | 'alikazemi' | 'langroudi';
export type Region = 'gilan' | 'mazandaran' | 'golestan';
export type Aroma = 'strong' | 'mild' | 'neutral';
export type GrainLength = 'long' | 'medium' | 'short';

export type Product = {
  id: string;
  slug: string;
  kicker: string;
  title: string;
  price: number;
  weight: string;
  weightKg: 2 | 3 | 5 | 10;
  copy: string;
  shortNote: string;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: { label: string; tone: 'neutral' | 'olive' | 'gold' | 'ink' };
  type: RiceType;
  region: Region;
  aroma: Aroma;
  grain: GrainLength;
  organic: boolean;
  premium: boolean;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'tarom-hashemi-premium',
    kicker: 'برنج دانه بلند',
    title: 'طارم هاشمی ممتاز',
    price: 185000,
    weight: '۵ کیلوگرم',
    weightKg: 5,
    copy: 'برنج طارم هاشمی ممتاز با دانه‌های کشیده و عطر بهشتی، انتخاب مجالس و سفره‌های خاص ایرانی است. هر وعده با این برنج، تجربه‌ای از طبیعت شمال ایران است.',
    shortNote: 'عطر بهشتی، بافت ابریشمی — مناسب پلوهای مجلسی',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=720&q=80',
    rating: 4.9,
    reviewCount: 127,
    badge: { label: '۵ کیلوگرم', tone: 'neutral' },
    type: 'tarom',
    region: 'gilan',
    aroma: 'strong',
    grain: 'long',
    organic: false,
    premium: true,
    inStock: true,
    isFeatured: true,
  },
  {
    id: '2',
    slug: 'shirudi-asil',
    kicker: 'برنج نیمه معطر',
    title: 'شیرودی اصیل',
    price: 145000,
    weight: '۵ کیلوگرم',
    weightKg: 5,
    copy: 'شیرودی اصیل با سفیدی یکنواخت و پخت آسانش، ایده‌آل برای کته روزانه و غذاهای خانوادگی است.',
    shortNote: 'سفید یکنواخت، پخت آسان — ایده‌آل برای کته',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=720&q=80',
    rating: 4.7,
    reviewCount: 89,
    badge: { label: '۵ کیلوگرم', tone: 'neutral' },
    type: 'shirudi',
    region: 'mazandaran',
    aroma: 'mild',
    grain: 'long',
    organic: false,
    premium: false,
    inStock: true,
  },
  {
    id: '3',
    slug: 'domsiah-shomali',
    kicker: 'برنج اعلا',
    title: 'دمسیاه شمالی',
    price: 220000,
    weight: '۵ کیلوگرم',
    weightKg: 5,
    copy: 'دمسیاه شمالی با دانه‌های کشیده و عطر ملایمش، انتخاب افرادی است که کیفیت واقعی را می‌شناسند.',
    shortNote: 'دانه‌های کشیده، عطر ملایم — انتخاب خاص',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=720&q=80',
    rating: 5,
    reviewCount: 64,
    badge: { label: 'ممتاز', tone: 'ink' },
    type: 'domsiah',
    region: 'gilan',
    aroma: 'mild',
    grain: 'long',
    organic: false,
    premium: true,
    inStock: true,
    isFeatured: true,
  },
  {
    id: '4',
    slug: 'alikazemi-grade-1',
    kicker: 'برنج دانه بلند',
    title: 'علی‌کاظمی درجه یک',
    price: 165000,
    weight: '۵ کیلوگرم',
    weightKg: 5,
    copy: 'علی‌کاظمی با دانه‌های بلند و ممتاز، تاج طلایی خوان ایرانی است که هر وعده را به مناسبتی خاص تبدیل می‌کند.',
    shortNote: 'دانه بلند ممتاز — تاج طلایی خوان ایرانی',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=720&q=80',
    rating: 4.6,
    reviewCount: 102,
    badge: { label: '۵ کیلوگرم', tone: 'neutral' },
    type: 'alikazemi',
    region: 'mazandaran',
    aroma: 'mild',
    grain: 'long',
    organic: false,
    premium: false,
    inStock: true,
  },
  {
    id: '5',
    slug: 'tarom-organic',
    kicker: 'محصول ارگانیک',
    title: 'طارم ارگانیک',
    price: 195000,
    weight: '۵ کیلوگرم',
    weightKg: 5,
    copy: 'کشت طبیعی بدون سموم شیمیایی، تأیید شده ارگانیک — برای خانواده‌هایی که سلامت را در اولویت قرار می‌دهند.',
    shortNote: 'کشت طبیعی، بدون سموم — تأیید شده ارگانیک',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=720&q=80',
    rating: 4.8,
    reviewCount: 73,
    badge: { label: 'ارگانیک', tone: 'olive' },
    type: 'tarom',
    region: 'gilan',
    aroma: 'strong',
    grain: 'long',
    organic: true,
    premium: true,
    inStock: true,
  },
  {
    id: '6',
    slug: 'hashemi-white',
    kicker: 'برنج کلاسیک',
    title: 'هاشمی سفید',
    price: 155000,
    weight: '۵ کیلوگرم',
    weightKg: 5,
    copy: 'هاشمی سفید با سفیدی مرواریدی و عطر لطیف، همراه همیشگی سفره‌های ایرانی است.',
    shortNote: 'سفید مرواریدی، عطر لطیف — مناسب هر روز',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=720&q=80',
    rating: 4.5,
    reviewCount: 156,
    badge: { label: '۵ کیلوگرم', tone: 'neutral' },
    type: 'tarom',
    region: 'gilan',
    aroma: 'mild',
    grain: 'long',
    organic: false,
    premium: false,
    inStock: true,
  },
  {
    id: '7',
    slug: 'first-harvest-spring',
    kicker: 'محصول فصلی',
    title: 'کشت اول بهاره',
    price: 240000,
    weight: '۵ کیلوگرم',
    weightKg: 5,
    copy: 'اولین محصول سال، با طعم تازه‌ی بهار در سفره. این برنج فصلی در مقدار محدود موجود است.',
    shortNote: 'اولین محصول سال — طعم تازه‌ی بهار در سفره',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=720&q=80',
    rating: 5,
    reviewCount: 42,
    badge: { label: 'فصلی', tone: 'gold' },
    type: 'tarom',
    region: 'gilan',
    aroma: 'strong',
    grain: 'long',
    organic: true,
    premium: true,
    inStock: true,
    isNew: true,
  },
  {
    id: '8',
    slug: 'langroudi-premium',
    kicker: 'برنج دانه کوتاه',
    title: 'لنگرودی ممتاز',
    price: 210000,
    weight: '۳ کیلوگرم',
    weightKg: 3,
    copy: 'لنگرودی ممتاز با دانه‌های گرد و بافت نرم، برای دمی و کته‌های خاص بی‌نظیر است.',
    shortNote: 'دانه گرد، بافت نرم — عالی برای دمی و کته',
    image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=720&q=80',
    rating: 4.7,
    reviewCount: 58,
    badge: { label: '۳ کیلوگرم', tone: 'neutral' },
    type: 'langroudi',
    region: 'gilan',
    aroma: 'mild',
    grain: 'short',
    organic: false,
    premium: true,
    inStock: true,
  },
];

export const getProductById = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getProductBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const RICE_TYPE_LABELS: Record<RiceType, string> = {
  tarom: 'طارم هاشمی',
  shirudi: 'شیرودی',
  domsiah: 'دمسیاه',
  alikazemi: 'علی‌کاظمی',
  langroudi: 'لنگرودی',
};

export const REGION_LABELS: Record<Region, string> = {
  gilan: 'گیلان',
  mazandaran: 'مازندران',
  golestan: 'گلستان',
};

export const AROMA_LABELS: Record<Aroma, string> = {
  strong: 'عطر شدید',
  mild: 'عطر ملایم',
  neutral: 'بدون عطر',
};

export const GRAIN_LABELS: Record<GrainLength, string> = {
  long: 'دانه بلند',
  medium: 'دانه متوسط',
  short: 'دانه کوتاه',
};
