import { z } from 'zod';

export const riceTypeSchema = z.enum(['tarom', 'shirudi', 'domsiah', 'alikazemi', 'langroudi']);
export const regionSchema = z.enum(['gilan', 'mazandaran', 'golestan']);
export const aromaSchema = z.enum(['strong', 'mild', 'neutral']);
export const grainLengthSchema = z.enum(['long', 'medium', 'short']);

export const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  kicker: z.string().min(1),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  weight: z.string().min(1),
  weightKg: z.union([z.literal(2), z.literal(3), z.literal(5), z.literal(10)]),
  copy: z.string().min(1),
  shortNote: z.string().min(1),
  image: z.string().url(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().nonnegative(),
  badge: z.object({
    label: z.string(),
    tone: z.enum(['neutral', 'olive', 'gold', 'ink']),
  }).optional(),
  type: riceTypeSchema,
  region: regionSchema,
  aroma: aromaSchema,
  grain: grainLengthSchema,
  organic: z.boolean(),
  premium: z.boolean(),
  inStock: z.boolean(),
  isNew: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  harvestYear: z.string().optional(),
  originStory: z.string().optional(),
  flavorNotes: z.array(z.string()).optional(),
  aromaProfile: z.string().optional(),
  textureProfile: z.string().optional(),
  pairings: z.array(z.string()).optional(),
  chefNote: z.string().optional(),
  collection: z.enum(['chef-choice', 'rare-harvest', 'limited-seasonal', 'aged-reserve']).optional(),
  cookingTip: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
