import styled from "@emotion/styled";
import { Layout, Typography, theme } from "antd";
import { keyframes } from "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    token: typeof theme.useToken extends () => { token: infer T } ? T : never;
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
  background: ${({ theme }) => theme.token.colorBgBase};
  position: relative;
  overflow: hidden;
`;

export const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(29, 185, 84, 0.1) 0%,
    rgba(0, 0, 0, 0) 70%
  );
  z-index: 1;
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
  animation: ${glow} 1.5s ease-in-out infinite alternate;
  text-align: center;
  max-width: 800px;
  line-height: 1.2;
  padding: 0 20px;
`;

export const StyledSubtitle = styled(Typography.Text)`
  color: ${({ theme }) => theme.token.colorTextSecondary};
  font-size: ${({ theme }) => theme.token.fontSizeLG}px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-weight: 500;
  text-align: center;
  max-width: 600px;
  text-shadow: 0 0 10px rgba(29, 185, 84, 0.3);
`;
