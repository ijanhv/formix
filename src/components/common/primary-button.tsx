import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const PrimaryButton = ({
  text,
  link,
  size,
}: {
  text: string;
  link: string;
  size: "default" | "sm" | "lg" | "icon" | null | undefined;
}) => {
  return (
    <Link href={link}>
      <Button
        size={size}
        className="py-2 rounded-full bg-blue-voilet px-4 hover:bg-blue-voilet/90 text-sm h-full font-medium"
      >
        {text}
      </Button>
    </Link>
  );
};

export default PrimaryButton;
