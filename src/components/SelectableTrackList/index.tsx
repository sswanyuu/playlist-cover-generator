import React from "react";
import { List, Typography, Checkbox, theme, Button, Space } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useResponsive } from "@/lib/hooks/useResponsive";
import { useTrackSelection } from "@/lib/hooks/useTrackSelection";
import { useListPagination } from "@/lib/hooks/useListPagination";
import { SelectableTrackListProps } from "./types";
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
  
  // Use custom hooks for track selection and pagination
  const {
    isTrackSelected,
    handleTrackToggle,
    handleSelectTop10,
    handleClearAll,
    setSelectedTracks,
    isAtMaxLimit,
    selectionCount,
  } = useTrackSelection(selectedTracks);

  const {
    showAll,
    displayedItems: displayedTracks,
    hasMoreItems,
    toggleShowAll,
  } = useListPagination(tracks);

  // Sync with parent component when selection changes
  React.useEffect(() => {
    onSelectionChange(selectedTracks);
  }, [selectedTracks, onSelectionChange]);

  // Handle parent updates to selectedTracks
  React.useEffect(() => {
    setSelectedTracks(selectedTracks);
  }, [selectedTracks, setSelectedTracks]);

  return (
    <TrackListContainer>
      <SelectionHeader>
        <div>
          <Title level={4} style={{ color: token.colorTextBase, margin: 0 }}>
            Select Tracks ({selectionCount}/{LIMITS.MAX_SELECTION_COUNT})
          </Title>
          <Text type="secondary">
            Choose tracks that best represent your playlist&apos;s vibe
          </Text>
        </div>
        
        <Space>
          <Button 
            size={isMobile ? "small" : "middle"}
            onClick={() => handleSelectTop10(tracks)}
            disabled={tracks.length === 0}
          >
            Select Top 10
          </Button>
          <Button 
            size={isMobile ? "small" : "middle"}
            onClick={handleClearAll}
            disabled={selectionCount === 0}
          >
            Clear All
          </Button>
        </Space>
      </SelectionHeader>

      <List
        loading={loading}
        dataSource={displayedTracks}
        renderItem={(track) => {
          const isSelected = isTrackSelected(track);
          const artistNames = track.artists.map((artist) => artist.name).join(", ");
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

      {hasMoreItems && (
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