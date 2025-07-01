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
  tracks: Array<{
    name: string;
  }>;
  selectedStyleId: string;
  onCoverUpdate: (imageBase64: string) => Promise<void>;
  canUpdateCover?: boolean;
}
