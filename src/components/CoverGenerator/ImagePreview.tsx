import React from "react";
import { theme } from "antd";
import {
  LoadingOutlined,
  ArrowLeftOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { useResponsiveValue } from "@/utils/responsive";
import { GeneratedImageData } from "./types";
import {
  PreviewSection,
  ButtonContainer,
  PreviewBox,
  OriginalImage,
  GeneratedImage,
  GenerateButton,
  SetCoverButton,
} from "./styles";

interface ImagePreviewProps {
  playlist: {
    images: Array<{ url: string }>;
  };
  generatedImage: GeneratedImageData | null;
  generating: boolean;
  updating: boolean;
  isAnimating: boolean;
  canUpdateCover: boolean;
  hasTracksSelected: boolean;
  onGenerateImage: () => void;
  onUpdateCover: () => void;
}

export default function ImagePreview({
  playlist,
  generatedImage,
  generating,
  updating,
  isAnimating,
  canUpdateCover,
  hasTracksSelected,
  onGenerateImage,
  onUpdateCover,
}: ImagePreviewProps) {
  const { useToken } = theme;
  const { token } = useToken();
  const responsive = useResponsiveValue();
  
  const buttonSize = responsive.isMobile ? "small" : "large";

  return (
    <PreviewSection>
      <PreviewBox>
        <OriginalImage
          src={playlist?.images?.[0]?.url}
          alt="Playlist Cover"
          width={300}
          height={300}
          style={{ objectFit: "contain", borderRadius: token.borderRadius }}
          $isAnimating={isAnimating}
        />
      </PreviewBox>
      
      <ButtonContainer>
        <GenerateButton
          type="primary"
          size={buttonSize}
          onClick={onGenerateImage}
          loading={generating}
          disabled={!hasTracksSelected}
          icon={generating ? <LoadingOutlined /> : null}
        >
          Generate New
        </GenerateButton>
        
        <SetCoverButton
          type="primary"
          size={buttonSize}
          disabled={!generatedImage || !canUpdateCover}
          onClick={onUpdateCover}
          loading={updating}
        >
          {responsive.isMobile ? <ArrowUpOutlined /> : <ArrowLeftOutlined />}
          Set as Cover
        </SetCoverButton>
        
        {!canUpdateCover && (
          <div style={{ 
            fontSize: '12px', 
            color: 'rgba(255, 255, 255, 0.6)', 
            textAlign: 'center',
            marginTop: '8px',
            maxWidth: '200px'
          }}>
            ⚠️ You can only update covers for playlists you own
          </div>
        )}
      </ButtonContainer>
      
      <PreviewBox>
        {generatedImage ? (
          <GeneratedImage
            src={generatedImage.imageUrl}
            alt="Generated Cover"
            width={300}
            height={300}
            style={{ objectFit: "contain", borderRadius: token.borderRadius }}
            $isAnimating={isAnimating}
          />
        ) : (
          "AI Generated Cover"
        )}
      </PreviewBox>
    </PreviewSection>
  );
} 