"use client";
import { useGetFormByIdQuery } from "@/hooks/use-form-query";
import React from "react";
import Loader from "../common/loader";
import Error from "../common/error";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FormCode = ({ formId }: { formId: string }) => {
  const { data: form, isPending, isError } = useGetFormByIdQuery(formId);

  if (isPending) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className="py-10 h-full">
      <Tabs defaultValue="welcomeScreen" className="w-full  mb-10">
        <TabsList className="w-full">
          <TabsTrigger value="multi-step.tsx" className="w-full">
            multi-step.tsx
          </TabsTrigger>

          {form.screens.map((screen, index) => (
            <TabsTrigger key={screen.id} value={screen.type} className="w-full">
              {screen.type}.tsx
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="multi-step.tsx">Multistep</TabsContent>
        {form.screens.length > 0 &&
          form?.screens.map((screen) => (
            <TabsContent key={screen.id} value={screen.type}>
              {renderScreen(screen)}
            </TabsContent>
          ))}
      </Tabs>
    </div>
  );
};

export default FormCode;

const renderScreen = (screen: any) => {
  switch (screen.type) {
    case "welcomeScreen":
      return <>Welcome screen code</>;
    case "endScreen":
      return <>End screen code</>;
    default:
      return null;
  }
};
