import React from "react";
import { Typography, Badge, theme } from "antd";
import { StepCardProps } from "./types";
import {
  StyledCard,
  StepHeader,
  StepTitle,
  StepIcon,
} from "./styles";

const { Title, Paragraph } = Typography;
const { useToken } = theme;

export default function StepCard({
  title,
  description,
  icon,
  completed = false,
  active = false,
  showProgress = false,
  progressCount = 0,
  progressLabel = "Selected",
  children
}: StepCardProps) {
  const { token } = useToken();

  return (
    <StyledCard>
      <StepHeader>
        <StepTitle>
          <StepIcon active={active} completed={completed}>
            {icon}
          </StepIcon>
          <div>
            <Title level={4} style={{ color: token.colorTextBase, margin: 0 }}>
              {title}
            </Title>
            <Paragraph type="secondary" style={{ margin: 0 }}>
              {description}
            </Paragraph>
          </div>
        </StepTitle>
        
        {showProgress && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
              {progressLabel}:
            </span>
            <Badge 
              count={progressCount} 
              showZero 
              style={{ 
                backgroundColor: '#1890ff',
                color: '#fff',
                fontWeight: '600',
                minWidth: '24px',
                height: '24px',
                lineHeight: '24px',
                borderRadius: '12px'
              }}
            />
          </div>
        )}
      </StepHeader>
      
      {children}
    </StyledCard>
  );
} 