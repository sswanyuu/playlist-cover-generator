import React from "react";

export interface FloatingStepNavProps {
  steps: Array<{
    anchor: string;
    title: string;
    icon: React.ReactNode;
    completed?: boolean;
    active?: boolean;
  }>;
}
