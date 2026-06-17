import { z } from 'zod';

export const analyticsEventNames = [
  'home_impression',
  'category_view',
  'filter_apply',
  'search_query',
  'zero_result_search',
  'pdp_view',
  'media_interaction',
  'compare_add',
  'wishlist_add',
  'add_to_cart',
  'remove_from_cart',
  'begin_checkout',
  'coupon_applied',
  'payment_started',
  'payment_success',
  'payment_failure',
  'points_earned',
  'points_burned',
  'membership_started',
  'rfq_submitted',
  'wholesale_reorder',
  'client_error',
  'web_vital_reported',
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];

const baseEventSchema = z.object({
  name: z.enum(analyticsEventNames),
  timestamp: z.string().datetime(),
  route: z.string().min(1),
  locale: z.literal('fa-IR').default('fa-IR'),
  anonymousId: z.string().min(3).optional(),
});

const payloadSchemas = {
  home_impression: z.object({ source: z.enum(['direct', 'internal', 'campaign']).optional() }),
  category_view: z.object({ category: z.string().min(1) }),
  filter_apply: z.object({ filter: z.string().min(1), value: z.union([z.string(), z.number(), z.boolean()]) }),
  search_query: z.object({ query: z.string().min(1), resultCount: z.number().int().min(0).optional() }),
  zero_result_search: z.object({ query: z.string().min(1) }),
  pdp_view: z.object({ productId: z.string().min(1), slug: z.string().min(1) }),
  media_interaction: z.object({ productId: z.string().min(1).optional(), mediaType: z.enum(['image', 'video']), action: z.string().min(1) }),
  compare_add: z.object({ productId: z.string().min(1) }),
  wishlist_add: z.object({ productId: z.string().min(1) }),
  add_to_cart: z.object({ productId: z.string().min(1), quantity: z.number().int().positive(), value: z.number().nonnegative().optional() }),
  remove_from_cart: z.object({ productId: z.string().min(1), quantity: z.number().int().positive().optional() }),
  begin_checkout: z.object({ itemCount: z.number().int().positive(), value: z.number().nonnegative() }),
  coupon_applied: z.object({ code: z.string().min(1), discountValue: z.number().nonnegative().optional() }),
  payment_started: z.object({ provider: z.string().min(1), value: z.number().nonnegative() }),
  payment_success: z.object({ provider: z.string().min(1), orderId: z.string().min(1), value: z.number().nonnegative() }),
  payment_failure: z.object({ provider: z.string().min(1), reason: z.string().min(1).optional() }),
  points_earned: z.object({ points: z.number().int().positive(), reason: z.string().min(1).optional() }),
  points_burned: z.object({ points: z.number().int().positive(), reason: z.string().min(1).optional() }),
  membership_started: z.object({ tier: z.string().min(1) }),
  rfq_submitted: z.object({ buyerType: z.enum(['restaurant', 'retailer', 'corporate', 'other']), quantityKg: z.number().positive().optional() }),
  wholesale_reorder: z.object({ accountId: z.string().min(1), previousOrderId: z.string().min(1).optional() }),
  client_error: z.object({ message: z.string().min(1), component: z.string().min(1).optional() }),
  web_vital_reported: z.object({ metric: z.enum(['LCP', 'INP', 'CLS', 'FCP', 'TTFB']), value: z.number().nonnegative(), rating: z.enum(['good', 'needs-improvement', 'poor']).optional() }),
} satisfies Record<AnalyticsEventName, z.ZodTypeAny>;

type PayloadMap = {
  [K in AnalyticsEventName]: z.infer<(typeof payloadSchemas)[K]>;
};

export type AnalyticsEvent<K extends AnalyticsEventName = AnalyticsEventName> = z.infer<typeof baseEventSchema> & {
  name: K;
  payload: PayloadMap[K];
};

export function createAnalyticsEvent<K extends AnalyticsEventName>(
  name: K,
  payload: PayloadMap[K],
  context: Partial<Omit<AnalyticsEvent<K>, 'name' | 'payload'>> & { route: string },
): AnalyticsEvent<K> {
  const event = {
    name,
    payload,
    route: context.route,
    timestamp: context.timestamp ?? new Date().toISOString(),
    locale: 'fa-IR' as const,
    anonymousId: context.anonymousId,
  };

  return validateAnalyticsEvent(event) as AnalyticsEvent<K>;
}

export function validateAnalyticsEvent(event: unknown): AnalyticsEvent {
  const base = baseEventSchema.and(z.object({ payload: z.unknown() })).parse(event);
  const payload = payloadSchemas[base.name].parse(base.payload);
  return { ...base, payload } as AnalyticsEvent;
}

export function safeValidateAnalyticsEvent(event: unknown) {
  try {
    return { success: true as const, data: validateAnalyticsEvent(event) };
  } catch (error) {
    return { success: false as const, error };
  }
}
