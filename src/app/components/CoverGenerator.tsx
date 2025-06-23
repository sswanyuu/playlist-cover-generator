"use client";

import { useState } from "react";
import { Button, Image, App, theme, Space } from "antd";
import type { ImageProps } from "antd";
import styled from "@emotion/styled";
import {
  LoadingOutlined,
  ArrowLeftOutlined,
  ArrowUpOutlined,
  BgColorsOutlined,
  SoundOutlined,
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

interface CoverGeneratorProps {
  playlist: {
    images: Array<{ url: string }>;
    name: string;
  };
  tracks: Array<{
    name: string;
  }>;
  selectedStyleId: string;
  onCoverUpdate: (imageBase64: string) => Promise<void>;
}

export default function CoverGenerator({
  playlist,
  tracks,
  selectedStyleId,
  onCoverUpdate,
}: CoverGeneratorProps) {
  const { useToken } = theme;
  const { token } = useToken();
  const { message } = App.useApp();
  const responsive = useResponsiveValue();
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Responsive button sizes
  const buttonSize = responsive.isMobile ? "small" : "large";
  
  // Get selected style info
  const selectedStyle = getStyleById(selectedStyleId);
  
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
          setGeneratedImage(result.imageUrl);
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
      const imageBase64 = await fetchImageAsBase64(generatedImage);

      await onCoverUpdate(imageBase64);
      setIsAnimating(true);
      message.success("Playlist cover updated successfully!");
      // TODO: handle case where playlist.images is undefined initially
      if (playlist?.images?.[0]) {
        playlist.images[0].url = generatedImage;
      }
      // Reset animation after it completes
      setTimeout(() => {
        setIsAnimating(false);
        setGeneratedImage(null);
      }, 1000);
    } catch (error) {
      console.error("Error updating playlist cover:", error);
      message.error("Failed to update playlist cover");
    } finally {
      setUpdating(false);
    }
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
          {tracks && tracks.length > 0 && (
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
                      : tracks.length > 15 
                      ? "Great selection! AI will use these to understand your music taste"
                      : "Perfect amount of tracks for AI generation"
                    }
                  </StyleDescription>
                </StyleInfo>
              </Space>
            </TrackIndicator>
          )}
        </IndicatorsContainer>
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
            Generate
          </GenerateButton>
          <SetCoverButton
            type="primary"
            size={buttonSize}
            disabled={!generatedImage}
            onClick={handleUpdateCover}
            loading={updating}
          >
            {responsive.isMobile ? <ArrowUpOutlined /> : <ArrowLeftOutlined />}
            Set as Cover
          </SetCoverButton>
        </ButtonContainer>
        <PreviewBox>
          {generatedImage ? (
            <GeneratedImage
              src={generatedImage}
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
