import { describe, expect, it } from 'vitest';
import { parseEnv } from '@/lib/config/env';

describe('env parsing', () => {
  it('returns safe local defaults', () => {
    const env = parseEnv({});

    expect(env.NEXT_PUBLIC_SITE_URL).toBe('http://localhost:3000');
    expect(env.NEXT_PUBLIC_DEPLOYMENT_MODE).toBe('local');
    expect(env.NEXT_PUBLIC_ANALYTICS_ENABLED).toBe(false);
    expect(env.PAYMENT_PROVIDER).toBe('none');
  });

  it('parses boolean env strings', () => {
    const env = parseEnv({
      NEXT_PUBLIC_ANALYTICS_ENABLED: 'true',
      NEXT_PUBLIC_CHECKOUT_V2_ENABLED: '1',
    });

    expect(env.NEXT_PUBLIC_ANALYTICS_ENABLED).toBe(true);
    expect(env.NEXT_PUBLIC_CHECKOUT_V2_ENABLED).toBe(true);
  });
});
