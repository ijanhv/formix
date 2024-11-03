import type { Metadata } from "next";
import "@/app/globals.css";
import React from "react";

import { mangericaRegular } from "@/utils/font";

export async function generateMetadata(): Promise<Metadata | null> {
  return {
    title: `Formix | Authentication`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`min-h-screen antialiased max-w-full overflow-x-hidden h-full ${mangericaRegular.variable} font-magericaRegular`}
    >
      {children}
    </main>
  );
}
