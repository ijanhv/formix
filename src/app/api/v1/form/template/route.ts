import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { customAlphabet } from "nanoid";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// create form from template Id
export async function POST(req: Request) {
  const nanoid = customAlphabet("1234567890abcdef", 10);

  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 403 });
  }

  const formData = await req.json();

  const template = await prisma.template.findUnique({
    where: { id: formData.templateId },
    include: { screens: { include: { options: true } } },
  });

  if (!template) {
    return NextResponse.json({ message: "No template found" }, { status: 403 });
  }

  const newForm = await prisma.form.create({
    data: {
      id: nanoid(),
      name: formData.name,
      theme: template.theme,
      fontFamily: template.fontFamily,
      user: { connect: { id: session.user.id } },
      screens: {
        create: template.screens.map((screen) => ({
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
            create: screen.options.map((option) => ({
              label: option.label,
              value: option.value,
              imageUrl: option.imageUrl,
            })),
          },
        })),
      },
    },
  });
  return NextResponse.json({ form: newForm }, { status: 201 });
}
