import styled from "@emotion/styled";
import { Layout, Typography } from "antd";
import { keyframes } from "@emotion/react";
import { mediaQueries } from "@/app/hooks/useResponsive";

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
    text-shadow: 0 0 20px rgba(7, 142, 54, 0.4);
  }
  to {
    text-shadow: 0 0 40px rgba(9, 255, 95, 0.7);
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
  z-index: 2;
`;

export const StyledTitle = styled(Typography.Title)`
  color: ${({ theme }) => theme.token.colorTextBase};
  margin: 0;
  font-size: 64px;
  font-weight: 900;
  text-shadow: 0 0 30px rgba(29, 185, 84, 0.5);
  letter-spacing: -0.02em;
  background: linear-gradient(45deg, #1db954, #1ed760, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${glow} 1.2s ease-in-out infinite alternate;
  text-align: center;
  max-width: 800px;
  line-height: 1.2;
  padding: 0 20px;
  
  ${mediaQueries.mobile} {
    font-size: 48px;
    max-width: 600px;
  }
  
  ${mediaQueries.xs} {
    font-size: 36px;
    max-width: 90%;
  }
`;

export const StyledSubtitle = styled(Typography.Text)`
  font-size: ${({ theme }) => theme.token.fontSizeLG}px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-weight: 500;
  text-align: center;
  max-width: 600px;
  text-shadow: 0 0 10px rgba(29, 185, 84, 0.3);
  
  ${mediaQueries.mobile} {
    font-size: ${({ theme }) => theme.token.fontSize}px;
    max-width: 90%;
  }
`;
