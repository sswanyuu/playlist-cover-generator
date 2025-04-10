import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { imageUrl } = await request.json();

    // First, fetch the image from the URL
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    // Then, upload it to Spotify
    const { id } = await context.params;
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${id}/images`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "image/jpeg",
        },
        body: base64Image,
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
