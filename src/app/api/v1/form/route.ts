import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { createFormSchema } from "@/schema/zod";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 403 });
    }
    const user = session.user;

    const formData = await req.json();
    const parsedData = createFormSchema.parse(formData);

    const createdForm = await prisma.form.create({
      data: {
        userId: user.id,
        name: parsedData.name,
      },
    });

    return NextResponse.json(createdForm, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 403 });
    }
    const user = session.user;

    const forms = await prisma.form.findMany({
      where: {
        userId: user.id,
      },
      include: {
        screens: {
          include: {
            options: true,
          },
        },
      },
    });

    return NextResponse.json(forms, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch forms" },
      { status: 500 }
    );
  }
}
