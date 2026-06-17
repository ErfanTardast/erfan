import { describe, expect, it } from 'vitest';
import { isEmail, isIranMobile, isIranPostalCode, isValidAddressLine, normalizeIranMobile } from '@/lib/security/validation';

describe('iran validation helpers', () => {
  it('accepts valid Iran mobile numbers', () => {
    expect(isIranMobile('09123456789')).toBe(true);
    expect(normalizeIranMobile('+989123456789')).toBe('09123456789');
  });

  it('rejects invalid mobile numbers', () => {
    expect(isIranMobile('08123456789')).toBe(false);
    expect(isIranMobile('091234')).toBe(false);
  });

  it('validates email, postal code, and address basics', () => {
    expect(isEmail('buyer@example.com')).toBe(true);
    expect(isEmail('buyer')).toBe(false);
    expect(isIranPostalCode('1234567890')).toBe(true);
    expect(isIranPostalCode('123')).toBe(false);
    expect(isValidAddressLine('Tehran, Valiasr Street, No 12')).toBe(true);
  });
});
