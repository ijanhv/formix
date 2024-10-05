"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { QuestionInput } from "@/schema/zod";
import { CustomCheckboxGroup } from "@/components/builder/custom-checkbox";
import { StarRating } from "@/components/builder/star-rating";
import { Textarea } from "@/components/ui/textarea";

export const renderFormField = (
  field: QuestionInput,
  form: any,
  index: number,
  theme: Theme
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks, no-unused-vars
  const [date, setDate] = useState<Date | undefined>(undefined);
  const fieldName = `form_element_${index}`;

  switch (field.type) {
    case "shortText":
    case "email":
    case "number":
      return (
        <FormField
          control={form.control}
          name={fieldName}
          render={({ field: formField }) => (
            <FormItem>
              <FormControl>
                <>
                  <Input
                    {...formField}
                    type={
                      field.type === "email"
                        ? "email"
                        : field.type === "number"
                          ? "number"
                          : "text"
                    }
                    className={`${theme.textColor}  ${theme.placeholderColor}  peer py-5 border-none border-b-2 text-xl md:text-2xl  focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none`}
                    placeholder="Type your answer here"
                    value={formField.value || ""}
                  />
                  <hr className={`border ${theme.borderColor}`} />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "longText":
      return (
        <FormField
          control={form.control}
          name={fieldName}
          render={({ field: formField }) => (
            <FormItem>
              <FormControl>
                <>
                  <Textarea
                    rows={1}
                    {...formField}
                    className={`${theme.textColor}  ${theme.placeholderColor}  peer py-5 border-none border-b-2 text-xl  font-light  focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none`}
                    placeholder="Type your answer here"
                    value={formField.value || ""}
                  />
                  <hr className={`border ${theme.borderColor}`} />
                  <p className=" italic text-sm mt-3">
                    Shift ⇧ + Enter ↵ to make a line break
                  </p>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "date":
      return (
        <FormField
          control={form.control}
          name={fieldName}
          render={({ field: formField }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !formField.value && "text-muted-foreground"
                      )}
                    >
                      {formField.value ? (
                        format(new Date(formField.value), "PPP")
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
                    selected={
                      formField.value ? new Date(formField.value) : undefined
                    }
                    onSelect={(newDate) => {
                      formField.onChange(newDate?.toISOString());
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "select":
      return (
        <CustomCheckboxGroup
          form={form}
          fieldName={fieldName}
          theme={theme}
          options={field.options || []}
        />
      );

    case "multiSelect":
      return (
        <CustomCheckboxGroup
          form={form}
          fieldName={fieldName}
          options={field.options || []}
          theme={theme}
        />
      );

    case "rating":
      return <StarRating form={form} fieldName={fieldName} theme={theme} />;

    default:
      return null;
  }
};
