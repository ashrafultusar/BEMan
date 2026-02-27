import { z } from "zod";

const ROLES = ["user", "admin"] as const;

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z
    .string()
    .trim()
    .lowercase()
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password cannot exceed 32 characters"),

  role: z.enum(ROLES).default("user"),
});

export type RegisterInput = z.infer<typeof registerSchema>;