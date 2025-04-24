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
