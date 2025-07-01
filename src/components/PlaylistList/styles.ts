import styled from "@emotion/styled";
import { SPACING, RADIUS, ANIMATIONS, FONT_SIZES } from "@/constants";
import { SUCCESS_THEME, BACKGROUND, TEXT, SHADOWS } from "@/constants/colors";

export const PlaylistContainer = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const HeaderSection = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${SPACING.XL}px;
  flex-wrap: wrap;
  gap: ${SPACING.LG}px;
`;

export const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.MD}px;
`;

export const PlaylistItem = styled.div<{ $canUpdate: boolean }>`
  display: flex;
  align-items: center;
  gap: ${SPACING.LG}px;
  width: 100%;
  padding: ${SPACING.MD}px;
  border-radius: ${RADIUS.MD}px;
  border: 1px solid
    ${({ $canUpdate }) =>
      $canUpdate ? SUCCESS_THEME.BORDER : BACKGROUND.OVERLAY_STRONG};
  background: ${({ $canUpdate }) =>
    $canUpdate ? SUCCESS_THEME.BACKGROUND_LIGHT : "transparent"};
  transition: all ${ANIMATIONS.FAST} ease;

  &:hover {
    background-color: ${BACKGROUND.OVERLAY_MEDIUM};
    cursor: pointer;
    transform: translateY(-1px);
    box-shadow: ${SHADOWS.SM};
  }
`;

export const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PlaylistHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.SM}px;
  margin-bottom: ${SPACING.XS}px;
`;

export const OwnershipBadge = styled.span<{ $isOwned: boolean }>`
  margin: 0;
  font-size: ${FONT_SIZES.XS};
  padding: 2px ${SPACING.SM}px;
  border-radius: ${RADIUS.LG}px;
  border: none;
  display: inline-flex;
  align-items: center;
  background: ${({ $isOwned }) =>
    $isOwned ? SUCCESS_THEME.BACKGROUND_MEDIUM : BACKGROUND.OVERLAY_STRONG};
  color: ${({ $isOwned }) =>
    $isOwned ? SUCCESS_THEME.TEXT_STRONG : TEXT.SUBTLE};
`;

export const StatsSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.LG}px;
  margin: ${SPACING.LG}px;
  padding: ${SPACING.LG}px;
  background: ${BACKGROUND.OVERLAY_MEDIUM};
  border-radius: ${RADIUS.MD}px;
`;
