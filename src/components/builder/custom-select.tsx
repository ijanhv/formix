import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Option {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface SelectionProps {
  options: Option[];
  allowMultiple: boolean;
  fieldName: string;
  form: UseFormReturn<any>;
  showOthersOption?: boolean;
}

const CustomSelect: React.FC<SelectionProps> = ({
  options,
  allowMultiple,
  fieldName,
  form,
  showOthersOption = false,
}) => {
  const [showOthers, setShowOthers] = useState(false);

  const handleSelectionChange = (optionId: string) => {
    const currentValue = form.getValues(fieldName);
    let newValue;

    if (allowMultiple) {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      newValue = currentArray.includes(optionId)
        ? currentArray.filter((id) => id !== optionId)
        : [...currentArray, optionId];
    } else {
      newValue = currentValue === optionId ? "" : optionId;
    }

    form.setValue(fieldName, newValue, { shouldValidate: true });
  };

  const isOptionSelected = (optionId: string) => {
    const fieldValue = form.getValues(fieldName);
    return allowMultiple
      ? Array.isArray(fieldValue) && fieldValue.includes(optionId)
      : fieldValue === optionId;
  };

  const toggleOthers = () => {
    setShowOthers((prev) => !prev);
  };

  return (
    <div className="w-full py-8">
      <div
        className={`grid gap-4 ${form.watch("image") ? "grid-cols-1" : "grid-cols-2"}`}
      >
        {options.map((option, index) => (
          <FormField
            key={option.id}
            control={form.control}
            name={fieldName}
            render={() => {
              const isChecked = isOptionSelected(option.id);
              return (
                <FormItem
                  className={`${
                    isChecked ? "bg-foreground/10 border-primary" : ""
                  } flex flex-col items-start  justify-center border rounded-lg p-4 hover:bg-foreground/10 transition-colors cursor-pointer`}
                  onClick={() => handleSelectionChange(option.id)}
                >
                  <FormLabel className="text-center  flex items-center gap-3 cursor-pointer">
                    <span
                      className={`${isChecked ? "bg-background  " : ""} p-1.5 border  border-primary`}
                    >
                      {index + 1}
                    </span>
                    {option.label}
                  </FormLabel>
                </FormItem>
              );
            }}
          />
        ))}
        {showOthersOption && (
          <FormItem
            className={`${
              showOthers ? "border-primary bg-primary/10" : ""
            } flex flex-col items-center space-y-2 border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer`}
            onClick={toggleOthers}
          >
            <FormControl>
              <div className="sr-only">
                {showOthers ? "Others selected" : "Others not selected"}
              </div>
            </FormControl>
            <MoreHorizontal
              className={`w-8 h-8 ${showOthers ? "text-primary" : "text-blue-600"}`}
            />
            <FormLabel className="text-center cursor-pointer">Others</FormLabel>
          </FormItem>
        )}
      </div>
      {showOthers && (
        <div className="mt-4">
          <FormField
            control={form.control}
            name={`${fieldName}_other`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specify Other Option</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your option"
                    className="mt-1 block w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
