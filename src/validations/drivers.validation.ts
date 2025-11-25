import { z } from "zod";

export const driverCreateSchema = z.object({
  name: z.string().min(1)
});

export const driverUpdateSchema = z.object({
  name: z.string().min(1).optional()
});
