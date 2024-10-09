import { z } from "zod";
import { QuestionSchema } from "./question";

export const welcomeScreenSchema = z.object({
  id: z.string(),
  type: z.literal("welcomeScreen"),
  title: z.string().min(1, "Welcome screen title is required"),
  description: z.string().optional(),
  buttonText: z.string().default("Start"),
});

const endScreenSchema = z.object({
  id: z.string(), // Add id property
  type: z.literal("endScreen"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

// export const thankYouScreenSchema = z.object({
//   id: z.string(),
//   type: z.literal("thankYouScreen"),
//   title: z.string().min(1, "Thank you screen title is required"),
//   description: z.string().optional(),
//   buttonText: z.string().optional(),
//   backgroundImage: z.string().optional(),
// });

export const createFormSchema = z.object({
  name: z.string(),
  logo: z.string().optional(),
});

export const formSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string().optional(),
  theme: z.string().optional(),
  published: z.boolean().default(false),
  fontFamily: z.string().optional(),
  screens: z.array(
    z.union([welcomeScreenSchema, QuestionSchema, endScreenSchema])
  ),
});

// Infer types
export type CreateFormType = z.infer<typeof createFormSchema>;
export type WelcomeScreenType = z.infer<typeof welcomeScreenSchema>;
export type QuestionType = z.infer<typeof QuestionSchema>;
export type EndScreenType = z.infer<typeof endScreenSchema>;
export type FormType = z.infer<typeof formSchema>;
