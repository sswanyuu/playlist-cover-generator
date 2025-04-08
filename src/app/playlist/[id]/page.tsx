"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Typography, List, theme, Image, Button, message } from "antd";
import styled from "@emotion/styled";
import {
  ArrowRightOutlined,
  LoadingOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { purpleButtonColors } from "@/app/theme";

const { Title, Text } = Typography;
const { useToken } = theme;

const PlaylistContainer = styled.div`
  padding: 24px;
`;

const PreviewSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 24px;
  background-color: ${({ theme }) => theme.token.colorBgContainer};
  border-radius: ${({ theme }) => theme.token.borderRadius}px;
`;

const ArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: ${({ theme }) => theme.token.colorTextBase};
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

const SetCoverButton = styled(Button)`
  background-color: ${purpleButtonColors.colorPurple};
  border: none;
  margin-bottom: 8px;
  &:hover {
    background-color: ${purpleButtonColors.colorPurpleHover} !important;
  }
  &:active {
    background-color: ${purpleButtonColors.colorPurpleActive} !important;
    transform: scale(0.98);
  }
`;

const GenerateButton = styled(Button)`
  background-color: ${({ theme }) => theme.token.colorPrimary};
  border: none;
  &:hover {
    background-color: ${({ theme }) =>
      theme.token.colorPrimaryHover} !important;
  }
`;

const PreviewBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: ${({ theme }) => theme.token.colorBgContainer};
  border-radius: ${({ theme }) => theme.token.borderRadius}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.token.colorTextSecondary};
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
  const { token } = useToken();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

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

  const handleGenerateImage = async () => {
    if (!playlist?.name || !tracks) return;

    setGenerating(true);
    try {
      const trackNames = tracks
        .map((track) => {
          const name = track.name;
          // truncate artist name to avoid api error
          const featIndex = name.toLowerCase().indexOf("feat.");
          return featIndex !== -1
            ? `"${name.substring(0, featIndex).trim()}"`
            : `"${name}"`;
        })
        .join(", ");

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playlistName: playlist.name,
          trackNames: trackNames,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
      message.success("Image generated successfully!");
    } catch (error) {
      console.error("Error generating image:", error);
      message.error("Failed to generate image");
    } finally {
      setGenerating(false);
    }
  };

  const handleUpdateCover = async () => {
    if (!generatedImage) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/spotify/playlists/${id}/cover`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: generatedImage }),
      });

      if (!response.ok) {
        throw new Error("Failed to update playlist cover");
      }

      message.success("Playlist cover updated successfully!");
    } catch (error) {
      console.error("Error updating playlist cover:", error);
      message.error("Failed to update playlist cover");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <PlaylistContainer>
      <BackButton icon={<ArrowLeftOutlined />} onClick={() => router.push("/")}>
        Back to Home
      </BackButton>
      <PreviewSection>
        <Image
          src={playlist?.images[0]?.url}
          alt="Playlist Cover"
          width={300}
          height={300}
          style={{ objectFit: "cover", borderRadius: token.borderRadius }}
        />
        <ArrowContainer>
          <SetCoverButton
            type="primary"
            size="large"
            disabled={!generatedImage}
            onClick={handleUpdateCover}
            loading={updating}
          >
            Set as Cover
          </SetCoverButton>
          <ArrowLeftOutlined style={{ fontSize: 24 }} />
          <ArrowRightOutlined style={{ fontSize: 24 }} />
          <GenerateButton
            type="primary"
            size="large"
            onClick={handleGenerateImage}
            loading={generating}
            icon={generating ? <LoadingOutlined /> : null}
          >
            Generate Cover Image
          </GenerateButton>
        </ArrowContainer>
        <PreviewBox>
          {generatedImage ? (
            <Image
              src={generatedImage}
              alt="Generated Cover"
              width={300}
              height={300}
              style={{ objectFit: "cover", borderRadius: token.borderRadius }}
            />
          ) : (
            "AI Generated Cover"
          )}
        </PreviewBox>
      </PreviewSection>

      <Title level={2} style={{ color: token.colorTextBase }}>
        {playlist?.name}
      </Title>
      <List
        loading={loading}
        dataSource={tracks}
        renderItem={(track) => (
          <List.Item>
            <Text style={{ color: token.colorTextBase }}>{track.name}</Text>
            <Text type="secondary" style={{ marginLeft: 8 }}>
              {track.artists.map((artist) => artist.name).join(", ")}
            </Text>
          </List.Item>
        )}
      />
    </PlaylistContainer>
  );
}
