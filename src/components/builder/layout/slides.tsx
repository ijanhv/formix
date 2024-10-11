import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormType } from "@/schema/zod";
import { FormLabel } from "@/components/ui/form";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { themes } from "@/constants";

import { renderQuestionInput } from "@/utils/code-gen/render-component";
import WelcomeSlide from "../welcome-slide";
import ThankYouSlide from "../thankyou-slide";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";

interface ScreensProps {
  form: UseFormReturn<FormType>;
  currentScreenIndex: number;
}

const Screens: React.FC<ScreensProps> = ({ form, currentScreenIndex }) => {
  const screens = form.watch("screens");
  const theme = themes.find((item) => item.id === form.watch("theme"));

  const currentScreen = screens[currentScreenIndex];

  if (!currentScreen) {
    return <div className="flex-1 p-8">No screen available</div>;
  }

  return (
    <div className="h-full relative">
      {theme?.backgroundImage && (
        <Image
          alt="theme"
          src={theme.backgroundImage}
          fill
          className="h-full w-full object-cover"
        />
      )}

      <div className={`${theme?.textColor} ${theme?.backgroundColor} h-full `}>
        {currentScreen.type === "welcomeScreen" && (
          <WelcomeSlide form={form} theme={theme} />
        )}
        {currentScreen.type === "endScreen" && (
          <ThankYouSlide form={form} theme={theme} />
        )}
        {currentScreen.type !== "welcomeScreen" &&
          currentScreen.type !== "endScreen" && (
            <div
              className={`flex-1 items-center  flex lg:flex-row flex-col  justify-center p-8 h-full  relative`}
            >
              <div className="flex w-full z-10 h-full  items-center justify-center flex-col gap-5 rounded-lg pr-5 mx-auto">
                <div className="flex items-start gap-3 w-full">
                  <span>{currentScreenIndex}</span>
                  <ArrowRight />
                  <div className="space-y-2 w-full">
                    <FormLabel className="space-y-3">
                      <h3
                        className={`text-2xl flex font-medium ${theme?.textColor}`}
                      >
                        <AutosizeTextarea
                          value={currentScreen.title || ""}
                          onChange={(e) =>
                            form.setValue(
                              `screens.${currentScreenIndex}.title`,
                              e.target.value
                            )
                          }
                          placeholder="Question title"
                          className={`text-3xl  w-full text-left bg-transparent placeholder:italic border-none outline-none ${theme?.textColor ?? "text-black dark:text-white"} ${theme?.placeholderColor}`}
                        />
                        {/* {currentScreen.required && (
                        <span className="text-destructive ml-1">*</span>
                      )} */}
                      </h3>

                      <h3 className={`text-lg font-medium ${theme?.textColor}`}>
                        <AutosizeTextarea
                          // type="text"
                          value={currentScreen.description || ""}
                          onChange={(e) =>
                            form.setValue(
                              `screens.${currentScreenIndex}.description`,
                              e.target.value
                            )
                          }
                          placeholder="Description (Optional)"
                          className={` mb-4 w-full text-left bg-transparent font-light placeholder:italic border-none outline-none ${theme?.textColor ?? "text-black dark:text-white"} ${theme?.placeholderColor}`}
                        />
                      </h3>

                      {renderQuestionInput(currentScreen, theme!, form)}
                    </FormLabel>
                  </div>
                </div>
              </div>

              {currentScreen?.image && (
                <div className="relative lg:h-full h-[300px] w-full lg:w-[800px]">
                  <Image
                    alt="theme"
                    src={currentScreen.image}
                    fill
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default Screens;
