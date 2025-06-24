"use client";

import { useState, useEffect } from "react";
import { Button, Image, App, theme, Space, Card, Tooltip } from "antd";
import type { ImageProps } from "antd";
import styled from "@emotion/styled";
import {
  LoadingOutlined,
  ArrowLeftOutlined,
  ArrowUpOutlined,
  BgColorsOutlined,
  SoundOutlined,
  HistoryOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { purpleButtonColors } from "@/app/theme";
import { keyframes } from "@emotion/react";
import { useResponsiveValue } from "@/app/utils/responsive";
import { mediaQueries } from "@/app/hooks/useResponsive";
import { getStyleById } from "@/lib/leonardo-styles";

//add responsive design for mobile
const PreviewSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;
  padding: 24px;
  background-color: ${({ theme }) => theme.token.colorBgContainer};
  border-radius: ${({ theme }) => theme.token.borderRadius}px;
  position: relative;
  
  ${mediaQueries.mobile} {
    flex-direction: column;
    gap: 16px;
  }
`;

const StyleIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(82, 196, 26, 0.1);
  border: 1px solid rgba(82, 196, 26, 0.3);
  border-radius: 12px;
  
  ${mediaQueries.mobile} {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
`;

const TrackIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(82, 196, 26, 0.1);
  border: 1px solid rgba(82, 196, 26, 0.3);
  border-radius: 12px;
  
  ${mediaQueries.mobile} {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
`;

const IndicatorsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
  
  ${mediaQueries.mobile} {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const HistorySection = styled.div`
  margin-bottom: 24px;
`;

const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
`;

const HistoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  
  ${mediaQueries.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 8px;
  }
`;

const HistoryCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  
  .ant-card-body {
    padding: 8px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &.active {
    border: 2px solid #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const HistoryImageInfo = styled.div`
  margin-top: 8px;
  text-align: center;
`;

const StyleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyleName = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
`;

const StyleDescription = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  
  ${mediaQueries.mobile} {
    font-size: 13px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: ${({ theme }) => theme.token.colorTextBase};
  z-index: 1;
`;

const SetCoverButton = styled(Button)`
  background-color: ${purpleButtonColors.colorPurple};
  border: none;
  &:hover {
    background-color: ${purpleButtonColors.colorPurpleHover} !important;
  }
  &:active {
    background-color: ${purpleButtonColors.colorPurpleActive} !important;
    transform: scale(0.98);
  }
`;

const GenerateButton = styled(Button)`
  background-color: ${({ theme }) => theme.token.colorPrimary};
  border: none;
  &:hover {
    background-color: ${({ theme }) =>
      theme.token.colorPrimaryHover} !important;
  }
`;

const PreviewBox = styled.div`
  width: 300px;
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.token.colorBgContainer};
  border-radius: ${({ theme }) => theme.token.borderRadius}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.token.colorTextSecondary};
  position: relative;
  overflow: hidden;
  
  ${mediaQueries.mobile} {
    width: 250px;
    max-width: 250px;
  }
  
  ${mediaQueries.xs} {
    width: 200px;
    max-width: 200px;
  }
`;

const slideAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const ImageWithAnimation = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $isAnimating,
  alt = "",
  ...rest
}: { $isAnimating: boolean } & React.ImgHTMLAttributes<HTMLImageElement> &
  ImageProps) => <Image alt={alt} {...rest} />;

const OriginalImage = styled(ImageWithAnimation)<{ $isAnimating: boolean }>`
  animation: ${({ $isAnimating }) => ($isAnimating ? slideAnimation : "none")}
    1s ease-in-out;
`;

const GeneratedImage = styled(ImageWithAnimation)<{ $isAnimating: boolean }>`
  transition: transform 0.5s ease-in-out;
  transform: ${({ $isAnimating }) =>
    $isAnimating ? "translateX(-100%)" : "translateX(0)"};
`;

interface GeneratedImageData {
  id: string;
  imageUrl: string;
  style: string;
  createdAt: string;
}

interface CoverGeneratorProps {
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

export default function CoverGenerator({
  playlist,
  tracks,
  selectedStyleId,
  onCoverUpdate,
  canUpdateCover = true,
}: CoverGeneratorProps) {
  const { useToken } = theme;
  const { token } = useToken();
  const { message } = App.useApp();
  const responsive = useResponsiveValue();
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImageData | null>(null);
  const [updating, setUpdating] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageHistory, setImageHistory] = useState<GeneratedImageData[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [selectedHistoryImage, setSelectedHistoryImage] = useState<string | null>(null);
  
  // Responsive button sizes
  const buttonSize = responsive.isMobile ? "small" : "large";
  
  // Get selected style info
  const selectedStyle = getStyleById(selectedStyleId);

  // Load image history on component mount
  useEffect(() => {
    const loadImageHistory = async () => {
      try {
        const response = await fetch(`/api/playlists/${playlist.id}/images`);
        if (response.ok) {
          const data = await response.json();
          setImageHistory(data.images || []);
          
          // Set the most recent image as generated image if available
          if (data.images && data.images.length > 0) {
            const mostRecentImage = data.images[0]; // First item is most recent due to desc order
            setGeneratedImage(mostRecentImage);
            setSelectedHistoryImage(mostRecentImage.id);
          }
        }
      } catch (error) {
        console.error("Error loading image history:", error);
      } finally {
        setLoadingHistory(false);
      }
    };

    if (playlist.id) {
      loadImageHistory();
    }
  }, [playlist.id]);
  
  const fetchImageAsBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
  
    const imageBitmap = await createImageBitmap(blob);
    const canvas = document.createElement('canvas');
    const size = 300;
    canvas.width = size;
    canvas.height = size;
  
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(imageBitmap, 0, 0, size, size);
  
    const base64Data = canvas.toDataURL('image/jpeg', 0.8); // Compress to reduce size
    return base64Data.replace(/^data:image\/jpeg;base64,/, ''); // Strip prefix
  }

  const saveImageToDatabase = async (imageUrl: string): Promise<GeneratedImageData> => {
    try {
      const response = await fetch(`/api/playlists/${playlist.id}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          style: selectedStyleId,
          playlistName: playlist.name,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const savedImage = data.image as GeneratedImageData;
        // Update history with new image
        setImageHistory(prev => [savedImage, ...prev]);
        setSelectedHistoryImage(savedImage.id);
        return savedImage;
      }
      
      throw new Error(`Failed to save image: ${response.status}`);
    } catch (error) {
      console.error("Error saving image to database:", error);
      throw error;
    }
  };

  const handleGenerateImage = async () => {
    if (!playlist?.name || !tracks || tracks.length === 0) {
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
          playlistName: playlist.name,
          trackNames: trackNames,
          styleId: selectedStyleId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate generation");
      }

      const { generationId } = await response.json();

      let attempts = 0;
      const maxAttempts = 10;
      let completed = false;

      while (!completed && attempts < maxAttempts) {
        await new Promise((res) => setTimeout(res, 2000));
        const poll = await fetch(`/api/generation-result?id=${generationId}`);
        const result = await poll.json();

        if (result.status === "COMPLETE") {
          // Save to database and get the full image object
          const savedImage = await saveImageToDatabase(result.imageUrl);
          
          if (savedImage) {
            setGeneratedImage(savedImage);
            setSelectedHistoryImage(null); // Clear history selection since this is new
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

  const handleUpdateCover = async () => {
    if (!generatedImage) return;

    setUpdating(true);
    try {
      const imageBase64 = await fetchImageAsBase64(generatedImage.imageUrl);

      await onCoverUpdate(imageBase64);
      setIsAnimating(true);
      message.success("Playlist cover updated successfully!");
      // TODO: handle case where playlist.images is undefined initially
      if (playlist?.images?.[0]) {
        playlist.images[0].url = generatedImage.imageUrl;
      }
      // Reset animation after it completes
      setTimeout(() => {
        setIsAnimating(false);
        setGeneratedImage(null);
        setSelectedHistoryImage(null);
      }, 1000);
    } catch (error) {
      console.error("Error updating playlist cover:", error);
      message.error("Failed to update playlist cover");
    } finally {
      setUpdating(false);
    }
  };

  const handleHistoryImageClick = (image: GeneratedImageData) => {
    setGeneratedImage(image);
    setSelectedHistoryImage(image.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Style and Track Indicators */}
      {(selectedStyle || (tracks && tracks.length > 0)) && (
        <IndicatorsContainer>
          {/* Style Indicator */}
          {selectedStyle && (
            <StyleIndicator>
              <Space align="center" size={12}>
                <BgColorsOutlined style={{ fontSize: '20px', color: 'rgba(82, 196, 26, 0.8)' }} />
                <StyleInfo>
                  <StyleName>Style: {selectedStyle.name}</StyleName>
                  <StyleDescription>{selectedStyle.description}</StyleDescription>
                </StyleInfo>
              </Space>
            </StyleIndicator>
          )}
          
          {/* Track Count Indicator */}
    
            <TrackIndicator>
              <Space align="center" size={12}>
                <SoundOutlined style={{ fontSize: '20px', color: 'rgba(82, 196, 26, 0.8)' }} />
                <StyleInfo>
                  <StyleName>
                    {tracks.length} Track{tracks.length === 1 ? '' : 's'} Selected
                  </StyleName>
                  <StyleDescription>
                    {tracks.length < 5 
                      ? "Consider adding more tracks for better AI understanding"
                      : tracks.length === 10 
                      ? "Perfect! Maximum tracks selected for optimal AI generation"
                      : "Great selection for AI generation"
                    }
                  </StyleDescription>
                </StyleInfo>
              </Space>
            </TrackIndicator>
          
        </IndicatorsContainer>
      )}

      {/* Image History Section */}
      {!loadingHistory && imageHistory.length > 0 && (
        <HistorySection>
          <HistoryHeader>
            <HistoryOutlined />
            Previous Generations ({imageHistory.length})
          </HistoryHeader>
          <HistoryGrid>
            {imageHistory.map((image) => (
              <HistoryCard
                key={image.id}
                size="small"
                className={selectedHistoryImage === image.id ? 'active' : ''}
                onClick={() => handleHistoryImageClick(image)}
                cover={
                  <Image
                    src={image.imageUrl}
                    alt={`Generated with ${image.style} style`}
                    preview={false}
                    style={{ 
                      height: responsive.isMobile ? '80px' : '100px',
                      objectFit: 'cover'
                    }}
                  />
                }
              >
                <HistoryImageInfo>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {getStyleById(image.style)?.name || image.style}
                  </div>
                  <Tooltip title={formatDate(image.createdAt)}>
                    <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <ClockCircleOutlined />
                      {new Date(image.createdAt).toLocaleDateString()}
                    </div>
                  </Tooltip>
                </HistoryImageInfo>
              </HistoryCard>
            ))}
          </HistoryGrid>
        </HistorySection>
      )}
      
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
            onClick={handleGenerateImage}
            loading={generating}
            disabled={!tracks || tracks.length === 0}
            icon={generating ? <LoadingOutlined /> : null}
          >
            Generate New
          </GenerateButton>
          <SetCoverButton
            type="primary"
            size={buttonSize}
            disabled={!generatedImage || !canUpdateCover}
            onClick={handleUpdateCover}
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
    </>
  );
}
