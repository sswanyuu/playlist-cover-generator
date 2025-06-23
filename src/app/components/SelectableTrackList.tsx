import { List, Typography, Checkbox, theme, Button, Space, Grid } from "antd";
import styled from "@emotion/styled";


const { Text, Title } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

const TrackListContainer = styled.div`
  margin-top: 24px;
`;

const SelectionHeader = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ isMobile }) => isMobile ? "column" : "row"};
  justify-content: ${({ isMobile }) => isMobile ? "center" : "space-between"};
  margin-bottom: 16px;
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
  onSelectionChange 
}: SelectableTrackListProps) {
  const { token } = useToken();
  const screens = useBreakpoint();
  const isMobile = !!screens.xs;
  const isTrackSelected = (track: Track) => {
    return selectedTracks.some(selected => 
      selected.name === track.name && 
      selected.artists[0]?.name === track.artists[0]?.name
    );
  };

  const handleTrackToggle = (track: Track) => {
    if (isTrackSelected(track)) {
      // Remove track from selection
      onSelectionChange(selectedTracks.filter(selected => 
        !(selected.name === track.name && selected.artists[0]?.name === track.artists[0]?.name)
      ));
    } else {
      // Add track to selection
      onSelectionChange([...selectedTracks, track]);
    }
  };

  const handleSelectAll = () => {
    onSelectionChange(tracks);
  };

  const handleSelectNone = () => {
    onSelectionChange([]);
  };

  const handleSelectTop10 = () => {
    onSelectionChange(tracks.slice(0, 10));
  };

  return (
    <TrackListContainer>
      <SelectionHeader isMobile={isMobile}>
        <Title level={4} style={{ color: token.colorTextBase, margin: 0 }}>
          Select Tracks for Cover Generation ({selectedTracks.length} selected)
        </Title>
        <Space>
          <Button size="small" onClick={handleSelectTop10}>
            Top 10
          </Button>
          <Button size="small" onClick={handleSelectAll}>
            Select All
          </Button>
          <Button size="small" onClick={handleSelectNone}>
            Clear All
          </Button>
        </Space>
      </SelectionHeader>
      
      <List
        loading={loading}
        dataSource={tracks}
        renderItem={(track, index) => (
          <TrackItem>
            <Checkbox
              checked={isTrackSelected(track)}
              onChange={() => handleTrackToggle(track)}
            >
              <Space direction="vertical" size={2} style={{ marginLeft: 8 }}>
                <Text style={{ color: token.colorTextBase, fontWeight: 500 }}>
                  {index + 1}. {track.name}
                </Text>
                <Text type="secondary" style={{ fontSize: '0.9em' }}>
                  {track.artists.map((artist) => artist.name).join(", ")}
                </Text>
              </Space>
            </Checkbox>
          </TrackItem>
        )}
      />
      
    </TrackListContainer>
  );
} 