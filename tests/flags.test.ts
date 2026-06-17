import { describe, expect, it } from 'vitest';
import { defaultFlags, isAssignedToRollout, stableBucket } from '@/lib/flags/flags';

describe('feature flags', () => {
  it('keeps conservative defaults', () => {
    expect(defaultFlags.checkoutV2).toBe(false);
    expect(defaultFlags.wholesaleEntry).toBe(false);
    expect(defaultFlags.loyaltyPreview).toBe(false);
  });

  it('assigns rollout buckets deterministically', () => {
    expect(stableBucket('session-a')).toBe(stableBucket('session-a'));
    expect(isAssignedToRollout('session-a', 0)).toBe(false);
    expect(isAssignedToRollout('session-a', 100)).toBe(true);
  });
});
