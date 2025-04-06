"use client";

import { signIn } from "next-auth/react";
import { Button, Typography, Layout, theme, ConfigProvider } from "antd";
import { SpotifyOutlined } from "@ant-design/icons";
import { spotifyTheme } from "../theme";

const { Title } = Typography;
const { Content } = Layout;
const { useToken } = theme;

export default function LoginPage() {
  const { token } = useToken();

  return (
    <ConfigProvider theme={spotifyTheme}>
      <Layout
        style={{
          minHeight: "100vh",
          background: token.colorBgBase,
        }}
      >
        <Content
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Title
              level={1}
              style={{
                color: token.colorTextBase,
                marginBottom: token.marginLG,
                fontSize: "48px",
              }}
            >
              Welcome to Spotify Cover App
            </Title>
            <Button
              type="primary"
              size="large"
              icon={<SpotifyOutlined />}
              onClick={() => signIn("spotify", { callbackUrl: "/" })}
            >
              Login with Spotify
            </Button>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
