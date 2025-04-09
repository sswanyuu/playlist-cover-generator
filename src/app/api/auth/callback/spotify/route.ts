import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log("🚀🚀🚀 ~~~ ~ route.ts:9 ~ GET ~ session:", session);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }

    // Check if user exists in our database
    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    // If user doesn't exist, create a new one with default credits
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          credits: 5, // Default credit value
        },
      });
      console.log("🚀🚀🚀 ~~~ ~ route.ts:28 ~ GET ~ user:", user);
    }

    // Redirect to home page with success message
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Error in auth callback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
