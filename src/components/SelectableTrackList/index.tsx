import { List, Typography, Checkbox, theme, Button, Space } from "antd";
import { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useResponsive } from "@/lib/hooks/useResponsive";
import { Track, SelectableTrackListProps } from "./types";
import {
  TrackListContainer,
  SelectionHeader,
  TrackItem,
  ReadMoreContainer,
  ReadMoreButton,
} from "./styles";
import { LIMITS } from '@/constants';

const { Text, Title } = Typography;
const { useToken } = theme;

export default function SelectableTrackList({
  tracks,
  loading,
  selectedTracks,
  onSelectionChange,
}: SelectableTrackListProps) {
  const { token } = useToken();
  const { isMobile } = useResponsive();
  const [showAll, setShowAll] = useState(false);

  const displayedTracks = showAll ? tracks : tracks.slice(0, LIMITS.INITIAL_DISPLAY_COUNT);
  const hasMoreTracks = tracks.length > LIMITS.INITIAL_DISPLAY_COUNT;

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
      if (selectedTracks.length < LIMITS.MAX_SELECTION_COUNT) {
        onSelectionChange([...selectedTracks, track]);
      }
    }
  };

  const handleSelectTop10 = () => {
    onSelectionChange(tracks.slice(0, 10));
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
            {selectedTracks.length} of {LIMITS.MAX_SELECTION_COUNT} selected
          </Title>
          <Text type="secondary">
            Choose up to {LIMITS.MAX_SELECTION_COUNT} tracks that best represent your playlist&apos;s mood
          </Text>
          {selectedTracks.length >= LIMITS.MAX_SELECTION_COUNT && (
            <Text style={{ color: '#faad14', fontSize: '12px', display: 'block', marginTop: '4px' }}>
              ⚠️ Maximum {LIMITS.MAX_SELECTION_COUNT} tracks reached for optimal AI generation
            </Text>
          )}
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
          const isAtMaxLimit = selectedTracks.length >= LIMITS.MAX_SELECTION_COUNT;
          const isDisabled = !isSelected && isAtMaxLimit;

          return (
            <TrackItem>
              <Checkbox
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => handleTrackToggle(track)}
                style={{ marginRight: 12 }}
              />
              <List.Item.Meta
                title={
                  <Text 
                    strong 
                    style={{ 
                      color: isDisabled ? 'rgba(255, 255, 255, 0.3)' : token.colorText 
                    }}
                  >
                    {track.name}
                  </Text>
                }
                description={
                  <Text 
                    type="secondary" 
                    style={{ 
                      fontSize: '14px',
                      opacity: isDisabled ? 0.5 : 1
                    }}
                  >
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
              ? `Show Less (${LIMITS.INITIAL_DISPLAY_COUNT} tracks)` 
              : `Show More (${tracks.length - LIMITS.INITIAL_DISPLAY_COUNT} more tracks)`
            }
          </ReadMoreButton>
        </ReadMoreContainer>
      )}
    </TrackListContainer>
  );
} 