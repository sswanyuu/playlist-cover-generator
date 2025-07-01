import React from "react";

export interface StepCardProps {
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
