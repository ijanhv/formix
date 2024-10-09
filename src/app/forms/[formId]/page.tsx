import React from "react";

import FormPreview from "@/components/form/preview";
import Image from "next/image";
import { apiUrl, themes } from "@/constants";
import { FormType } from "@/schema/zod";

export default async function FormPage({
  params,
}: {
  params: {
    formId: string;
  };
}) {
  const res = await fetch(`${apiUrl}/api/v1/form/${params.formId}`, {
    cache: "no-store",
  });

  const formData = await res.json();

  if (!formData) {
    return <div>Form not found</div>;
  }

  const theme = themes.find((item) => item.id === formData.theme);

  return (
    <div className="h-screen w-full ">
      {theme?.backgroundImage && (
        <Image
          fill
          alt="bg"
          unoptimized
          src={theme.backgroundImage}
          className="h-full w-full object-cover"
        />
      )}
      <FormPreview formData={formData as FormType} theme={theme as Theme} />
    </div>
  );
}
