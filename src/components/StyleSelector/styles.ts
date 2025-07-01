import styled from "@emotion/styled";
import { BRAND, BASE, BACKGROUND, SUCCESS_THEME } from "@/constants/colors";
import { SPACING, RADIUS, ANIMATIONS } from "@/constants";

export const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${SPACING.LG}px;
  margin: ${SPACING.XL}px 0;
`;

export const StyleCard = styled.div<{ selected: boolean }>`
  border: 2px solid
    ${(props) => (props.selected ? BRAND.SPOTIFY_GREEN : BASE.MEDIUM_GRAY)};
  border-radius: ${RADIUS.LG}px;
  padding: ${SPACING.LG}px;
  background: ${(props) =>
    props.selected ? SUCCESS_THEME.BACKGROUND : BACKGROUND.CARD_DARK};
  cursor: pointer;
  transition: all ${ANIMATIONS.FAST} ease;

  &:hover {
    border-color: ${BRAND.SPOTIFY_GREEN};
    background: ${SUCCESS_THEME.BACKGROUND_LIGHT};
  }
`;

export const StyleName = styled.h4`
  margin: 0 0 ${SPACING.SM}px 0;
  color: ${BASE.WHITE};
  font-size: 16px;
  font-weight: 600;
`;

export const StyleDescription = styled.p`
  margin: 0;
  color: ${BASE.PLACEHOLDER_GRAY};
  font-size: 14px;
  line-height: 1.4;
`;

export const SectionTitle = styled.h3`
  color: ${BASE.WHITE};
  margin: 0 0 ${SPACING.LG}px 0;
  font-size: 18px;
  font-weight: 600;
`;

export const SelectedBadge = styled.div`
  display: inline-block;
  background: ${BRAND.SPOTIFY_GREEN};
  color: white;
  padding: ${SPACING.XS}px ${SPACING.SM}px;
  border-radius: ${RADIUS.SM}px;
  font-size: 12px;
  font-weight: 500;
  margin-top: ${SPACING.SM}px;
`;
