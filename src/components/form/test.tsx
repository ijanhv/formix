"use client";
const questionTypes = [
  "shortText",
  "longText",
  "number",
  "email",
  "date",
  "select",
  "multiSelect",
  "rating",
] as const;
import React, { useState } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormInput, formSchema, QuestionInput } from "@/schema/zod";

export default function TypeformBuilder() {
  const [preview, setPreview] = useState<QuestionInput[]>([]);

  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questions: [{ id: "1", type: "shortText", label: "", required: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = (data: FormInput) => {
    setPreview(data.questions);

    // const formSchema = generateZodSchema(data.questions);
  };

  // Generate a schema for user responses to this form

  return (
    <FormProvider {...form}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Typeform Builder</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  // onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {fields.map((field, index) => (
                    <div className="p-3" key={field.id}>
                      <div className="pt-6">
                        <FormField
                          control={form.control}
                          name={`questions.${index}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Question Type</FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  const newType =
                                    value as QuestionInput["type"];
                                  field.onChange(newType);
                                  if (
                                    newType === "select" ||
                                    newType === "multiSelect"
                                  ) {
                                    form.setValue(
                                      `questions.${index}.options`,
                                      [""]
                                    );
                                  } else {
                                    form.setValue(
                                      `questions.${index}.options`,
                                      undefined
                                    );
                                  }
                                }}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select question type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {questionTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`questions.${index}.label`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Question Label</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter question label"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`questions.${index}.required`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>Required</FormLabel>
                                <FormDescription>
                                  Make this question required
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        {(form.watch(`questions.${index}.type`) === "select" ||
                          form.watch(`questions.${index}.type`) ===
                            "multiSelect") && (
                          <div className="space-y-2">
                            <FormLabel>Options</FormLabel>
                            {form
                              .watch(`questions.${index}.options`)
                              ?.map((_, optionIndex) => (
                                <FormField
                                  key={optionIndex}
                                  control={form.control}
                                  name={`questions.${index}.options.${optionIndex}`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          placeholder={`Option ${optionIndex + 1}`}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => {
                                const currentOptions =
                                  form.getValues(
                                    `questions.${index}.options`
                                  ) || [];
                                form.setValue(`questions.${index}.options`, [
                                  ...currentOptions,
                                  "",
                                ]);
                              }}
                            >
                              Add Option
                            </Button>
                          </div>
                        )}
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="mt-4"
                          onClick={() => remove(index)}
                        >
                          Remove Question
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      append({
                        id: String(fields.length + 1),
                        type: "shortText",
                        label: "",
                        required: false,
                      })
                    }
                  >
                    Add Question
                  </Button>
                  <Button type="submit">Generate Form</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Form Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {preview.map((question) => (
                  <div key={question.id} className="space-y-2">
                    <FormLabel>
                      {question.label}
                      {question.required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </FormLabel>
                    {question.type === "shortText" && <Input />}
                    {question.type === "longText" && <Textarea />}
                    {question.type === "number" && <Input type="number" />}
                    {question.type === "email" && <Input type="email" />}
                    {question.type === "date" && <Input type="date" />}
                    {(question.type === "select" ||
                      question.type === "multiSelect") && (
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {question.options?.map((option, index) => (
                            <SelectItem key={index} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {question.type === "rating" && (
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <Button key={value} variant="outline" size="sm">
                            {value}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FormProvider>
  );
}
