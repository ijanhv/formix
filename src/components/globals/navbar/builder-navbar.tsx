import React from "react";
import Container from "../container";
import Logo from "./logo";
import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BuilderNavbar = () => {
  return (
    <header className=" h-14 sticky top-0 inset-x-0 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50">
      <Container reverse>
        <div className="flex items-center justify-between h-full mx-auto container w-full   sm:px-6 md:px-10  xl:px-4  lg:max-w-8xl">
          <div className="flex items-start w-full">
            <Logo />
          </div>

          <div className="  flex items-center gap-2">
            <ThemeToggle />

            <Link href="/auth/login" className="hidden lg:block">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default BuilderNavbar;
