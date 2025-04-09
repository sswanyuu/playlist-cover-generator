"use client";

import { useState } from "react";
import { Button, Image, Typography, message, theme } from "antd";
import styled from "@emotion/styled";
import {
  ArrowRightOutlined,
  LoadingOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { purpleButtonColors } from "@/app/theme";
import { keyframes } from "@emotion/react";

const { Title } = Typography;
const { useToken } = theme;

const PreviewSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 24px;
  background-color: ${({ theme }) => theme.token.colorBgContainer};
  border-radius: ${({ theme }) => theme.token.borderRadius}px;
  position: relative;
`;

const ArrowContainer = styled.div`
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
  margin-bottom: 8px;
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
  height: 300px;
  background-color: ${({ theme }) => theme.token.colorBgContainer};
  border-radius: ${({ theme }) => theme.token.borderRadius}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.token.colorTextSecondary};
  position: relative;
  overflow: hidden;
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

const OriginalImage = styled(Image)<{ isAnimating: boolean }>`
  animation: ${({ isAnimating }) => (isAnimating ? slideAnimation : "none")} 1s
    ease-in-out;
`;

const GeneratedImage = styled(Image)<{ isAnimating: boolean }>`
  transition: transform 0.5s ease-in-out;
  transform: ${({ isAnimating }) =>
    isAnimating ? "translateX(-100%)" : "translateX(0)"};
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
  const { token } = useToken();
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
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
      message.success("Image generated successfully!");
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
      console.log(
        `🚀🚀🚀 ~~~ ~ CoverGenerator.tsx:177 ~ handleUpdateCover ~ "Playlist cover updated successfully!":`,
        "Playlist cover updated successfully!"
      );
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
      <Title level={2} style={{ color: token.colorTextBase }}>
        {playlist?.name}
      </Title>
      <PreviewSection>
        <PreviewBox>
          <OriginalImage
            src={playlist?.images[0]?.url}
            alt="Playlist Cover"
            width={300}
            height={300}
            style={{ objectFit: "cover", borderRadius: token.borderRadius }}
            isAnimating={isAnimating}
          />
        </PreviewBox>
        <ArrowContainer>
          <SetCoverButton
            type="primary"
            size="large"
            disabled={!generatedImage}
            onClick={handleUpdateCover}
            loading={updating}
          >
            Set as Cover
          </SetCoverButton>
          <ArrowLeftOutlined style={{ fontSize: 24 }} />
          <ArrowRightOutlined style={{ fontSize: 24 }} />
          <GenerateButton
            type="primary"
            size="large"
            onClick={handleGenerateImage}
            loading={generating}
            icon={generating ? <LoadingOutlined /> : null}
          >
            Generate Cover Image
          </GenerateButton>
        </ArrowContainer>
        <PreviewBox>
          {generatedImage ? (
            <GeneratedImage
              src={generatedImage}
              alt="Generated Cover"
              width={300}
              height={300}
              style={{ objectFit: "cover", borderRadius: token.borderRadius }}
              isAnimating={isAnimating}
            />
          ) : (
            "AI Generated Cover"
          )}
        </PreviewBox>
      </PreviewSection>
    </>
  );
}
