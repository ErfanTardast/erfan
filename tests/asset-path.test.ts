import { afterEach, describe, expect, it, vi } from 'vitest';

describe('assetPath', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('keeps root-relative assets unchanged without a deployment base path', async () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '');
    const { assetPath } = await import('@/lib/asset-path');

    expect(assetPath('/images/keyvan/hero.webp')).toBe('/images/keyvan/hero.webp');
  });

  it('prefixes local assets for GitHub Pages without duplicating the prefix', async () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '/erfan');
    const { assetPath } = await import('@/lib/asset-path');

    expect(assetPath('/images/keyvan/hero.webp')).toBe('/erfan/images/keyvan/hero.webp');
    expect(assetPath('/erfan/images/keyvan/hero.webp')).toBe('/erfan/images/keyvan/hero.webp');
  });

  it('does not modify external URLs', async () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '/erfan');
    const { assetPath } = await import('@/lib/asset-path');

    expect(assetPath('https://example.com/rice.webp')).toBe('https://example.com/rice.webp');
  });
});
