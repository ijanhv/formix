import React from "react";

import prisma from "@/lib/prisma";

import FormPreview from "@/components/form/preview";
import { FormInput } from "@/schema/zod";

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

  return (
    <div className="h-screen w-full ">
      <FormPreview formData={formData as FormInput} />
    </div>
  );
}
