"use client";
import { signOut, useSession } from "next-auth/react";
import { useCredits } from "@/lib/hooks/useCredits";
import { Badge, Button, Spin, Typography, Grid, theme } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { LogoutOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  z-index: 1000;
  padding: 16px 16px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background-color: rgb(21, 21, 21);
  box-shadow: 0 2px 8px rgba(6, 0, 0, 0.06);
`;

const Spacer = styled.div`
  flex: 1;
`;

const CreditContainer = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const BackButton = styled(Button)`
  background-color: ${({ theme }) => theme.token.colorBgContainer};
  border: none;
  &:hover {
    background-color: ${({ theme }) => theme.token.colorBgContainer} !important;
    opacity: 0.8;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledBadge = styled(Badge)`
  .ant-badge-count {
    font-size: 14px;
    font-weight: 600;
  }
`;

const ErrorText = styled.span`
  color: #ff4d4f;
  font-size: 14px;
`;

export function Header() {
  const { credits, isLoading, error } = useCredits();

  const { token } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();
  const { data: isLoggedIn } = useSession();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = screens.xs;
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
            {isLoading ? (
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
