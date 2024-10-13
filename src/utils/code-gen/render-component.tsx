import React from "react";
import { CustomCheckboxGroup } from "@/components/builder/question-components/custom-checkbox";
import Rating from "@/components/builder/question-components/rating";
import { UseFormReturn } from "react-hook-form";
import { FormType, QuestionType } from "@/schema/zod";
import CustomDateInput from "@/components/builder/question-components/custom-date";
import { CustomDropdown } from "@/components/builder/question-components/custom-dropdown";
import PictureChoice from "@/components/builder/question-components/picture-choice";
import { BooleanComponent } from "@/components/builder/question-components/boolean";
import { MultpleChoice } from "@/components/form-components/multiple-choice";
import OpinionScale from "@/components/builder/question-components/opinion-scale";
import { Input } from "@/components/ui/input";

export function renderQuestionInput(
  question: QuestionType,
  theme: Theme,
  form: UseFormReturn<FormType>
) {
  switch (question.type) {
    case "short_text":
      return (
        <>
          <Input
            name=""
            placeholder="Type your answer here"
            className={`${theme?.textColor}  ${theme?.placeholderColor} peer py-5 border-none border-b-2 text-xl focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none`}
          />
          <hr className={`${theme?.borderColor}`} />
        </>
      );
    case "long_text":
      return (
        <>
          <Input
            name=""
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
          <Input
            type="number"
            name=""
            className={`${theme?.textColor} peer py-5 border-none border-b-2 text-xl  placeholder:text-foreground/35  focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none`}
          />
          <hr className={`${theme?.borderColor}`} />
        </>
      );
    case "email":
      return (
        <>
          <Input
            placeholder="Type your answer here"
            type="email"
            name=""
            className={`${theme?.textColor}  ${theme?.placeholderColor} peer py-5 border-none border-b-2 text-xl focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none`}
          />
          <hr className={`${theme?.borderColor}`} />
        </>
      );
    case "website":
      return (
        <>
          <Input
            placeholder="Type your answer here"
            defaultValue={"https://"}
            name=""
            className={`${theme?.textColor}  ${theme?.placeholderColor} peer py-5 border-none border-b-2 text-xl focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none`}
          />
          <hr className={`${theme?.borderColor}`} />
        </>
      );

    case "picture_choice":
      return (
        <>
          <PictureChoice form={form} question={question} theme={theme} />
        </>
      );

    case "opinion_scale":
      return (
        <>
          <OpinionScale form={form} question={question} theme={theme} />
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

    case "boolean":
      return (
        <BooleanComponent
          form={form}
          fieldName="boolean"
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

      return (
        <MultpleChoice
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
      return <Rating value={0} max={question.scale} />;
    default:
      return null;
  }
}
