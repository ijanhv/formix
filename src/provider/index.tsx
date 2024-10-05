"use client";
import React from "react";
import TanStackProvider from "./tanstack";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/ui/theme-provider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TanStackProvider>
        <SessionProvider>{children}</SessionProvider>
      </TanStackProvider>
    </ThemeProvider>
  );
};

export default Provider;
