import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().min(1),
  name: z.string().min(1).max(30),
  bio: z.string().min(1).max(1000),
  username: z.string().min(1).max(30),
});
