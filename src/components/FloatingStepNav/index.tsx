import React, { useState } from "react";
import { Tooltip } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { useResponsiveValue, buttonSizes, spacing } from "@/utils/responsive";
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

  // Responsive values
  const buttonSize = responsive.size(buttonSizes.large);
  const stepButtonSize = responsive.size(buttonSizes.medium);
  const fontSize = responsive.string({ mobile: '18px', desktop: '20px' });
  const stepFontSize = responsive.string({ mobile: '16px', desktop: '18px' });
  const gap = responsive.size(spacing.sm);



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
            fontSize: '12px'
          }
        }}
      >
        <BackToTopButton 
          onClick={handleBackToTop}
          $buttonSize={buttonSize}
          $fontSize={fontSize}
        >
          <ArrowUpOutlined />
        </BackToTopButton>
      </Tooltip>
      
      {steps.length > 0 && (
        <StepsContainer expanded={expanded} gap={gap}>
          {steps.map((step, index) => (
            <Tooltip
              key={index}
              title={step.title}
              placement="left"
              styles={{
                body: {
                  fontSize: '12px'
                }
              }}
            >
              <NavButton
                href={`#${step.anchor}`}
                active={step.active}
                completed={step.completed}
                $buttonSize={stepButtonSize}
                $fontSize={stepFontSize}
                onClick={() => responsive.isMobile && setExpanded(false)}
              >
                {step.icon}
              </NavButton>
            </Tooltip>
          ))}
        </StepsContainer>
      )}
    </FloatingNav>
  );
} 