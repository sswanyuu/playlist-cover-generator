import { useState } from "react";
import { App } from "antd";
import { GeneratedImageData } from "@/components/CoverGenerator/types";
import { Track } from "@/components/SelectableTrackList/types";
import { LIMITS } from "@/constants";

interface UseImageGenerationParams {
  playlistId: string;
  playlistName: string;
  onImageGenerated: (image: GeneratedImageData) => void;
}

interface UseImageGenerationReturn {
  generating: boolean;
  generateImage: (tracks: Track[], styleId: string) => Promise<void>;
}

export function useImageGeneration({
  playlistId,
  playlistName,
  onImageGenerated,
}: UseImageGenerationParams): UseImageGenerationReturn {
  const [generating, setGenerating] = useState(false);
  const { message } = App.useApp();

  const saveImageToDatabase = async (
    imageUrl: string,
    styleId: string
  ): Promise<GeneratedImageData> => {
    try {
      const response = await fetch(`/api/playlists/${playlistId}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          style: styleId,
          playlistName: playlistName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.image as GeneratedImageData;
      }

      throw new Error(`Failed to save image: ${response.status}`);
    } catch (error) {
      console.error("Error saving image to database:", error);
      throw error;
    }
  };

  const generateImage = async (tracks: Track[], styleId: string) => {
    if (!playlistName || !tracks || tracks.length === 0) {
      message.warning("Please select at least one track to generate a cover");
      return;
    }

    setGenerating(true);

    try {
      const trackNames = tracks
        .map((track) => {
          const name = track.name;
          const featIndex = name.toLowerCase().indexOf("feat.");
          return featIndex !== -1
            ? `"${name.substring(0, featIndex).trim()}"`
            : `"${name}"`;
        })
        .join(", ");

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playlistName: playlistName,
          trackNames: trackNames,
          styleId: styleId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate generation");
      }

      const { generationId } = await response.json();

      let attempts = 0;
      const maxAttempts = LIMITS.MAX_ATTEMPTS;
      let completed = false;

      while (!completed && attempts < maxAttempts) {
        await new Promise((res) => setTimeout(res, 2000));
        const poll = await fetch(`/api/generation-result?id=${generationId}`);
        const result = await poll.json();

        if (result.status === "COMPLETE") {
          // Save to database and get the full image object
          const savedImage = await saveImageToDatabase(
            result.imageUrl,
            styleId
          );

          if (savedImage) {
            onImageGenerated(savedImage);
          }

          message.success("Image generated successfully!");
          completed = true;
        }

        attempts++;
      }

      if (!completed) {
        message.error("Image generation timed out");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      message.error("Failed to generate image");
    } finally {
      setGenerating(false);
    }
  };

  return {
    generating,
    generateImage,
  };
}
