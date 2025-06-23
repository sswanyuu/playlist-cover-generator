export interface LeonardoStyle {
  id: string;
  name: string;
  description: string;
  modelId: string;
  styleUUID: string;
}

export const LEONARDO_STYLES: LeonardoStyle[] = [
  {
    id: "dynamic",
    name: "Dynamic",
    description: "Bold and energetic style perfect for vibrant music genres",
    modelId: "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3",
    styleUUID: "111dc692-d470-4eec-b791-3475abac4c46",
  },
  {
    id: "cinematic",
    name: "Cinematic",
    description: "Movie-like dramatic lighting and composition",
    modelId: "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3",
    styleUUID: "a5632c7c-ddbb-4e2f-ba34-8456ab3ac436",
  },
  {
    id: "bokeh",
    name: "Bokeh",
    description: "Beautiful depth of field with dreamy blurred backgrounds",
    modelId: "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3",
    styleUUID: "9fdc5e8c-4d13-49b4-9ce6-5a74cbb19177",
  },
  {
    id: "vibrant",
    name: "Vibrant",
    description: "High saturation and vivid colors for energetic playlists",
    modelId: "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3",
    styleUUID: "dee282d3-891f-4f73-ba02-7f8131e5541b",
  },
  {
    id: "illustration",
    name: "Illustration",
    description: "Artistic illustrated style with creative visual storytelling",
    modelId: "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3",
    styleUUID: "645e4195-f63d-4715-a3f2-3fb1e6eb8c70",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean, simple design with elegant composition",
    modelId: "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3",
    styleUUID: "cadc8cd6-7838-4c99-b645-df76be8ba8d8",
  },
];

export const getStyleById = (styleId: string): LeonardoStyle | undefined => {
  return LEONARDO_STYLES.find(style => style.id === styleId);
};

export const getDefaultStyle = (): LeonardoStyle => {
  return LEONARDO_STYLES[0]; // Dynamic as default
}; 