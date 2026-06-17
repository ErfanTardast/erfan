import { appEnv } from '@/lib/config/env';

export type FeatureFlag =
  | 'analyticsEnabled'
  | 'checkoutV2'
  | 'wholesaleEntry'
  | 'loyaltyPreview'
  | 'immersivePdp';

export type FeatureFlagMap = Record<FeatureFlag, boolean>;

export const defaultFlags: FeatureFlagMap = {
  analyticsEnabled: appEnv.NEXT_PUBLIC_ANALYTICS_ENABLED,
  checkoutV2: appEnv.NEXT_PUBLIC_CHECKOUT_V2_ENABLED,
  wholesaleEntry: appEnv.NEXT_PUBLIC_WHOLESALE_ENABLED,
  loyaltyPreview: appEnv.NEXT_PUBLIC_LOYALTY_ENABLED,
  immersivePdp: appEnv.NEXT_PUBLIC_IMMERSIVE_PDP_ENABLED,
};

export function isFeatureEnabled(flag: FeatureFlag, overrides: Partial<FeatureFlagMap> = {}) {
  return overrides[flag] ?? defaultFlags[flag];
}

export function stableBucket(input: string, buckets = 100): number {
  if (!Number.isInteger(buckets) || buckets < 1) {
    throw new Error('buckets must be a positive integer');
  }

  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) % buckets;
}

export function isAssignedToRollout(subjectId: string, percentage: number, salt = 'keyvan') {
  if (percentage <= 0) return false;
  if (percentage >= 100) return true;
  return stableBucket(`${salt}:${subjectId}`, 100) < percentage;
}
