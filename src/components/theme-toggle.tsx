"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component is mounted before accessing the theme
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // Don't render the button until mounted to avoid hydration issues
  if (!isMounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 border border-primary/50 rounded-full"
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5 text-primary" />
      ) : (
        <Sun className="h-5 w-5 text-primary" />
      )}
    </Button>
  );
}
