import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { formSchema } from "@/schema/zod";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json(
        {
          message: "Unauthenticated",
        },
        {
          status: 403,
        }
      );
    }
    const user = session.user;

    const formData = await req.json();
    const parsedData = formSchema.parse(formData);

    const createdForm = await prisma.form.create({
      data: {
        userId: user.id,
        fontFamily: parsedData.fontFamily,
        theme: parsedData.theme,
        questions: {
          create: parsedData.questions.map((question) => ({
            type: question.type,
            label: question.label,
            description: question.description,
            required: question.required,
            options: question.options || [],
            image: question.image,
            validationMessage: question.validationMessage,
          })),
        },
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
      return NextResponse.json(
        {
          message: "Unauthenticated",
        },
        {
          status: 403,
        }
      );
    }
    const user = session.user;

    const forms = await prisma.form.findMany({
      where: {
        userId: user.id,
      },
      include: { questions: true },
    });

    return NextResponse.json(forms, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch forms" },
      { status: 500 }
    );
  }
}
