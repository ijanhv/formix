import { QuestionInput } from "@/schema/zod";
export const generateFormJSX = (fields: QuestionInput[]) => {
  const imports = [
    'import { useForm } from "react-hook-form"',
    'import { zodResolver } from "@hookform/resolvers/zod"',
    'import { Button } from "@/components/ui/button"',
    'import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"',
    'import { Input } from "@/components/ui/input"',
    'import { Textarea } from "@/components/ui/textarea"',
    'import { Checkbox } from "@/components/ui/checkbox"',
    'import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"',
    'import { Slider } from "@/components/ui/slider"',
    'import CustomDateInput from "@/components/ui/CustomDateInput"', // Import custom date component
    'import CustomSelect from "@/components/ui/CustomSelect"', // Import custom select component
  ];

  const jsxLines = [
    "export default function GeneratedForm() {",
    "  const form = useForm<z.infer<typeof formSchema>>({",
    "    resolver: zodResolver(formSchema),",
    "    defaultValues: {},",
    "  })",
    "",
    "  function onSubmit(values: z.infer<typeof formSchema>) {",
    "    console.log(values)",
    "  }",
    "",
    "  return (",
    "    <Form {...form}>",
    '      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">',
  ];

  fields.forEach((field, index) => {
    const fieldName = `field${index + 1}`;
    jsxLines.push(`        <FormField`);
    jsxLines.push(`          control={form.control}`);
    jsxLines.push(`          name="${fieldName}"`);
    jsxLines.push(`          render={({ field }) => (`);
    jsxLines.push(`            <FormItem>`);

    jsxLines.push(`              <FormControl>`);

    switch (field.type) {
      case "longText":
        jsxLines.push(`                 <FloatingLabelInput
                                          placeholder="Type your answer here"
                                          label="Type your answer here"
                                          className="text-xl text-foreground/70"
          />`);
        break;

      case "shortText":
        jsxLines.push(`                 <FloatingLabelInput
            placeholder="Type your answer here"
            label="Type your answer here"
            className="text-xl text-foreground/70"
          />`);
        break;
      case "select":
        jsxLines.push(
          `                <CustomSelect options={${JSON.stringify(field.options)}} allowMultiple={false} fieldName="${fieldName}" form={form} />`
        );
        break;
      case "multiSelect":
        jsxLines.push(
          `                <CustomSelect options={${JSON.stringify(field.options)}} allowMultiple={true} fieldName="${fieldName}" form={form} showOthersOption={true} />`
        );
        break;
      case "date":
        jsxLines.push(`                <CustomDateInput form={form} />`);
        break;

      case "rating":
        jsxLines.push(`                <CustomDateInput form={form} />`);
        break;
      // Add other case types here as needed
      default:
        jsxLines.push(
          `                <Input {...field} type="${field.type}" />`
        );
    }

    jsxLines.push(`              </FormControl>`);

    jsxLines.push(`            </FormItem>`);
    jsxLines.push(`          )}`);
    jsxLines.push(`        />`);
  });

  jsxLines.push('        <Button type="submit">Submit</Button>');
  jsxLines.push("      </form>");
  jsxLines.push("    </Form>");
  jsxLines.push("  )");
  jsxLines.push("}");

  return [...imports, "", ...jsxLines].join("\n");
};

export const generateZodSchema = (fields: QuestionInput[]) => {
  const imports = ['import { z } from "zod"'];
  const schemaLines = ["const formSchema = z.object({"];

  fields?.forEach((field, index) => {
    let fieldSchema = `z.string()`;
    if (field.required) {
      fieldSchema += '.min(1, "This field is required")';
    } else {
      fieldSchema += ".optional()";
    }

    switch (field.type) {
      case "email":
        fieldSchema = `z.string().email("Invalid email address")${field.required ? "" : ".optional()"}`;
        break;

      case "number":
      // case "range":
      //   fieldSchema = `z.number()${field.required ? "" : ".optional()"}`;
      //   if (field.min !== undefined) fieldSchema += `.min(${field.min})`;
      //   if (field.max !== undefined) fieldSchema += `.max(${field.max})`;
      //   break;
      case "date":
        fieldSchema = `z.date()${field.required ? "" : ".optional()"}`;
        break;
      case "select":
      case "multiSelect":
        const options = field.options?.map((opt) => `"${opt}"`) || [];
        fieldSchema = `z.enum([${options.join(", ")}])${field.required ? "" : ".optional()"}`;
        break;
      case "rating":
        fieldSchema = `z.number().{field.required ? "" : ".optional()"}`;
        break;
      // case "checkbox":
      //   fieldSchema = `z.boolean()${field.required ? "" : ".optional()"}`;
      //   break;
      // case "file":
      //   fieldSchema = `z.instanceof(File)${field.required ? "" : ".optional()"}`;
      //   break;
    }

    schemaLines.push(`  field${index + 1}: ${fieldSchema},`);
  });

  schemaLines.push("})");
  return [...imports, "", ...schemaLines].join("\n");
};
