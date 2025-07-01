import React from "react";
import { Image, Tooltip } from "antd";
import { HistoryOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useResponsiveValue } from "@/utils/responsive";
import { getStyleById } from "@/lib/leonardo-styles";
import { GeneratedImageData } from "./types";
import {
  HistorySection,
  HistoryHeader,
  HistoryGrid,
  HistoryCard,
  HistoryImageInfo,
} from "./styles";

interface GenerationHistoryProps {
  imageHistory: GeneratedImageData[];
  loadingHistory: boolean;
  selectedHistoryImage: string | null;
  onHistoryImageClick: (image: GeneratedImageData) => void;
}

export default function GenerationHistory({
  imageHistory,
  loadingHistory,
  selectedHistoryImage,
  onHistoryImageClick,
}: GenerationHistoryProps) {
  const responsive = useResponsiveValue();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loadingHistory || imageHistory.length === 0) {
    return null;
  }

  return (
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
            onClick={() => onHistoryImageClick(image)}
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
                <div style={{ 
                  fontSize: '11px', 
                  color: 'rgba(255, 255, 255, 0.6)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '4px' 
                }}>
                  <ClockCircleOutlined />
                  {new Date(image.createdAt).toLocaleDateString()}
                </div>
              </Tooltip>
            </HistoryImageInfo>
          </HistoryCard>
        ))}
      </HistoryGrid>
    </HistorySection>
  );
} 