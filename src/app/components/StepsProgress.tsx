import React from "react";
import { Steps } from "antd";
import styled from "@emotion/styled";

const StepsContainer = styled.div`
  margin-bottom: 48px;
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

interface StepItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface StepsProgressProps {
  steps: StepItem[];
  currentStep: number;
}

export default function StepsProgress({ steps, currentStep }: StepsProgressProps) {
  return (
    <StepsContainer>
      <Steps
        current={currentStep}
        size="small"
        items={steps}
      />
    </StepsContainer>
  );
} 