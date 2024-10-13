import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

const OpinionScaleCode = ({ theme }: { theme: Theme }) => {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={nightOwl}
      customStyle={{
        fontSize: "12px",
      }}
    >
      {`
import React from "react";
import { FormField, FormItem } from "../ui/form";

interface OpinionScaleProps {
  theme: Theme;
  fieldName: string;
  form: any;
  leftLabel: string;
  rightLabel: string;
}

const OpinionScale: React.FC<OpinionScaleProps> = ({
  theme,
  fieldName,
  form,
  leftLabel,
  rightLabel,
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="space-y-3 max-w-3xl">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-start gap-4 overflow-x-scroll scrollbar scrollbar-h-0">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex flex-col items-center ">
                    <span
                      onClick={() => form.setValue(fieldName, i)}
                      className={\`
                \${field.value === i ? ${theme.checkboxChecked} : ${theme.checkboxUnchecked}}
                ${theme.textColor} h-5 w-5 md:h-10 md:w-10 hover:${theme.checkboxChecked}
                cursor-pointer flex items-center justify-center p-4 border rounded-md mb-2
              \`}
                    >
                      {i}
                    </span>
                    {i === 0 && <span className="text-sm">{leftLabel}</span>}
                    {i === 9 && <span className="text-sm">{rightLabel}</span>}
                  </div>
                ))}
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

export default OpinionScale;
`}
    </SyntaxHighlighter>
  );
};

export default OpinionScaleCode;
