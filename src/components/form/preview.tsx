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
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "../ui/label";

function generateSteps(length: number) {
  const steps = [];
  for (let i = 0; i < length; i++) {
    steps.push({
      fields: [`form_element_${i}`],
    });
  }
  return steps;
}

const FormPreview = ({ formData }: { formData: FormInput }) => {
  const [formState, setFormState] = useState<Record<string, any>>({});

  const [currentStep, setCurrentStep] = useState(0);
  const formSchema = generateZodSchema(formData.questions as QuestionInput[]);
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
      defaultValues: formState, // Use default values to persist state
    });

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
            setFormState(form.getValues()); // Update form state when moving to previous step
          },
        });
      }
    };

    function onSubmit(data: z.infer<typeof formSchema>) {
      try {
        toast.success(JSON.stringify(data, null, 2));
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    }

    return (
      <div className="h-full w-full flex items-center justify-center flex-col bg-emerald-200">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-5 md:px-20 h-full flex items-center justify-center w-full"
          >
            <div className="w-full " ref={formRef}>
              {formData.questions.map((field, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 w-full ${
                    currentStep === index ? "" : "hidden"
                  }`}
                >
                  <span>{index + 1}</span>
                  <ArrowRight />
                  <div className="space-y-4 w-full">
                    <Label className="space-y-3">
                      <h3 className="text-xl md:text-2xl font-medium">
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-destructive ml-1">*</span>
                        )}
                      </h3>
                      {field.description ? (
                        field.description
                      ) : (
                        <p className="text-foreground/35 italic text-xl">
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
                                index
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
                  </div>
                </div>
              ))}
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-4 mx-auto flex justify-center">
              <div className="bg-white rounded-sm p-1 shadow-md">
                <Button
                  type="button"
                  className="p-1 rounded-[0px] bg-white text-gray-500 hover:bg-gray-100 shadow-none"
                  onClick={prev}
                  disabled={currentStep === 0}
                >
                  <ChevronUp size={30} />
                </Button>
                {currentStep < formData.questions.length - 1 ? (
                  <Button
                    type="button"
                    onClick={next}
                    className="p-1 rounded-[0px] bg-white text-gray-500 hover:bg-gray-100 shadow-none"
                  >
                    <ChevronDown size={30} />
                  </Button>
                ) : (
                  <Button type="submit">Submit</Button>
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
