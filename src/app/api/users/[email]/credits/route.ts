import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { credits } = await request.json();

    if (typeof credits !== "number") {
      return NextResponse.json(
        { error: "Credits must be a number" },
        { status: 400 }
      );
    }
    const { id } = await params;
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        credits,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user credits:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
