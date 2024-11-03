import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link className="text-azul font-bold text-xl" href="/">
      <Image
        width={100}
        height={100}
        src="formix.svg"
        className="h-8 w-8"
        alt="logo"
      />
    </Link>
  );
};

export default Logo;
