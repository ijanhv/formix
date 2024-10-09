import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema, QuestionType } from "@/schema/zod";
import { Icon } from "@iconify/react";
import { IconsDialog } from "./search-icons";
import { X } from "lucide-react";

type PictureChoiceProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  question: QuestionType;
  theme: Theme;
};

const PictureChoice: React.FC<PictureChoiceProps> = ({
  form,
  question,
  theme,
}) => {
  const currentOptions = form.watch(`screens.${question.order}.options`) || [];

  // Handle label change
  const handleLabelChange = (index: number, newLabel: string) => {
    const updatedOptions = currentOptions.map((option, i) =>
      i === index
        ? {
            ...option,
            label: newLabel,
            value: newLabel.toLowerCase().replace(/\s+/g, "_"),
          }
        : option
    );
    form.setValue(`screens.${question.order}.options`, updatedOptions);
  };

  // Handle remove option
  const handleRemoveOption = (index: number) => {
    const updatedOptions = currentOptions.filter((_, i) => i !== index);
    form.setValue(`screens.${question.order}.options`, updatedOptions);
  };

  return (
    <div className={``}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5">
        {currentOptions.map((icon: any, index: number) => (
          <div
            key={index}
            className={`flex relative flex-col items-center border rounded p-4 cursor-pointer ${theme.borderColor} `}
          >
            <div className="bg-red-600 absolute -top-3 text-white rounded-full -right-2">
              <X onClick={() => handleRemoveOption(index)} className=" " />
            </div>
            <Icon
              icon={icon.imageUrl}
              className={`${theme.textColor} w-12 h-12 mb-2`}
            />
            <input
              placeholder="Enter a label"
              value={icon.label}
              onChange={(e) => handleLabelChange(index, e.target.value)}
              className={`text-base w-full text-center bg-transparent placeholder:italic border-none outline-none ${theme?.textColor ?? "text-black dark:text-white"} ${theme?.placeholderColor}`}
            />
          </div>
        ))}
        <IconsDialog question={question} form={form} />
      </div>
    </div>
  );
};

export default PictureChoice;
