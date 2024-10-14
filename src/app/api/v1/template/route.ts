import prisma from "@/lib/prisma";
import { Option, Screen as PrismaScreen } from "@prisma/client";
import { customAlphabet } from "nanoid";
import { NextResponse } from "next/server";

interface Screen extends PrismaScreen {
  options?: Option[];
}

export async function POST(req: Request) {
  try {
    const nanoid = customAlphabet("1234567890abcdef", 10);

    const formData = await req.json();

    const newTemplate = await prisma.template.create({
      data: {
        id: nanoid(),
        name: formData.name,
        theme: formData.theme,
        description: formData.description,
        fontFamily: formData.fontFamily,
        screens: {
          create: formData?.screens?.map((screen: Screen) => ({
            type: screen.type,
            title: screen.title,
            description: screen.description,
            buttonText: screen.buttonText,
            scale: screen.scale,
            order: screen.order,
            required: screen.required,
            rightLabel: screen.rightLabel,
            leftLabel: screen.leftLabel,
            options: {
              create: screen?.options?.map((option: Option) => ({
                label: option.label,
                value: option.value,
                imageUrl: option.imageUrl,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json({ template: newTemplate }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
