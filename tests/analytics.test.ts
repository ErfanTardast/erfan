import { describe, expect, it } from 'vitest';
import { createAnalyticsEvent, safeValidateAnalyticsEvent } from '@/lib/analytics/events';

describe('analytics events', () => {
  it('creates valid typed events', () => {
    const event = createAnalyticsEvent(
      'add_to_cart',
      { productId: '1', quantity: 2, value: 370000 },
      { route: '/product/tarom-hashemi-premium', anonymousId: 'anon-1' },
    );

    expect(event.name).toBe('add_to_cart');
    expect(event.locale).toBe('fa-IR');
    expect(event.payload.quantity).toBe(2);
  });

  it('rejects invalid payloads', () => {
    const result = safeValidateAnalyticsEvent({
      name: 'add_to_cart',
      timestamp: new Date().toISOString(),
      route: '/shop',
      locale: 'fa-IR',
      payload: { productId: '1', quantity: 0 },
    });

    expect(result.success).toBe(false);
  });
});
