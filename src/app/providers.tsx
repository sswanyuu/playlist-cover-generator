"use client";

import { ConfigProvider, App as AntdApp } from "antd";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import { spotifyTheme } from "./theme";

export function Providers({ children }: { children: React.ReactNode }) {
  const emotionTheme = {
    token: spotifyTheme.token, // sync AntD token to Emotion
  };
  return (
    <SessionProvider>
      <ConfigProvider theme={spotifyTheme}>
        <AntdApp>
          <EmotionThemeProvider theme={emotionTheme}>
            {children}
          </EmotionThemeProvider>
        </AntdApp>
      </ConfigProvider>
    </SessionProvider>
  );
}
