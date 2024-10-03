import React from "react";

import Link from "next/link";
import Container from "../container";
import Logo from "./logo";
import MobileNavbar from "./mobile-nav";
import NavLinks from "./nav-links";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

const Navbar = async () => {
  return (
    <header className="px-4 h-14 sticky top-0 inset-x-0 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50">
      <Container reverse>
        <div className="flex items-center justify-between h-full mx-auto container w-full  px-7  sm:px-6 md:px-10  xl:px-4  lg:max-w-8xl">
          <div className="flex items-start">
            <Logo />
          </div>
          <NavLinks />

          <div className="lg:hidden">
            <MobileNavbar />
          </div>

          <div className="  flex items-center gap-4">
            <ThemeToggle />
            <Link href="/builder" className="hidden lg:block">
              <Button>Dashboard</Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
