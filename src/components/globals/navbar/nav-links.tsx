import { navLinks } from "@/utils/data";
import Link from "next/link";
import React from "react";

const NavLinks = () => {
  return (
    <div className="hidden lg:flex items-center gap-5">
      {navLinks.map((item, index) => (
        <Link href={item.link} key={index} className="text-sm">
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
