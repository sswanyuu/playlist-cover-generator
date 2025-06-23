import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { mediaQueries } from "@/app/hooks/useResponsive";
import { useResponsiveValue, buttonSizes, spacing } from "@/app/utils/responsive";

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
  
  ${mediaQueries.mobile} {
    right: 16px;
    padding: 12px;
    top: 85%;
  }
  
  ${mediaQueries.desktop} {
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

const BackToTopButton = styled(Button)<{ 
  buttonSize: number; 
  fontSize: string; 
}>`
  width: ${({ buttonSize }) => buttonSize}px;
  height: ${({ buttonSize }) => buttonSize}px;
  border-radius: ${({ buttonSize }) => buttonSize / 2}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ fontSize }) => fontSize};
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

const StepsContainer = styled.div<{ expanded: boolean; gap: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap}px;
  max-height: ${({ expanded }) => expanded ? '300px' : '0'};
  opacity: ${({ expanded }) => expanded ? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  
  ${mediaQueries.desktop} {
    /* Desktop: show on parent hover */
    max-height: 300px;
    opacity: 0;
  }
`;

const NavButton = styled.a<{ 
  active?: boolean; 
  completed?: boolean; 
  buttonSize: number;
  fontSize: string;
}>`
  width: ${({ buttonSize }) => buttonSize}px;
  height: ${({ buttonSize }) => buttonSize}px;
  border-radius: ${({ buttonSize }) => buttonSize / 2}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ fontSize }) => fontSize};
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
  const responsive = useResponsiveValue();

  // Responsive values
  const buttonSize = responsive.size(buttonSizes.large);
  const stepButtonSize = responsive.size(buttonSizes.medium);
  const fontSize = responsive.string({ mobile: '18px', desktop: '20px' });
  const stepFontSize = responsive.string({ mobile: '16px', desktop: '18px' });
  const gap = responsive.size(spacing.sm);

  const toggleExpanded = () => {
    if (responsive.isMobile) {
      setExpanded(!expanded);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close on mobile after clicking
    if (responsive.isMobile) {
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
          buttonSize={buttonSize}
          fontSize={fontSize}
          onClick={responsive.isMobile ? toggleExpanded : handleBackToTop}
          icon={<ArrowUpOutlined />}
        />
      </Tooltip>
      
      <StepsContainer expanded={expanded} gap={gap}>
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
              buttonSize={stepButtonSize}
              fontSize={stepFontSize}
              onClick={() => {
                if (responsive.isMobile) {
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