import { productSchema } from '@/schemas/product';
import { assetPath } from '@/lib/asset-path';

export type RiceType = 'tarom' | 'shirudi' | 'domsiah' | 'alikazemi' | 'neda';
export type Region = 'mazandaran';
export type Aroma = 'strong' | 'mild' | 'neutral';
export type GrainLength = 'long' | 'medium' | 'short';

export type Product = {
  id: string;
  slug: string;
  kicker: string;
  title: string;
  /** Price per kilogram in toman. */
  price: number;
  priceUnit: 'کیلوگرم';
  weight: string;
  weightKg: 2 | 3 | 5 | 10;
  packPrice: number;
  recommendedUse: string;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  gallery: string[];
  cookingNotes: string;
  storageInstructions: string;
  copy: string;
  shortNote: string;
  image: string;
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
  harvestYear?: string;
  originStory?: string;
  flavorNotes?: string[];
  aromaProfile?: string;
  textureProfile?: string;
  pairings?: string[];
  chefNote?: string;
  collection?: 'chef-choice' | 'rare-harvest' | 'limited-seasonal' | 'aged-reserve';
  cookingTip?: string;
};

type ProductSource = Omit<
  Product,
  'priceUnit' | 'packPrice' | 'recommendedUse' | 'stockStatus' | 'gallery' | 'cookingNotes' | 'storageInstructions'
>;

const rawProducts: ProductSource[] = [
  {
    id: '1',
    slug: 'tarom-hashemi-premium',
    kicker: 'برنج دانه بلند',
    title: 'طارم هاشمی ممتاز',
    price: 185000,
    weight: '۵ کیلوگرم',
    weightKg: 5,
    copy: 'طارم هاشمی ممتاز کیوان، دانه‌بلند و معطر، برای پلوهای مجلسی و مهمانی انتخاب شده است. پس از پخت، دانه‌ها کشیده و جدا می‌مانند.',
    shortNote: 'عطر قوی، دانه کشیده و پخت مجلسی',
    image: '/images/keyvan/tarom-premium.webp',
    badge: { label: '۵ کیلوگرم', tone: 'neutral' },
    type: 'tarom',
    region: 'mazandaran',
    aroma: 'strong',
    grain: 'long',
    organic: false,
    premium: true,
    inStock: true,
    isFeatured: true,
    harvestYear: '۱۴۰۳',
    originStory: 'از دل شالیزارهای پرآب آمل، جایی که آب هراز به دشت می‌رسد و کشاورزان نسل‌ها است آیین کشت برنج را زنده نگه داشته‌اند.',
    flavorNotes: ['گلبرگ بهاری', 'دانه‌ی سفید زعفران', 'نفس کوه البرز'],
    aromaProfile: 'عطر مشخص و ماندگار پس از دم‌کشیدن',
    textureProfile: 'دانه کشیده، سبک و جدا پس از پخت',
    pairings: ['خورش فسنجان', 'مرغ زعفرانی', 'باقالی‌پلو با ماهی'],
    chefNote: 'برای بهترین پلو، این برنج را یک ساعت خیس کنید. آب کش ملایم، دم آرام.',
    collection: 'chef-choice',
    cookingTip: 'قبل از پخت ۴۵ دقیقه در آب سرد خیس کنید تا دانه‌ها به تمام زیباییشان برسند.',
  },
  {
    id: '2',
    slug: 'shirudi-asil',
    kicker: 'برنج نیمه معطر',
    title: 'شیرودی اصیل',
    price: 145000,
    weight: '۵ کیلوگرم',
    weightKg: 5,
    copy: 'شیرودی کیوان با پخت یکنواخت و بافت نرم، انتخابی اقتصادی برای کته، دمی و مصرف روزانه خانواده است.',
    shortNote: 'پخت یکنواخت و مقرون‌به‌صرفه برای مصرف روزانه',
    image: '/images/keyvan/daily.webp',
    badge: { label: '۵ کیلوگرم', tone: 'neutral' },
    type: 'shirudi',
    region: 'mazandaran',
    aroma: 'mild',
    grain: 'long',
    organic: false,
    premium: false,
    inStock: true,
    harvestYear: '۱۴۰۳',
    originStory: 'از شالیزارهای آمل در مازندران، برنجی با پخت مطمئن برای سفره روزانه.',
    flavorNotes: ['برنج تازه', 'نان گرم', 'روستای باران‌خورده'],
    aromaProfile: 'عطر ملایم و متعادل',
    textureProfile: 'نرم و یکنواخت، مناسب کته و دمی',
    pairings: ['کته ساده', 'لوبیا‌پلو', 'ته‌دیگ نان'],
    cookingTip: 'برای کته‌ای عالی، نسبت یک به یک و نیم آب به برنج را رعایت کنید.',
  },
  {
    id: '3',
    slug: 'domsiah-shomali',
    kicker: 'برنج اعلا',
    title: 'دمسیاه شمالی',
    price: 220000,
    weight: '۵ کیلوگرم',
    weightKg: 5,
    copy: 'دمسیاه منتخب کیوان با عطر ماندگار و دانه‌های کشیده، برای پذیرایی رسمی و پلوهای زعفرانی پیشنهاد می‌شود.',
    shortNote: 'عطر ماندگار و دانه کشیده برای پذیرایی رسمی',
    image: '/images/keyvan/domsiah.webp',
    badge: { label: 'ممتاز', tone: 'ink' },
    type: 'domsiah',
    region: 'mazandaran',
    aroma: 'mild',
    grain: 'long',
    organic: false,
    premium: true,
    inStock: true,
    isFeatured: true,
    harvestYear: '۱۴۰۳',
    originStory: 'منتخب شالیزارهای آمل در مازندران؛ دمسیاه با دانه‌های کشیده و عطر ماندگار برای پلوهای رسمی.',
    flavorNotes: ['گل یاس', 'چوب صندل', 'نور آفتاب صبحگاهی'],
    aromaProfile: 'عطر قوی و ماندگار پس از پخت',
    textureProfile: 'کشیده، سبک و جدا با دم آرام',
    pairings: ['قورمه سبزی', 'باقالی‌پلو', 'مجلسی زعفرانی'],
    chefNote: 'برای حفظ عطر و قدکشیدن دانه، دمسیاه را با حرارت کم و زمان دم طولانی‌تر آماده کنید.',
    collection: 'rare-harvest',
    cookingTip: 'یک ساعت خیس، آبکش کامل، دم ملایم با دمکنی — این رمز طارم دمسیاه است.',
  },
  {
    id: '4',
    slug: 'alikazemi-grade-1',
    kicker: 'برنج دانه بلند',
    title: 'علی‌کاظمی درجه یک',
    price: 165000,
    weight: '۵ کیلوگرم',
    weightKg: 5,
    copy: 'علی‌کاظمی درجه یک با دانه بلند و عطر ملایم، برای پلو خانوادگی، کباب و خورش‌های ایرانی انتخابی متعادل است.',
    shortNote: 'دانه بلند و عطر ملایم برای پلو خانوادگی',
    image: '/images/keyvan/tarom-premium.webp',
    badge: { label: '۵ کیلوگرم', tone: 'neutral' },
    type: 'alikazemi',
    region: 'mazandaran',
    aroma: 'mild',
    grain: 'long',
    organic: false,
    premium: false,
    inStock: true,
    harvestYear: '۱۴۰۳',
    originStory: 'علی‌کاظمی منتخب آمل در مازندران، جایی که آب دامنه‌های البرز و خاک شالیزار نتیجه پختی متمایز می‌سازند.',
    flavorNotes: ['دانه طلایی', 'شیر برنج', 'خاک باران‌خورده'],
    aromaProfile: 'عطر ملایمی که با گرما شکوفا می‌شود',
    textureProfile: 'دانه بلند و منسجم، مناسب پلو و کباب',
    pairings: ['جوجه کباب', 'خورش قیمه', 'آبگوشت'],
    cookingTip: 'برای پلوی مجلسی، کره طبیعی یا روغن حیوانی به ته‌دیگ اضافه کنید.',
  },
  {
    id: '5',
    slug: 'tarom-organic',
    kicker: 'کشت محدود',
    title: 'طارم کشت طبیعی',
    price: 195000,
    weight: '۵ کیلوگرم',
    weightKg: 5,
    copy: 'طارم کشت طبیعی از محموله محدود آمل، با توجه بیشتر به سلامت خاک و کاهش مصرف نهاده‌های شیمیایی انتخاب شده است.',
    shortNote: 'محموله محدود با رویکرد کشت طبیعی',
    image: '/images/keyvan/organic.webp',
    badge: { label: 'کشت طبیعی', tone: 'olive' },
    type: 'tarom',
    region: 'mazandaran',
    aroma: 'strong',
    grain: 'long',
    organic: true,
    premium: true,
    inStock: true,
    harvestYear: '۱۴۰۳',
    originStory: 'کشت محدود در شالیزارهای منتخب آمل با حداقل مداخله و توجه به سلامت خاک و آب.',
    flavorNotes: ['طبیعت خالص', 'آفتاب مستقیم', 'باد شمال'],
    aromaProfile: 'عطر مشخص طارم با شدت متعادل',
    textureProfile: 'نرم و سبک، مناسب پلو و سبزی‌پلو',
    pairings: ['سبزی‌پلو', 'ماهی دودی', 'سالاد تازه'],
    chefNote: 'برای حفظ بافت دانه، آب را تدریجی اضافه کنید و برنج را با حرارت ملایم دم بگذارید.',
    collection: 'chef-choice',
    cookingTip: 'به خاطر بافت طبیعی، کمی بیشتر آب نیاز دارد. هر کیلو را با ۱.۷۵ برابر آب بپزید.',
  },
  {
    id: '6',
    slug: 'hashemi-white',
    kicker: 'برنج کلاسیک',
    title: 'هاشمی سفید',
    price: 155000,
    weight: '۵ کیلوگرم',
    weightKg: 5,
    copy: 'هاشمی سفید کیوان با عطر ملایم و پخت یکنواخت، برای مصرف روزانه و خورش‌های ایرانی انتخابی آشنا و قابل اتکا است.',
    shortNote: 'عطر ملایم و پخت یکنواخت برای هر روز',
    image: '/images/keyvan/daily.webp',
    badge: { label: '۵ کیلوگرم', tone: 'neutral' },
    type: 'tarom',
    region: 'mazandaran',
    aroma: 'mild',
    grain: 'long',
    organic: false,
    premium: false,
    inStock: true,
    harvestYear: '۱۴۰۲',
    originStory: 'هاشمی کلاسیک از آمل مازندران؛ انتخابی آشنا که نسل‌ها روی سفره‌های ایرانی حاضر بوده است.',
    flavorNotes: ['برنج خالص', 'کمی شیرینی طبیعی', 'سادگی اصیل'],
    aromaProfile: 'عطر ملایم و آشنا پس از دم‌کشیدن',
    textureProfile: 'نرم، سفید و یکنواخت',
    pairings: ['هر خورشت ایرانی', 'کباب', 'مرغ'],
    cookingTip: 'ساده‌ترین پخت: آبکش با نمک و زعفران، دم با دمکنی تمیز.',
  },
  {
    id: '7',
    slug: 'first-harvest-spring',
    kicker: 'محصول فصلی',
    title: 'کشت اول بهاره',
    price: 240000,
    weight: '۵ کیلوگرم',
    weightKg: 5,
    copy: 'کشت اول سال از محموله محدود آمل، با عطر تازه‌تر و رطوبت بیشتر دانه عرضه می‌شود و به زمان خیساندن کوتاه‌تری نیاز دارد.',
    shortNote: 'کشت اول سال با موجودی محدود و زمان خیساندن کمتر',
    image: '/images/keyvan/tarom-premium.webp',
    badge: { label: 'فصلی', tone: 'gold' },
    type: 'tarom',
    region: 'mazandaran',
    aroma: 'strong',
    grain: 'long',
    organic: true,
    premium: true,
    inStock: true,
    isNew: true,
    harvestYear: '۱۴۰۳',
    originStory: 'کشت اول سال از شالیزارهای منتخب آمل؛ محصولی فصلی که با موجودی محدود عرضه می‌شود.',
    flavorNotes: ['شکوفه بهار', 'علف تازه', 'باران نوروز'],
    aromaProfile: 'عطر تازه و مشخص در زمان پخت',
    textureProfile: 'دانه لطیف‌تر با نیاز کمتر به خیساندن',
    pairings: ['سبزی‌پلو ماهی', 'رشته‌پلو', 'آش نوروزی'],
    chefNote: 'به دلیل تازگی دانه، زمان خیساندن و مقدار آب را نسبت به برنج کهنه کاهش دهید.',
    collection: 'limited-seasonal',
    cookingTip: 'به خاطر تازگی، زمان خیس کردن را به ۳۰ دقیقه کاهش دهید.',
  },
  {
    id: '8',
    slug: 'neda-premium',
    kicker: 'برنج دانه کوتاه',
    title: 'ندا ممتاز',
    price: 210000,
    weight: '۳ کیلوگرم',
    weightKg: 3,
    copy: 'برنج ندا ممتاز با پخت یکنواخت و بافت نرم، برای دمی و کته‌های روزانه انتخابی مطمئن است.',
    shortNote: 'بافت نرم و پخت یکنواخت برای دمی و کته',
    image: '/images/keyvan/organic.webp',
    badge: { label: '۳ کیلوگرم', tone: 'neutral' },
    type: 'neda',
    region: 'mazandaran',
    aroma: 'mild',
    grain: 'short',
    organic: false,
    premium: true,
    inStock: true,
    harvestYear: '۱۴۰۳',
    originStory: 'از شالیزارهای آمل در مازندران؛ برنج ندا با پخت یکنواخت برای مصرف روزانه انتخاب شده است.',
    flavorNotes: ['خامه‌ی طبیعی', 'رزی گرم', 'مرواریدی سفید'],
    aromaProfile: 'عطر ملایم، مناسب غذاهای ترکیبی',
    textureProfile: 'نرم و کمی چسبنده، مناسب دمی و کته',
    pairings: ['دمی باقالی', 'کته گوجه', 'لوبیا‌پلو سنتی'],
    collection: 'aged-reserve',
    cookingTip: 'برای دمی عالی: نسبت یک به یک آب، حرارت خیلی کم، دم طولانی ۴۵ دقیقه.',
  },
];

const USE_BY_TYPE: Record<RiceType, string> = {
  tarom: 'پلو مجلسی و مهمانی',
  shirudi: 'کته و مصرف روزانه',
  domsiah: 'پذیرایی رسمی و پلو زعفرانی',
  alikazemi: 'پلو خانوادگی و کباب',
  neda: 'دمی و کته نرم',
};

export const PRODUCTS: Product[] = productSchema.array().parse(
  rawProducts.map((product) => ({
    ...product,
    priceUnit: 'کیلوگرم' as const,
    packPrice: product.price * product.weightKg,
    recommendedUse: USE_BY_TYPE[product.type],
    stockStatus: product.inStock ? (product.isNew ? 'low-stock' : 'in-stock') : 'out-of-stock',
    image: assetPath(product.image),
    gallery: [assetPath(product.image)],
    cookingNotes: product.cookingTip ?? 'پیش از پخت ۴۵ دقیقه خیس شود و با حرارت ملایم دم بکشد.',
    storageInstructions: 'در جای خشک، خنک و دور از نور مستقیم نگهداری شود.',
  }))
);

export const getProductById = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getProductBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

// --- Image gallery -------------------------------------------------------
// Contextual rice imagery (field, grains, cooked, served) shown alongside
// each product's primary photo.
const CONTEXT_IMAGES = [
  assetPath('/images/keyvan/hero-keyvan.webp'),
  assetPath('/images/keyvan/tarom-premium.webp'),
  assetPath('/images/keyvan/domsiah.webp'),
  assetPath('/images/keyvan/organic.webp'),
];

const baseId = (url: string) => url.split('?')[0];

export function getGallery(p: Product): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const url of [...p.gallery, ...CONTEXT_IMAGES]) {
    const id = baseId(url);
    if (!seen.has(id)) { seen.add(id); out.push(url); }
  }
  return out.slice(0, 4);
}

// --- Nutrition (per 100g cooked, typical Iranian white rice) -------------
export const RICE_NUTRITION: { label: string; value: string }[] = [
  { label: 'انرژی', value: '۱۳۰ کیلوکالری' },
  { label: 'کربوهیدرات', value: '۲۸ گرم' },
  { label: 'پروتئین', value: '۲٫۷ گرم' },
  { label: 'چربی', value: '۰٫۳ گرم' },
  { label: 'فیبر', value: '۰٫۴ گرم' },
  { label: 'بدون گلوتن', value: '✓' },
];

export const RICE_TYPE_LABELS: Record<RiceType, string> = {
  tarom: 'طارم هاشمی',
  shirudi: 'شیرودی',
  domsiah: 'دمسیاه',
  alikazemi: 'علی‌کاظمی',
  neda: 'ندا',
};

export const REGION_LABELS: Record<Region, string> = {
  mazandaran: 'آمل، مازندران',
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
