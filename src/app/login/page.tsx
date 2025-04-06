"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import {
  Button,
  Typography,
  Layout,
  theme,
  ConfigProvider,
  Avatar,
  Space,
} from "antd";
import { SpotifyOutlined, LogoutOutlined } from "@ant-design/icons";
import { spotifyTheme } from "../theme";

const { Title, Text } = Typography;
const { Content } = Layout;
const { useToken } = theme;

export default function LoginPage() {
  const { token } = useToken();
  const { data: session } = useSession();

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
            {session ? (
              <>
                <Space direction="vertical" size="large" align="center">
                  <Avatar
                    size={64}
                    src={session.user?.image}
                    alt={session.user?.name || "User"}
                  />
                  <Title
                    level={1}
                    style={{
                      color: token.colorTextBase,
                      margin: 0,
                    }}
                  >
                    Welcome back, {session.user?.name}!
                  </Title>
                  <Text
                    style={{
                      color: token.colorTextSecondary,
                      fontSize: token.fontSizeLG,
                    }}
                  >
                    You are logged in with Spotify
                  </Text>
                  <Button
                    type="primary"
                    icon={<LogoutOutlined />}
                    onClick={() => signOut()}
                  >
                    Logout
                  </Button>
                </Space>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
