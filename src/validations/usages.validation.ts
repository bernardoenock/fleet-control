import { z } from "zod";

export const startUsageSchema = z.object({
  carId: z.number().int(),
  driverId: z.number().int(),
  startAt: z.string().datetime().optional(), // accept ISO datetime or set server side
  reason: z.string().min(3)
});

export const endUsageSchema = z.object({
  endAt: z.string().datetime()
});
