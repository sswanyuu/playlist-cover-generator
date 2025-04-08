import { List, Typography, theme } from "antd";
import styled from "@emotion/styled";

const { Text } = Typography;
const { useToken } = theme;

const TrackListContainer = styled.div`
  margin-top: 24px;
`;

interface Track {
  name: string;
  artists: Array<{ name: string }>;
}

interface TrackListProps {
  tracks: Track[];
  loading: boolean;
}

export default function TrackList({ tracks, loading }: TrackListProps) {
  const { token } = useToken();

  return (
    <TrackListContainer>
      <List
        loading={loading}
        dataSource={tracks}
        renderItem={(track) => (
          <List.Item>
            <Text style={{ color: token.colorTextBase }}>{track.name}</Text>
            <Text type="secondary" style={{ marginLeft: 8 }}>
              {track.artists.map((artist) => artist.name).join(", ")}
            </Text>
          </List.Item>
        )}
      />
    </TrackListContainer>
  );
}
