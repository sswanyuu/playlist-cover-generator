import { useState } from "react";
import { Track } from "@/components/SelectableTrackList/types";
import { LIMITS } from "@/constants";

interface UseTrackSelectionReturn {
  selectedTracks: Track[];
  isTrackSelected: (track: Track) => boolean;
  handleTrackToggle: (track: Track) => void;
  handleSelectTop10: (tracks: Track[]) => void;
  handleClearAll: () => void;
  setSelectedTracks: (tracks: Track[]) => void;
  isAtMaxLimit: boolean;
  selectionCount: number;
}

export function useTrackSelection(
  initialTracks: Track[] = []
): UseTrackSelectionReturn {
  const [selectedTracks, setSelectedTracks] = useState<Track[]>(initialTracks);

  const isTrackSelected = (track: Track): boolean => {
    return selectedTracks.some(
      (selectedTrack) =>
        selectedTrack.name === track.name &&
        JSON.stringify(selectedTrack.artists) === JSON.stringify(track.artists)
    );
  };

  const handleTrackToggle = (track: Track) => {
    if (isTrackSelected(track)) {
      // Remove track
      setSelectedTracks(
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
      // Add track if under limit
      if (selectedTracks.length < LIMITS.MAX_SELECTION_COUNT) {
        setSelectedTracks([...selectedTracks, track]);
      }
    }
  };

  const handleSelectTop10 = (tracks: Track[]) => {
    setSelectedTracks(tracks.slice(0, 10));
  };

  const handleClearAll = () => {
    setSelectedTracks([]);
  };

  const isAtMaxLimit = selectedTracks.length >= LIMITS.MAX_SELECTION_COUNT;
  const selectionCount = selectedTracks.length;

  return {
    selectedTracks,
    isTrackSelected,
    handleTrackToggle,
    handleSelectTop10,
    handleClearAll,
    setSelectedTracks,
    isAtMaxLimit,
    selectionCount,
  };
}
