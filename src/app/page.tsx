"use client";

import {
  StyledLayout,
  BackgroundGradient,
  StyledContent,
  StyledTitle,
  StyledSubtitle,
} from "./styles";

export default function HomePage() {
  return (
    <StyledLayout>
      <BackgroundGradient />
      <StyledContent>
        <StyledTitle level={1}>
          AI-Powered Spotify Playlist Cover Generator
        </StyledTitle>
        <StyledSubtitle>
          Create stunning, unique cover art for your Spotify playlists with AI
        </StyledSubtitle>
      </StyledContent>
    </StyledLayout>
  );
}
