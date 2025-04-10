"use client";

import { useCredits } from "@/lib/hooks/useCredits";
import { Badge, Button, Spin, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { useRouter, usePathname } from "next/navigation";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  z-index: 1000;
  padding: 4px 16px;
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
    background-color: #1db954;
    color: white;
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
  const router = useRouter();
  const pathname = usePathname();

  return (
    <HeaderContainer>
      {pathname !== "/" && (
        <BackButton
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/")}
        >
          Back to Home
        </BackButton>
      )}
      <Spacer />
      <BadgeContainer>
        {isLoading ? (
          <Spin size="small" />
        ) : error ? (
          <ErrorText>Error loading credits</ErrorText>
        ) : (
          <CreditContainer>
            <Typography.Text strong>Remaining Credits:</Typography.Text>
            <StyledBadge count={credits} />
          </CreditContainer>
        )}
      </BadgeContainer>
    </HeaderContainer>
  );
}
