"use client";
import React from "react";
import { useGetFormByIdQuery } from "@/hooks/use-form-query";
import Loader from "../common/loader";
import Error from "../common/error";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Multistep from "./multistep";
import RenderFormCode from "./render-form-code";
import DropdownCode from "./dropdown-code";
import PictureChoiceCode from "./picture-choice-code";
import { themes } from "@/constants";
import StarRatingCode from "../form-components/star-rating-code";
import OpinionScaleCode from "./opion-scale-code";
import MultipleChoiceCode from "./multiple-choice";
import BooleanComponentCode from "./boolean-code";

const FormCode = ({ formId }: { formId: string }) => {
  const { data: form, isPending, isError } = useGetFormByIdQuery(formId);

  if (isPending) return <Loader />;
  if (isError) return <Error />;

  const screenTypes = form.screens.map((item) => item.type);
  const theme = themes.find((item) => item.id === form.theme);

  // Define custom codes you want to handle separately
  const customCodes = [
    "dropdown",
    "multiple_choice",
    "picture_choice",
    "date",
    "boolean",
    "opinion_scale",
    "rating",
  ];

  return (
    <div className="py-10 h-full flex flex-col gap-3">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Installation Instructions</h2>
        <p className="mb-2">
          To use this component, ensure you have installed the required
          dependencies. Run the following commands in your terminal:
        </p>
        <ol className="list-decimal py-5 pl-4">
          <li>
            <span className="font-medium">Install Shadcn forms:</span>
            <pre className="text-sm  rounded-lg p-2 mt-1">
              npx shadcn@latest add form
            </pre>
          </li>
          <li>
            <span className="font-medium">
              Install Iconify for icon support:
            </span>
            <pre className="text-sm  rounded-lg p-2 mt-1">
              npm install @iconify/react
            </pre>
          </li>

          <li>
            <span className="font-medium">Install Gsap:</span>
            <pre className="text-sm  rounded-lg p-2 mt-1">npm install gsap</pre>
          </li>
        </ol>
      </div>

      <Tabs defaultValue="multi-step.tsx" className="w-full mb-10">
        <TabsList className="w-full">
          <TabsTrigger value="multi-step.tsx" className="w-full">
            multi-step.tsx
          </TabsTrigger>

          <TabsTrigger value="form-code.tsx" className="w-full">
            form-code.tsx
          </TabsTrigger>

          {customCodes
            // @ts-ignore
            .filter((code) => screenTypes.includes(code))
            .map((code) => (
              <TabsTrigger key={code} value={code} className="w-full">
                {code}.tsx
              </TabsTrigger>
            ))}
        </TabsList>

        <TabsContent value="multi-step.tsx">
          <Multistep formData={form} />
        </TabsContent>
        <TabsContent value="form-code.tsx">
          <RenderFormCode form={form} />
        </TabsContent>

        {form.screens.map((screen) => (
          <TabsContent key={screen.id} value={screen.type}>
            {generateCode(screen, theme!)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FormCode;

const generateCode = (screen: any, theme: Theme) => {
  // Normalize screen type for comparison
  const screenType = screen.type.toLowerCase();

  switch (screenType) {
    case "dropdown":
      return <DropdownCode theme={theme} />;
    case "picture_choice":
      return <PictureChoiceCode theme={theme} />;
    case "rating":
      return <StarRatingCode theme={theme} />;
    case "opinion_scale":
      return <OpinionScaleCode theme={theme} />;
    case "boolean":
      return <BooleanComponentCode theme={theme} />;
    case "multiple_choice":
      return <MultipleChoiceCode theme={theme} />;
    default:
      return "// Code not available for this screen type.";
  }
};
