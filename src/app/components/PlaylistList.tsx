"use client";

import { useEffect, useState } from "react";
import { List, Image, Typography, theme } from "antd";
import { Playlist } from "@/types/spotify";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;
const { useToken } = theme;

const PlaylistContainer = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const PlaylistItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.token.colorBgContainer};
    cursor: pointer;
  }
`;

const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function PlaylistList() {
  const { token } = useToken();
  const router = useRouter();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("/api/spotify/playlists");
        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }
        const data = await response.json();
        setPlaylists(data.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handlePlaylistClick = (id: string) => {
    router.push(`/playlist/${id}`);
  };

  return (
    <PlaylistContainer>
      <Title level={2} style={{ color: token.colorTextBase }}>
        Your Playlists
      </Title>
      <List
        loading={loading}
        dataSource={playlists}
        renderItem={(playlist) => (
          <List.Item>
            <PlaylistItem onClick={() => handlePlaylistClick(playlist.id)}>
              <Image
                alt={playlist.name}
                src={playlist.images[0]?.url}
                preview={false}
                width={64}
                height={64}
                style={{ objectFit: "cover" }}
              />
              <PlaylistInfo>
                <Text strong>{playlist.name}</Text>
                <Text type="secondary">{playlist.tracks.total} tracks</Text>
              </PlaylistInfo>
            </PlaylistItem>
          </List.Item>
        )}
      />
    </PlaylistContainer>
  );
}
