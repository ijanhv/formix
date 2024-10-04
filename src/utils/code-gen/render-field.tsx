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
    case "longText":
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
                    className={`${theme.textColor} peer py-5 border-none border-b-2 text-xl  placeholder:text-foreground/35  focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none`}
                    placeholder="Type your answer here"
                    value={formField.value || ""}
                  />
                  <hr className={`border ${theme.borderColor}`} />
                  <p className="g-blue-300 italic text-sm mt-4">
                    Shift ⇧ + Enter ↵ to make a line break
                  </p>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    // case "longText":
    //   return (
    //     <FormField
    //       control={form.control}
    //       name={fieldName}
    //       render={({ field: formField }) => (
    //         <FormItem>
    //           <FormControl>
    //             <Textarea
    //               {...formField}
    //               placeholder={field.description}
    //               required={field.required}
    //               value={formField.value || ""}
    //             />
    //           </FormControl>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //   );

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
        // <FormField
        //   control={form.control}
        //   name={fieldName}
        //   render={() => (
        //     <FormItem>
        //       {field.options?.map((option) => (
        //         <FormField
        //           key={option}
        //           control={form.control}
        //           name={fieldName}
        //           render={({ field: formField }) => {
        //             return (
        //               <FormItem
        //                 key={option}
        //                 className="flex flex-row items-start space-x-3 space-y-0"
        //               >
        //                 <FormControl>
        //                   <Checkbox
        //                     checked={formField.value?.includes(option)}
        //                     onCheckedChange={(checked) => {
        //                       return checked
        //                         ? formField.onChange([
        //                             ...(formField.value || []),
        //                             option,
        //                           ])
        //                         : formField.onChange(
        //                             formField.value?.filter(
        //                               (value: string) => value !== option
        //                             )
        //                           );
        //                     }}
        //                   />
        //                 </FormControl>
        //                 <FormLabel className="font-normal">{option}</FormLabel>
        //               </FormItem>
        //             );
        //           }}
        //         />
        //       ))}
        //       <FormMessage />
        //     </FormItem>
        //   )}
        // />

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
      return (
        // <FormField
        //   control={form.control}
        //   name={fieldName}
        //   render={({ field: formField }) => (
        //     <FormItem>
        //       <FormControl>
        //         <RadioGroup
        //           onValueChange={formField.onChange}
        //           value={formField.value || ""}
        //           className="flex space-x-1"
        //         >
        //           {[1, 2, 3, 4, 5].map((rating) => (
        //             <FormItem key={rating}>
        //               <FormLabel className="flex h-8 w-8 items-center justify-center rounded-full border border-primary text-xs">
        //                 {rating}
        //               </FormLabel>
        //               <FormControl>
        //                 <RadioGroupItem
        //                   value={rating.toString()}
        //                   className="sr-only"
        //                 />
        //               </FormControl>
        //             </FormItem>
        //           ))}
        //         </RadioGroup>
        //       </FormControl>
        //       <FormMessage />
        //     </FormItem>
        //   )}
        // />

        <StarRating form={form} fieldName={fieldName} theme={theme} />
      );

    default:
      return null;
  }
};
