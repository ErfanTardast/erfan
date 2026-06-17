import { describe, expect, it } from 'vitest';
import { createLogRecord, redactObject } from '@/lib/platform/logger';

describe('structured logger redaction', () => {
  it('redacts sensitive fields', () => {
    const redacted = redactObject({
      email: 'buyer@example.com',
      mobile: '09123456789',
      addressLine: 'Tehran address',
      productId: '1',
    });

    expect(redacted.email).toBe('[redacted]');
    expect(redacted.mobile).toBe('[redacted]');
    expect(redacted.addressLine).toBe('[redacted]');
    expect(redacted.productId).toBe('1');
  });

  it('redacts nested context in log records', () => {
    const record = createLogRecord({
      level: 'info',
      message: 'checkout started',
      context: { customerEmail: 'buyer@example.com', total: 120000 },
    });

    expect(record.timestamp).toEqual(expect.any(String));
    expect(record.context?.customerEmail).toBe('[redacted]');
    expect(record.context?.total).toBe(120000);
  });
});
