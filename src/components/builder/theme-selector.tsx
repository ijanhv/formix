import { themes } from "@/constants";
import { formSchema } from "@/schema/zod";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type FormPickerProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

const ThemeSelector = ({ form }: FormPickerProps) => {
  return (
    <div className="relative">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {themes.map((theme, index) => (
          <div
            key={index}
            className="group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75"
            onClick={() => {
              form.setValue("theme", theme.id);
            }}
          >
            {theme?.backgroundImage !== undefined ? (
              <Image
                src={theme?.backgroundImage}
                fill
                unoptimized
                alt="Unsplash image"
                className="rounded-sm object-cover"
              />
            ) : (
              <div
                className={`h-full w-full rounded-sm ${theme.backgroundColor}`}
              />
            )}

            {form.watch("theme") === theme.id && (
              <div className="absolute inset-y-0 flex h-full w-full items-center justify-center bg-black/30">
                <Check className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
