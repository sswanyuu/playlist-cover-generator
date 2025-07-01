"use client";

import { useState } from "react";
import { useImageHistory } from "@/lib/hooks/useImageHistory";
import { useImageGeneration } from "@/lib/hooks/useImageGeneration";
import { useCoverUpdate } from "@/lib/hooks/useCoverUpdate";
import { GeneratedImageData, CoverGeneratorProps } from "./types";
import GenerationIndicators from "./GenerationIndicators";
import GenerationHistory from "./GenerationHistory";
import ImagePreview from "./ImagePreview";

export default function CoverGenerator({
  playlist,
  tracks,
  selectedStyleId,
  onCoverUpdate,
  canUpdateCover = true,
}: CoverGeneratorProps) {
  const [generatedImage, setGeneratedImage] = useState<GeneratedImageData | null>(null);

  // Custom hooks for business logic
  const {
    imageHistory,
    loadingHistory,
    selectedHistoryImage,
    setSelectedHistoryImage,
    addImageToHistory,
    selectHistoryImage,
  } = useImageHistory(playlist.id);

  const { generating, generateImage } = useImageGeneration({
    playlistId: playlist.id,
    playlistName: playlist.name,
    onImageGenerated: (image) => {
      setGeneratedImage(image);
      addImageToHistory(image);
      setSelectedHistoryImage(null); // Clear history selection since this is new
    },
  });

  const { updating, isAnimating, updateCover } = useCoverUpdate({
    onCoverUpdate,
    onSuccess: () => {
      // Reset state after successful update
      setGeneratedImage(null);
      setSelectedHistoryImage(null);
      // Update playlist image in UI
      if (playlist?.images?.[0] && generatedImage) {
        playlist.images[0].url = generatedImage.imageUrl;
      }
    },
  });

  // Event handlers
  const handleGenerateImage = async () => {
    if (!tracks || tracks.length === 0) return;
    await generateImage(tracks, selectedStyleId);
  };

  const handleUpdateCover = async () => {
    if (!generatedImage) return;
    await updateCover(generatedImage.imageUrl);
  };

  const handleHistoryImageClick = (image: GeneratedImageData) => {
    setGeneratedImage(image);
    selectHistoryImage(image);
  };

  // Derived state
  const hasTracksSelected = tracks && tracks.length > 0;

  return (
    <>
      <GenerationIndicators
        selectedStyleId={selectedStyleId}
        tracks={tracks}
      />

      <GenerationHistory
        imageHistory={imageHistory}
        loadingHistory={loadingHistory}
        selectedHistoryImage={selectedHistoryImage}
        onHistoryImageClick={handleHistoryImageClick}
      />
      
      <ImagePreview
        playlist={playlist}
        generatedImage={generatedImage}
        generating={generating}
        updating={updating}
        isAnimating={isAnimating}
        canUpdateCover={canUpdateCover}
        hasTracksSelected={hasTracksSelected}
        onGenerateImage={handleGenerateImage}
        onUpdateCover={handleUpdateCover}
      />
    </>
  );
} 