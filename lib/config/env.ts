import { z } from 'zod';

const booleanFromEnv = z
  .union([z.boolean(), z.string(), z.undefined()])
  .transform((value) => {
    if (typeof value === 'boolean') return value;
    if (!value) return false;
    return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
  });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_DEPLOYMENT_MODE: z.enum(['local', 'preview', 'production']).default('local'),
  NEXT_PUBLIC_ANALYTICS_ENABLED: booleanFromEnv.default(false),
  NEXT_PUBLIC_ANALYTICS_DEBUG: booleanFromEnv.default(false),
  NEXT_PUBLIC_WHOLESALE_ENABLED: booleanFromEnv.default(false),
  NEXT_PUBLIC_LOYALTY_ENABLED: booleanFromEnv.default(false),
  NEXT_PUBLIC_CHECKOUT_V2_ENABLED: booleanFromEnv.default(false),
  NEXT_PUBLIC_IMMERSIVE_PDP_ENABLED: booleanFromEnv.default(false),
  POSTGRES_URL: z.string().optional(),
  AUTH_SECRET: z.string().optional(),
  PAYMENT_PROVIDER: z.enum(['none', 'zarinpal', 'idpay']).default('none'),
});

export type AppEnv = z.infer<typeof envSchema>;

export function parseEnv(input: Record<string, string | boolean | undefined> = process.env): AppEnv {
  return envSchema.parse(input);
}

export const appEnv = parseEnv();

export function isProductionMode(env: Pick<AppEnv, 'NODE_ENV' | 'NEXT_PUBLIC_DEPLOYMENT_MODE'> = appEnv) {
  return env.NODE_ENV === 'production' || env.NEXT_PUBLIC_DEPLOYMENT_MODE === 'production';
}
