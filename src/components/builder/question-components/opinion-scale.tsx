import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { formSchema, QuestionType } from "@/schema/zod";
import { z } from "zod";

interface OpinionScaleProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  question: QuestionType;
  theme: Theme;
}

const OpinionScale: React.FC<OpinionScaleProps> = ({
  form,
  question,
  theme,
}) => {
  const { watch } = form;
  // const fieldName = `screens.${question.order}.value`;
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-start gap-4 overflow-x-scroll scrollbar scrollbar-h-0">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col items-center ">
              <span
                onClick={() => setSelected(i)}
                className={`
                ${i === selected ? theme.checkboxChecked : theme.checkboxUnchecked}
                ${theme.textColor} h-5 w-5 md:h-10 md:w-10 hover:${theme.checkboxChecked}
                cursor-pointer flex items-center justify-center p-4 border rounded-md mb-2
              `}
              >
                {i}
              </span>
              {i === 0 && (
                <span className="text-sm">
                  {watch(`screens.${question.order}.leftLabel`)}
                </span>
              )}
              {i === 9 && (
                <span className="text-sm">
                  {watch(`screens.${question.order}.rightLabel`)}
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default OpinionScale;
