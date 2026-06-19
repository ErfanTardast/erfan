export interface BeltProduct {
  id: string;
  brand: string;
  title: string;
  rating: number;
  reviewCount: number;
  discountPercent?: number;
  hasInstallment: boolean;
  stockCount?: number;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  category: string;
  bgFrom: string;
  bgTo: string;
}

export interface StoryItem {
  id: string;
  label: string;
  bgColor: string;
  borderColor: string;
  icon: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  bgFrom: string;
  bgTo: string;
  accentColor: string;
  label: string;
}

export interface BrandBannerData {
  id: string;
  brandName: string;
  brandNameEn?: string;
  tagline: string;
  description: string;
  ctaText: string;
  bgFrom: string;
  bgTo: string;
  textColor: string;
  accentColor: string;
  shape: 'left' | 'right' | 'center';
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  bgFrom: string;
  bgTo: string;
}

export interface BrandLogoItem {
  id: string;
  name: string;
  nameEn: string;
  initial: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export interface CategoryNavItem {
  id: string;
  label: string;
  href: string;
}

// ── Category Navigation ──────────────────────────────────────────────────────

export const CATEGORY_NAV: CategoryNavItem[] = [
  { id: '1', label: 'تسمه تایم', href: '/category/timing-belt' },
  { id: '2', label: 'تسمه دینام', href: '/category/alternator-belt' },
  { id: '3', label: 'تسمه هیدرولیک', href: '/category/hydraulic-belt' },
  { id: '4', label: 'تسمه کولر', href: '/category/ac-belt' },
  { id: '5', label: 'تسمه‌های صنعتی', href: '/category/industrial-belt' },
  { id: '6', label: 'ابزار اندازه‌گیری', href: '/category/measurement-tools' },
  { id: '7', label: 'تجهیزات پزشکی', href: '/category/medical-equipment' },
];

// ── Story Strip ──────────────────────────────────────────────────────────────

export const STORY_ITEMS: StoryItem[] = [
  { id: '1', label: 'ضدآفتاب فقط یک عدد', bgColor: '#fef2f2', borderColor: '#fca5a5', icon: '☀️' },
  { id: '2', label: 'تسمه تایم', bgColor: '#eff6ff', borderColor: '#93c5fd', icon: '⚙️' },
  { id: '3', label: 'ابزار اندازه‌گیری', bgColor: '#f0fdf4', borderColor: '#86efac', icon: '📏' },
  { id: '4', label: 'تستر عایقی', bgColor: '#f5f3ff', borderColor: '#c4b5fd', icon: '🔌' },
  { id: '5', label: 'محصولات پرفروش', bgColor: '#fffbeb', borderColor: '#fcd34d', icon: '⭐' },
  { id: '6', label: 'تخفیف‌های ویژه', bgColor: '#fff1f2', borderColor: '#fda4af', icon: '🏷️' },
  { id: '7', label: 'خرید اقساطی', bgColor: '#f0f9ff', borderColor: '#7dd3fc', icon: '💳' },
  { id: '8', label: 'برندهای محبوب', bgColor: '#f7fee7', borderColor: '#a3e635', icon: '🏆' },
];

// ── Hero Slides ──────────────────────────────────────────────────────────────

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: '1',
    title: 'خرید تخصصی تسمه و ابزار صنعتی',
    subtitle: 'ارسال سریع، ضمانت اصالت کالا، پشتیبانی حرفه‌ای',
    cta: 'مشاهده محصولات',
    bgFrom: '#0f172a',
    bgTo: '#1e293b',
    accentColor: '#dc2626',
    label: 'تسمه‌های صنعتی',
  },
  {
    id: '2',
    title: 'بهترین ابزار اندازه‌گیری',
    subtitle: 'دقیق‌ترین تجهیزات اندازه‌گیری صنعتی با گارانتی اصالت کالا',
    cta: 'مشاهده محصولات',
    bgFrom: '#0c1a2e',
    bgTo: '#1e3a5f',
    accentColor: '#2563eb',
    label: 'ابزار اندازه‌گیری',
  },
  {
    id: '3',
    title: 'خرید اقساطی بدون بهره',
    subtitle: 'در ۴ قسط بدون کارمزد — بیش از ۵۰,۰۰۰ کالا در دسترس',
    cta: 'شروع خرید اقساطی',
    bgFrom: '#1a0a0a',
    bgTo: '#7f1d1d',
    accentColor: '#f59e0b',
    label: 'خرید اقساطی',
  },
];

// ── Products ─────────────────────────────────────────────────────────────────

const PALETTE = [
  { bgFrom: '#e0f2fe', bgTo: '#bae6fd' },
  { bgFrom: '#fce7f3', bgTo: '#fbcfe8' },
  { bgFrom: '#d1fae5', bgTo: '#a7f3d0' },
  { bgFrom: '#ede9fe', bgTo: '#ddd6fe' },
  { bgFrom: '#fef3c7', bgTo: '#fde68a' },
  { bgFrom: '#cffafe', bgTo: '#a5f3fc' },
];

function makeProducts(category: string, offset = 0): BeltProduct[] {
  const raw: Omit<BeltProduct, 'id' | 'category' | 'bgFrom' | 'bgTo'>[] = [
    {
      brand: 'ربار',
      title: 'تسمه تایم پراید اپتی بلت',
      rating: 4.7,
      reviewCount: 3,
      discountPercent: 15,
      hasInstallment: true,
      stockCount: 2,
      price: 25500000,
      originalPrice: 29900000,
    },
    {
      brand: 'Optibelt',
      title: 'تسمه تایم پراید اپتی بلت',
      rating: 4.7,
      reviewCount: 3,
      discountPercent: 8,
      hasInstallment: true,
      price: 18900000,
      originalPrice: 20500000,
    },
    {
      brand: 'ربار',
      title: 'تسمه تایمینگ حلقه بسته XL لاستیکی',
      rating: 2.9,
      reviewCount: 20,
      hasInstallment: false,
      price: 4200000,
    },
    {
      brand: 'ربار',
      title: 'تسمه تایمینگ متری 2GT پلی اورتان PU',
      rating: 3.7,
      reviewCount: 3,
      discountPercent: 20,
      hasInstallment: true,
      price: 8500000,
      originalPrice: 10600000,
    },
    {
      brand: 'ربار',
      title: 'تسمه تایمینگ متری 2GT پلی اورتان PU',
      rating: 5.0,
      reviewCount: 13,
      hasInstallment: true,
      price: 12300000,
      isNew: true,
    },
    {
      brand: 'SKF',
      title: 'تسمه دینام پژو ۲۰۶ اصلی',
      rating: 4.5,
      reviewCount: 8,
      discountPercent: 5,
      hasInstallment: false,
      price: 6800000,
      originalPrice: 7200000,
    },
  ];

  return raw.map((p, i) => ({
    ...p,
    id: `${category}-${i + offset}`,
    category,
    bgFrom: PALETTE[(i + offset) % PALETTE.length].bgFrom,
    bgTo: PALETTE[(i + offset) % PALETTE.length].bgTo,
  }));
}

export const DISCOUNT_PRODUCTS: BeltProduct[] = makeProducts('discount', 0).map((p, i) => ({
  ...p,
  discountPercent: [25, 30, 15, 20, 35, 10][i] ?? 10,
  originalPrice: Math.round(p.price * 1.35),
}));

export const INSTALLMENT_PRODUCTS: BeltProduct[] = makeProducts('installment', 6).map((p) => ({
  ...p,
  hasInstallment: true,
}));

export const NEW_PRODUCTS: BeltProduct[] = makeProducts('new', 12).map((p) => ({
  ...p,
  isNew: true,
}));

export const TIMING_BELT_PRODUCTS: BeltProduct[] = makeProducts('timing', 18);
export const ALTERNATOR_BELT_PRODUCTS: BeltProduct[] = makeProducts('alternator', 24);
export const HYDRAULIC_BELT_PRODUCTS: BeltProduct[] = makeProducts('hydraulic', 30);
export const COOLER_BELT_PRODUCTS: BeltProduct[] = makeProducts('cooler', 36);
export const INDUSTRIAL_BELT_PRODUCTS: BeltProduct[] = makeProducts('industrial', 42);

// ── Brand Banners ─────────────────────────────────────────────────────────────

export const BRAND_BANNERS: BrandBannerData[] = [
  {
    id: '1',
    brandName: 'تستو',
    brandNameEn: 'TESTO',
    tagline: 'برند تستو در ایران',
    description: 'فروش رسمی محصولات تستو — دقیق‌ترین ابزار اندازه‌گیری صنعتی جهان',
    ctaText: 'خرید محصولات تستو',
    bgFrom: '#0f172a',
    bgTo: '#1e293b',
    textColor: '#ffffff',
    accentColor: '#f59e0b',
    shape: 'right',
  },
  {
    id: '2',
    brandName: 'فلوک',
    brandNameEn: 'Fluke',
    tagline: 'برند فلوک',
    description: 'اعتماد مهندسان جهان — متیول‌متر و کلمپ‌متر اصل فلوک',
    ctaText: 'خرید محصولات فلوک',
    bgFrom: '#7f1d1d',
    bgTo: '#450a0a',
    textColor: '#ffffff',
    accentColor: '#fca5a5',
    shape: 'left',
  },
  {
    id: '3',
    brandName: 'UNI-T',
    brandNameEn: 'UNI-T',
    tagline: 'برند اندازه‌گیری UNI-T',
    description: 'ابزار دقیق اندازه‌گیری با بهترین قیمت — گارانتی ۲ ساله',
    ctaText: 'خرید محصولات UNI-T',
    bgFrom: '#0c1a2e',
    bgTo: '#1e3a5f',
    textColor: '#ffffff',
    accentColor: '#93c5fd',
    shape: 'center',
  },
  {
    id: '4',
    brandName: 'کیورناکونس',
    brandNameEn: 'Kyoritsu',
    tagline: 'تسترهای مقاومت عایقی',
    description: 'بهترین تسترهای عایقی برای صنایع برق و نیرو',
    ctaText: 'خرید محصولات',
    bgFrom: '#052e16',
    bgTo: '#14532d',
    textColor: '#ffffff',
    accentColor: '#86efac',
    shape: 'right',
  },
];

// ── Video Items ───────────────────────────────────────────────────────────────

export const VIDEO_ITEMS: VideoItem[] = [
  { id: '1', title: 'تسمه تایم پراید اپتی بلت', duration: '۱٫۲ ث', bgFrom: '#e0f2fe', bgTo: '#bae6fd' },
  { id: '2', title: 'تسمه دینام پژو ۲۰۶', duration: '۲٫۵ ث', bgFrom: '#fce7f3', bgTo: '#fbcfe8' },
  { id: '3', title: 'تستر مقاومت عایقی', duration: '۳٫۱ ث', bgFrom: '#d1fae5', bgTo: '#a7f3d0' },
  { id: '4', title: 'ابزار اندازه‌گیری دیجیتال', duration: '۱٫۸ ث', bgFrom: '#ede9fe', bgTo: '#ddd6fe' },
  { id: '5', title: 'تسمه صنعتی V-Belt', duration: '۰٫۹ ث', bgFrom: '#fef3c7', bgTo: '#fde68a' },
  { id: '6', title: 'کلمپ‌متر فلوک', duration: '۴٫۲ ث', bgFrom: '#cffafe', bgTo: '#a5f3fc' },
  { id: '7', title: 'تسمه هیدرولیک اصلی', duration: '۲٫۷ ث', bgFrom: '#fee2e2', bgTo: '#fecaca' },
  { id: '8', title: 'درجه‌سنج دیجیتال', duration: '۱٫۵ ث', bgFrom: '#dcfce7', bgTo: '#bbf7d0' },
];

// ── Popular Brands ────────────────────────────────────────────────────────────

export const POPULAR_BRANDS: BrandLogoItem[] = [
  { id: '1', name: 'اپتی‌بلت', nameEn: 'Optibelt', initial: 'OB', bgColor: '#1e3a5f', textColor: '#ffffff', borderColor: '#93c5fd' },
  { id: '2', name: 'اس‌کی‌اف', nameEn: 'SKF', initial: 'SKF', bgColor: '#fef3c7', textColor: '#78350f', borderColor: '#fcd34d' },
  { id: '3', name: 'آ‌بی‌بی', nameEn: 'ABB', initial: 'ABB', bgColor: '#dc2626', textColor: '#ffffff', borderColor: '#fca5a5' },
  { id: '4', name: 'زیمنس', nameEn: 'Siemens', initial: 'SI', bgColor: '#1d4ed8', textColor: '#ffffff', borderColor: '#93c5fd' },
  { id: '5', name: 'یونی‌تی', nameEn: 'UNI-T', initial: 'UT', bgColor: '#1e293b', textColor: '#e2e8f0', borderColor: '#94a3b8' },
  { id: '6', name: 'فلوک', nameEn: 'Fluke', initial: 'FL', bgColor: '#7f1d1d', textColor: '#ffffff', borderColor: '#fca5a5' },
  { id: '7', name: 'تستو', nameEn: 'Testo', initial: 'TE', bgColor: '#ea580c', textColor: '#ffffff', borderColor: '#fdba74' },
  { id: '8', name: 'ربار', nameEn: 'Rubber', initial: 'RB', bgColor: '#374151', textColor: '#f9fafb', borderColor: '#9ca3af' },
];
