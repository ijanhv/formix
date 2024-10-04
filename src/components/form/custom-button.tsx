import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you're using a custom button component from a UI library

type CustomButtonProps = {
  theme: Theme;
  text: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const CustomButton = ({
  theme,
  text,
  onClick,
  disabled,
  type = "button",
}: CustomButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`p-1 rounded-sm shadow-none bg-white hover:bg-gray-200 transition-colors duration-200`}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
