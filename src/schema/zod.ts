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
  validationMessage: z.string().optional(),
});

export const formSchema = z.object({
  fontColor: z.string().optional(),
  textColor: z.string().optional(),
  questions: z.array(questionSchema),
});

export type QuestionInput = z.infer<typeof questionSchema>;
export type FormInput = z.infer<typeof formSchema>;
