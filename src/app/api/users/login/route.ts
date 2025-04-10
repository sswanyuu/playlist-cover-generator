import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { id },
    });

    // If user doesn't exist, create a new one with default credits
    if (!user) {
      user = await prisma.user.create({
        data: {
          id,
          credits: 5, // Default credit value
        },
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in login/creation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
