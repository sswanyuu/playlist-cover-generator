import { useState, useEffect } from 'react';

export interface Breakpoints {
  xs: boolean;  // < 576px
  sm: boolean;  // >= 576px
  md: boolean;  // >= 768px
  lg: boolean;  // >= 992px
  xl: boolean;  // >= 1200px
  xxl: boolean; // >= 1600px
}

export interface ResponsiveInfo extends Breakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
}

const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
} as const;

export function useResponsive(): ResponsiveInfo {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width, height } = windowSize;

  const breakpoints: Breakpoints = {
    xs: width < BREAKPOINTS.sm,
    sm: width >= BREAKPOINTS.sm && width < BREAKPOINTS.md,
    md: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
    lg: width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl,
    xl: width >= BREAKPOINTS.xl && width < BREAKPOINTS.xxl,
    xxl: width >= BREAKPOINTS.xxl,
  };

  return {
    ...breakpoints,
    isMobile: width < BREAKPOINTS.md, // < 768px
    isTablet: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg, // 768px - 992px
    isDesktop: width >= BREAKPOINTS.lg, // >= 992px
    width,
    height,
  };
}

// Utility function for media queries in styled-components
export const mediaQueries = {
  xs: `@media (max-width: ${BREAKPOINTS.sm - 1}px)`,
  sm: `@media (min-width: ${BREAKPOINTS.sm}px)`,
  md: `@media (min-width: ${BREAKPOINTS.md}px)`,
  lg: `@media (min-width: ${BREAKPOINTS.lg}px)`,
  xl: `@media (min-width: ${BREAKPOINTS.xl}px)`,
  xxl: `@media (min-width: ${BREAKPOINTS.xxl}px)`,
  mobile: `@media (max-width: ${BREAKPOINTS.md - 1}px)`,
  tablet: `@media (min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`,
  desktop: `@media (min-width: ${BREAKPOINTS.lg}px)`,
} as const; 