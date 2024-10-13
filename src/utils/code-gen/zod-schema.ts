import { QuestionType } from "@/schema/zod";
import { z } from "zod";

export function generateSteps(screens: QuestionType[]) {
  return screens
    .filter(
      // @ts-ignore
      (screen) => screen.type !== "welcomeScreen" && screen.type !== "endScreen"
    )
    .map((_, index) => ({ fields: [`form_element_${index}`] }));
}
export const generateZodSchema = (questions: QuestionType[]) => {
  const schemaObject: Record<string, any> = {};

  questions.forEach((question, index) => {
    const fieldName = `form_element_${index}`;
    let fieldSchema;

    switch (question.type) {
      case "short_text":
      case "long_text":
        fieldSchema = z.string();
        if (question.required) {
          fieldSchema = fieldSchema.trim().min(1, {
            message: question.validationMessage || `This field is required`,
          });
        } else {
          fieldSchema = fieldSchema.optional();
        }
        break;

      case "dropdown":
        if (question.options && question.options.length > 0) {
          const optionValues = question.options.map((opt) => opt.label);
          fieldSchema = z.enum([optionValues[0], ...optionValues.slice(1)] as [
            string,
            ...string[],
          ]);
        } else {
          fieldSchema = z.string();
        }
        if (!question.required) {
          fieldSchema = fieldSchema.optional();
        }
        break;

      case "website":
        fieldSchema = z.string().url().trim();
        if (question.required) {
          fieldSchema = fieldSchema
            .url()
            .trim()
            .min(1, {
              message: question.validationMessage || `This field is required`,
            });
        } else {
          fieldSchema = fieldSchema.optional();
        }
        break;

      case "number":
        fieldSchema = z.coerce.number();
        if (question.required) {
          fieldSchema = fieldSchema.min(1, {
            message: question.validationMessage || `This field is required`,
          });
        } else {
          fieldSchema = fieldSchema.optional();
        }
        break;

      case "opinion_scale":
        fieldSchema = z.coerce.number();
        if (question.required) {
          fieldSchema = fieldSchema.min(1, {
            message: question.validationMessage || `This field is required`,
          });
        } else {
          fieldSchema = fieldSchema.optional();
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
        } else {
          fieldSchema = fieldSchema.optional();
        }
        break;

      case "date":
        fieldSchema = z.date();
        if (question.required) {
          fieldSchema = fieldSchema.refine((date) => !isNaN(date.getTime()), {
            message: question.validationMessage || `This field is required`,
          });
        } else {
          fieldSchema = fieldSchema.optional();
        }
        break;
      case "multiple_choice":
      case "picture_choice":
        if (question.options) {
          const optionValues = question.options.map((opt) => opt.value);
          if (optionValues.length > 0) {
            const enumSchema = z.enum([
              optionValues[0],
              ...optionValues.slice(1),
            ] as [string, ...string[]]);
            const arraySchema = z.array(enumSchema);

            if (question.required) {
              fieldSchema = arraySchema.min(1, {
                message: question.validationMessage || `This field is required`,
              });
            } else {
              fieldSchema = arraySchema.optional();
            }
          } else {
            fieldSchema = z.array(z.string()).optional();
          }
        } else {
          fieldSchema = z.array(z.string()).optional();
        }
        break;
      case "rating":
        fieldSchema = z.coerce.number().min(1).max(5);
        if (question.required) {
          fieldSchema = fieldSchema.min(1, {
            message: question.validationMessage || `This field is required`,
          });
        } else {
          fieldSchema = fieldSchema.optional();
        }
        break;

      default:
        fieldSchema = z.string();
        if (question.required) {
          fieldSchema = fieldSchema.min(1, {
            message: question.validationMessage || `This field is required`,
          });
        } else {
          fieldSchema = fieldSchema.optional();
        }
        break;
    }

    schemaObject[fieldName] = fieldSchema;
  });

  return z.object(schemaObject);
};

// Convert Zod schema to a string format for debugging or other uses
export const zodSchemaToString = (schema: z.ZodTypeAny): string => {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const shapeEntries = Object.entries(shape)
      .map(
        ([key, value]) =>
          `  ${key}: ${zodSchemaToString(value as z.ZodTypeAny)}`
      )
      .join(",\n");
    return `z.object({\n${shapeEntries}\n})`;
  } else if (schema instanceof z.ZodBoolean) {
    return "z.boolean()";
  } else if (schema instanceof z.ZodNumber) {
    // @ts-ignore
    return schema.isCoerce ? "z.coerce.number()" : "z.number()";
  } else if (schema instanceof z.ZodString) {
    let result = "z.string()";
    if (schema._def.checks) {
      schema._def.checks.forEach((check: any) => {
        if (check.kind === "email") result += ".email()";
        if (check.kind === "url") result += ".url()";
      });
    }
    return result;
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
  return "z.unknown()";
};

// Generate a schema string representation
export const getZodSchemaString = (questions: QuestionType[]) => {
  const schemaObject = generateZodSchema(questions);
  const schemaEntries = Object.entries(schemaObject.shape)
    .map(([key, value]) => {
      return `  ${key}: ${zodSchemaToString(value)}`;
    })
    .join(",\n");

  return `const formSchema = z.object({\n${schemaEntries}\n});`;
};
