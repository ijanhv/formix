import prisma from "@/lib/prisma";
import React from "react";
import { GlareCard } from "../ui/glare-card";
import Image from "next/image";
import Wrapper from "../globals/wrapper";
import Link from "next/link";

const TemplateList = async () => {
  const templates = await prisma.template.findMany();

  if (!templates) {
    return <div>No templates</div>;
  }
  return (
    <Wrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full">
        {templates.map((item, index) => (
          <Link
            target="_blank"
            href={`/browse-templates/${item.id}`}
            key={index}
          >
            <GlareCard className="flex flex-col gap-4 items-start justify-center py-8 px-6">
              <div className="relative h-[200px] w-full">
                <Image
                  unoptimized
                  fill
                  alt="image"
                  className="h-full w-full absolute inset-0 object-cover rounded-md"
                  src="data:image/jpeg;base64,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"
                />
                <div className="absolute w-full h-full flex items-center justify-center z-40">
                  <p className="font-bold text-white text-lg">{item.name}</p>
                </div>
              </div>

              <p className="font-normal text-base text-neutral-200 ">
                The greatest trick the devil ever pulled was to convince the
                world that he didn&apos;t exist.
              </p>
            </GlareCard>
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};

export default TemplateList;
