import styled from "@emotion/styled";
import { Card } from "antd";
import { mediaQueries } from "@/lib/hooks/useResponsive";
import {
  SPACING,
  RADIUS,
  ANIMATIONS,
  BLUR,
  SIZES,
  FONT_SIZES,
} from "@/constants";
import { BACKGROUND, TEXT, GRADIENTS, SHADOWS } from "@/constants/colors";

export const StyledCard = styled(Card)`
  margin-bottom: ${SPACING.XXL}px;
  border-radius: ${RADIUS.XL}px;
  backdrop-filter: ${BLUR.MD};

  .ant-card-body {
    padding: ${SPACING.XXL}px;
    ${mediaQueries.xs} {
      padding: ${SPACING.LG}px;
    }
  }

  &:hover {
    transform: translateY(-2px);
    transition: all ${ANIMATIONS.NORMAL} ease;
    box-shadow: ${SHADOWS.XL};
  }
`;

export const StepHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${SPACING.XL}px;

  ${mediaQueries.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${SPACING.MD}px;
  }
`;

export const StepTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.MD}px;
`;

export const StepIcon = styled.div<{ active?: boolean; completed?: boolean }>`
  width: ${SIZES.STEP_ICON_LARGE}px;
  height: ${SIZES.STEP_ICON_LARGE}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${FONT_SIZES.XL};
  background: ${({ active, completed }) =>
    completed
      ? GRADIENTS.SUCCESS
      : active
      ? GRADIENTS.BLUE
      : BACKGROUND.OVERLAY_STRONG};
  color: ${({ active, completed }) =>
    active || completed ? TEXT.PRIMARY : TEXT.FADED};
  transition: all ${ANIMATIONS.NORMAL} ease;
  ${mediaQueries.xs} {
    min-width: ${SIZES.STEP_ICON_SMALL}px;
    width: ${SIZES.STEP_ICON_SMALL}px;
    height: ${SIZES.STEP_ICON_SMALL}px;
    font-size: ${FONT_SIZES.LG};
  }
`;
