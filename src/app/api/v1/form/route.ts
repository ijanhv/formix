import prisma from "@/lib/prisma";
import { formSchema } from "@/schema/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const parsedData = formSchema.parse(formData);

    const createdForm = await prisma.form.create({
      data: {
        fontColor: parsedData.fontColor,
        textColor: parsedData.textColor,
        questions: {
          create: parsedData.questions.map((question) => ({
            // id: question.id || undefined,
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
    const forms = await prisma.form.findMany({
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
