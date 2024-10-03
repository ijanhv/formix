import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface CustomRatingProps {
  form: any;
  fieldName: string;
}

export function CustomRating({ form, fieldName }: CustomRatingProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="space-y-3 max-w-3xl">
          <div className="rounded-lg">
            <FormControl>
              <div className="flex items-center justify-between gap-4 mb-2">
                {[...Array(11)].map((_, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant={field.value === index ? "default" : "outline"}
                    className={`h-14 text-2xl w-14 border hover:bg-foreground/20 p-0 ${
                      field.value === index
                        ? "bg-foreground/20 text-foreground border-primary"
                        : "bg-foreground/10"
                    }`}
                    onClick={() => field.onChange(index)}
                  >
                    {index}
                  </Button>
                ))}
              </div>
            </FormControl>
            {/* <div className="flex items-center  justify-between  gap-3 text-sm text-gray-600 mt-2">
              <span>Once per year or less</span>
              <span>Every few months</span>
              <span>AT LEAST once a month</span>
            </div> */}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
