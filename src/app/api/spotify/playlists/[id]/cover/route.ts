import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { imageBase64 } = await request.json();
    const { id } = await context.params;

    // Check image size (Spotify has a 256KB limit)
    const imageSizeBytes = (imageBase64.length * 3) / 4;
    const imageSizeKB = Math.round(imageSizeBytes / 1024);

    if (imageSizeBytes > 256 * 1024) {
      return NextResponse.json(
        {
          error: `Image too large: ${imageSizeKB}KB. Spotify requires images under 256KB.`,
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${id}/images`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "image/jpeg",
        },
        body: imageBase64,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update playlist cover");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating playlist cover:", error);
    return NextResponse.json(
      { error: "Failed to update playlist cover" },
      { status: 500 }
    );
  }
}
