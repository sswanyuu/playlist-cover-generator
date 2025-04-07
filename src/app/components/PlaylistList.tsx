"use client";

import { useEffect, useState } from "react";
import { List, Image, Typography, Card } from "antd";
import { Playlist } from "@/types/spotify";

const { Title, Text } = Typography;

export default function PlaylistList() {
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

  return (
    <Card>
      <Title level={2}>Your Playlists</Title>
      <List
        loading={loading}
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
        dataSource={playlists}
        renderItem={(playlist) => (
          <List.Item>
            <Card
              hoverable
              cover={
                <Image
                  alt={playlist.name}
                  src={playlist.images[0]?.url}
                  preview={false}
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
            >
              <Card.Meta
                title={playlist.name}
                description={
                  <Text type="secondary">{playlist.tracks.total} tracks</Text>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
}
