import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";

const FloatingNav = styled.div<{ expanded: boolean }>`
  position: fixed;
  right: 24px;
  top: 80%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    right: 16px;
    padding: 12px;
  }
  
  @media (min-width: 769px) {
    /* Desktop: expand on hover */
    &:hover {
      transform: translateY(-50%) translateX(-8px);
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
    }
    
    &:hover > div:last-child {
      opacity: 1;
    }
  }
`;

const BackToTopButton = styled(Button)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  color: #fff;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
    background: linear-gradient(135deg, #7c8df8, #8a5fbe) !important;
    border: none !important;
    color: #fff !important;
  }
  
  &:focus {
    background: linear-gradient(135deg, #667eea, #764ba2) !important;
    border: none !important;
    color: #fff !important;
  }
  
  transition: all 0.3s ease;
`;

const StepsContainer = styled.div<{ expanded: boolean; isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: ${({ expanded }) => expanded ? '300px' : '0'};
  opacity: ${({ expanded }) => expanded ? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  
  @media (min-width: 769px) {
    /* Desktop: show on parent hover */
    max-height: 300px;
    opacity: 0;
  }
`;

const NavButton = styled.a<{ active?: boolean; completed?: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  text-decoration: none;
  border: 2px solid;
  cursor: pointer;
  
  background: ${({ active, completed }) =>
    completed ? 'linear-gradient(135deg, #52c41a, #389e0d)' :
    active ? 'linear-gradient(135deg, #1890ff, #096dd9)' :
    'rgba(255, 255, 255, 0.1)'
  };
  
  border-color: ${({ active, completed }) =>
    completed ? '#52c41a' :
    active ? '#1890ff' :
    'rgba(255, 255, 255, 0.2)'
  };
  
  color: ${({ active, completed }) =>
    active || completed ? '#fff' : 'rgba(255, 255, 255, 0.6)'
  } !important;
  
  box-shadow: ${({ active, completed }) =>
    completed ? '0 4px 16px rgba(82, 196, 26, 0.3)' :
    active ? '0 4px 16px rgba(24, 144, 255, 0.3)' :
    '0 2px 8px rgba(0, 0, 0, 0.2)'
  };
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ completed }) => 
      completed ? '0 8px 24px rgba(82, 196, 26, 0.4)' : 
      '0 8px 24px rgba(24, 144, 255, 0.4)'
    };
    border-color: ${({ completed }) => completed ? '#52c41a' : '#1890ff'} !important;
    background: ${({ completed }) => 
      completed ? 'linear-gradient(135deg, #5ccc29, #3fa00d)' : 
      'linear-gradient(135deg, #40a9ff, #0d84d9)'
    } !important;
    color: #fff !important;
  }
  
  &:focus {
    color: ${({ active, completed }) =>
      active || completed ? '#fff' : 'rgba(255, 255, 255, 0.6)'
    } !important;
  }
  
  transition: all 0.3s ease;
`;

interface FloatingStepNavProps {
  steps: Array<{
    anchor: string;
    title: string;
    icon: React.ReactNode;
    completed?: boolean;
    active?: boolean;
  }>;
}

export default function FloatingStepNav({ steps }: FloatingStepNavProps) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleExpanded = () => {
    if (isMobile) {
      setExpanded(!expanded);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close on mobile after clicking
    if (isMobile) {
      setExpanded(false);
    }
  };

  return (
    <FloatingNav expanded={expanded}>
      <Tooltip 
        title="Back to top"
        placement="left"
        styles={{
          body: {
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <BackToTopButton
          onClick={isMobile ? toggleExpanded : handleBackToTop}
          icon={<ArrowUpOutlined />}
        />
      </Tooltip>
      
      <StepsContainer expanded={expanded} isMobile={isMobile}>
        {steps.map((step) => (
          <Tooltip 
            key={step.anchor}
            title={step.title}
            placement="left"
            styles={{
              body: {
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <NavButton
              href={`#${step.anchor}`}
              active={step.active}
              completed={step.completed}
              onClick={() => {
                if (isMobile) {
                  setExpanded(false);
                }
              }}
            >
              {step.icon}
            </NavButton>
          </Tooltip>
        ))}
      </StepsContainer>
    </FloatingNav>
  );
} 