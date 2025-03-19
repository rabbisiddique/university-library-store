import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  fullName: z.string().min(3, "Full Name must be at least 3 characters long"),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(1000),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lt(10000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10),
});
