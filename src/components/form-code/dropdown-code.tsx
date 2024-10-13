import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

const DropdownCode = ({ theme }: { theme: Theme }) => {
  const code = generateDropdownCode(theme);

  return (
    <SyntaxHighlighter
      language="typescript"
      style={nightOwl}
      customStyle={{
        fontSize: "12px",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};
export default DropdownCode;

const generateDropdownCode = (
  theme: Theme
) => `import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


export function FormDropdown({
  form,
  fieldName,
  options,
}: {
  form: any;
  fieldName: string;
  options: { value: string; label: string }[];
}) {
  const [showDropdown, setShowDropdown] = useState(false);
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
          {/* Dropdown Toggle Button */}
          <div
            className="flex justify-between items-center cursor-pointer pt-2"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <p className="text-lg">
              {field.value ? field.value : "Select an option"}
            </p>
            <ChevronDown
              className={\`transition-transform \${showDropdown ? "rotate-180" : ""}\`}
            />
          </div>
          <hr className={\`${theme.borderColor}\`} />

          {/* Dropdown Options */}
          <div
            className={\`rounded-lg grid grid-cols-1 items-start overflow-y-auto scrollbar-w-0 justify-start transition-all duration-300 ease-in-out gap-3 w-full overflow-hidden \${showDropdown ? "max-h-52" : "max-h-0"}\`}
          >
            {options.map((option, index) => {
              const isChecked = field.value === option.label;
              return (
                <div
                  key={option.value}
                  className={\`flex items-center rounded-xl w-full justify-between p-2 border shadow-sm cursor-pointer transition-colors \${twinklingIndex === index ? "animate-twinkle" : ""} \${isChecked ? \`${theme.checkboxChecked}\` : \`${theme.checkboxUnchecked}\`}\`}
                  onClick={() => {
                    handleClick(index);
                    field.onChange(option.label);
                  }}
                >
                  <div
                    className={\`\${isChecked ? \`${theme.checkboxChecked}\` : \`${theme.checkboxUnchecked}\`} w-8 h-8 mr-4 border rounded-full flex items-center justify-center font-semibold\`}
                  >
                    {index + 1}
                  </div>
                  <FormLabel className={\`flex-grow text-lg cursor-pointer ${theme.textColor} \`}>
                    <span>{option.label}</span>
                  </FormLabel>
                  <div
                    className={\`w-6 h-6 rounded-md flex items-center justify-center \${isChecked ? ${theme.buttonColor} : ""}\`}
                  >
                    {isChecked && <Check className={\`${theme.buttonText}\`} />}
                  </div>
                </div>
              );
            })}
          </div>
          {showDropdown && <hr className={\`${theme.borderColor} border-dashed\`} />}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
`;
