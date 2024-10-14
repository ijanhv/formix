import React from "react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { themes } from "@/constants";
import TemplatePreview from "@/components/template/preview";

export default async function TemplatePage({
  params,
}: {
  params: {
    templateId: string;
  };
}) {
  const template = await prisma.template.findFirst({
    where: {
      id: params.templateId,
    },
    include: {
      screens: {
        include: {
          options: true,
        },
      },
    },
  });

  if (!template) return <div>Invalid id</div>;

  const theme = themes.find((item) => item.id === template.theme);

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
      {/* @ts-ignore */}
      <TemplatePreview formData={template} theme={theme as Theme} />
    </div>
  );
}
