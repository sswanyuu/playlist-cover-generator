"use client";

import { useState } from "react";
import { Button, Image, Typography, App, theme, Grid } from "antd";
import type { ImageProps } from "antd";
import styled from "@emotion/styled";
import {
  LoadingOutlined,
  ArrowLeftOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { purpleButtonColors } from "@/app/theme";
import { keyframes } from "@emotion/react";

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
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 16px;
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
  @media (max-width: 768px) {
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
  onCoverUpdate: (imageUrl: string) => Promise<void>;
}

export default function CoverGenerator({
  playlist,
  tracks,
  onCoverUpdate,
}: CoverGeneratorProps) {
  const { Title, Paragraph } = Typography;
  const { useBreakpoint } = Grid;
  const { useToken } = theme;
  const { token } = useToken();
  const { message } = App.useApp();
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const handleGenerateImage = async () => {
    if (!playlist?.name || !tracks) return;
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
      await onCoverUpdate(generatedImage);
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
  const screen = useBreakpoint();
  const isMobile = screen.xs;
  return (
    <>
      <Title level={isMobile ? 4 : 3} style={{ color: token.colorTextBase }}>
        {playlist?.name}
      </Title>
      <Paragraph strong italic>
        ✨ Create a stunning playlist cover with the power of AI.
      </Paragraph>
      <Paragraph>
        Transform your playlist into a visual vibe. Just click Generate, and let
        the magic happen.
      </Paragraph>
      <PreviewSection>
        <PreviewBox>
          <OriginalImage
            src={playlist?.images?.[0]?.url}
            alt="Playlist Cover"
            width={300}
            height={300}
            style={{ objectFit: "cover", borderRadius: token.borderRadius }}
            $isAnimating={isAnimating}
          />
        </PreviewBox>
        <ButtonContainer>
          <GenerateButton
            type="primary"
            size={isMobile ? "small" : "large"}
            onClick={handleGenerateImage}
            loading={generating}
            icon={generating ? <LoadingOutlined /> : null}
          >
            Generate
          </GenerateButton>
          <SetCoverButton
            type="primary"
            size={isMobile ? "small" : "large"}
            disabled={!generatedImage}
            onClick={handleUpdateCover}
            loading={updating}
          >
            {screen.xs ? <ArrowUpOutlined /> : <ArrowLeftOutlined />}
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
              style={{ objectFit: "cover", borderRadius: token.borderRadius }}
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
