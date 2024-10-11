import React from "react";
import FormPreview from "@/components/form/preview";
import Image from "next/image";
import { apiUrl, themes } from "@/constants";
import { FormType } from "@/schema/zod";

interface FormPageProps {
  params: {
    formId: string;
  };
}

export default async function FormPage({ params }: FormPageProps) {
  try {
    const res = await fetch(`${apiUrl}/api/v1/form/${params.formId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return <div>Form not found</div>;
    }

    const formData = await res.json();

    if (!formData) {
      return <div>Form not found</div>;
    }

    const theme = themes.find((item) => item.id === formData.theme);

    return (
      <div className="h-screen w-full">
        {theme?.backgroundImage && (
          <Image
            fill
            alt="Background"
            unoptimized
            src={theme.backgroundImage}
            className="h-full w-full object-cover"
          />
        )}
        {/* Render the form preview with form data and theme */}
        <FormPreview formData={formData as FormType} theme={theme as Theme} />
      </div>
    );
  } catch (error) {
    // Log the error and display fallback UI
    console.error("Error fetching form:", error);
    return <div>Form not found</div>;
  }
}
