"use client";

import { useEffect, useState } from "react";
import { List, Image, Typography, theme, Space, Select, Tooltip } from "antd";
import { Playlist } from "@/types/spotify";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { 
  UserOutlined, 
  TeamOutlined, 
  EditOutlined, 
  EyeOutlined,
  FilterOutlined 
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { useToken } = theme;
const { Option } = Select;

const PlaylistContainer = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const HeaderSection = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PlaylistItem = styled.div<{ $canUpdate: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ $canUpdate }) => 
    $canUpdate ? 'rgba(82, 196, 26, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  background: ${({ $canUpdate }) => 
    $canUpdate ? 'rgba(82, 196, 26, 0.05)' : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    cursor: pointer;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PlaylistHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const OwnershipBadge = styled.span<{ $isOwned: boolean }>`
  margin: 0;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 12px;
  border: none;
  display: inline-flex;
  align-items: center;
  background: ${({ $isOwned }) => 
    $isOwned ? 'rgba(82, 196, 26, 0.15)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${({ $isOwned }) => 
    $isOwned ? 'rgba(82, 196, 26, 0.9)' : 'rgba(255, 255, 255, 0.7)'};
`;

const StatsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

type FilterType = 'all' | 'owned' | 'followed';

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
