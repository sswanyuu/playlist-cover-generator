import styled from "@emotion/styled";
import { mediaQueries } from "@/lib/hooks/useResponsive";
import { SPACING, RADIUS, ANIMATIONS, Z_INDEX, BLUR } from "@/constants";
import {
  BACKGROUND,
  STATUS,
  TEXT,
  GRADIENTS,
  SHADOWS,
  EFFECTS,
} from "@/constants/colors";

export const FloatingNav = styled.div<{ expanded: boolean }>`
  position: fixed;
  right: ${SPACING.XL}px;
  top: 80%;
  transform: translateY(-50%);
  z-index: ${Z_INDEX.FLOATING_NAV};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${SPACING.MD}px;
  backdrop-filter: ${BLUR.MD};
  border-radius: ${RADIUS.XXL}px;
  padding: ${SPACING.LG}px;
  border: 1px solid ${BACKGROUND.OVERLAY_STRONG};
  box-shadow: ${SHADOWS.XL};
  transition: all ${ANIMATIONS.NORMAL} ease;

  ${mediaQueries.mobile} {
    right: ${SPACING.LG}px;
    padding: ${SPACING.MD}px;
    top: 85%;
  }

  ${mediaQueries.desktop} {
    /* Desktop: expand on hover */
    &:hover {
      transform: translateY(-50%) translateX(-8px);
      box-shadow: ${SHADOWS.XXL};
    }

    &:hover > div:last-child {
      opacity: 1;
    }
  }
`;

export const BackToTopButton = styled.button<{
  $buttonSize: number;
  $fontSize: string;
}>`
  width: ${({ $buttonSize }) => $buttonSize}px;
  height: ${({ $buttonSize }) => $buttonSize}px;
  border-radius: ${({ $buttonSize }) => $buttonSize / 2}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $fontSize }) => $fontSize};
  background: ${GRADIENTS.PURPLE};
  border: none;
  color: ${TEXT.PRIMARY};
  box-shadow: ${EFFECTS.GLOW_PURPLE};
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${EFFECTS.GLOW_PURPLE_STRONG};
    background: ${GRADIENTS.PURPLE_BRIGHT} !important;
    border: none !important;
    color: ${TEXT.PRIMARY} !important;
  }

  &:focus {
    background: ${GRADIENTS.PURPLE} !important;
    border: none !important;
    color: ${TEXT.PRIMARY} !important;
  }

  transition: all ${ANIMATIONS.NORMAL} ease;
`;

export const StepsContainer = styled.div<{ expanded: boolean; gap: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap}px;
  max-height: ${({ expanded }) => (expanded ? "300px" : "0")};
  opacity: ${({ expanded }) => (expanded ? "1" : "0")};
  overflow: hidden;
  transition: all ${ANIMATIONS.NORMAL} ease;

  ${mediaQueries.desktop} {
    /* Desktop: show on parent hover */
    max-height: 300px;
    opacity: 0;
  }
`;

export const NavButton = styled.a<{
  active?: boolean;
  completed?: boolean;
  $buttonSize: number;
  $fontSize: string;
}>`
  width: ${({ $buttonSize }) => $buttonSize}px;
  height: ${({ $buttonSize }) => $buttonSize}px;
  border-radius: ${({ $buttonSize }) => $buttonSize / 2}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $fontSize }) => $fontSize};
  text-decoration: none;
  border: 2px solid;
  cursor: pointer;

  background: ${({ active, completed }) =>
    completed
      ? GRADIENTS.SUCCESS
      : active
      ? GRADIENTS.BLUE
      : BACKGROUND.OVERLAY_STRONG};

  border-color: ${({ active, completed }) =>
    completed
      ? STATUS.SUCCESS
      : active
      ? STATUS.INFO
      : BACKGROUND.OVERLAY_VERY_STRONG};

  color: ${({ active, completed }) =>
    active || completed ? TEXT.PRIMARY : TEXT.FADED} !important;

  box-shadow: ${({ active, completed }) =>
    completed
      ? EFFECTS.GLOW_SUCCESS
      : active
      ? EFFECTS.GLOW_BLUE_MEDIUM
      : SHADOWS.SM};

  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ completed }) =>
      completed ? EFFECTS.GLOW_SUCCESS_STRONG : EFFECTS.GLOW_BLUE_STRONG};
    border-color: ${({ completed }) =>
      completed ? STATUS.SUCCESS : STATUS.INFO} !important;
    background: ${({ completed }) =>
      completed ? GRADIENTS.SUCCESS_BRIGHT : GRADIENTS.BLUE_BRIGHT} !important;
    color: ${TEXT.PRIMARY} !important;
  }

  &:focus {
    color: ${({ active, completed }) =>
      active || completed ? TEXT.PRIMARY : TEXT.FADED} !important;
  }

  transition: all ${ANIMATIONS.NORMAL} ease;
`;
