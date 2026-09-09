import { z } from "zod";
import { CONTACT_MAX_MESSAGE_LENGTH } from "@/lib/constants";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(
      CONTACT_MAX_MESSAGE_LENGTH,
      `Message must be under ${CONTACT_MAX_MESSAGE_LENGTH} characters`,
    ),
});

export type ContactInput = z.infer<typeof contactSchema>;
