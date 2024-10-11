import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const form = await prisma.form.findFirst({
      where: { id: params.id },
      include: {
        screens: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(form, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch form" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 403 });
    }
    // const user = session.user;

    const { id, theme, published, fontFamily, screens } = await req.json();

    const form = await prisma.form.findFirst({
      where: { id: id },
      include: { screens: true },
    });

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    // Update form with new theme, published status, and font family
    const updatedForm = await prisma.form.update({
      where: { id },
      data: {
        theme,
        published,
        fontFamily,
        screens: {
          deleteMany: {},
          create: screens.map((screen: any) => ({
            id: screen.id,
            type: screen.type,
            title: screen.title,
            description: screen.description,
            buttonText: screen.buttonText,
            order: screen.order || undefined,
            required: screen.required,
            scale: screen.scale,
            options: {
              create: screen.options?.map((option: any) => ({
                // id: option.id,
                label: option.label,
                value: option.value,
                imageUrl: option.imageUrl,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json({ updatedForm });
  } catch (error) {
    console.error("Error updating form:", error);
    return new NextResponse("Error updating form", { status: 500 });
  }
}
