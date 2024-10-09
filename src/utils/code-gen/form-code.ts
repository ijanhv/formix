import { FormType, QuestionType } from "@/schema/zod";
import { getZodSchemaString } from "./zod-schema";

export const generateFormCode = (formFields: FormType) => {
  const importSet = new Set([
    '"use client"',
    'import { useState } from "react"',
    'import { toast } from "sonner"',
    'import { useForm } from "react-hook-form"',
    'import { zodResolver } from "@hookform/resolvers/zod"',
    'import * as z from "zod"',
    'import { cn } from "@/lib/utils"',
    'import { Button } from "@/components/ui/button"',
    'import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"',
  ]);

  const schema = getZodSchemaString(formFields.screens as QuestionType[]);

  formFields.screens.forEach((field) => {
    switch (field.type) {
      case "short_text":
      case "email":
      case "number":
        importSet.add('import { Input } from "@/components/ui/input"');
        break;
      case "long_text":
        importSet.add('import { Textarea } from "@/components/ui/textarea"');
        break;
      case "date":
        importSet.add('import { Calendar } from "@/components/ui/calendar"');
        importSet.add(
          'import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"'
        );
        importSet.add('import { CalendarIcon } from "lucide-react"');
        importSet.add('import { format } from "date-fns"');
        break;
      case "dropdown":
        importSet.add(
          'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"'
        );
        break;
      case "multiple_choice":
        importSet.add('import { Checkbox } from "@/components/ui/checkbox"');
        break;
      case "rating":
        importSet.add(
          'import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"'
        );
        break;
    }
  });

  const imports = Array.from(importSet).join("\n");

  const component = `
  export default function MyForm() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    })
  
    function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        console.log(values);
        toast.success(
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(values, null, 2)}</code>
          </pre>
        );
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
          ${formFields.screens
            .map((field) => {
              switch (field.type) {
                case "short_text":
                case "email":
                case "number":
                  return `
          <FormField
            control={form.control}
            name="${field.id}"
            render={({ field }) => (
              <FormItem>
                <FormLabel>${field}</FormLabel>
                <FormControl>
                  <Input {...field} type="${field.type === "email" ? "email" : field.type === "number" ? "number" : "text"}" />
                </FormControl>
                ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ""}
                <FormMessage />
              </FormItem>
            )}
          />`;
                case "long_text":
                  return `
          <FormField
            control={form.control}
            name="${field.id}"
            render={({ field }) => (
              <FormItem>
                <FormLabel>${field}</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ""}
                <FormMessage />
              </FormItem>
            )}
          />`;
                case "date":
                  return `
          <FormField
            control={form.control}
            name="${field.id || field}"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>${field}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ""}
                <FormMessage />
              </FormItem>
            )}
          />`;
                case "multiple_choice":
                  return `
          <FormField
            control={form.control}
            name="${field.id}"
            render={({ field }) => (
              <FormItem>
                <FormLabel>${field}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    ${field.options?.map((option: any) => `<SelectItem value="${option}">${option}</SelectItem>`).join("\n                  ")}
                  </SelectContent>
                </Select>
                ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ""}
                <FormMessage />
              </FormItem>
            )}
          />`;
                case "dropdown":
                  return `
          <FormField
            control={form.control}
            name="${field.id}"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">${field}</FormLabel>
                  ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ""}
                </div>
                {${JSON.stringify(field.options)}.map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="${field.id}"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), item])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />`;
                case "rating":
                  return `
          <FormField
            control={form.control}
            name="${field.id}"
            render={({ field }) => (
              <FormItem>
                <FormLabel>${field}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1"
                  >
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <FormItem key={rating}>
                        <FormLabel className="flex h-8 w-8 items-center justify-center rounded-full border border-primary text-xs">
                          {rating}
                        </FormLabel>
                        <FormControl>
                          <RadioGroupItem value={rating.toString()} className="sr-only" />
                        </FormControl>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                ${field.description ? `<FormDescription>${field.description}</FormDescription>` : ""}
                <FormMessage />
              </FormItem>
            )}
          />`;
                default:
                  return "";
              }
            })
            .join("\n        ")}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  }
    `;

  return imports + "\n\n" + schema + "\n" + component;
};
