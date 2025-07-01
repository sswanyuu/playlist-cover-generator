"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useCredits } from "@/lib/hooks/useCredits";
import { Button, Spin, Typography, theme } from "antd";
import { ArrowLeftOutlined, LogoutOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { useResponsive } from "@/lib/hooks/useResponsive";
import {
  HeaderContainer,
  Spacer,
  CreditContainer,
  BackButton,
  BadgeContainer,
  StyledBadge,
  ErrorText,
} from "./styles";

export function Header() {
  const { credits, isLoading, error } = useCredits();
  const { token } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();
  const { data: isLoggedIn } = useSession();
  const { isMobile } = useResponsive();
  const { Text } = Typography;
  
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <HeaderContainer>
      {pathname !== "/" && (
        <BackButton
          size="small"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/")}
        >
          {isMobile ? "" : "Back to Home"}
        </BackButton>
      )}
      <Spacer />
      {isLoggedIn ? (
        <>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleSignOut}
          >
            Logout
          </Button>
          <BadgeContainer>
            {isLoading || credits == null ? (
              <Spin size="small" />
            ) : error ? (
              <ErrorText>Error loading credits</ErrorText>
            ) : (
              <CreditContainer>
                <Text strong>Remaining Credits:</Text>
                <StyledBadge
                  count={credits ?? 0}
                  showZero
                  color={
                    credits && credits > 0
                      ? token.colorSuccess
                      : token.colorError
                  }
                />
              </CreditContainer>
            )}
          </BadgeContainer>
        </>
      ) : (
        <Text strong>Welcome, Guest!</Text>
      )}
    </HeaderContainer>
  );
} 