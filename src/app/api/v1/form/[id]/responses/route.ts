import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate input
    if (!params.id) {
      return NextResponse.json(
        { error: "Form ID is required" },
        { status: 400 }
      );
    }

    // Create a new response linked to the form
    const formResponse = await prisma.formResponse.findMany({
      where: {
        formId: params.id,
      },
    });

    return NextResponse.json(formResponse);
  } catch (error) {
    console.error("Error getting form response:", error);
    return new NextResponse("Error getting form response", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id, responseData } = await req.json();

    // Validate input
    if (!id || !responseData) {
      return NextResponse.json(
        { error: "Form ID and response data are required" },
        { status: 400 }
      );
    }

    // Create a new response linked to the form
    const formResponse = await prisma.formResponse.create({
      data: {
        formId: id,
        responseData,
      },
    });

    return NextResponse.json(formResponse);
  } catch (error) {
    console.error("Error updating form:", error);
    return new NextResponse("Error collecting responses", { status: 500 });
  }
}
