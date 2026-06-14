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
    harvestYear: '۱۴۰۳',
    originStory: 'از دل مزارع پرآب رشت، جایی که مه صبحگاهی آرام روی خوشه‌های برنج می‌نشیند و کشاورزان نسل‌ها است این آیین را زنده نگه داشته‌اند.',
    flavorNotes: ['گلبرگ بهاری', 'دانه‌ی سفید زعفران', 'نفس کوه البرز'],
    aromaProfile: 'عطری که لحظه‌ای چشمانت را می‌بندد و به باغ‌های شمال می‌بری',
    textureProfile: 'ابریشمی، سبک و جداجدا — هر دانه یک دنیای مستقل',
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
    harvestYear: '۱۴۰۳',
    originStory: 'از جنگل‌های سرسبز مازندران، برنجی که سادگی را به هنر تبدیل می‌کند.',
    flavorNotes: ['برنج تازه', 'نان گرم', 'روستای باران‌خورده'],
    aromaProfile: 'عطر ساده و صادق — مثل خانه‌ی مادربزرگ',
    textureProfile: 'یکنواخت و نرم، پخت مطمئن و همیشه درست',
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
    harvestYear: '۱۴۰۳',
    originStory: 'از فومن گیلان، شهری که برنج‌اش معروف‌ترین شهر در ایران است. دمسیاه با دانه‌های کشیده‌اش نجیب‌ترین برنج ایران است.',
    flavorNotes: ['گل یاس', 'چوب صندل', 'نور آفتاب صبحگاهی'],
    aromaProfile: 'عطری شاعرانه و عمیق که حتی قبل از پخت هم حس می‌شود',
    textureProfile: 'کشیده، شفاف و جداجدا — هر دانه یک شعر کوتاه',
    pairings: ['قورمه سبزی', 'باقالی‌پلو', 'مجلسی زعفرانی'],
    chefNote: 'دمسیاه را باید آرام و با حوصله پخت. حرارت کم، دم طولانی، نتیجه بی‌نظیر.',
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
    copy: 'علی‌کاظمی با دانه‌های بلند و ممتاز، تاج طلایی خوان ایرانی است که هر وعده را به مناسبتی خاص تبدیل می‌کند.',
    shortNote: 'دانه بلند ممتاز — تاج طلایی خوان ایرانی',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=720&q=80',
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
    harvestYear: '۱۴۰۳',
    originStory: 'علی‌کاظمی از مازندران، جایی که خاک سرخ و آب معدنی کوه‌های البرز ترکیبی منحصربه‌فرد می‌سازند.',
    flavorNotes: ['دانه طلایی', 'شیر برنج', 'خاک باران‌خورده'],
    aromaProfile: 'عطر ملایمی که با گرما شکوفا می‌شود',
    textureProfile: 'بلند و ممتاز، با قوام عالی برای پلوهای مجلسی',
    pairings: ['جوجه کباب', 'خورش قیمه', 'آبگوشت'],
    cookingTip: 'برای پلوی مجلسی، کره طبیعی یا روغن حیوانی به ته‌دیگ اضافه کنید.',
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
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=720&q=80',
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
    harvestYear: '۱۴۰۳',
    originStory: 'کشتی بدون کمک شیمی و با دست‌های کشاورزانی که به طبیعت احترام می‌گذارند. گواهی سبز از خاک سالم گیلان.',
    flavorNotes: ['طبیعت خالص', 'آفتاب مستقیم', 'باد شمال'],
    aromaProfile: 'پاک‌ترین عطر برنج ایرانی — طبیعت در هر نفس',
    textureProfile: 'نرم و سبک، با طعمی که سادگی را تجلیل می‌کند',
    pairings: ['سبزی‌پلو', 'ماهی دودی', 'سالاد تازه'],
    chefNote: 'بهترین انتخاب برای کسانی که طعم واقعی برنج ایرانی را می‌خواهند، بدون هیچ افزودنی.',
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
    copy: 'هاشمی سفید با سفیدی مرواریدی و عطر لطیف، همراه همیشگی سفره‌های ایرانی است.',
    shortNote: 'سفید مرواریدی، عطر لطیف — مناسب هر روز',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=720&q=80',
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
    harvestYear: '۱۴۰۲',
    originStory: 'هاشمی کلاسیک، قدیمی‌ترین عضو خانواده طارم. نسل‌هاست که صادقانه روی سفره‌های ایرانی حاضر است.',
    flavorNotes: ['برنج خالص', 'کمی شیرینی طبیعی', 'سادگی اصیل'],
    aromaProfile: 'عطر آشنا و دلنشین — مثل بوی دم در آشپزخانه‌ی خانواده',
    textureProfile: 'نرم، سفید و یکنواخت — اعتمادپذیر و همیشه درست',
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
    copy: 'اولین محصول سال، با طعم تازه‌ی بهار در سفره. این برنج فصلی در مقدار محدود موجود است.',
    shortNote: 'اولین محصول سال — طعم تازه‌ی بهار در سفره',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=720&q=80',
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
    harvestYear: '۱۴۰۳',
    originStory: 'اولین محصول سال از بهترین مزارع گیلان. بهار همه چیز را تازه می‌کند — این برنج هم.',
    flavorNotes: ['شکوفه بهار', 'علف تازه', 'باران نوروز'],
    aromaProfile: 'تازه‌ترین عطر ممکن — انگار بهار در کیسه‌ی برنج است',
    textureProfile: 'ظریف و شکننده، با طعمی که فصل را یادت می‌اندازد',
    pairings: ['سبزی‌پلو ماهی', 'رشته‌پلو', 'آش نوروزی'],
    chefNote: 'این برنج فقط یک بار در سال موجود است. هر دانه یک لحظه‌ی بهاری ناب.',
    collection: 'limited-seasonal',
    cookingTip: 'به خاطر تازگی، زمان خیس کردن را به ۳۰ دقیقه کاهش دهید.',
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
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=720&q=80',
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
    harvestYear: '۱۴۰۳',
    originStory: 'از شهر لنگرود گیلان، جایی که برنج دانه‌کوتاه با طعمی متفاوت به دنیا می‌آید.',
    flavorNotes: ['خامه‌ی طبیعی', 'رزی گرم', 'مرواریدی سفید'],
    aromaProfile: 'عطر کمرنگ و خوشایند — خودش را با غذا هماهنگ می‌کند',
    textureProfile: 'گرد و نرم، می‌چسبد به هم — ایده‌آل برای دمی و کته‌های خاص',
    pairings: ['دمی باقالی', 'کته گوجه', 'لوبیا‌پلو سنتی'],
    collection: 'aged-reserve',
    cookingTip: 'برای دمی عالی: نسبت یک به یک آب، حرارت خیلی کم، دم طولانی ۴۵ دقیقه.',
  },
];

export const getProductById = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getProductBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

// --- Image gallery -------------------------------------------------------
// Contextual rice imagery (field, grains, cooked, served) shown alongside
// each product's primary photo.
const CONTEXT_IMAGES = [
  'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=720&q=80', // مزرعه
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=720&q=80', // دانه برنج
  'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=720&q=80', // برنج پخته
  'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=720&q=80', // سرو شده
];

const baseId = (url: string) => url.split('?')[0];

export function getGallery(p: Product): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const url of [p.image, ...CONTEXT_IMAGES]) {
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

// --- Reviews -------------------------------------------------------------
export type Review = { name: string; rating: number; date: string; text: string };

const REVIEW_POOL: Review[] = [
  { name: 'مریم احمدی', rating: 5, date: '۲ هفته پیش', text: 'عطرش فوق‌العاده است، دقیقاً مثل برنج شمال خودمان. حتماً دوباره سفارش می‌دهم.' },
  { name: 'رضا کریمی', rating: 5, date: '۱ ماه پیش', text: 'کیفیت واقعاً عالی بود و دانه‌ها بعد از پخت کاملاً جدا و قدکشیده شدند. بسته‌بندی هم بی‌نقص.' },
  { name: 'سحر موسوی', rating: 4, date: '۳ هفته پیش', text: 'برنج خیلی خوبیه، ته‌دیگش معرکه می‌شه. فقط کاش ارسالش کمی سریع‌تر بود.' },
  { name: 'علی رضایی', rating: 5, date: '۵ روز پیش', text: 'بعد از سال‌ها بالاخره یک برنج اصیل پیدا کردم. ممنون از کیوان، کیفیت ثابت و قابل اعتماد.' },
  { name: 'نگار حسینی', rating: 5, date: '۱ هفته پیش', text: 'برای مهمانی سفارش دادم و همه از طعم و عطرش تعریف کردند. ارزش خریدش را دارد.' },
  { name: 'محمد قاسمی', rating: 4, date: '۲ ماه پیش', text: 'پخت آسانی دارد و خیلی خوش‌عطر است. مناسب مصرف روزانه خانواده.' },
];

export function getReviews(p: Product): Review[] {
  const seed = parseInt(p.id, 10) || 1;
  const n = Math.min(REVIEW_POOL.length, Math.max(2, (p.reviewCount % 4) + 2));
  const out: Review[] = [];
  for (let i = 0; i < n; i++) out.push(REVIEW_POOL[(seed + i) % REVIEW_POOL.length]);
  return out;
}

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
