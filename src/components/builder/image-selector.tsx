import { defaultImages } from "@/constants/images";
import { Check } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type FormPickerProps = {
  onClick: (value: string) => void;
};

const ImageSelector = ({ onClick }: FormPickerProps) => {
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  return (
    <div className="relative">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {defaultImages.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75"
            onClick={() => {
              setSelectedImageId(image.id);
              onClick(
                `${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`
              );
            }}
          >
            <Image
              src={image.urls.thumb}
              fill
              unoptimized
              alt="Unsplash image"
              className="rounded-sm object-cover"
            />
            {image.id === selectedImageId && (
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

export default ImageSelector;
