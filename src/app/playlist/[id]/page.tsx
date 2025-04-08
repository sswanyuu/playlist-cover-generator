"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Typography, List, theme, Image, Button } from "antd";
import styled from "@emotion/styled";
import { ArrowRightOutlined } from "@ant-design/icons";

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
  const { token } = useToken();
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

  return (
    <PlaylistContainer>
      <PreviewSection>
        <Image
          src={playlist?.images[0]?.url}
          alt="Playlist Cover"
          width={300}
          height={300}
          style={{ objectFit: "cover", borderRadius: token.borderRadius }}
        />
        <ArrowContainer>
          <ArrowRightOutlined style={{ fontSize: 24 }} />
          <GenerateButton type="primary" size="large">
            Generate Cover Image
          </GenerateButton>
        </ArrowContainer>
        <PreviewBox>AI Generated Cover</PreviewBox>
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
