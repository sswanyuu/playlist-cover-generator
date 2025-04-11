import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const LEONARDO_API_KEY = process.env.LEONARDO_API_KEY;
const LEONARDO_API_URL = "https://cloud.leonardo.ai/api/rest/v1/generations";

// For testing purposes
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get user and check credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user || user.credits < 1) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 402 }
      );
    }

    // Reduce credits
    await prisma.user.update({
      where: { id: session.user.id },
      data: { credits: { decrement: 1 } },
    });

    const { playlistName, trackNames } = await request.json();

    // For testing purpose, don't remove this before productising
    // return NextResponse.json({ imageUrl: "https://picsum.photos/500" });
    // return NextResponse.json({
    //   imageUrl:
    //     "https://cdn.leonardo.ai/users/ee2e4910-360b-438c-9672-e3df73c0c6fc/generations/fbd9fe46-1f96-4876-bc59-d3726f15f81f/Leonardo_Phoenix_10_Create_a_vibrant_aesthetic_and_c_0.jpg",
    // });
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
        width: 256,
        height: 256,
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

    // Poll for the result
    let imageUrl = null;
    let attempts = 0;
    const maxAttempts = 10;

    while (!imageUrl && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
      const resultResponse = await fetch(
        `${LEONARDO_API_URL}/${generationId}`,
        {
          headers: {
            Authorization: `Bearer ${LEONARDO_API_KEY}`,
          },
        }
      );

      if (!resultResponse.ok) {
        throw new Error("Failed to fetch generation result");
      }

      const resultData = await resultResponse.json();
      if (resultData.generations_by_pk.status === "COMPLETE") {
        imageUrl = resultData.generations_by_pk.generated_images[0].url;
        break;
      }

      attempts++;
    }

    if (!imageUrl) {
      throw new Error("Generation timed out");
    }
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
