import { useState, useEffect } from "react";
import { Playlist } from "@/types/spotify";

export type FilterType = "all" | "owned" | "followed";

interface UsePlaylistListReturn {
  playlists: Playlist[];
  loading: boolean;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  filteredPlaylists: Playlist[];
  stats: {
    ownedCount: number;
    followedCount: number;
    totalCount: number;
  };
  refetch: () => Promise<void>;
}

export function usePlaylistList(): UsePlaylistListReturn {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/spotify/playlists");
      if (!response.ok) {
        throw new Error("Failed to fetch playlists");
      }
      const data = await response.json();
      setPlaylists(data.items);
    } catch (error) {
      console.error("Error fetching playlists:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  // Filter playlists based on selected filter
  const filteredPlaylists = playlists.filter((playlist) => {
    switch (filter) {
      case "owned":
        return playlist.isOwned;
      case "followed":
        return !playlist.isOwned;
      default:
        return true;
    }
  });

  // Calculate stats
  const stats = {
    ownedCount: playlists.filter((p) => p.isOwned).length,
    followedCount: playlists.filter((p) => !p.isOwned).length,
    totalCount: playlists.length,
  };

  return {
    playlists,
    loading,
    filter,
    setFilter,
    filteredPlaylists,
    stats,
    refetch: fetchPlaylists,
  };
}
