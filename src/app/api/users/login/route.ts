import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If user doesn't exist, create a new one with default credits
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
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
