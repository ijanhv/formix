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

    // Fetch the form and its screens
    const form = await prisma.form.findFirst({
      where: {
        id: params.id,
      },
      include: {
        screens: true,
      },
    });

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
    const formResponses = await prisma.formResponse.findMany({
      where: {
        formId: params.id,
      },
    });

    // Map responses to form questions
    const mappedResponses = formResponses.map((response) => {
      const responseData = response.responseData as {
        [key: string]: any;
      } | null;
      const mappedData: { [key: string]: any } = {};

      // Map response data to corresponding form questions
      form?.screens.forEach((screen, index) => {
        if (screen.order) {
          const responseKey = `form_element_${screen.order - 1}`;
          mappedData[screen.title] = responseData
            ? responseData[responseKey]
            : null;
        }
      });

      return {
        id: response.id,
        submittedAt: response.submittedAt,
        responseData: mappedData,
      };
    });

    return NextResponse.json({ form, responses: mappedResponses });
  } catch (error) {
    console.error("Error getting form response:", error);
    return new NextResponse("Error getting form response", { status: 500 });
  }
}
