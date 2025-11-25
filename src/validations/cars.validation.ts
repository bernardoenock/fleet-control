import { z } from "zod";

export const carCreateSchema = z.object({
  plate: z.string().min(1).max(20),
  color: z.string().min(1),
  brand: z.string().min(1)
});

export const carUpdateSchema = z.object({
  plate: z.string().min(1).max(20).optional(),
  color: z.string().min(1).optional(),
  brand: z.string().min(1).optional()
});
