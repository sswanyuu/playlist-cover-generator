"use client";

import { Typography, Layout, theme, ConfigProvider } from "antd";
import { spotifyTheme } from "./theme";

const { Title, Text } = Typography;
const { Content } = Layout;
const { useToken } = theme;

export default function HomePage() {
  const { token } = useToken();

  return (
    <ConfigProvider theme={spotifyTheme}>
      <Layout
        style={{
          minHeight: "100vh",
          background: token.colorBgBase,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(29, 185, 84, 0.1) 0%, rgba(0, 0, 0, 0) 70%)",
            zIndex: 1,
          }}
        />

        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: token.margin,
            position: "relative",
            zIndex: 2,
          }}
        >
          <Title
            level={1}
            style={{
              color: token.colorTextBase,
              margin: 0,
              fontSize: "64px",
              fontWeight: 900,
              textShadow: "0 0 20px rgba(29, 185, 84, 0.3)",
              letterSpacing: "-0.02em",
              background: "linear-gradient(45deg, #FFFFFF, #B3B3B3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "glow 2s ease-in-out infinite alternate",
            }}
          >
            Spotify Cover Generator
          </Title>
          <Text
            style={{
              color: token.colorTextSecondary,
              fontSize: token.fontSizeLG,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Give your Spotify playlist a impressive cover image!
          </Text>
        </Content>

        <style jsx global>{`
          @keyframes glow {
            from {
              text-shadow: 0 0 10px rgba(29, 185, 84, 0.3);
            }
            to {
              text-shadow: 0 0 20px rgba(29, 185, 84, 0.5);
            }
          }
        `}</style>
      </Layout>
    </ConfigProvider>
  );
}
