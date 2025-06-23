import { List, Typography, Checkbox, theme, Button, Space } from "antd";
import styled from "@emotion/styled";
import { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useResponsive, mediaQueries } from "@/app/hooks/useResponsive";

const { Text, Title } = Typography;
const { useToken } = theme;

const TrackListContainer = styled.div`
  margin-top: 24px;
`;

const SelectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  
  ${mediaQueries.mobile} {
    flex-direction: column;
    justify-content: center;
    gap: 16px;
  }
`;

const TrackItem = styled(List.Item)`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.02);
  }
`;

const ReadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ReadMoreButton = styled(Button)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
    color: rgba(255, 255, 255, 0.9) !important;
  }
  
  &:focus {
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
    color: rgba(255, 255, 255, 0.8) !important;
  }
`;

interface Track {
  name: string;
  artists: Array<{ name: string }>;
}

interface SelectableTrackListProps {
  tracks: Track[];
  loading: boolean;
  selectedTracks: Track[];
  onSelectionChange: (selectedTracks: Track[]) => void;
}

export default function SelectableTrackList({
  tracks,
  loading,
  selectedTracks,
  onSelectionChange,
}: SelectableTrackListProps) {
  const { token } = useToken();
  const { isMobile } = useResponsive();
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 5;
  const displayedTracks = showAll ? tracks : tracks.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMoreTracks = tracks.length > INITIAL_DISPLAY_COUNT;

  const isTrackSelected = (track: Track): boolean => {
    return selectedTracks.some(
      (selectedTrack) =>
        selectedTrack.name === track.name &&
        JSON.stringify(selectedTrack.artists) === JSON.stringify(track.artists)
    );
  };

  const handleTrackToggle = (track: Track) => {
    if (isTrackSelected(track)) {
      onSelectionChange(
        selectedTracks.filter(
          (selectedTrack) =>
            !(
              selectedTrack.name === track.name &&
              JSON.stringify(selectedTrack.artists) ===
                JSON.stringify(track.artists)
            )
        )
      );
    } else {
      onSelectionChange([...selectedTracks, track]);
    }
  };

  const handleSelectTop10 = () => {
    onSelectionChange(tracks.slice(0, 10));
  };

  const handleSelectAll = () => {
    onSelectionChange(tracks);
  };

  const handleClearAll = () => {
    onSelectionChange([]);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <TrackListContainer>
      <SelectionHeader>
        <div>
          <Title level={4} style={{ margin: 0, color: token.colorText }}>
            {selectedTracks.length} of {tracks.length} selected
          </Title>
          <Text type="secondary">
            Choose tracks that best represent your playlist&apos;s mood
          </Text>
        </div>
        <Space 
          direction={isMobile ? "vertical" : "horizontal"}
          size={isMobile ? 8 : 12}
          style={{ width: isMobile ? '100%' : 'auto' }}
        >
          <Button 
            size={isMobile ? "small" : "middle"} 
            onClick={handleSelectTop10}
            style={{ width: isMobile ? '100%' : 'auto' }}
          >
            Top 10
          </Button>
          <Button 
            size={isMobile ? "small" : "middle"} 
            onClick={handleSelectAll}
            style={{ width: isMobile ? '100%' : 'auto' }}
          >
            Select All
          </Button>
          <Button 
            size={isMobile ? "small" : "middle"} 
            onClick={handleClearAll}
            style={{ width: isMobile ? '100%' : 'auto' }}
          >
            Clear
          </Button>
        </Space>
      </SelectionHeader>

      <List
        loading={loading}
        dataSource={displayedTracks}
        renderItem={(track) => {
          const isSelected = isTrackSelected(track);
          const artistNames = track.artists.map((artist) => artist.name).join(", ");

          return (
            <TrackItem>
              <Checkbox
                checked={isSelected}
                onChange={() => handleTrackToggle(track)}
                style={{ marginRight: 12 }}
              />
              <List.Item.Meta
                title={
                  <Text strong style={{ color: token.colorText }}>
                    {track.name}
                  </Text>
                }
                description={
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    {artistNames}
                  </Text>
                }
              />
            </TrackItem>
          );
        }}
      />

      {hasMoreTracks && (
        <ReadMoreContainer>
          <ReadMoreButton
            type="text"
            onClick={toggleShowAll}
            icon={showAll ? <UpOutlined /> : <DownOutlined />}
          >
            {showAll 
              ? `Show Less (${INITIAL_DISPLAY_COUNT} tracks)` 
              : `Show More (${tracks.length - INITIAL_DISPLAY_COUNT} more tracks)`
            }
          </ReadMoreButton>
        </ReadMoreContainer>
      )}
    </TrackListContainer>
  );
} 