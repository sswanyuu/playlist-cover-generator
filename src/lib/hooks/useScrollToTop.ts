import { useState, useEffect } from "react";

interface UseScrollToTopReturn {
  isVisible: boolean;
  scrollToTop: () => void;
}

export function useScrollToTop(threshold: number = 200): UseScrollToTopReturn {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return {
    isVisible,
    scrollToTop,
  };
}
