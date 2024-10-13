import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
// app/api/form/[id]/route.ts
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 403 });
    }

    const { published } = await req.json();

    const form = await prisma.form.findFirst({
      where: { id: params.id },
      include: {
        screens: true,
      },
    });

    if ((form?.screens?.length ?? 0) > 2) {
      return new NextResponse("Please add more slides to continue", {
        status: 500,
      });
    }
    const updatedForm = await prisma.form.update({
      where: { id: params.id },
      data: {
        published,
      },
    });

    return NextResponse.json({ updatedForm });
  } catch (error) {
    console.error("Error updating form:", error);
    return new NextResponse("Error updating form", { status: 500 });
  }
}
