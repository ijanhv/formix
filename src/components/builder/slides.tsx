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

interface SlidesProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  currentSlideIndex: number;
}

const Slides: React.FC<SlidesProps> = ({ form, currentSlideIndex }) => {
  const questions = form.watch("questions");
  const currentSlide = questions[currentSlideIndex];

  if (!currentSlide) {
    return <div className="flex-1 p-8">No slide available</div>;
  }

  function renderQuestionInput(question: QuestionInput) {
    switch (question.type) {
      case "shortText":
        return (
          <FloatingLabelInput
            placeholder="Type your answer here"
            label="Type your answer here"
            className="text-xl text-foreground/70"
          />
        );
      case "longText":
        return (
          <FloatingLabelInput
            label="Type your answer here"
            className="text-xl text-foreground/70"
          />
        );
      case "number":
        return (
          <FloatingLabelInput
            label="Type your answer here"
            type="number"
            className="text-xl text-foreground/70"
          />
        );
      case "email":
        return (
          <FloatingLabelInput
            placeholder="Type your answer here"
            label="Type your email here"
            type="email"
            className="text-xl text-foreground/70"
          />
        );
      case "date":
        return <CustomDateInput form={form} />;
      case "select":
        if (!question.options) return null;
        const optionsForSelect = question.options.map((option, index) => ({
          id: `option-${index}`,
          label: option,
          icon: () => null, // You may want to replace this with an appropriate icon component
        }));
        return (
          <CustomSelect
            options={optionsForSelect}
            allowMultiple={false}
            fieldName={`questions.${question.id}.answer`}
            form={form}
            showOthersOption={false}
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
      // return (
      //   // <Select>
      //   //   <SelectTrigger>
      //   //     <SelectValue placeholder="Select an option" />
      //   //   </SelectTrigger>
      //   //   <SelectContent className="">
      //   //     <div className="flex flex-col gap-4 ">
      //   //       {question.options?.map((option, index) => (
      //   //         <SelectItem key={index} value={option}>
      //   //           {option}
      //   //         </SelectItem>
      //   //       ))}
      //   //     </div>
      //   //   </SelectContent>
      //   // </Select>
      // );
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
    <div className="flex-1 p-8 flex">
      <div className="flex-1 w-full h-full flex items-center justify-center flex-col gap-5 rounded-lg p-6 mx-auto">
        <div className="flex items-start gap-3 w-full">
          <span>{currentSlideIndex + 1}</span>
          <ArrowRight />
          <div className="space-y-4 w-full">
            <FormLabel className="space-y-3">
              <h3 className="text-2xl font-medium">
                {currentSlide.label}{" "}
                {currentSlide.required && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </h3>

              {currentSlide.description ? (
                currentSlide.description
              ) : (
                <p className="text-foreground/35 italic text-xl">
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
