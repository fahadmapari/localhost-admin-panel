import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("A valid email is required"),
  password: z.string("A password is required"),
});

export type LoginType = z.infer<typeof loginSchema>;
