import { z } from "zod";
import { QuestionInput } from "@/schema/zod"; // Import your existing QuestionInput type

export const generateZodSchema = (questions: QuestionInput[]) => {
  const schemaObject: Record<string, any> = {};

  questions.forEach((question, index) => {
    const fieldName = `form_element_${index}`;
    let fieldSchema;

    switch (question.type) {
      case "shortText":
      case "longText":
        fieldSchema = z.string();
        if (question.required) {
          fieldSchema = fieldSchema.min(1, {
            message: question.validationMessage || `This field is required`,
          });
        }
        break;

      case "number":
        fieldSchema = z.coerce.number(); // Use z.coerce.number() to handle numeric input as a number
        if (question.required) {
          fieldSchema = fieldSchema.min(1, {
            message: question.validationMessage || `This field is required`,
          });
        }
        break;

      case "email":
        fieldSchema = z.string().email({
          message: question.validationMessage || "Invalid email address",
        });
        if (question.required) {
          fieldSchema = fieldSchema.min(1, {
            message: `This field is required`,
          });
        }
        break;

      case "date":
        fieldSchema = z.date();
        if (question.required) {
          fieldSchema = fieldSchema.refine((date) => !isNaN(date.getTime()), {
            message: question.validationMessage || `This field is required`,
          });
        }
        break;

      case "select":
        // if (question.required && question.options) {
        //   fieldSchema = z
        //     .enum(question.options as [string, ...string[]])
        //     .refine((value) => value !== "", {
        //       message:
        //         question.validationMessage || `${question.label} is required`,
        //     });
        // } else {
        //   fieldSchema = z
        //     .enum(question.options as [string, ...string[]])
        //     .optional();
        // }
        // break;
        if (question.required && question.options) {
          fieldSchema = z
            .array(z.enum(question.options as [string, ...string[]]))
            .min(1, {
              message: question.validationMessage || `This field is required`,
            });
        } else {
          fieldSchema = z
            .array(z.enum(question.options as [string, ...string[]]))
            .optional();
        }

      case "multiSelect":
        if (question.required && question.options) {
          fieldSchema = z
            .array(z.enum(question.options as [string, ...string[]]))
            .min(1, {
              message: question.validationMessage || `This field is required`,
            });
        } else {
          fieldSchema = z
            .array(z.enum(question.options as [string, ...string[]]))
            .optional();
        }
        break;

      case "rating":
        fieldSchema = z.coerce.number().min(1).max(5);
        if (question.required) {
          fieldSchema = fieldSchema.min(1, {
            message: question.validationMessage || `This field is required`,
          });
        }
        break;

      default:
        fieldSchema = z.string();
        if (question.required) {
          fieldSchema = fieldSchema.min(1, {
            message: question.validationMessage || `This field is required`,
          });
        }
        break;
    }

    schemaObject[fieldName] = fieldSchema;
  });

  return z.object(schemaObject);
};

// Convert Zod schema to a string format for debugging or other uses
export const zodSchemaToString = (schema: z.ZodTypeAny): string => {
  if (schema instanceof z.ZodBoolean) {
    return "z.boolean()";
  } else if (schema instanceof z.ZodNumber) {
    // @ts-ignore
    return schema.isCoerce ? "z.coerce.number()" : "z.number()";
  } else if (schema instanceof z.ZodString) {
    return "z.string()";
  } else if (schema instanceof z.ZodDate) {
    return "z.date()";
  } else if (schema instanceof z.ZodEnum) {
    const options = schema._def.values.map((val: any) => `"${val}"`).join(", ");
    return `z.enum([${options}])`;
  } else if (schema instanceof z.ZodArray) {
    const itemType = zodSchemaToString(schema._def.type);
    return `z.array(${itemType})`;
  } else if (schema instanceof z.ZodOptional) {
    const innerSchema = zodSchemaToString(schema.unwrap());
    return `${innerSchema}.optional()`;
  } else if (schema instanceof z.ZodNullable) {
    const innerSchema = zodSchemaToString(schema.unwrap());
    return `${innerSchema}.nullable()`;
  } else if (schema instanceof z.ZodEffects) {
    const baseSchema = zodSchemaToString(schema._def.schema);
    return `${baseSchema}`;
  } else if (schema instanceof z.ZodDefault) {
    const innerSchema = zodSchemaToString(schema._def.innerType);
    return `${innerSchema}.default(${schema._def.defaultValue()})`;
  }
  return "z.unknown()"; // fallback for unhandled cases
};

// Generate a schema string representation
export const getZodSchemaString = (questions: QuestionInput[]) => {
  const schemaObject = generateZodSchema(questions);
  const schemaEntries = Object.entries(schemaObject.shape)
    .map(([key, value]) => {
      return `  ${key}: ${zodSchemaToString(value)}`;
    })
    .join(",\n");

  return `const formSchema = z.object({\n${schemaEntries}\n});`;
};

// Example usage:
// const questions: QuestionInput[] = [
//   { id: "1", type: "shortText", label: "Name", required: true },
//   { id: "2", type: "email", label: "Email", required: true },
//   { id: "3", type: "number", label: "Age", required: false },
// ];

// const schema = generateZodSchemaForQuestions(questions);
