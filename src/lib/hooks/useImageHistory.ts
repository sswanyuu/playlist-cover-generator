import { useState, useEffect, useCallback } from "react";
import { GeneratedImageData } from "@/components/CoverGenerator/types";

interface UseImageHistoryReturn {
  imageHistory: GeneratedImageData[];
  loadingHistory: boolean;
  selectedHistoryImage: string | null;
  setSelectedHistoryImage: (id: string | null) => void;
  addImageToHistory: (image: GeneratedImageData) => void;
  selectHistoryImage: (image: GeneratedImageData) => void;
  refreshHistory: () => Promise<void>;
}

export function useImageHistory(playlistId: string): UseImageHistoryReturn {
  const [imageHistory, setImageHistory] = useState<GeneratedImageData[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [selectedHistoryImage, setSelectedHistoryImage] = useState<
    string | null
  >(null);

  const loadImageHistory = useCallback(async () => {
    try {
      setLoadingHistory(true);
      const response = await fetch(`/api/playlists/${playlistId}/images`);
      if (response.ok) {
        const data = await response.json();
        setImageHistory(data.images || []);

        // Set the most recent image as selected if available
        if (data.images && data.images.length > 0) {
          const mostRecentImage = data.images[0]; // First item is most recent due to desc order
          setSelectedHistoryImage(mostRecentImage.id);
        }
      }
    } catch (error) {
      console.error("Error loading image history:", error);
      throw error;
    } finally {
      setLoadingHistory(false);
    }
  }, [playlistId]);

  useEffect(() => {
    if (playlistId) {
      loadImageHistory();
    }
  }, [playlistId, loadImageHistory]);

  const addImageToHistory = (image: GeneratedImageData) => {
    setImageHistory((prev) => [image, ...prev]);
    setSelectedHistoryImage(image.id);
  };

  const selectHistoryImage = (image: GeneratedImageData) => {
    setSelectedHistoryImage(image.id);
  };

  const refreshHistory = async () => {
    await loadImageHistory();
  };

  return {
    imageHistory,
    loadingHistory,
    selectedHistoryImage,
    setSelectedHistoryImage,
    addImageToHistory,
    selectHistoryImage,
    refreshHistory,
  };
}
