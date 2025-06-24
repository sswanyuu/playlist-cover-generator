import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/playlists/[id]/images - Get all generated images for a playlist
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: spotifyPlaylistId } = await context.params;

    // Find playlist record - don't create if it doesn't exist
    const playlist = await prisma.playlist.findUnique({
      where: { spotifyId: spotifyPlaylistId },
      include: {
        generatedImages: {
          orderBy: { createdAt: "desc" },
          take: 10, // Limit to last 10 images
        },
      },
    });

    // If no playlist found, return empty results
    if (!playlist) {
      return NextResponse.json({
        images: [],
        hasHistory: false,
      });
    }

    return NextResponse.json({
      images: playlist.generatedImages,
      hasHistory: playlist.generatedImages.length > 0,
    });
  } catch (error) {
    console.error("Error fetching playlist images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

// POST /api/playlists/[id]/images - Save a new generated image
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: spotifyPlaylistId } = await context.params;
    const { imageUrl, style, playlistName } = await request.json();

    // Find or create playlist record
    let playlist = await prisma.playlist.findUnique({
      where: { spotifyId: spotifyPlaylistId },
    });

    if (!playlist) {
      playlist = await prisma.playlist.create({
        data: {
          spotifyId: spotifyPlaylistId,
          name: playlistName || "Unknown Playlist",
          userId: session.user.id,
        },
      });
    } else if (playlistName && playlist.name !== playlistName) {
      // Update playlist name if provided and different
      playlist = await prisma.playlist.update({
        where: { id: playlist.id },
        data: { name: playlistName },
      });
    }

    // Create new generated image record
    const generatedImage = await prisma.generatedImage.create({
      data: {
        imageUrl,
        style,
        playlistId: playlist.id,
      },
    });

    return NextResponse.json({
      success: true,
      image: generatedImage,
    });
  } catch (error) {
    console.error("Error saving generated image:", error);
    return NextResponse.json(
      { error: "Failed to save image" },
      { status: 500 }
    );
  }
}
