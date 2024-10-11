import React, { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check } from "lucide-react";

export function BooleanComponent({
  form,
  fieldName,
  theme,
}: {
  form: any;
  fieldName: string;
  theme: Theme;
}) {
  const [twinklingIndex, setTwinklingIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setTwinklingIndex(index);
    setTimeout(() => setTwinklingIndex(null), 600);
  };

  // Define Yes/No options
  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const letters = ["Y", "N"]; // Letters corresponding to Yes and No

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="space-y-3 max-w-3xl">
          <div className="rounded-lg grid grid-cols-1 sm:grid-cols-2 items-start justify-start gap-3 w-full">
            {options.map((option, index) => {
              const isChecked = field.value === option.value;
              return (
                <div
                  key={option.value}
                  className={`flex items-center rounded-xl w-full justify-between p-2 border shadow-sm cursor-pointer transition-colors ${
                    twinklingIndex === index ? "animate-twinkle" : ""
                  } ${
                    isChecked
                      ? `${theme.checkboxChecked}`
                      : `${theme.checkboxUnchecked}`
                  }`}
                  onClick={() => {
                    handleClick(index);
                    field.onChange(option.value);
                  }}
                >
                  <div
                    className={` ${
                      isChecked
                        ? `${theme.checkboxChecked}`
                        : `${theme.checkboxUnchecked}`
                    } w-8 h-8 mr-4 border rounded-full flex items-center justify-center font-semibold `}
                  >
                    {letters[index]}
                  </div>
                  <FormLabel
                    className={`flex-grow text-lg cursor-pointer ${theme.textColor}`}
                  >
                    <span>{option.label}</span>{" "}
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
