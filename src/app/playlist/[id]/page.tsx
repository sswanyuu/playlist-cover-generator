"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "antd";
import styled from "@emotion/styled";
import { ArrowLeftOutlined } from "@ant-design/icons";
import TrackList from "@/app/components/TrackList";
import CoverGenerator from "@/app/components/CoverGenerator";

const PlaylistContainer = styled.div`
  padding: 24px;
`;

const BackButton = styled(Button)`
  margin-bottom: 24px;
  background-color: ${({ theme }) => theme.token.colorBgContainer};
  border: none;
  &:hover {
    background-color: ${({ theme }) => theme.token.colorBgContainer} !important;
    opacity: 0.8;
  }
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
  const router = useRouter();
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

  const handleCoverUpdate = async (imageUrl: string) => {
    const response = await fetch(`/api/spotify/playlists/${id}/cover`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
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
      <BackButton icon={<ArrowLeftOutlined />} onClick={() => router.push("/")}>
        Back to Home
      </BackButton>
      <CoverGenerator
        playlist={playlist}
        tracks={tracks}
        onCoverUpdate={handleCoverUpdate}
      />
      <TrackList tracks={tracks} loading={loading} />
    </PlaylistContainer>
  );
}
