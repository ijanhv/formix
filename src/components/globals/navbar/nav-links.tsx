import { navLinks } from "@/utils/data";
import Link from "next/link";
import React from "react";

const NavLinks = () => {
  return (
    <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <ul className="flex items-center justify-center gap-8">
        {navLinks.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="hover:text-foreground/80 text-sm"
          >
            {item.title}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
