import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch both playlists and current user info in parallel
    const [playlistsResponse, userResponse] = await Promise.all([
      fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }),
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }),
    ]);

    if (!playlistsResponse.ok || !userResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const playlistsData = await playlistsResponse.json();
    const userData = await userResponse.json();

    // Add ownership and updatable status to each playlist
    const enrichedPlaylists = playlistsData.items.map(
      (playlist: { owner: { id: string } }) => ({
        ...playlist,
        isOwned: playlist.owner.id === userData.id,
        canUpdateCover: playlist.owner.id === userData.id,
      })
    );

    return NextResponse.json({
      ...playlistsData,
      items: enrichedPlaylists,
      currentUser: userData,
    });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return NextResponse.json(
      { error: "Failed to fetch playlists" },
      { status: 500 }
    );
  }
}
