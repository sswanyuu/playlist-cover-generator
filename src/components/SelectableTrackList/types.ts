export interface Track {
  name: string;
  artists: Array<{ name: string }>;
}

export interface SelectableTrackListProps {
  tracks: Track[];
  loading: boolean;
  selectedTracks: Track[];
  onSelectionChange: (selectedTracks: Track[]) => void;
}
