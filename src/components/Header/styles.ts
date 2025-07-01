import styled from "@emotion/styled";
import { Button, Badge } from "antd";
import { SPACING, Z_INDEX, SIZES, FONT_SIZES } from "@/constants";
import { BACKGROUND, STATUS, SHADOWS } from "@/constants/colors";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  z-index: ${Z_INDEX.HEADER};
  padding: ${SPACING.LG}px ${SPACING.LG}px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: ${SPACING.LG}px;
  background-color: ${BACKGROUND.HEADER};
  box-shadow: ${SHADOWS.SM};
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const CreditContainer = styled.div`
  height: ${SIZES.HEADER_HEIGHT}px;
  display: flex;
  align-items: center;
  gap: ${SPACING.XS}px;
`;

export const BackButton = styled(Button)`
  background-color: ${({ theme }) => theme.token.colorBgContainer};
  border: none;
  &:hover {
    background-color: ${({ theme }) => theme.token.colorBgContainer} !important;
    opacity: 0.8;
  }
`;

export const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.SM}px;
`;

export const StyledBadge = styled(Badge)`
  .ant-badge-count {
    font-size: ${FONT_SIZES.BASE};
    font-weight: 600;
  }
`;

export const ErrorText = styled.span`
  color: ${STATUS.ERROR};
  font-size: ${FONT_SIZES.BASE};
`;
