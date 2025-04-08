import { NextResponse } from "next/server";

const LEONARDO_API_KEY = process.env.LEONARDO_API_KEY;
const LEONARDO_API_URL = "https://cloud.leonardo.ai/api/rest/v1/generations";

// For testing purposes
export async function POST(request: Request) {
  return NextResponse.json({ imageUrl: "https://picsum.photos/500" });
}
export async function POST2(request: Request) {
  if (!LEONARDO_API_KEY) {
    return NextResponse.json(
      { error: "Leonardo API key not configured" },
      { status: 500 }
    );
  }

  try {
    const { playlistName, trackNames } = await request.json();

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
