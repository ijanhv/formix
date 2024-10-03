import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check } from "lucide-react";

const letters = ["A", "B", "C", "D"];

export function CustomCheckboxGroup({
  form,
  fieldName,
  options,
}: {
  form: any;
  fieldName: string;
  options: string[];
}) {
  const [twinklingIndex, setTwinklingIndex] = useState<number | null>(null); // Track which element is twinkling

  const handleClick = (index: number) => {
    setTwinklingIndex(index);
    setTimeout(() => setTwinklingIndex(null), 600); // Reset animation after 0.3s * 2 (for two iterations)
  };
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={() => (
        <FormItem className="space-y-3 max-w-3xl">
          <div className="rounded-lg flex items-start justify-start gap-3  w-full flex-col">
            {options.map((option, index) => (
              <FormField
                key={option}
                control={form.control}
                name={fieldName}
                render={({ field }) => {
                  const isChecked = field.value?.includes(option);
                  return (
                    <FormItem key={option} className="mb-3">
                      <FormControl className="">
                        <div
                          className={` flex items-center  ${twinklingIndex === index ? "animate-twinkle" : ""} rounded-xl w-full justify-between space-x-4 border  p-3 shadow-sm cursor-pointer transition-colors ${isChecked ? "border-primary" : ""}`}
                          onClick={() => {
                            handleClick(index);
                            const newValue = isChecked
                              ? field.value.filter(
                                  (value: string) => value !== option
                                )
                              : [...(field.value || []), option];
                            field.onChange(newValue);
                          }}
                        >
                          <div className="w-8 h-8 bg-background border rounded-full flex items-center justify-center  font-semibold">
                            {letters[index]}
                          </div>
                          <FormLabel className="flex-grow text-lg  cursor-pointer">
                            {option}
                          </FormLabel>
                          <div
                            className={`w-6  right-0 top-0 h-6 rounded-md   flex items-center justify-center ${isChecked ? " border-primary" : ""}`}
                          >
                            {isChecked && <Check />}
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
