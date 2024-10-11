import { FormType } from "@/schema/zod";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { AutosizeTextarea } from "../ui/autosize-textarea";

interface WelcomeScreenProps {
  form: UseFormReturn<FormType>;
  theme?: Theme;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ form, theme }) => {
  const {
    title = "Welcome to Our Form",
    description = "We appreciate your time and effort. If you have any questions, feel free to reach out.",
    buttonText = "Go Back",
  } = form.watch("screens").find((screen) => screen.type === "welcomeScreen") ||
  {};

  // Handle changes for title input
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    form.setValue("screens.0.title", e.target.value); // Adjust index if necessary
  };

  // Handle changes for description input
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    form.setValue("screens.0.description", e.target.value);
  };

  return (
    <div className="h-full p-4 flex relative items-center justify-center gap-3 flex-col">
      <AutosizeTextarea
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter the welcome message title"
        className={`text-2xl md:text-3xl lg:text-4xl mb-4 w-full text-center bg-transparent border-none outline-none ${theme?.textColor ?? "text-black dark:text-white"}  ${theme?.placeholderColor}`}
      />

      {/* Textarea field for the description */}
      <AutosizeTextarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter a brief description"
        className={`text-lg mb-4 w-full text-center bg-transparent border-none ${theme?.placeholderColor} outline-none ${theme?.textColor ?? "text-black dark:text-white"} `}
        rows={1}
      />

      {buttonText && (
        <button
          className={`${theme?.buttonColor} ${theme?.buttonText} px-6 py-2 rounded-sm`}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default WelcomeScreen;
