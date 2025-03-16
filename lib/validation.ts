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
