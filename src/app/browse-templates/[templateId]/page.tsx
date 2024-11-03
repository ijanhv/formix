import React from "react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { themes } from "@/constants";
import TemplatePreview from "@/components/template/preview";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata | null> {
  return {
    title: `Formix | Browse Templates`,
    description:
      "Formix empowers developers to create elegant, responsive forms by simply selecting themes, fonts, and input types.",
    icons: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon-32x32.png" },
      { url: "/favicon-16x16.png" },
    ],
    openGraph: {
      title: `Formix | Browse Templates`,
      description:
        "Formix empowers developers to create elegant, responsive forms by simply selecting themes, fonts, and input types.",

      images: [
        {
          url: "https://eeoiaaigtkpwkppddqwb.supabase.co/storage/v1/object/public/formix/Screenshot%202024-11-03%20at%2011.13.26%20PM.png?t=2024-11-03T17%3A43%3A38.794Z",
          secureUrl:
            "https://eeoiaaigtkpwkppddqwb.supabase.co/storage/v1/object/public/formix/Screenshot%202024-11-03%20at%2011.13.26%20PM.png?t=2024-11-03T17%3A43%3A38.794Z",
          width: 1200,
          height: 630,
          alt: `Formix`,
        },
      ],
    },
  };
}

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
