import { List, Typography, Checkbox, theme, Button, Space } from "antd";
import styled from "@emotion/styled";
import { useResponsive, mediaQueries } from "@/app/hooks/useResponsive";

const { Text } = Typography;
const { useToken } = theme;
const TrackListContainer = styled.div`
  margin-top: 24px;
`;

const SelectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  
  ${mediaQueries.md} {
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

  return (
    <TrackListContainer>
      <SelectionHeader>
        <Space 
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
        dataSource={tracks}
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
    </TrackListContainer>
  );
} 