"use client";

import { useSession, signIn } from "next-auth/react";
import { Button, Space, Spin } from "antd";
import { SpotifyOutlined } from "@ant-design/icons";
import {
  StyledLayout,
  BackgroundGradient,
  StyledContent,
  StyledTitle,
  StyledSubtitle,
} from "./styles";
import PlaylistList from "./components/PlaylistList";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <StyledLayout>
        <BackgroundGradient />
        <StyledContent>
          <Spin size="large" />
        </StyledContent>
      </StyledLayout>
    );
  }

  return (
    <StyledLayout>
      <BackgroundGradient />
      <StyledContent>
        {session ? (
          <>
            <StyledTitle level={1}>
              AI-Powered Spotify Playlist Cover Generator
            </StyledTitle>
            <StyledSubtitle>
              Create stunning, unique cover art for your Spotify playlists with
              AI
            </StyledSubtitle>
            <PlaylistList />
          </>
        ) : (
          <Space direction="vertical" size="large" align="center">
            <StyledTitle level={1}>Welcome to Spotify Cover App</StyledTitle>
            <Button
              type="primary"
              size="large"
              icon={<SpotifyOutlined />}
              onClick={() => signIn("spotify")}
            >
              Login with Spotify
            </Button>
          </Space>
        )}
      </StyledContent>
    </StyledLayout>
  );
}
