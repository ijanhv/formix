import React from "react";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { CustomCheckboxGroup } from "@/components/builder/question-components/custom-checkbox";
import Rating from "@/components/builder/question-components/rating";
import { UseFormReturn } from "react-hook-form";
import { FormType, QuestionType } from "@/schema/zod";
import CustomDateInput from "@/components/builder/question-components/custom-date";
import { CustomDropdown } from "@/components/builder/question-components/custom-dropdown";
import PictureChoice from "@/components/builder/question-components/picture-choice";

export function renderQuestionInput(
  question: QuestionType,
  theme: Theme,
  form: UseFormReturn<FormType>
) {
  switch (question.type) {
    case "short_text":
      return (
        <>
          <FloatingLabelInput
            placeholder="Type your answer here"
            label="Type your answer here"
            className={`${theme?.textColor}  ${theme?.placeholderColor} peer py-5 border-none border-b-2 text-xl focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none`}
          />
          <hr className={`${theme?.borderColor}`} />
        </>
      );
    case "long_text":
      return (
        <>
          <FloatingLabelInput
            label="Type your answer here"
            className={`${theme?.textColor}  ${theme.placeholderColor} peer py-5 border-none border-b-2 text-xl  focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none`}
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
    case "website":
      return (
        <>
          <FloatingLabelInput
            placeholder="Type your answer here"
            label="Type your url here"
            defaultValue={"https://"}
            className={`${theme?.textColor}  ${theme?.placeholderColor} peer py-5 border-none border-b-2 text-xl focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none`}
          />
          <hr className={`${theme?.borderColor}`} />
        </>
      );

    case "picture_choice":
      return (
        <>
          <PictureChoice
            form={form}
            question={question}
            theme={theme}

            // options={question.options.map((option) => ({
            //   value: option.label,
            //   label: option.label,
            // }))}

            // theme={theme as Theme}
          />
        </>
      );
    case "date":
      return <CustomDateInput form={form} />;
    case "multiple_choice":
      if (!question.options) return null;

      return (
        <CustomCheckboxGroup
          form={form}
          options={question.options.map((option) => ({
            value: option.label,
            label: option.label,
          }))}
          fieldName="select"
          theme={theme as Theme}
        />
      );

    case "dropdown":
      if (!question.options) return null;

      return (
        <CustomDropdown
          form={form}
          options={question.options.map((option) => ({
            value: option.label,
            label: option.label,
          }))}
          fieldName="select"
          theme={theme as Theme}
        />
      );
    case "multiple_choice":
      if (!question.options) return null;
      // const options = question.options.map((option, index) => ({
      //   id: `option-${index}`,
      //   label: option,
      //   icon: () => null, // You may want to replace this with an appropriate icon component
      // }));
      return (
        <CustomCheckboxGroup
          form={form}
          options={question.options.map((option) => ({
            value: option.label,
            label: option.label,
          }))}
          fieldName="select"
          theme={theme as Theme}
        />
      );
    case "rating":
      return (
        <Rating
          value={0}
          max={Number(question.scale)}
          // onChange={(newValue) =>
          //   form.setValue(`questions.${cu}.answer`, newValue)
          // }
        />
      );
    default:
      return null;
  }
}
