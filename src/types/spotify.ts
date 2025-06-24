export interface Playlist {
  id: string;
  name: string;
  images: Array<{
    url: string;
    height: number | null;
    width: number | null;
  }>;
  tracks: {
    total: number;
  };
  owner: {
    id: string;
    display_name: string;
  };
  canUpdateCover?: boolean;
  isOwned?: boolean;
}
