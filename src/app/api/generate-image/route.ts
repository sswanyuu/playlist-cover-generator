import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const LEONARDO_API_KEY = process.env.LEONARDO_API_KEY;
const LEONARDO_API_URL = "https://cloud.leonardo.ai/api/rest/v1/generations";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user || user.credits < 1) {
      return NextResponse.json({ error: "Insufficient credits" }, { status: 402 });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { credits: { decrement: 1 } },
    });

    const { playlistName, trackNames } = await request.json();

    // For testing purpose, don't remove this before productising
    return NextResponse.json({ generationId: "78ccc2de-da6c-4cef-bad1-b081704f2857" });
    // Create generation
    const generationResponse = await fetch(LEONARDO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LEONARDO_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `
          Create a vibrant, aesthetic, and contemporary playlist cover image suitable for streaming platforms like Spotify or Apple Music. 
          Reflect the genres, moods, and overall feelings suggested by the 
          playlist name: ${playlistName} and these tracks: ${trackNames}. 
          ⚠️ Do **not** include any text, writing, characters, numbers, words, letters, logos, or symbols in any language — **no visible text or typography of any kind**.
          The image must be fully visual, abstract or illustrative. It should convey mood and emotion **purely through visuals**, without any graphical overlays, album titles, or text-based designs.
          Use color, texture, composition, and visual themes to express the playlist — but the result must be 100% text-free.
        `,
        alchemy: true,
        width: 512,
        height: 512,
        modelId: "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3",
        num_images: 1,
        presetStyle: "NONE",
        expandedDomain: true,
      }),
    });
    if (!generationResponse.ok) {
      throw new Error("Failed to create generation");
    }

    const generationData = await generationResponse.json();
    const generationId = generationData.sdGenerationJob.generationId;

    return NextResponse.json({ generationId });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json({ error: "Failed to start generation" }, { status: 500 });
  }
}
