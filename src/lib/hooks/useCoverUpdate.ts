import { useState } from "react";
import { App } from "antd";
import { LIMITS } from "@/constants";

interface UseCoverUpdateParams {
  onCoverUpdate: (imageBase64: string) => Promise<void>;
  onSuccess?: () => void;
}

interface UseCoverUpdateReturn {
  updating: boolean;
  isAnimating: boolean;
  updateCover: (imageUrl: string) => Promise<void>;
}

export function useCoverUpdate({
  onCoverUpdate,
  onSuccess,
}: UseCoverUpdateParams): UseCoverUpdateReturn {
  const [updating, setUpdating] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { message } = App.useApp();

  const fetchImageAsBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();

    const imageBitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    const size = LIMITS.CANVAS_SIZE;
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(imageBitmap, 0, 0, size, size);

    const base64Data = canvas.toDataURL(
      "image/jpeg",
      LIMITS.IMAGE_COMPRESSION_QUALITY
    );
    return base64Data.replace(/^data:image\/jpeg;base64,/, ""); // Strip prefix
  };

  const updateCover = async (imageUrl: string) => {
    setUpdating(true);

    try {
      const imageBase64 = await fetchImageAsBase64(imageUrl);
      await onCoverUpdate(imageBase64);

      setIsAnimating(true);
      message.success("Playlist cover updated successfully!");

      // Reset animation after it completes and call success callback
      setTimeout(() => {
        setIsAnimating(false);
        onSuccess?.();
      }, 1000);
    } catch (error) {
      console.error("Error updating playlist cover:", error);
      message.error("Failed to update playlist cover");
    } finally {
      setUpdating(false);
    }
  };

  return {
    updating,
    isAnimating,
    updateCover,
  };
}
