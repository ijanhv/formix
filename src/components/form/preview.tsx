"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import gsap from "gsap";
import { generateZodSchema } from "@/utils/code-gen/zod-schema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { renderFormField } from "@/utils/code-gen/render-field";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "../ui/label";
import Image from "next/image";
import CustomButton from "./custom-button";
import { FormType, QuestionType } from "@/schema/zod";
import { ScreenType } from "@prisma/client";
import { useSubmitResponseQuery } from "@/hooks/use-form-query";

function generateSteps(screens: TQuestion[]) {
  return screens
    .filter(
      // @ts-ignore
      (screen) => screen.type !== "welcomeScreen" && screen.type !== "endScreen"
    )
    .map((_, index) => ({ fields: [`form_element_${index}`] }));
}

const FormPreview = ({
  formData,
  theme,
}: {
  formData: FormType;
  theme: Theme;
}) => {
  const { mutate: submitResponse } = useSubmitResponseQuery();
  const questionScreens = formData.screens.filter(
    (screen) =>
      (screen.type as ScreenType) !== "welcomeScreen" &&
      (screen.type as ScreenType) !== "endScreen"
  );
  const formSchema = generateZodSchema(questionScreens as QuestionType[]);

  const [formState, setFormState] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  type Inputs = z.infer<typeof formSchema>;
  type FieldName = keyof Inputs;

  const sortedScreens = [...formData.screens].sort((a, b) => {
    if (a.type === "welcomeScreen") return -1;
    if (b.type === "welcomeScreen") return 1;
    if (a.type === "endScreen") return 1;
    if (b.type === "endScreen") return -1;
    return (a.order || 0) - (b.order || 0);
  });

  const FormContent = () => {
    const formRef = useRef(null);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      mode: "onChange",
      defaultValues: formState,
    });

    const currentScreen = sortedScreens[currentStep];
    const { trigger, getValues } = form;

    // @ts-ignore
    const steps = generateSteps(questionScreens as QuestionType);

    useEffect(() => {
      const currentForm = formRef.current;
      if (currentForm) {
        gsap.fromTo(
          currentForm,
          {
            y: direction > 0 ? 400 : -400,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          }
        );
      }
    }, [currentStep, direction]);

    // const steps = generateSteps(questionScreens as QuestionType);

    const next = async () => {
      if (
        currentScreen.type !== "welcomeScreen" &&
        currentScreen.type !== "endScreen"
      ) {
        const questionIndex = questionScreens.findIndex(
          (screen) => screen.id === currentScreen.id
        );
        const fields = steps[questionIndex].fields;
        const output = await trigger(fields as FieldName[], {
          shouldFocus: true,
        });
        if (!output) return;
      }

      gsap.to(formRef.current, {
        y: -400,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setDirection(1);
          setCurrentStep((step) => step + 1);
          setFormState(form.getValues());
        },
      });
    };

    const prev = () => {
      if (currentStep > 0) {
        gsap.to(formRef.current, {
          y: 400,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setDirection(-1);
            setCurrentStep((step) => step - 1);
            setFormState(form.getValues());
          },
        });
      }
    };
    function onSubmit(data: z.infer<typeof formSchema>) {
      try {
        submitResponse({
          id: formData.id,
          responseData: data,
        });
        // toast.success(JSON.stringify(data, null, 2), {
        //   position: "top-center",
        // });
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    }

    const renderScreen = (screen: QuestionType, index: number) => {
      // @ts-ignore
      if (screen.type === "welcomeScreen" || screen.type === "endScreen") {
        return (
          <div className="space-y-5 w-full">
            <h3 className="text-lg md:text-3xl lg:text-4xl font-medium">
              {/* @ts-ignore */}
              {screen.title}
            </h3>
            <p className={`${theme.textColor} text-base `}>
              {/* @ts-ignore */}
              {screen.description}
            </p>
            {/* @ts-ignore */}
            {screen.type === "welcomeScreen" && (
              <Button
                type="button"
                onClick={next}
                className={`px-2 rounded-sm shadow-none flex items-center gap-1 text-base ${theme.okButton} hover:${theme.okButton} transition-colors duration-200`}
              >
                {/* @ts-ignore */}
                {screen.buttonText || "Start"} <ArrowRight />
              </Button>
            )}
          </div>
        );
      }

      const questionIndex = questionScreens.findIndex(
        (s) => s.id === screen.id
      );

      return (
        <div className="space-y-5 w-full">
          <Label className="flex flex-col gap-4">
            <h3 className="text-2xl lg:text-3xl font-medium">
              {screen.title}{" "}
              {screen.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </h3>
            {screen.description && (
              <p className={`${theme.textColor} text-base `}>
                {screen.description}
              </p>
            )}
          </Label>

          <FormField
            control={form.control}
            name={`form_element_${questionIndex}`}
            render={({ field: formField }) => (
              <FormItem>
                <FormControl>
                  {React.cloneElement(
                    renderFormField(
                      screen,
                      form,
                      questionIndex,
                      theme
                    ) as React.ReactElement,
                    {
                      ...formField,
                      value:
                        getValues(`form_element_${questionIndex}`) ||
                        formField.value,
                    }
                  )}
                </FormControl>
              </FormItem>
            )}
          />

          {questionIndex < questionScreens.length - 1 && (
            <Button
              type="button"
              onClick={next}
              className={`px-2 rounded-sm shadow-none flex items-center gap-1 text-base ${theme.okButton} hover:${theme.okButton} transition-colors duration-200`}
            >
              OK <Check />
            </Button>
          )}
        </div>
      );
    };

    return (
      <div
        className={`h-full ${theme.textColor} ${theme.backgroundColor} ${formData.fontFamily} w-full flex items-center justify-center flex-col`}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full flex items-center justify-center w-full"
          >
            <div className="flex flex-col-reverse md:flex-row w-full gap-10">
              <div className="w-full" ref={formRef}>
                {sortedScreens.map((screen, index) => (
                  <div
                    key={screen.id}
                    className={`flex items-center h-full w-full ${
                      currentStep === index ? "" : "hidden"
                    }`}
                  >
                    <div className="flex items-center w-full gap-10 lg:flex-row flex-col-reverse">
                      <div className="flex w-full items-start gap-1 md:gap-5 px-5 md:px-20 ">
                        {/* @ts-ignore */}
                        {renderScreen(screen, index)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* @ts-ignore */}
              {currentScreen?.image && (
                <div
                  className={`transition-all duration-700 transform h-[250px] sm:h-[400px] w-screen md:w-full lg:h-screen lg:w-full relative`}
                >
                  <Image
                    //  @ts-ignore
                    src={currentScreen.image}
                    alt="image"
                    fill
                    unoptimized
                    className="object-cover h-full w-full"
                  />
                </div>
              )}
            </div>

            <div className="fixed bottom-0 left-0 right-20 p-4 inset-x-3 w-full mx-auto flex justify-center">
              <div className={`bg-white rounded-sm p-1 shadow-md`}>
                <CustomButton
                  theme={theme}
                  type="button"
                  text={<ChevronUp size={30} />}
                  onClick={prev}
                  disabled={currentStep === 0}
                />
                {currentStep < sortedScreens.length - 1 ? (
                  <CustomButton
                    theme={theme}
                    type="button"
                    text={<ChevronDown size={30} />}
                    onClick={next}
                    disabled={false}
                  />
                ) : (
                  <CustomButton
                    theme={theme}
                    type="submit"
                    text={<Check size={30} />}
                    onClick={() => {}}
                    disabled={false}
                  />
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    );
  };

  FormContent.displayName = "FormContent";

  return (
    <div className="w-full h-full flex items-center justify-center">
      {sortedScreens.length > 0 ? (
        <FormContent />
      ) : (
        <div className="h-[50vh] flex justify-center items-center">
          <p>No form element selected yet.</p>
        </div>
      )}
    </div>
  );
};

export default FormPreview;
