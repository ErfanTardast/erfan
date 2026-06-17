import type { Product, RiceType } from '@/lib/products';

export type CatalogFacetKind = 'category' | 'brand' | 'use-case' | 'collection';

export type CatalogFacet = {
  kind: CatalogFacetKind;
  slug: string;
  label: string;
  englishLabel: string;
  description: string;
  shopHref: string;
  match: (product: Product) => boolean;
};

export const CATALOG_CATEGORIES = [
  {
    kind: 'category',
    slug: 'tarom',
    label: 'طارم هاشمی',
    englishLabel: 'Tarom Hashemi',
    description: 'برنج‌های معطر و دانه‌بلند برای پلوهای مجلسی و سفره‌های خاص.',
    shopHref: '/shop?type=tarom',
    match: (product) => product.type === 'tarom',
  },
  {
    kind: 'category',
    slug: 'shirudi',
    label: 'شیرودی',
    englishLabel: 'Shirudi',
    description: 'انتخاب روزانه، خوش‌پخت و اقتصادی برای مصرف خانواده.',
    shopHref: '/shop?type=shirudi',
    match: (product) => product.type === 'shirudi',
  },
  {
    kind: 'category',
    slug: 'domsiah',
    label: 'دمسیاه شمالی',
    englishLabel: 'Domsiah',
    description: 'برنج اصیل و ممتاز شمال برای مهمانی و پخت آرام.',
    shopHref: '/shop?type=domsiah',
    match: (product) => product.type === 'domsiah',
  },
  {
    kind: 'category',
    slug: 'alikazemi',
    label: 'علی‌کاظمی',
    englishLabel: 'Ali Kazemi',
    description: 'دانه‌بلند، خوش‌پخت و مناسب سفره‌های ایرانی.',
    shopHref: '/shop?type=alikazemi',
    match: (product) => product.type === 'alikazemi',
  },
  {
    kind: 'category',
    slug: 'langroudi',
    label: 'لنگرودی',
    englishLabel: 'Langroudi',
    description: 'بافت نرم و مناسب دمی، کته و پخت‌های خانگی.',
    shopHref: '/shop?type=langroudi',
    match: (product) => product.type === 'langroudi',
  },
] satisfies CatalogFacet[];

export const CATALOG_BRANDS = [
  {
    kind: 'brand',
    slug: 'keyvan-premium',
    label: 'کیوان ممتاز',
    englishLabel: 'Keyvan Premium',
    description: 'محصولات ممتاز کیوان برای خریدهای حساس، مهمانی و هدیه.',
    shopHref: '/shop?premium=true',
    match: (product) => product.premium,
  },
  {
    kind: 'brand',
    slug: 'keyvan-organic',
    label: 'کیوان ارگانیک',
    englishLabel: 'Keyvan Organic',
    description: 'برنج‌های ارگانیک و کشت طبیعی برای خانواده‌های سلامت‌محور.',
    shopHref: '/shop?organic=true',
    match: (product) => product.organic,
  },
  {
    kind: 'brand',
    slug: 'keyvan-daily',
    label: 'کیوان روزانه',
    englishLabel: 'Keyvan Daily',
    description: 'گزینه‌های مطمئن و خوش‌پخت برای مصرف ثابت خانه.',
    shopHref: '/shop',
    match: (product) => product.inStock && !product.premium,
  },
] satisfies CatalogFacet[];

export const CATALOG_USE_CASES = [
  {
    kind: 'use-case',
    slug: 'daily-cooking',
    label: 'پخت روزانه',
    englishLabel: 'Daily Cooking',
    description: 'برنج‌های خوش‌پخت و قابل اعتماد برای وعده‌های روزمره.',
    shopHref: '/shop',
    match: (product) => product.type === 'shirudi' || product.type === 'langroudi' || !product.premium,
  },
  {
    kind: 'use-case',
    slug: 'guest-table',
    label: 'سفره مهمانی',
    englishLabel: 'Guest Table',
    description: 'گزینه‌های معطر و ممتاز برای پلوهای رسمی و مهمانی.',
    shopHref: '/shop?premium=true',
    match: (product) => product.premium,
  },
  {
    kind: 'use-case',
    slug: 'organic-family',
    label: 'خانواده ارگانیک',
    englishLabel: 'Organic Family',
    description: 'انتخاب‌های طبیعی و ارگانیک برای خرید خانوادگی.',
    shopHref: '/shop?organic=true',
    match: (product) => product.organic,
  },
  {
    kind: 'use-case',
    slug: 'gift-pack',
    label: 'هدیه و پذیرایی',
    englishLabel: 'Gift Pack',
    description: 'برنج‌های مناسب بسته‌بندی هدیه و پذیرایی خاص.',
    shopHref: '/shop?collection=chef-choice',
    match: (product) => product.collection === 'chef-choice' || product.collection === 'limited-seasonal',
  },
] satisfies CatalogFacet[];

export const CATALOG_COLLECTIONS = [
  {
    kind: 'collection',
    slug: 'chef-choice',
    label: 'انتخاب سرآشپز',
    englishLabel: "Chef's Choice",
    description: 'محصولاتی که برای پخت حرفه‌ای و نتیجه مطمئن پیشنهاد می‌شوند.',
    shopHref: '/shop?collection=chef-choice',
    match: (product) => product.collection === 'chef-choice',
  },
  {
    kind: 'collection',
    slug: 'rare-harvest',
    label: 'برداشت نادر',
    englishLabel: 'Rare Harvest',
    description: 'برداشت‌های محدود و خاص از مزارع منتخب شمال.',
    shopHref: '/shop?collection=rare-harvest',
    match: (product) => product.collection === 'rare-harvest',
  },
  {
    kind: 'collection',
    slug: 'limited-seasonal',
    label: 'فصلی محدود',
    englishLabel: 'Limited Seasonal',
    description: 'محصولات فصلی با موجودی محدود و زمان عرضه کوتاه.',
    shopHref: '/shop?collection=limited-seasonal',
    match: (product) => product.collection === 'limited-seasonal',
  },
  {
    kind: 'collection',
    slug: 'aged-reserve',
    label: 'ذخیره اعلا',
    englishLabel: 'Aged Reserve',
    description: 'گزینه‌های ویژه برای کسانی که عطر و پخت ماندگار می‌خواهند.',
    shopHref: '/shop?collection=aged-reserve',
    match: (product) => product.collection === 'aged-reserve',
  },
] satisfies CatalogFacet[];

export const ALL_CATALOG_FACETS = [
  ...CATALOG_CATEGORIES,
  ...CATALOG_BRANDS,
  ...CATALOG_USE_CASES,
  ...CATALOG_COLLECTIONS,
] satisfies CatalogFacet[];

export function getCategoryBySlug(slug: RiceType | string) {
  return CATALOG_CATEGORIES.find((category) => category.slug === slug);
}

export function getBrandBySlug(slug: string) {
  return CATALOG_BRANDS.find((brand) => brand.slug === slug);
}

export function getUseCaseBySlug(slug: string) {
  return CATALOG_USE_CASES.find((useCase) => useCase.slug === slug);
}
