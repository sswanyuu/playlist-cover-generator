"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styled from "@emotion/styled";
import TrackList from "@/app/components/TrackList";
import CoverGenerator from "@/app/components/CoverGenerator";

const PlaylistContainer = styled.div`
  padding: 24px;
`;

interface Track {
  name: string;
  artists: Array<{ name: string }>;
}

interface Playlist {
  images: Array<{ url: string }>;
  name: string;
}

interface SpotifyTrackItem {
  track: Track;
}

export default function PlaylistPage() {
  const { id } = useParams();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tracksResponse, playlistResponse] = await Promise.all([
          fetch(`/api/spotify/playlists/${id}/tracks`),
          fetch(`/api/spotify/playlists/${id}`),
        ]);

        if (!tracksResponse.ok || !playlistResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const tracksData = await tracksResponse.json();
        const playlistData = await playlistResponse.json();
//Todo: do not set the first 15 tracks as the tracks to sent to the cover generator
//Todo: enable the user to select the tracks to send to the cover generator
        setTracks(
          tracksData.items
            .slice(0, 15)
            .map((item: SpotifyTrackItem) => item.track)
        );
        setPlaylist(playlistData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCoverUpdate = async (imageBase64: string) => {
    const response = await fetch(`/api/spotify/playlists/${id}/cover`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageBase64 }),
    });

    if (!response.ok) {
      throw new Error("Failed to update playlist cover");
    }
  };

  if (!playlist) {
    return null;
  }

  return (
    <PlaylistContainer>
      <CoverGenerator
        playlist={playlist}
        tracks={tracks}
        onCoverUpdate={handleCoverUpdate}
      />
      <TrackList tracks={tracks} loading={loading} />
    </PlaylistContainer>
  );
}
