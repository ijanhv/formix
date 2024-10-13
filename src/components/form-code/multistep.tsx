import { themes } from "@/constants";
import { FormType, QuestionType } from "@/schema/zod";

import { generateSteps, getZodSchemaString } from "@/utils/code-gen/zod-schema";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Multistep = ({ formData }: { formData: FormType }) => {
  const schema = getZodSchemaString(formData.screens as QuestionType[]);

  const theme = themes.find((item) => item.id === formData.theme);
  const necessaryInfo = extractNecessaryInfo(formData);

  const steps = generateSteps(formData.screens as QuestionType[]);

  return (
    <div>
      <SyntaxHighlighter
        language="typescript"
        style={nightOwl}
        customStyle={{
          fontSize: "12px",
        }}
      >
        {`import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; 
import gsap from "gsap";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import CustomButton from "./custom-button";

const steps = ${JSON.stringify(steps)}


${schema}

const MultiStepForm = () => {
const formData = ${JSON.stringify(necessaryInfo)}
  const [formState, setFormState] = useState<Record<string, any>>({});

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
 const formRef = useRef(null);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      mode: "onBlur",
      defaultValues: formState,
    });

    const currentScreen = sortedScreens[currentStep];
    const { trigger, getValues } = form;

    const sortedScreens = [...formData.screens].sort((a, b) => {
      if (a.type === "welcomeScreen") return -1;
      if (b.type === "welcomeScreen") return 1;
      if (a.type === "endScreen") return 1;
      if (b.type === "endScreen") return -1;
      return (a.order || 0) - (b.order || 0);
    });
    const steps = generateSteps(questionScreens as QuestionType[]);

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

    const next = async () => {
      if (
        currentScreen.type !== "welcomeScreen" &&
        currentScreen.type !== "endScreen"
      ) {
        const questionIndex = questionScreens.findIndex(
          (screen) => screen.id === currentScreen.id
        );

        const fields = steps[questionIndex].fields as Array<
          keyof z.infer<typeof formSchema>
        >;

        // const fields = steps[questionIndex].fields;
        const output = await trigger(fields, { shouldFocus: true });

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

    async function onSubmit(data: z.infer<typeof formSchema>) {
      try {
        await axios.post(your-api-url/api/v1/form/${formData.id}/responses, {
          responseData: data,
          id: formData.id,
        });

        const endScreenIndex = sortedScreens.findIndex(
          (screen) => screen.type === "endScreen"
        );
        if (endScreenIndex !== -1) {
          setCurrentStep(endScreenIndex);
        }
      } catch (error) {}
    }

 return (
 <div className="h-screen w-full">
 ${
   theme?.backgroundImage
     ? `<Image
  fill
  alt="Background"
  unoptimized
  src={${theme.backgroundImage}}
  className="h-full w-full object-cover"
/>

`
     : ``
 }
   <div
        className={"h-full ${theme?.textColor} ${theme?.backgroundColor} ${formData.fontFamily} w-full flex items-center justify-center flex-col"}
      >
        {form && (
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full flex items-center justify-center w-full"
          >
            <div className="flex flex-col-reverse md:flex-row w-full gap-10">
              <div className="w-full" ref={formRef}>
                {sortedScreens.map((screen, index) => (
                  <div
                    key={screen.id}
                    
className={\`flex items-center h-full w-full \${currentStep === index ? "" : "hidden"}\`}
                  >
                    <div className="flex items-center w-full gap-10 lg:flex-row flex-col-reverse">
                      <div className="flex w-full items-start gap-1 md:gap-5 px-5 md:px-20 ">
                        {renderScreen(screen, index)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* @ts-ignore */}
              {currentScreen?.image && (
                <div
                  className={\`transition-all duration-700 transform h-[250px] sm:h-[400px] w-screen md:w-full lg:h-screen lg:w-full relative\`}
                >
                  <Image
                    // @ts-ignore
                    src={currentScreen.image}
                    alt="image"
                    fill
                    unoptimized
                    className="object-cover h-full w-full"
                  />
                </div>
              )}
            </div>

            {currentScreen.type !== "endScreen" && (
              <div className="fixed bottom-0 left-0 right-20 p-4 inset-x-3 w-full mx-auto flex items-center justify-center">
                <div className={\`bg-white rounded-sm p-1 shadow-md\`}>
                  <CustomButton
                    theme={theme}
                    type="button"
                    text={<ChevronUp size={30} />}
                    onClick={prev}
                    disabled={currentStep === 0}
                  />
                  {currentStep < steps.length && (
                    <CustomButton
                      theme={theme}
                      text={<ChevronDown size={30} />}
                      onClick={next}
                    />
                  )}
                  {currentStep === steps.length && (
                    <Button
                      type="submit"
                      className="shadow-none text-base text-gray-500 bg-white hover:bg-gray-200 transition-colors duration-200"
                    >
                      <Check size={30} />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </form>
        </Form>
      </div>
</div>

        }

        export default MultiStepForm;


const renderScreen = (screen: QuestionType, index: number) => {
  // @ts-ignore
  if (screen.type === "welcomeScreen" || screen.type === "endScreen") {
    return (
      <div className="flex flex-col gap-6 items-center justify-center w-full mx-auto max-w-3xl">
        <h3 className="text-2xl md:text-3xl lg:text-4xl text-center font-medium">
          {/* @ts-ignore */}
          {screen.title}
        </h3>
        <p className={"${theme?.textColor} text-base md:text-lg  text-center font-normal"}>
          {/* @ts-ignore */}
          {screen.description}
        </p>
        {/* @ts-ignore */}
        {screen.type === "welcomeScreen" && (
          <Button
            type="button"
            onClick={next}
            className={\`px-4 py-3 rounded-sm shadow-none flex items-center gap-1 text-base ${theme?.okButton} hover:${theme?.okButton} transition-colors duration-200\`}
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
    <div className="space-y-5 w-full mx-auto max-w-3xl">
      <Label className="flex flex-col text-left gap-4">
        <h3 className="text-2xl md:text-3xl lg:text-5xl font-medium">
          {screen.title}{" "}
          {screen.required && (
            <span className="text-destructive ml-1">*</span>
          )}
        </h3>
        {screen.description && (
          <p className={"${theme?.textColor} text-base md:text-lg  "}>
            {screen.description}
          </p>
        )}
      </Label>

      <FormField  
        control={form.control}
        name={\`form_element_\${questionIndex}\`}
        render={({ field: formField }) => (
          <FormItem>
            <FormControl>
              renderFormField(screen, form, questionIndex, theme)}
            </FormControl>
          </FormItem>
        )}
      />

      {questionIndex < questionScreens.length - 1 && (
        <Button
          type="button"
          onClick={next}
          className={\`px-2 rounded-sm shadow-none flex items-center gap-1 text-base ${theme?.okButton} hover:${theme?.okButton} transition-colors duration-200\`}
        >
          OK <Check />
        </Button>
      )}
    </div>
  );
};
`}
      </SyntaxHighlighter>
    </div>
  );
};

export default Multistep;

const extractNecessaryInfo = (formData: FormType) => {
  const screensRefined = formData.screens
    .map((screen: any) => {
      const baseInfo = {
        type: screen.type,
        title: screen.title,
        order: screen?.order,
        options: screen?.options,
        required: screen?.required,
        description: screen?.description,
      };

      switch (screen.type) {
        case "welcomeScreen":
          return {
            ...baseInfo,
            description: screen.description,
            buttonText: screen.buttonText,
          };
        case "short_text":
        case "email":
        case "website":
        case "dropdown":
          return {
            ...baseInfo,
            required: screen.required,
          };
        case "endScreen":
          return {
            ...baseInfo,
            description: screen.description,
          };
        default:
          return null;
      }
    })
    .filter(
      (screen) =>
        screen !== null && Object.values(screen).every((value) => value != null)
    );
  return {
    name: formData.name,
    theme: formData.theme,
    fontFamily: formData.fontFamily,
    screens: screensRefined,
  };
};
