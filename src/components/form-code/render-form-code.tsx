import { FormType } from "@/schema/zod";
import React from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

const RenderFormCode = ({ form }: { form: FormType }) => {
  const screenTypes = form.screens.map((item) => item.type);

  return (
    <div>
      <SyntaxHighlighter
        language="typescript"
        style={nightOwl}
        customStyle={{
          fontSize: "12px",
        }}
      >
        {codeString(screenTypes)}
      </SyntaxHighlighter>
    </div>
  );
};

export default RenderFormCode;

const codeString = (screenTypes: string[]) => {
  const switchCases = screenTypes
    .map((type) => {
      switch (type) {
        case "short_text":
        case "email":
        case "number":
        case "website":
          return `
            case "${type}":
              return (
                <>
                  <Input
                    {...formField}
                   defaultValue={type === "website" ? "https://" : ""}
                    type="${
                      type === "email"
                        ? "email"
                        : type === "number"
                          ? "number"
                          : "text"
                    }"
                    className={\`\${theme.textColor} \${theme.placeholderColor} peer py-5 border-none border-b-2 text-xl md:text-2xl focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none\`}
                    placeholder="Type your answer here"
                    value={formField.value || ""}
                  />
                  <hr className={\`border \${theme.borderColor}\`} />
                </>
              );
          `;

        case "long_text":
          return `
            case "${type}":
              return (
                <>
                  <AutosizeTextarea
                    rows={1}
                    {...formField}
                    className={\`\${theme.textColor} \${theme.placeholderColor} bg-transparent outline-none focus:outline-none focus:border-transparent peer py-5 border-none border-b-2 text-xl font-light focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none\`}
                    placeholder="Type your answer here"
                    value={formField.value || ""}
                  />
                  <hr className={\`border \${theme.borderColor}\`} />
                  <p className="italic text-sm mt-3">
                    Shift ⇧ + Enter ↵ to make a line break
                  </p>
                </>
              );
          `;

        case "date":
          return `
            case "${type}":
              return (
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
              );
          `;

        case "dropdown":
          return `
            case "${type}":
              return (
                <FormDropdown
                  form={form}
                  fieldName={fieldName}
                  theme={theme}
                  options={field.options || []}
                />
              );
          `;

        case "picture_choice":
          return `
            case "${type}":
              return (
                <FormPictureChoice
                  form={form}
                  fieldName={fieldName}
                  theme={theme}
                  options={field.options || []}
                />
              );
          `;

        case "multiple_choice":
          return `
            case "${type}":
              return (
                <CustomCheckboxGroup
                  form={form}
                  fieldName={fieldName}
                  theme={theme}
                  options={field.options || []}
                />
              );
          `;

        case "boolean":
          return `
            case "${type}":
              return (
                <BooleanComponent form={form} fieldName={fieldName} theme={theme} />
              );
          `;

        case "opinion_scale":
          return `
            case "${type}":
              return (
                <OpinionScale
                  form={form}
                  fieldName={fieldName}
                  theme={theme}
                  leftLabel={field.leftLabel!}
                  rightLabel={field.rightLabel!}
                />
              );
          `;

        case "rating":
          return `
            case "${type}":
              return (
                <StarRating
                  form={form}
                  scale={field.scale}
                  fieldName={fieldName}
                  theme={theme}
                />
              );
          `;

        default:
          return null;
      }
    })
    .join("\n");

  return `
  import { z } from "zod";
  import { UseFormReturn } from "react-hook-form";
  import { formSchema } from "@/schema/zod";

  export const renderFormField = (
    field: QuestionType,
    form: UseFormReturn<z.infer<typeof formSchema>>,
    index: number,
    theme: Theme
  ) => {
    const fieldName = \`form_element_\${index}\`;
    
    switch (field.type) {
      ${switchCases}
      default:
        return null;
    }
  };
  `;
};
