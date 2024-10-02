import { QuestionInput } from "@/schema/zod";
import { z } from "zod";

export function generateZodSchema(questions: QuestionInput[]) {
  const schemaObject: Record<string, z.ZodTypeAny> = {};

  questions.forEach((question) => {
    let fieldSchema: z.ZodTypeAny;

    switch (question.type) {
      case "shortText":
        fieldSchema = z.string();
        break;
      case "number":
        fieldSchema = z.number();
        break;
      case "email":
        fieldSchema = z.string().email();
        break;
      case "select":
        fieldSchema = z.enum(question.options as [string, ...string[]]);
        break;
      case "multiSelect":
        fieldSchema = z.array(
          z.enum(question.options as [string, ...string[]])
        );
        break;
      default:
        fieldSchema = z.string();
    }

    if (!question.required) {
      fieldSchema = fieldSchema.optional();
    }

    schemaObject[question.id] = fieldSchema;
  });

  return z.object(schemaObject);
}
