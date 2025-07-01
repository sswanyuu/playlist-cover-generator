import styled from "@emotion/styled";
import { List, Button } from "antd";
import { mediaQueries } from "@/lib/hooks/useResponsive";
import { SPACING, RADIUS, ANIMATIONS } from "@/constants";
import { BACKGROUND, TEXT } from "@/constants/colors";

export const TrackListContainer = styled.div`
  margin-top: ${SPACING.XL}px;
`;

export const SelectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${SPACING.LG}px;

  ${mediaQueries.mobile} {
    flex-direction: column;
    justify-content: center;
    gap: ${SPACING.LG}px;
  }
`;

export const TrackItem = styled(List.Item)`
  padding: ${SPACING.MD}px ${SPACING.LG}px;
  border-radius: ${RADIUS.MD}px;
  margin-bottom: ${SPACING.XS}px;
  transition: background-color ${ANIMATIONS.FAST};

  &:hover {
    background-color: ${BACKGROUND.OVERLAY_LIGHT};
  }
`;

export const ReadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${SPACING.LG}px;
  padding-top: ${SPACING.LG}px;
  border-top: 1px solid ${BACKGROUND.OVERLAY_STRONG};
`;

export const ReadMoreButton = styled(Button)`
  background: ${BACKGROUND.OVERLAY_MEDIUM};
  border: 1px solid ${BACKGROUND.OVERLAY_STRONG};
  color: ${TEXT.MUTED};

  &:hover {
    background: ${BACKGROUND.OVERLAY_STRONG} !important;
    border-color: ${BACKGROUND.OVERLAY_VERY_STRONG} !important;
    color: ${TEXT.MUTED} !important;
  }

  &:focus {
    background: ${BACKGROUND.OVERLAY_MEDIUM} !important;
    border-color: ${BACKGROUND.OVERLAY_STRONG} !important;
    color: ${TEXT.MUTED} !important;
  }
`;
