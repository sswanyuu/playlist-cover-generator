import styled from "@emotion/styled";
import { Button, Image, Card } from "antd";
import { keyframes } from "@emotion/react";
import { purpleButtonColors } from "@/styles/theme";
import { mediaQueries } from "@/lib/hooks/useResponsive";
import { SPACING, RADIUS, ANIMATIONS, SIZES, Z_INDEX } from "@/constants";
import { SUCCESS_THEME, TEXT, STATUS, SHADOWS } from "@/constants/colors";

// Animation keyframes
export const slideAnimation = keyframes`
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

// Main layout components
export const PreviewSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${SPACING.LG}px;
  margin-bottom: ${SPACING.XXL}px;
  padding: ${SPACING.XL}px;
  background-color: ${({ theme }) => theme.token.colorBgContainer};
  border-radius: ${({ theme }) => theme.token.borderRadius}px;
  position: relative;

  ${mediaQueries.mobile} {
    flex-direction: column;
    gap: ${SPACING.LG}px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${SPACING.LG}px;
  color: ${({ theme }) => theme.token.colorTextBase};
  z-index: ${Z_INDEX.HEADER};
`;

export const PreviewBox = styled.div`
  width: ${SIZES.COVER_PREVIEW_LARGE}px;
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
    width: ${SIZES.COVER_PREVIEW_MEDIUM}px;
    max-width: ${SIZES.COVER_PREVIEW_MEDIUM}px;
  }

  ${mediaQueries.xs} {
    width: ${SIZES.COVER_PREVIEW_SMALL}px;
    max-width: ${SIZES.COVER_PREVIEW_SMALL}px;
  }
`;

// Indicator components
export const IndicatorsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${SPACING.LG}px;
  margin-bottom: ${SPACING.XL}px;

  ${mediaQueries.mobile} {
    grid-template-columns: 1fr;
    gap: ${SPACING.MD}px;
  }
`;

export const StyleIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${SPACING.MD}px;
  margin-bottom: ${SPACING.XL}px;
  padding: ${SPACING.LG}px;
  background: ${SUCCESS_THEME.BACKGROUND};
  border: 1px solid ${SUCCESS_THEME.BORDER};
  border-radius: ${RADIUS.LG}px;

  ${mediaQueries.mobile} {
    flex-direction: column;
    gap: ${SPACING.SM}px;
    text-align: center;
  }
`;

export const TrackIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${SPACING.MD}px;
  margin-bottom: ${SPACING.XL}px;
  padding: ${SPACING.LG}px;
  background: ${SUCCESS_THEME.BACKGROUND};
  border: 1px solid ${SUCCESS_THEME.BORDER};
  border-radius: ${RADIUS.LG}px;

  ${mediaQueries.mobile} {
    flex-direction: column;
    gap: ${SPACING.SM}px;
    text-align: center;
  }
`;

export const StyleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.XS}px;
`;

export const StyleName = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: ${TEXT.MUTED};
`;

export const StyleDescription = styled.span`
  font-size: 14px;
  color: ${TEXT.SUBTLE};

  ${mediaQueries.mobile} {
    font-size: 13px;
  }
`;

// History section components
export const HistorySection = styled.div`
  margin-bottom: ${SPACING.XL}px;
`;

export const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.SM}px;
  margin-bottom: ${SPACING.LG}px;
  color: ${TEXT.MUTED};
  font-weight: 600;
`;

export const HistoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${SPACING.MD}px;

  ${mediaQueries.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: ${SPACING.SM}px;
  }
`;

export const HistoryCard = styled(Card)`
  cursor: pointer;
  transition: all ${ANIMATIONS.NORMAL} ease;
  border-radius: ${RADIUS.MD}px;

  .ant-card-body {
    padding: ${SPACING.SM}px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${SHADOWS.MD};
  }

  &.active {
    border: 2px solid ${STATUS.INFO};
    box-shadow: ${SHADOWS.FOCUS_BLUE};
  }
`;

export const HistoryImageInfo = styled.div`
  margin-top: ${SPACING.SM}px;
  text-align: center;
`;

// Button components
export const SetCoverButton = styled(Button)`
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

export const GenerateButton = styled(Button)`
  background-color: ${({ theme }) => theme.token.colorPrimary};
  border: none;
  &:hover {
    background-color: ${({ theme }) =>
      theme.token.colorPrimaryHover} !important;
  }
`;

// Image components with animation
export const OriginalImage = styled(Image)<{
  $isAnimating: boolean;
}>`
  animation: ${({ $isAnimating }) => ($isAnimating ? slideAnimation : "none")}
    ${ANIMATIONS.GLOW_DURATION} ease-in-out;
`;

export const GeneratedImage = styled(Image)<{
  $isAnimating: boolean;
}>`
  transition: transform ${ANIMATIONS.TRANSFORM_DURATION} ease-in-out;
  transform: ${({ $isAnimating }) =>
    $isAnimating ? "translateX(-100%)" : "translateX(0)"};
`;
