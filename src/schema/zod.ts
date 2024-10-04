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
  theme: z.string().optional(),
  fontFamily: z.string().optional(),
  questions: z.array(questionSchema),
});

export type QuestionInput = z.infer<typeof questionSchema>;
export type FormInput = z.infer<typeof formSchema>;

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(
    z
      .string()
      .min(1, { message: "Code is required" })
      .max(6, { message: "Code cannot be longer than six chracters" })
  ),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .regex(
      new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%&]).{8,32}"),
      {
        message:
          "Password must contain one uppercase letter, one lowercase letter, one number and one of the following characters: * . ! @ $ % &",
      }
    ),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});
