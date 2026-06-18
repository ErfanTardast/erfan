import { z } from 'zod';

export const cartItemSchema = z.object({
  id: z.string().min(1),
  qty: z.number().int().min(1).max(99),
});

export const cartSchema = z.array(cartItemSchema);

export type CartItemInput = z.infer<typeof cartItemSchema>;
