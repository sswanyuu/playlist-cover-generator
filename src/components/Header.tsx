"use client";

import { useCredits } from "@/lib/hooks/useCredits";
import { Badge, Button, Spin, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";

const HeaderContainer = styled.header`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
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

  return (
    <HeaderContainer>
      <BackButton icon={<ArrowLeftOutlined />} onClick={() => router.push("/")}>
        Back to Home
      </BackButton>
      <BadgeContainer>
        {isLoading ? (
          <Spin size="small" />
        ) : error ? (
          <ErrorText>Error loading credits</ErrorText>
        ) : (
          <>
            <Typography.Text strong>Remaining Credits:</Typography.Text>
            <StyledBadge count={credits} />
          </>
        )}
      </BadgeContainer>
    </HeaderContainer>
  );
}
