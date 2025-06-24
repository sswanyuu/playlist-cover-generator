import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";

const LEONARDO_API_KEY = process.env.LEONARDO_API_KEY;
const LEONARDO_API_URL = "https://cloud.leonardo.ai/api/rest/v1/generations";

export async function GET(request: NextRequest) {
  const generationId = request.nextUrl.searchParams.get("id");

  if (!generationId) {
    return NextResponse.json(
      { error: "Missing generation ID" },
      { status: 400 }
    );
  }

  try {
    // Use mock data in development
    if (config.leonardo.useMockData) {
      console.log("Using mock data for generation result");

      // Simulate completed generation with mock image
      if (generationId === config.leonardo.mockGenerationId) {
        return NextResponse.json({
          status: "COMPLETE",
          imageUrl: `${config.leonardo.mockImageUrl}?random=${Date.now()}`,
        });
      }

      // For other generation IDs, return pending
      return NextResponse.json({ status: "PENDING" });
    }

    const resultResponse = await fetch(`${LEONARDO_API_URL}/${generationId}`, {
      headers: {
        Authorization: `Bearer ${LEONARDO_API_KEY}`,
      },
    });

    if (!resultResponse.ok) {
      throw new Error("Failed to fetch generation result");
    }

    const resultData = await resultResponse.json();
    if (resultData.generations_by_pk.status === "COMPLETE") {
      const imageUrl = resultData.generations_by_pk.generated_images[0].url;
      return NextResponse.json({ status: "COMPLETE", imageUrl });
    }

    return NextResponse.json({ status: resultData.generations_by_pk.status });
  } catch (error) {
    console.error("Error fetching generation result:", error);
    return NextResponse.json(
      { error: "Error fetching result" },
      { status: 500 }
    );
  }
}
