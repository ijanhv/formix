import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormInput, formSchema, QuestionInput } from "@/schema/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import ImageSelector from "./image-selector";
import ThemeSelector from "./theme-selector";

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

const fonts = [
  { id: "font-jost", name: "Jost" },
  { id: "font-quick", name: "Quick" },
  { id: "font-serifDisplay", name: "DM Serif Display" },
  { id: "font-poppins", name: "Poppins" },
];

interface RightSidebarProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (data: FormInput) => void;
  currentSlideIndex: number;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  form,
  onSubmit,
  currentSlideIndex,
}) => {
  const questions = form.watch("questions");

  if (questions.length === 0) {
    return (
      <div className="border-l p-4">
        <p>No slides available</p>
      </div>
    );
  }

  return (
    <div className="h-full hidden md:block bg-foreground/5">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-4 border-l bg-background h-full overflow-y-auto scrollbar scrollbar-w-0"
      >
        <div className="space-y-4">
          <Tabs defaultValue="content" className="">
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="content">
                Content
              </TabsTrigger>
              <TabsTrigger className="w-full" value="theme">
                Theme
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="flex flex-col gap-4 w-full">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  style={{
                    display: index === currentSlideIndex ? "block" : "none",
                  }}
                >
                  {/* Question Type */}
                  <FormField
                    control={form.control}
                    name={`questions.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Question Type</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const newType = value as QuestionInput["type"];
                            field.onChange(newType);
                            if (
                              newType === "select" ||
                              newType === "multiSelect"
                            ) {
                              if (
                                !question.options ||
                                question.options.length === 0
                              ) {
                                form.setValue(`questions.${index}.options`, [
                                  "Option 1",
                                ]);
                              }
                            }
                          }}
                          value={field.value}
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

                  {/* Question Label */}
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

                  {/* Question Description */}
                  <FormField
                    control={form.control}
                    name={`questions.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question Description</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter question description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image Selector */}
                  <FormField
                    control={form.control}
                    name={`questions.${index}.image`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Choose an Image</FormLabel>
                        <FormControl>
                          <ImageSelector
                            onClick={(value) => {
                              if (form.watch(`questions.${index}.image`)) {
                                form.setValue(`questions.${index}.image`, "");
                              } else {
                                form.setValue(field.name, value, {
                                  shouldDirty: true,
                                  shouldTouch: true,
                                  shouldValidate: true,
                                });
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Required Switch */}
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

                  {/* Options for select/multiSelect */}
                  {(question.type === "select" ||
                    question.type === "multiSelect") && (
                    <div className="space-y-2">
                      <FormLabel>Options</FormLabel>
                      {question.options?.map((_, optionIndex) => (
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
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    field.onChange(
                                      value || `Option ${optionIndex + 1}`
                                    );
                                  }}
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
                            form.getValues(`questions.${index}.options`) || [];
                          const newOptionIndex = currentOptions.length + 1;
                          form.setValue(`questions.${index}.options`, [
                            ...currentOptions,
                            `Option ${newOptionIndex}`,
                          ]);
                        }}
                      >
                        Add Option
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>
            <TabsContent value="theme" className="flex flex-col gap-4 w-full">
              <FormField
                control={form.control}
                name={`fontFamily`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Font Family</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select font family" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fonts.map((font) => (
                          <SelectItem key={font.id} value={font.id}>
                            {font.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`theme`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose a Theme</FormLabel>
                    <FormControl>
                      <ThemeSelector form={form} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>

          {/* Remove Slide Button */}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="mt-4"
            onClick={() => {
              const newQuestions = form
                .getValues("questions")
                .filter((_, index) => index !== currentSlideIndex);
              form.setValue("questions", newQuestions);
              // Optionally, you might want to update the currentSlideIndex in the parent component
            }}
          >
            Remove Question
          </Button>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default RightSidebar;
