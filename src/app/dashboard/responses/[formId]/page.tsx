import Container from "@/components/common/container";
import ResponsesList from "@/components/table/responses/responses-list";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata | null> {
  return {
    title: `Formix | Form Responses`,
    description:
      "Formix empowers developers to create elegant, responsive forms by simply selecting themes, fonts, and input types.",
    icons: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon-32x32.png" },
      { url: "/favicon-16x16.png" },
    ],
    openGraph: {
      title: `Formix | My Workspace`,
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

export default function ResponsesPage({
  params,
}: {
  params: {
    formId: string;
  };
}) {
  return (
    <Container>
      <div className="max-w-7xl min-h-screen mx-auto px-5">
        <ResponsesList formId={params.formId} />
      </div>
    </Container>
  );
}
