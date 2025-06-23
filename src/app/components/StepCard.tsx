import React from "react";
import { Card, Typography, Badge, theme } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";

const { Title, Paragraph } = Typography;
const { useToken } = theme;

const StyledCard = styled(Card)`
  margin-bottom: 32px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  
  .ant-card-body {
    padding: 32px;
  }
  
  &:hover {
    transform: translateY(-2px);
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const StepTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StepIcon = styled.div<{ active?: boolean; completed?: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: ${({ active, completed }) =>
    completed ? 'linear-gradient(135deg, #52c41a, #389e0d)' :
    active ? 'linear-gradient(135deg, #1890ff, #096dd9)' :
    'rgba(255, 255, 255, 0.1)'
  };
  color: ${({ active, completed }) =>
    active || completed ? '#fff' : 'rgba(255, 255, 255, 0.6)'
  };
  transition: all 0.3s ease;
`;

interface StepCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  completed?: boolean;
  active?: boolean;
  showProgress?: boolean;
  progressCount?: number;
  progressLabel?: string;
  children: React.ReactNode;
}

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
            {completed ? <CheckCircleOutlined /> : icon}
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