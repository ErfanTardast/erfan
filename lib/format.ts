const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] as const;

export const toFa = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => FA_DIGITS[+d]);

export const fmtPrice = (n: number): string =>
  toFa(n.toLocaleString('en-US')) + ' تومان';

export const fmtPriceShort = (n: number): string =>
  toFa(n.toLocaleString('en-US'));

export const fmtUnitPrice = (n: number): string =>
  `${fmtPriceShort(n)} تومان / کیلو`;

export const fmtPackPrice = (n: number, weightKg: number): string =>
  `${fmtPriceShort(n)} تومان / کیسه ${toFa(weightKg)} کیلویی`;

export const cn = (...classes: (string | false | null | undefined)[]): string =>
  classes.filter(Boolean).join(' ');
