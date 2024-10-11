import React, { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check } from "lucide-react";
import { Icon } from "@iconify/react";

export function FormPictureChoice({
  form,
  fieldName,
  options,
  theme,
}: {
  form: any;
  fieldName: string;
  options: { value: string; label: string; imageUrl?: string }[];
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
          <div className="rounded-lg grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 items-start justify-start gap-3 w-full">
            {options.map((option, index) => {
              const isChecked = field.value?.includes(option.value);
              return (
                <div
                  key={option.value}
                  className={`flex relative items-center rounded-xl w-full justify-between p-2 border shadow-sm cursor-pointer transition-colors ${
                    twinklingIndex === index ? "animate-twinkle" : ""
                  } ${
                    isChecked
                      ? `${theme.checkboxChecked}`
                      : `${theme.checkboxUnchecked}`
                  }`}
                  onClick={() => {
                    handleClick(index);
                    const newValue = isChecked
                      ? field.value.filter(
                          (item: string) => item !== option.value
                        )
                      : [...(field.value || []), option.value];
                    field.onChange(newValue);
                  }}
                >
                  <FormLabel
                    className={`flex flex-col gap-2 w-full text-lg items-center justify-center cursor-pointer ${theme.textColor}`}
                  >
                    <Icon
                      icon={option.imageUrl as string}
                      className="w-10 h-10 md:w-28 md:h-28 mb-2"
                    />
                    <span className="flex items-center gap-3">
                      {option.label}{" "}
                      {isChecked && (
                        <div
                          className={`w-5 h-5  rounded-full flex items-center justify-center ${
                            isChecked ? theme.buttonColor : ""
                          }`}
                        >
                          <Check className={theme.buttonText} />
                        </div>
                      )}
                    </span>{" "}
                  </FormLabel>
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
