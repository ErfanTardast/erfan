export function normalizeIranMobile(input: string): string | null {
  const digits = input.replace(/[^\d+]/g, '');
  if (/^09\d{9}$/.test(digits)) return digits;
  if (/^\+989\d{9}$/.test(digits)) return `0${digits.slice(3)}`;
  if (/^989\d{9}$/.test(digits)) return `0${digits.slice(2)}`;
  return null;
}

export function isIranMobile(input: string) {
  return normalizeIranMobile(input) !== null;
}

export function isEmail(input: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim());
}

export function isIranPostalCode(input: string) {
  return /^\d{10}$/.test(input.trim());
}

export function isValidAddressLine(input: string) {
  const value = input.trim();
  return value.length >= 10 && value.length <= 280;
}
