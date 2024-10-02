import { footerLinks } from "@/utils/data";
import Link from "next/link";
import React from "react";

const Links = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-14 w-full">
      {footerLinks.map((section, index) => (
        <div key={index}>
          <h3 className="font-bold text-xl ">{section.title}</h3>
          <ul className="mt-4 flex flex-col gap-2">
            {section.links.map((link, idx) => (
              <Link key={idx} href={link.href} className="text-base truncate">
                {link.name}
              </Link>
            ))}
          </ul>
        </div>
      ))}

      {/* <div className="hidden lg:block">
        <Address />
      </div> */}
    </div>
  );
};

export default Links;
