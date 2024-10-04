import React, { useState } from "react";
import {
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
  theme,
}: {
  form: any;
  fieldName: string;
  options: string[];
  theme: Theme;
}) {
  const [twinklingIndex, setTwinklingIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setTwinklingIndex(index);
    setTimeout(() => setTwinklingIndex(null), 600);
  };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="space-y-3 max-w-3xl">
          <div className="rounded-lg grid grid-cols-1 sm:grid-cols-2 items-start justify-start gap-3 w-full">
            {options.map((option, index) => {
              const isChecked = field.value?.includes(option);

              return (
                <div
                  key={option}
                  className={`flex items-center rounded-xl w-full justify-between p-2 border shadow-sm cursor-pointer transition-colors ${
                    twinklingIndex === index ? "animate-twinkle" : ""
                  } ${
                    isChecked
                      ? `${theme.checkboxChecked}`
                      : `${theme.checkboxUnchecked}`
                  }`}
                  onClick={() => {
                    handleClick(index);
                    const newValue = isChecked
                      ? field.value.filter((value: string) => value !== option)
                      : [...(field.value || []), option];
                    field.onChange(newValue);
                  }}
                >
                  <div
                    className={`${theme.borderColor} w-8 h-8 mr-4 border rounded-full flex items-center justify-center font-semibold `}
                  >
                    {letters[index]}
                  </div>
                  <FormLabel
                    className={`flex-grow text-lg cursor-pointer ${theme.textColor}`}
                  >
                    {option}
                  </FormLabel>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center ${
                      isChecked ? theme.buttonColor : ""
                    }`}
                  >
                    {isChecked && <Check className={theme.buttonText} />}
                  </div>
                </div>
              );
            })}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
