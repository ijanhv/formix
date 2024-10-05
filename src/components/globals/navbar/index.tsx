"use client";
import React from "react";

import Link from "next/link";
import Container from "../container";
import Logo from "./logo";
import MobileNavbar from "./mobile-nav";
import NavLinks from "./nav-links";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <header className=" h-14 sticky top-0 inset-x-0 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50">
      <Container reverse>
        <div className="flex items-center justify-between h-full mx-auto container w-full   sm:px-6 md:px-10  xl:px-4  lg:max-w-8xl">
          <div className="flex items-start w-full">
            <Logo />
          </div>
          <NavLinks />

          <div className="  flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            {session.data?.user && (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="">
                  <Button>Dashboard</Button>
                </Link>

                <LogOutIcon
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                />
              </div>
            )}

            {!session.data?.user && (
              <div className="flex items-center gap-2">
                <Button onClick={() => router.push("/auth")}>Signin</Button>
                <Link
                  href={{
                    pathname: "/auth",
                    query: {
                      authType: "signUp",
                    },
                  }}
                >
                  <Button className="hidden md:block" variant={"ghost"}>
                    Signup
                  </Button>
                </Link>
              </div>
            )}
            <div className="lg:hidden">
              <MobileNavbar />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
