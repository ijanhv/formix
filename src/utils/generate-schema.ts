import { QuestionInput } from "@/schema/zod";

export const generateFormJSX = (fields: QuestionInput[]) => {
  const imports = [
    'import { useForm } from "react-hook-form"',
    'import { zodResolver } from "@hookform/resolvers/zod"',
    'import { Button } from "@/components/ui/button"',
    'import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"',
    'import { Input } from "@/components/ui/input"',
    'import { Textarea } from "@/components/ui/textarea"',
    'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"',
    'import { Checkbox } from "@/components/ui/checkbox"',
    'import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"',
    'import { Slider } from "@/components/ui/slider"',
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
    jsxLines.push(`              <FormLabel>${field.label}</FormLabel>`);
    jsxLines.push(`              <FormControl>`);

    switch (field.type) {
      case "longText":
        jsxLines.push(`                <Textarea {...field} />`);
        break;
      case "select":
        jsxLines.push(
          `                <Select onValueChange={field.onChange} defaultValue={field.value}>`
        );
        jsxLines.push(`                  <SelectTrigger>`);
        jsxLines.push(
          `                    <SelectValue placeholder="Select an option" />`
        );
        jsxLines.push(`                  </SelectTrigger>`);
        jsxLines.push(`                  <SelectContent>`);
        field.options?.forEach((option) => {
          jsxLines.push(
            `                    <SelectItem value="${option}">${option}</SelectItem>`
          );
        });
        jsxLines.push(`                  </SelectContent>`);
        jsxLines.push(`                </Select>`);
        break;
      case "multiSelect":
        // For multiSelect, you might want to use a custom component or library
        jsxLines.push(
          `                <Select onValueChange={field.onChange} defaultValue={field.value} multiple>`
        );
        jsxLines.push(
          `                  {/* Implement multi-select options */}`
        );
        jsxLines.push(`                </Select>`);
        break;
      // case 'checkbox':
      //   jsxLines.push(`                <Checkbox checked={field.value} onCheckedChange={field.onChange} />`)
      //   break
      // case 'radio':
      //   jsxLines.push(`                <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>`)
      //   field.options?.forEach((option) => {
      //     jsxLines.push(`                  <div className="flex items-center space-x-2">`)
      //     jsxLines.push(`                    <RadioGroupItem value="${option}" id="${fieldName}-${option}" />`)
      //     jsxLines.push(`                    <Label htmlFor="${fieldName}-${option}">${option}</Label>`)
      //     jsxLines.push(`                  </div>`)
      //   })
      //   jsxLines.push(`                </RadioGroup>`)
      //   break
      // case 'range':
      //   jsxLines.push(`                <Slider`)
      //   jsxLines.push(`                  min={${field.min || 0}}`)
      //   jsxLines.push(`                  max={${field.max || 100}}`)
      //   jsxLines.push(`                  step={${field.step || 1}}`)
      //   jsxLines.push(`                  defaultValue={[field.value]}`)
      //   jsxLines.push(`                  onValueChange={(value) => field.onChange(value[0])}`)
      //   jsxLines.push(`                />`)
      //   break
      // case 'file':
      //   jsxLines.push(`                <Input type="file" {...field} value={undefined} onChange={(e) => field.onChange(e.target.files?.[0])} />`)
      //   break
      case "date":
        jsxLines.push(`                <Input type="date" {...field} />`);
        break;
      default:
        jsxLines.push(
          `                <Input {...field} type="${field.type}" />`
        );
    }

    jsxLines.push(`              </FormControl>`);
    if (field.description) {
      jsxLines.push(
        `              <FormDescription>${field.description}</FormDescription>`
      );
    }
    jsxLines.push(`              <FormMessage />`);
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

  fields.forEach((field, index) => {
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
