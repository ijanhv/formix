import { z } from "zod";

const questionTypes = [
  "shortText",
  "longText",
  "number",
  "email",
  "date",
  "select",
  "multiSelect",
  "rating",
  "",
] as const;

export const questionSchema = z.object({
  id: z.string().optional(),
  type: z.enum(questionTypes),
  label: z.string().min(1, "Label is required"),
  description: z.string().optional(),
  required: z.boolean(),
  options: z.array(z.string()).optional(),
  image: z.string().optional(),
  validationMessage: z.string().default("This field is required").optional(),
});

export const formSchema = z.object({
  name: z.string().optional(),
  theme: z.string().optional(),
  fontFamily: z.string().optional(),
  questions: z.array(questionSchema),
});

export type QuestionInput = z.infer<typeof questionSchema>;
export type FormInput = z.infer<typeof formSchema>;

export const emailSchema = z
  .string({ message: "Email is required" })
  .email({ message: "Invalid email" });

export const passwordSchema = z
  .string({ message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  });
