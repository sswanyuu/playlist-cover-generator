import { useResponsive, type ResponsiveInfo } from "@/lib/hooks/useResponsive";

// Common responsive utility functions
export const getResponsiveSize = (
  responsive: ResponsiveInfo,
  sizes: {
    mobile: number;
    tablet?: number;
    desktop: number;
  }
): number => {
  if (responsive.isMobile) return sizes.mobile;
  if (responsive.isTablet && sizes.tablet) return sizes.tablet;
  return sizes.desktop;
};

export const getResponsiveString = (
  responsive: ResponsiveInfo,
  values: {
    mobile: string;
    tablet?: string;
    desktop: string;
  }
): string => {
  if (responsive.isMobile) return values.mobile;
  if (responsive.isTablet && values.tablet) return values.tablet;
  return values.desktop;
};

// Common responsive configurations
export const buttonSizes = {
  small: { mobile: 32, desktop: 40 },
  medium: { mobile: 40, desktop: 48 },
  large: { mobile: 48, desktop: 56 },
};

export const spacing = {
  xs: { mobile: 4, desktop: 8 },
  sm: { mobile: 8, desktop: 12 },
  md: { mobile: 12, desktop: 16 },
  lg: { mobile: 16, desktop: 24 },
  xl: { mobile: 24, desktop: 32 },
  xxl: { mobile: 32, desktop: 48 },
};

export const typography = {
  h1: { mobile: "24px", desktop: "32px" },
  h2: { mobile: "20px", desktop: "24px" },
  h3: { mobile: "18px", desktop: "20px" },
  body: { mobile: "14px", desktop: "16px" },
  small: { mobile: "12px", desktop: "14px" },
};

// Hook for getting responsive values easily
export const useResponsiveValue = () => {
  const responsive = useResponsive();

  return {
    ...responsive,
    size: (sizes: { mobile: number; tablet?: number; desktop: number }) =>
      getResponsiveSize(responsive, sizes),
    string: (values: { mobile: string; tablet?: string; desktop: string }) =>
      getResponsiveString(responsive, values),
  };
};
