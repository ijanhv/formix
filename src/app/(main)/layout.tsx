import type { Metadata } from "next";
import "@/app/globals.css";
import React from "react";
import Navbar from "@/components/globals/navbar";
import Footer from "@/components/globals/footer";
import { mangericaRegular } from "@/utils/font";

export const metadata: Metadata = {
  title: "Formix",
  description: "Tailored for Developers, Designed for Everyone",
  icons: ["favicon/favicon.ico", "favicon/favicon-32x32.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`min-h-screen antialiased max-w-full overflow-x-hidden h-full ${mangericaRegular.variable} font-magericaRegular`}
    >
      <Navbar />
      {children}

      <Footer />
    </main>
  );
}
