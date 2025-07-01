import React, { useState } from "react";
import { Tooltip } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { useResponsiveValue, buttonSizes, spacing } from "@/utils/responsive";
import { useScrollToTop } from "@/lib/hooks/useScrollToTop";
import { FloatingStepNavProps } from "./types";
import {
  FloatingNav,
  BackToTopButton,
  StepsContainer,
  NavButton,
} from "./styles";

export default function FloatingStepNav({ steps }: FloatingStepNavProps) {
  const [expanded, setExpanded] = useState(false);
  const responsive = useResponsiveValue();
  const { scrollToTop } = useScrollToTop();

  // Responsive values
  const buttonSize = responsive.size(buttonSizes.large);
  const stepButtonSize = responsive.size(buttonSizes.medium);
  const fontSize = responsive.string({ mobile: '18px', desktop: '20px' });
  const stepFontSize = responsive.string({ mobile: '16px', desktop: '18px' });
  const gap = responsive.size(spacing.sm);

  const handleBackToTop = () => {
    scrollToTop();
    
    // Close on mobile after clicking
    if (responsive.isMobile) {
      setExpanded(false);
    }
  };

  const handleStepClick = (anchor: string) => {
    // Close on mobile after clicking
    if (responsive.isMobile) {
      setExpanded(false);
    }
    
    // Navigate to the section
    const element = document.querySelector(`#${anchor}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <FloatingNav 
      expanded={expanded}
      onClick={() => responsive.isMobile && setExpanded(!expanded)}
    >
      <Tooltip 
        title="Back to Top" 
        placement="left"
        mouseEnterDelay={0.3}
      >
        <BackToTopButton
          onClick={handleBackToTop}
          $buttonSize={buttonSize}
          $fontSize={fontSize}
        >
          <ArrowUpOutlined />
        </BackToTopButton>
      </Tooltip>
      
      <StepsContainer expanded={expanded} gap={gap}>
        {steps.map((step) => (
          <Tooltip 
            key={step.anchor} 
            title={step.title} 
            placement="left"
            mouseEnterDelay={0.3}
          >
            <NavButton
              href={`#${step.anchor}`}
              onClick={(e) => {
                e.preventDefault();
                handleStepClick(step.anchor);
              }}
              active={step.active}
              completed={step.completed}
              $buttonSize={stepButtonSize}
              $fontSize={stepFontSize}
            >
              {step.icon}
            </NavButton>
          </Tooltip>
        ))}
      </StepsContainer>
    </FloatingNav>
  );
} 