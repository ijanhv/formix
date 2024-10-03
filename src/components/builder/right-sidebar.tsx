import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormInput, formSchema, QuestionInput } from "@/schema/zod";
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
  const currentQuestion = questions[currentSlideIndex];

  if (!currentQuestion) {
    return (
      <div className="w-72   border-l p-4">
        <p>No slide selected</p>
      </div>
    );
  }

  return (
    <div className="w-72 border-l p-4 hidden md:block">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Question Type */}
          <FormField
            control={form.control}
            name={`questions.${currentSlideIndex}.type`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Type</FormLabel>
                <Select
                  onValueChange={(value) => {
                    const newType = value as QuestionInput["type"];
                    field.onChange(newType);
                    if (newType === "select" || newType === "multiSelect") {
                      if (
                        !currentQuestion.options ||
                        currentQuestion.options.length === 0
                      ) {
                        form.setValue(
                          `questions.${currentSlideIndex}.options`,
                          ["Option 1"]
                        );
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
            name={`questions.${currentSlideIndex}.label`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Label</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter question label" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Question Description */}
          <FormField
            control={form.control}
            name={`questions.${currentSlideIndex}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter question description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`questions.${currentSlideIndex}.image`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageSelector
                    onClick={(value) => {
                      if (form.watch(`questions.${currentSlideIndex}.image`)) {
                        form.setValue(
                          `questions.${currentSlideIndex}.image`,
                          ""
                        );
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
            name={`questions.${currentSlideIndex}.required`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Required</FormLabel>
                  <FormDescription>Make this question required</FormDescription>
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
          {(currentQuestion.type === "select" ||
            currentQuestion.type === "multiSelect") && (
            <div className="space-y-2">
              <FormLabel>Options</FormLabel>
              {currentQuestion.options?.map((_, optionIndex) => (
                <FormField
                  key={optionIndex}
                  control={form.control}
                  name={`questions.${currentSlideIndex}.options.${optionIndex}`}
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
                    form.getValues(`questions.${currentSlideIndex}.options`) ||
                    [];
                  const newOptionIndex = currentOptions.length + 1;
                  form.setValue(`questions.${currentSlideIndex}.options`, [
                    ...currentOptions,
                    `Option ${newOptionIndex}`,
                  ]);
                }}
              >
                Add Option
              </Button>
            </div>
          )}

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
