"use client";

import { List, Image, Typography, theme, Space, Select, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { 
  UserOutlined, 
  TeamOutlined, 
  EditOutlined, 
  EyeOutlined,
  FilterOutlined 
} from "@ant-design/icons";
import { usePlaylistList } from "@/lib/hooks/usePlaylistList";
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
  const {
    loading,
    filter,
    setFilter,
    filteredPlaylists,
    stats,
  } = usePlaylistList();

  const handlePlaylistClick = (id: string) => {
    router.push(`/playlist/${id}`);
  };

  return (
    <PlaylistContainer>
      <HeaderSection>
        <div>
          <Title level={2} style={{ color: token.colorTextBase, margin: 0 }}>
            Your Playlists
          </Title>
          <Text type="secondary">
            Generate AI covers for your Spotify playlists
          </Text>
        </div>
        
        <FilterSection>
          <FilterOutlined />
          <Select
            value={filter}
            onChange={setFilter}
            style={{ width: 150 }}
            size="large"
          >
            <Option value="all">All Playlists</Option>
            <Option value="owned">Owned ({stats.ownedCount})</Option>
            <Option value="followed">Following ({stats.followedCount})</Option>
          </Select>
        </FilterSection>
      </HeaderSection>

      <StatsSection>
        <Space size="large">
          <Tooltip title="Playlists you own and can edit">
            <Space>
              <UserOutlined />
              <Text strong>{stats.ownedCount} Owned</Text>
            </Space>
          </Tooltip>
          <Tooltip title="Playlists you follow but don't own">
            <Space>
              <TeamOutlined />
              <Text strong>{stats.followedCount} Following</Text>
            </Space>
          </Tooltip>
          <Tooltip title="Total playlists in your library">
            <Space>
              <Text strong>{stats.totalCount} Total</Text>
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
              </PlaylistInfo>
              
              {playlist.canUpdateCover ? (
                <Tooltip title="You can generate and set covers for this playlist">
                  <EditOutlined style={{ color: token.colorSuccess, fontSize: '18px' }} />
                </Tooltip>
              ) : (
                <Tooltip title="Read-only: You can generate covers but not set them">
                  <EyeOutlined style={{ color: token.colorTextTertiary, fontSize: '18px' }} />
                </Tooltip>
              )}
            </PlaylistItem>
          </List.Item>
        )}
      />
    </PlaylistContainer>
  );
} 