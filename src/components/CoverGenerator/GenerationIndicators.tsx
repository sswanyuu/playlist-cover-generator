import React from "react";
import { BgColorsOutlined, SoundOutlined } from "@ant-design/icons";
import { getStyleById } from "@/lib/leonardo-styles";
import { Track } from "@/components/SelectableTrackList/types";
import {
  IndicatorsContainer,
  StyleIndicator,
  TrackIndicator,
  StyleInfo,
  StyleName,
  StyleDescription,
} from "./styles";

interface GenerationIndicatorsProps {
  selectedStyleId: string;
  tracks: Track[];
}

export default function GenerationIndicators({
  selectedStyleId,
  tracks,
}: GenerationIndicatorsProps) {
  const selectedStyle = getStyleById(selectedStyleId);

  return (
    <IndicatorsContainer>
      <StyleIndicator>
        <BgColorsOutlined />
        <StyleInfo>
          <StyleName>{selectedStyle?.name || "No Style Selected"}</StyleName>
          <StyleDescription>
            {selectedStyle?.description || "Please select a generation style"}
          </StyleDescription>
        </StyleInfo>
      </StyleIndicator>
      
      <TrackIndicator>
        <SoundOutlined />
        <StyleInfo>
          <StyleName>{tracks?.length || 0} Tracks Selected</StyleName>
          <StyleDescription>
            {tracks?.length ? "Ready to generate" : "Select tracks first"}
          </StyleDescription>
        </StyleInfo>
      </TrackIndicator>
    </IndicatorsContainer>
  );
} 