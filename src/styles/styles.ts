import styled from "@emotion/styled";
import { Layout, Typography } from "antd";
import { keyframes } from "@emotion/react";
import { mediaQueries } from "@/lib/hooks/useResponsive";
import { SPACING, Z_INDEX, FONT_SIZES, ANIMATIONS, GRID } from "@/constants";
import { EFFECTS, GRADIENTS } from "@/constants/colors";

declare module "@emotion/react" {
  export interface Theme {
    token: Partial<
      typeof import("antd").theme.useToken extends () => { token: infer T }
        ? T
        : never
    >;
  }
}

const { Content } = Layout;

const glow = keyframes`
  from {
    text-shadow: ${EFFECTS.GLOW_GREEN};
  }
  to {
    text-shadow: ${EFFECTS.GLOW_GREEN_BRIGHT};
  }
`;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.token.margin}px;
  position: relative;
  z-index: ${Z_INDEX.HEADER};
`;

export const StyledTitle = styled(Typography.Title)`
  color: ${({ theme }) => theme.token.colorTextBase};
  margin: 0;
  font-size: ${FONT_SIZES.MEGA};
  font-weight: 900;
  text-shadow: ${EFFECTS.GLOW_GREEN_MEDIUM};
  letter-spacing: -0.02em;
  background: ${GRADIENTS.HERO};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${glow} ${ANIMATIONS.GLOW_DURATION} ease-in-out infinite alternate;
  text-align: center;
  max-width: ${GRID.MAX_CONTENT_WIDTH};
  line-height: 1.2;
  padding: 0 ${SPACING.XL}px;

  ${mediaQueries.mobile} {
    font-size: ${FONT_SIZES.HERO};
    max-width: ${GRID.MAX_DESCRIPTION_WIDTH};
  }

  ${mediaQueries.xs} {
    font-size: ${FONT_SIZES.XXXL};
    max-width: 90%;
  }
`;

export const StyledSubtitle = styled(Typography.Text)`
  font-size: ${({ theme }) => theme.token.fontSizeLG}px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-weight: 500;
  text-align: center;
  max-width: ${GRID.MAX_DESCRIPTION_WIDTH};
  text-shadow: ${EFFECTS.GLOW_GREEN_SOFT};

  ${mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.token.fontSize}px;
    max-width: 90%;
  }
`;
