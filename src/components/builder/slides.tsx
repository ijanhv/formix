import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema, QuestionInput } from "@/schema/zod";
import { FormLabel } from "@/components/ui/form";
import { FloatingLabelInput } from "../ui/floating-label-input";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import CustomSelect from "./custom-select";
import CustomDateInput from "./custom-date";
import Rating from "./rating";
import { themes } from "@/constants";
import { CustomCheckboxGroup } from "./custom-checkbox";

interface SlidesProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  currentSlideIndex: number;
}

const Slides: React.FC<SlidesProps> = ({ form, currentSlideIndex }) => {
  const questions = form.watch("questions");
  const theme = themes.find((item) => item.id === form.watch("theme"));

  const currentSlide = questions[currentSlideIndex];

  if (!currentSlide) {
    return <div className="flex-1 p-8">No slide available</div>;
  }

  function renderQuestionInput(question: QuestionInput) {
    switch (question.type) {
      case "shortText":
        return (
          <>
            <FloatingLabelInput
              placeholder="Type your answer here"
              label="Type your answer here"
              className={`${theme?.textColor}  ${theme?.placeholderColor} peer py-5 border-none border-b-2 text-xl focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none`}
            />
            <hr className={`${theme?.borderColor}`} />
            <p className={`${theme?.textColor} italic text-sm mt-4`}>
              Shift ⇧ + Enter ↵ to make a line break
            </p>
          </>
        );
      case "longText":
        return (
          <>
            <FloatingLabelInput
              label="Type your answer here"
              className={`${theme?.textColor} peer py-5 border-none border-b-2 text-xl  placeholder:text-foreground/35  focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none`}
            />
            <hr className={`${theme?.borderColor}`} />
            <p className="text-blue-500 italic text-sm mt-4">
              Shift ⇧ + Enter ↵ to make a line break
            </p>
          </>
        );
      case "number":
        return (
          <>
            <FloatingLabelInput
              label="Type your answer here"
              type="number"
              className={`${theme?.textColor} peer py-5 border-none border-b-2 text-xl  placeholder:text-foreground/35  focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none`}
            />
            <hr className={`${theme?.borderColor}`} />
          </>
        );
      case "email":
        return (
          <>
            <FloatingLabelInput
              placeholder="Type your answer here"
              label="Type your email here"
              type="email"
              className={`${theme?.textColor} peer py-5 border-none border-b-2 text-xl  placeholder:text-foreground/35  focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none`}
            />
            <hr className={`${theme?.borderColor}`} />
          </>
        );
      case "date":
        return <CustomDateInput form={form} />;
      case "select":
        if (!question.options) return null;

        return (
          // <CustomSelect
          //   options={optionsForSelect}
          //   allowMultiple={false}
          //   fieldName={`questions.${question.id}.answer`}
          //   form={form}
          //   showOthersOption={false}
          // />

          <CustomCheckboxGroup
            form={form}
            options={question.options}
            fieldName="select"
            theme={theme as Theme}
          />
        );
      case "multiSelect":
        if (!question.options) return null;
        const options = question.options.map((option, index) => ({
          id: `option-${index}`,
          label: option,
          icon: () => null, // You may want to replace this with an appropriate icon component
        }));
        return (
          <CustomSelect
            options={options}
            allowMultiple={true}
            fieldName={`questions.${question.id}.answer`}
            form={form}
            showOthersOption={false}
          />
        );
      case "rating":
        return (
          <Rating
            value={0}
            max={5} // You can change this to any maximum value based on your requirements
            onChange={(newValue) =>
              // @ts-ignore
              form.setValue(`questions.${currentSlideIndex}.answer`, newValue)
            }
          />
        );
      default:
        return null;
    }
  }

  return (
    <div
      className={`flex-1 items-center bg-foreground/5 justify-center p-8 flex h-[500px] relative ${theme?.textColor} ${theme?.backgroundColor}`}
    >
      {theme?.backgroundImage && (
        <Image
          alt="theme"
          src={theme?.backgroundImage}
          fill
          className="h-full w-full object-cover"
        />
      )}

      <div className="flex-1 w-full z-10 h-full flex items-center justify-center flex-col gap-5 rounded-lg p-6 mx-auto">
        <div className="flex items-start gap-3 w-full">
          <span>{currentSlideIndex + 1}</span>
          <ArrowRight />
          <div className="space-y-4 w-full">
            <FormLabel className="space-y-3">
              <h3 className={`text-2xl font-medium ${theme?.textColor}`}>
                {currentSlide.label ? (
                  currentSlide.label
                ) : (
                  <p className=" italic text-2xl"> Label will go here</p>
                )}
                {currentSlide.required && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </h3>

              {currentSlide.description ? (
                <p className="text-lg">{currentSlide.description}</p>
              ) : (
                <p className={`italic text-lg ${theme?.textColor}`}>
                  Description (optional)
                </p>
              )}
            </FormLabel>
            {renderQuestionInput(currentSlide)}
          </div>
        </div>
      </div>
      {/* Conditionally render the image on the right side */}
      {currentSlide.image && (
        <div className="w-1/2 h-full flex items-center  relative justify-center">
          <Image
            unoptimized
            fill
            src={currentSlide.image}
            alt={currentSlide.label}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Slides;
