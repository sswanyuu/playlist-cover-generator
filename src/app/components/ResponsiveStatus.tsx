import React from "react";
import { Card, Tag, Typography, Space } from "antd";
import styled from "@emotion/styled";
import { useResponsiveValue } from "@/app/utils/responsive";

const { Text } = Typography;

const StatusCard = styled(Card)`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 9999;
  opacity: 0.9;
  min-width: 200px;
  
  &:hover {
    opacity: 1;
  }
`;

const BreakpointList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

export default function ResponsiveStatus() {
  const responsive = useResponsiveValue();
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <StatusCard size="small" title="Responsive Status">
      <Space direction="vertical" size="small">
        <div>
          <Text strong>Device: </Text>
          <Tag color={responsive.isMobile ? 'blue' : responsive.isTablet ? 'orange' : 'green'}>
            {responsive.isMobile ? 'Mobile' : responsive.isTablet ? 'Tablet' : 'Desktop'}
          </Tag>
        </div>
        
        <div>
          <Text strong>Dimensions: </Text>
          <Text>{responsive.width} × {responsive.height}</Text>
        </div>
        
        <BreakpointList>
          <Text strong>Active Breakpoints:</Text>
          {responsive.xs && <Tag color="red">XS (&lt; 576px)</Tag>}
          {responsive.sm && <Tag color="orange">SM (576px+)</Tag>}
          {responsive.md && <Tag color="yellow">MD (768px+)</Tag>}
          {responsive.lg && <Tag color="green">LG (992px+)</Tag>}
          {responsive.xl && <Tag color="blue">XL (1200px+)</Tag>}
          {responsive.xxl && <Tag color="purple">XXL (1600px+)</Tag>}
        </BreakpointList>
      </Space>
    </StatusCard>
  );
} 