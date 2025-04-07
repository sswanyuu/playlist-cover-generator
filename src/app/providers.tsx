"use client";

import { ConfigProvider, theme } from "antd";
import { ThemeProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import { spotifyTheme } from "./theme";

const { useToken } = theme;

export function Providers({ children }: { children: React.ReactNode }) {
  const { token } = useToken();

  return (
    <SessionProvider>
      <ConfigProvider theme={spotifyTheme}>
        <ThemeProvider theme={{ token }}>{children}</ThemeProvider>
      </ConfigProvider>
    </SessionProvider>
  );
}
