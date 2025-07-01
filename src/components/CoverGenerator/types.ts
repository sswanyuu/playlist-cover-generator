import { Track } from "@/components/SelectableTrackList/types";

export interface GeneratedImageData {
  id: string;
  imageUrl: string;
  style: string;
  createdAt: string;
}

export interface CoverGeneratorProps {
  playlist: {
    images: Array<{ url: string }>;
    name: string;
    id: string;
  };
  tracks: Track[];
  selectedStyleId: string;
  onCoverUpdate: (imageBase64: string) => Promise<void>;
  canUpdateCover?: boolean;
}
