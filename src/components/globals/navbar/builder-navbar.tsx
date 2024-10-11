"use client";
import React from "react";
import Container from "../container";
import Logo from "./logo";
import ThemeToggle from "@/components/theme-toggle";
import { useSession } from "next-auth/react";
import User from "./user";
import { usePathname } from "next/navigation";

const BuilderNavbar = () => {
  const session = useSession();
  const pathname = usePathname();
  return (
    <header className=" h-14 sticky top-0 inset-x-0 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50">
      <Container reverse>
        <div
          className={`flex items-center justify-between h-full mx-auto w-full   sm:px-6 md:px-10  xl:px-4 ${(pathname.includes("/dashboard/responses") || pathname.includes("/dashboard/code")) && "max-w-7xl"} `}
        >
          <div className="flex items-start w-full">
            <Logo />
          </div>

          <div className="  flex items-center gap-2">
            <ThemeToggle />

            {session.data?.user && <User />}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default BuilderNavbar;
