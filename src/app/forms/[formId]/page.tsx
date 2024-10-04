import React from "react";

import prisma from "@/lib/prisma";

import FormPreview from "@/components/form/preview";
import { FormInput } from "@/schema/zod";
import Image from "next/image";
import { themes } from "@/constants";

export default async function FormPage({
  params,
}: {
  params: {
    formId: string;
  };
}) {
  const formData = await prisma.form.findFirst({
    where: {
      id: params.formId,
    },
    include: {
      questions: true,
    },
  });

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
      <FormPreview formData={formData as FormInput} theme={theme as Theme} />
    </div>
  );
}
