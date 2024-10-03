"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { QuestionInput } from "@/schema/zod";

export const renderFormField = (
  field: QuestionInput,
  form: any,
  index: number
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
                    className="peer py-5 border-none border-b-2 text-xl text-foreground/70 border-b-gray-700 placeholder:text-foreground/35 focus-visible:border-b-gray-700 focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none"
                    placeholder="Type your answer here"
                    value={formField.value || ""}
                  />
                  <hr className="border-black/20" />
                  <p className="text-blue-800 italic text-sm mt-4">
                    Shift ⇧ + Enter ↵ to make a line break
                  </p>
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
                <Textarea
                  {...formField}
                  placeholder={field.description}
                  required={field.required}
                  value={formField.value || ""}
                />
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
        <FormField
          control={form.control}
          name={fieldName}
          render={({ field: formField }) => (
            <FormItem>
              <Select
                onValueChange={formField.onChange}
                value={formField.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "multiSelect":
      return (
        <FormField
          control={form.control}
          name={fieldName}
          render={() => (
            <FormItem>
              {field.options?.map((option) => (
                <FormField
                  key={option}
                  control={form.control}
                  name={fieldName}
                  render={({ field: formField }) => {
                    return (
                      <FormItem
                        key={option}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={formField.value?.includes(option)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? formField.onChange([
                                    ...(formField.value || []),
                                    option,
                                  ])
                                : formField.onChange(
                                    formField.value?.filter(
                                      (value: string) => value !== option
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{option}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "rating":
      return (
        <FormField
          control={form.control}
          name={fieldName}
          render={({ field: formField }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={formField.onChange}
                  value={formField.value || ""}
                  className="flex space-x-1"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <FormItem key={rating}>
                      <FormLabel className="flex h-8 w-8 items-center justify-center rounded-full border border-primary text-xs">
                        {rating}
                      </FormLabel>
                      <FormControl>
                        <RadioGroupItem
                          value={rating.toString()}
                          className="sr-only"
                        />
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    default:
      return null;
  }
};
