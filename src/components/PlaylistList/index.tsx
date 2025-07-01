"use client";

import { useEffect, useState } from "react";
import { List, Image, Typography, theme, Space, Select, Tooltip } from "antd";
import { Playlist } from "@/types/spotify";
import { useRouter } from "next/navigation";
import { 
  UserOutlined, 
  TeamOutlined, 
  EditOutlined, 
  EyeOutlined,
  FilterOutlined 
} from "@ant-design/icons";
import { FilterType } from "./types";
import {
  PlaylistContainer,
  HeaderSection,
  FilterSection,
  PlaylistItem,
  PlaylistInfo,
  PlaylistHeader,
  OwnershipBadge,
  StatsSection,
} from "./styles";

const { Title, Text } = Typography;
const { useToken } = theme;
const { Option } = Select;

export default function PlaylistList() {
  const { token } = useToken();
  const router = useRouter();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

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

  // Filter playlists based on selected filter
  const filteredPlaylists = playlists.filter(playlist => {
    switch (filter) {
      case 'owned':
        return playlist.isOwned;
      case 'followed':
        return !playlist.isOwned;
      default:
        return true;
    }
  });

  // Calculate stats
  const ownedCount = playlists.filter(p => p.isOwned).length;
  const followedCount = playlists.filter(p => !p.isOwned).length;
  const updatableCount = playlists.filter(p => p.canUpdateCover).length;

  return (
    <PlaylistContainer>
      <HeaderSection>
        <Title level={2} style={{ color: token.colorTextBase, margin: 0 }}>
          Your Playlists
        </Title>
        
        <FilterSection>
          <FilterOutlined style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
          <Select
            value={filter}
            onChange={setFilter}
            style={{ width: 160 }}
            size="small"
          >
            <Option value="all">All Playlists ({playlists.length})</Option>
            <Option value="owned">My Playlists ({ownedCount})</Option>
            <Option value="followed">Followed ({followedCount})</Option>
          </Select>
        </FilterSection>
      </HeaderSection>

      {/* Stats Section */}
      <StatsSection>
        <Space split={<span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>}>
          <Tooltip title="Playlists you own and can customize">
            <Space>
              <EditOutlined style={{ color: 'rgba(82, 196, 26, 0.8)' }} />
              <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {updatableCount} Customizable
              </Text>
            </Space>
          </Tooltip>
          
          <Tooltip title="Playlists you follow but don't own">
            <Space>
              <EyeOutlined style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
              <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {followedCount} Followed
              </Text>
            </Space>
          </Tooltip>
        </Space>
      </StatsSection>

      <List
        loading={loading}
        dataSource={filteredPlaylists}
        renderItem={(playlist) => (
          <List.Item style={{ border: 'none', padding: '8px 0' }}>
            <PlaylistItem 
              $canUpdate={playlist.canUpdateCover || false}
              onClick={() => handlePlaylistClick(playlist.id)}
            >
              <Image
                alt={playlist.name}
                src={playlist.images?.[0]?.url}
                preview={false}
                width={64}
                height={64}
                style={{ objectFit: "cover", borderRadius: '8px' }}
              />
              <PlaylistInfo>
                <PlaylistHeader>
                  <Text strong style={{ fontSize: '16px' }}>{playlist.name}</Text>
                  <OwnershipBadge $isOwned={playlist.isOwned || false}>
                    {playlist.isOwned ? (
                      <Space size={4}>
                        <UserOutlined />
                        Owner
                      </Space>
                    ) : (
                      <Space size={4}>
                        <TeamOutlined />
                        Following
                      </Space>
                    )}
                  </OwnershipBadge>
                </PlaylistHeader>
                
                <Space>
                  <Text type="secondary">{playlist.tracks.total} tracks</Text>
                  <Text type="secondary">•</Text>
                  <Text type="secondary">by {playlist.owner.display_name}</Text>
                </Space>
                
                {playlist.canUpdateCover && (
                  <Space style={{ marginTop: '4px' }}>
                    <EditOutlined style={{ 
                      color: 'rgba(82, 196, 26, 0.8)', 
                      fontSize: '12px' 
                    }} />
                    <Text style={{ 
                      color: 'rgba(82, 196, 26, 0.8)', 
                      fontSize: '12px',
                      fontWeight: 500
                    }}>
                      Cover customizable
                    </Text>
                  </Space>
                )}
              </PlaylistInfo>
            </PlaylistItem>
          </List.Item>
        )}
      />
    </PlaylistContainer>
  );
} 