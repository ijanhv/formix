"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import gsap from "gsap";
import { generateZodSchema } from "@/utils/code-gen/zod-schema";
import { FormInput, QuestionInput } from "@/schema/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { renderFormField } from "@/utils/code-gen/render-field";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "../ui/label";
import Image from "next/image";
import CustomButton from "./custom-button";

function generateSteps(length: number) {
  const steps = [];
  for (let i = 0; i < length; i++) {
    steps.push({
      fields: [`form_element_${i}`],
    });
  }
  return steps;
}

const FormPreview = ({
  formData,
  theme,
}: {
  formData: FormInput;
  theme: Theme;
}) => {
  const formSchema = generateZodSchema(formData.questions as QuestionInput[]);

  const [formState, setFormState] = useState<Record<string, any>>({});

  const [currentStep, setCurrentStep] = useState(0);

  const [click, setClick] = useState("");

  type Inputs = z.infer<typeof formSchema>;
  type FieldName = keyof Inputs;

  const steps = generateSteps(formData.questions.length);

  const FormContent = () => {
    const formRef = useRef(null);
    const [, setDirection] = useState(0);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      mode: "onChange",
      defaultValues: formState,
    });

    const currentQuestion = formData.questions[currentStep];
    // const code = generateFormCode(formData as FormInput);
    const { trigger, getValues } = form;

    useEffect(() => {
      const currentForm = formRef.current;
      if (currentForm) {
        gsap.fromTo(
          currentForm,
          { y: click === "next" ? 400 : -400, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 }
        );
      }
    }, [currentStep]);

    const next = async () => {
      const fields = steps[currentStep].fields;
      const output = await trigger(fields as FieldName[], {
        shouldFocus: true,
      });

      if (!output) return;
      setDirection(1);

      gsap.to(formRef.current, {
        y: -400,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setCurrentStep((step) => step + 1);
          setClick("next");
          setFormState(form.getValues());
        },
      });
    };

    const prev = () => {
      if (currentStep > 0) {
        setDirection(-1);

        gsap.to(formRef.current, {
          y: 400,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setCurrentStep((step) => step - 1);
            setClick("previous");
            setFormState(form.getValues());
          },
        });
      }
    };

    function onSubmit(data: z.infer<typeof formSchema>) {
      try {
        toast.success(JSON.stringify(data, null, 2), {
          position: "top-center",
        });
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    }

    return (
      <div
        className={`h-full ${theme.textColor} ${theme.backgroundColor} ${formData.fontFamily} w-full  flex items-center justify-center flex-col `}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full flex items-center justify-center w-full"
          >
            <div className="flex flex-col-reverse md:flex-row w-full gap-10">
              <div className="w-full" ref={formRef}>
                {formData.questions.map((field, index) => (
                  <div
                    key={index}
                    className={`flex items-center  h-full w-full ${
                      currentStep === index ? "" : "hidden"
                    }`}
                  >
                    <div className="flex items-center w-full gap-10 lg:flex-row flex-col-reverse">
                      <div className="flex  w-full items-start gap-1 md:gap-5 px-5 md:px-20 ">
                        <span className="text-base md:text-xl">
                          {index + 1}
                        </span>
                        <ArrowRight className="text-sm" />
                        <div className="space-y-5 w-full">
                          <Label className="flex flex-col gap-4">
                            <h3 className="text-2xl lg:text-3xl font-medium">
                              {field.label}{" "}
                              {field.required && (
                                <span className="text-destructive ml-1">*</span>
                              )}
                            </h3>
                            {field.description ? (
                              field.description
                            ) : (
                              <p className="text-foreground/35  italic text-base lg:text-xl">
                                Description (optional)
                              </p>
                            )}
                          </Label>

                          <FormField
                            control={form.control}
                            name={`form_element_${index}`}
                            render={({ field: formField }) => (
                              <FormItem>
                                <FormControl>
                                  {React.cloneElement(
                                    // eslint-disable-next-line new-cap
                                    renderFormField(
                                      field,
                                      form,
                                      index,
                                      theme
                                    ) as React.ReactElement,
                                    {
                                      ...formField,

                                      value:
                                        getValues(`form_element_${index}`) ||
                                        formField.value,
                                    }
                                  )}
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          {currentStep < formData.questions.length - 1 && (
                            <Button
                              type="button"
                              onClick={next}
                              className={`px-2 rounded-sm shadow-none  flex items-center gap-1 text-base ${theme.okButton} hover:${theme.okButton} transition-colors duration-200`}
                            >
                              OK <Check />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {currentQuestion?.image && (
                <div
                  className={`transition-all duration-700 transform h-[250px] sm:h-[400px] w-screen md:w-full lg:h-screen lg:w-full relative`}
                >
                  <Image
                    src={currentQuestion?.image}
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
                {currentStep < formData.questions.length - 1 ? (
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
      {formData.questions.length > 0 ? (
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
