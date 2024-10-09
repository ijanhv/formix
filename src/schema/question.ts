import { z } from "zod";

const BaseQuestionSchema = z.object({
  id: z.string().uuid(),
  type: z.enum([
    "short_text",
    "long_text",
    "multiple_choice",
    "dropdown",
    "date",
    "rating",
    "boolean",
    "email",
    "website",
    "file_upload",
    "number",
    "opinion_scale",
    "picture_choice",
  ]),
  title: z.string().min(1, "Question title is required"),
  description: z.string().optional(),
  order: z.coerce.number(),
  required: z.boolean().default(false),
  image: z.string().optional(),
  validationMessage: z.string().optional(),
});

// Specific Question Type Schemas
const ShortTextQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("short_text"),
  placeholder: z.string().optional(),
});

const LongTextQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("long_text"),
  placeholder: z.string().optional(),
});

const MultipleChoiceQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("multiple_choice"),
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  allowMultipleSelections: z.boolean().default(false),
});

const DropdownQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("dropdown"),
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});

const RatingQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("rating"),
  scale: z.coerce.number().min(1).max(10).default(5),
});

const PictureChoiceQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("picture_choice"),
  options: z.array(
    z.object({
      label: z.string(),
      imageUrl: z.string().url(),
      value: z
        .string()
        .transform((label) => label.toLowerCase().replace(/\s+/g, "_")), // Transform label to lowercase and replace spaces with underscores
    })
  ),
});

const DateQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("date"),
  format: z.enum(["MM/DD/YYYY", "YYYY-MM-DD"]),
});

const BooleanQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("boolean"),
  trueLabel: z.string().default("Yes"),
  falseLabel: z.string().default("No"),
});

const EmailQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("email"),
  placeholder: z.string().optional(),
});

const WebsiteQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("website"),
  placeholder: z.string().optional(),
});

const FileUploadQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("file_upload"),
  maxFileSize: z.number().optional(),
  allowedFileTypes: z.array(z.string()).optional(),
});

const NumberQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("number"),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
  placeholder: z.string().optional(),
});

const OpinionScaleQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("opinion_scale"),
  minValue: z.number(),
  maxValue: z.number(),
  leftLabel: z.string().optional(),
  rightLabel: z.string().optional(),
});

const QuestionSchema = z.discriminatedUnion("type", [
  ShortTextQuestionSchema,
  LongTextQuestionSchema,
  MultipleChoiceQuestionSchema,
  DropdownQuestionSchema,
  RatingQuestionSchema,
  PictureChoiceQuestionSchema,
  DateQuestionSchema,
  BooleanQuestionSchema,
  EmailQuestionSchema,
  WebsiteQuestionSchema,
  FileUploadQuestionSchema,
  NumberQuestionSchema,
  OpinionScaleQuestionSchema,
]);

export { QuestionSchema };
