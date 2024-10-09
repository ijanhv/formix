import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormType } from "@/schema/zod";

interface EndScreenProps {
  form: UseFormReturn<FormType>;
  theme?: Theme;
}

const EndScreen: React.FC<EndScreenProps> = ({ form, theme }) => {
  const {
    title = "Thank You!",
    description = "We appreciate your time and effort. If you have any questions, feel free to reach out.",
    // buttonText = "Go Back",
  } = form.watch("screens").find((screen) => screen.type === "endScreen") || {};

  // Handle changes for title input
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(
      `screens.${form.watch("screens").length - 1}.title`,
      e.target.value
    );
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    form.setValue(
      `screens.${form.watch("screens").length - 1}.description`,
      e.target.value
    );
  };

  return (
    <div className="h-full p-4 relative flex items-center justify-center gap-3 flex-col">
      {/* Input field for the title */}
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter the thank you message "
        className={`text-2xl md:text-3xl lg:text-4xl mb-4 w-full text-center bg-transparent border-none outline-none ${theme?.textColor ?? "text-black dark:text-white"} placeholder-gray-400`}
      />

      {/* Textarea field for the description */}
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter a brief description"
        className={`text-lg mb-4 w-full text-center bg-transparent border-none outline-none ${theme?.textColor ?? "text-black dark:text-white"} placeholder-gray-400`}
        rows={3}
      />

      {/* {buttonText && (
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
          {buttonText}
        </button>
      )} */}
    </div>
  );
};

export default EndScreen;
