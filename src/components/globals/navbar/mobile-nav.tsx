"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";
import { navLinks } from "@/utils/data";
import Link from "next/link";
import Logo from "./logo";
import ThemeToggle from "@/components/theme-toggle";

// interface IMobileNavbar {
//   data: IUser;
//   logOut: {
//     (): void;
//   };
// }

const MobileNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number>(0);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  //   const handleLogout = () => {
  //     logOut();
  //     setIsOpen(false);
  //   };

  useEffect(() => {
    // Function to update viewport height
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    // Set initial height
    updateViewportHeight();

    // Update height on resize
    window.addEventListener("resize", updateViewportHeight);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="lg:hidden mx-4 ">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent
        style={{ height: viewportHeight }}
        className="w-[20rem] flex flex-col"
      >
        <SheetHeader className="text-left flex items-center gap-3  flex-row">
          <Logo /> <ThemeToggle />
        </SheetHeader>

        <div className="flex-grow overflow-y-auto flex flex-col gap-5 scrollbar scrollbar-w-0">
          <div className="max-w-[20rem] w-full mx-auto gap-6 flex flex-col justify-center items-start">
            <div className="flex flex-col  text-left items-start gap-5">
              {navLinks.map((item, index) => (
                <Link
                  onClick={() => setIsOpen(false)}
                  href={item.link}
                  key={index}
                  className="text-base text-left"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
