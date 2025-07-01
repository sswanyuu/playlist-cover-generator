import { useState } from "react";
import { LIMITS } from "@/constants";

interface UseListPaginationReturn<T> {
  showAll: boolean;
  displayedItems: T[];
  hasMoreItems: boolean;
  toggleShowAll: () => void;
  setShowAll: (show: boolean) => void;
}

export function useListPagination<T>(
  items: T[],
  initialDisplayCount: number = LIMITS.INITIAL_DISPLAY_COUNT
): UseListPaginationReturn<T> {
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? items : items.slice(0, initialDisplayCount);
  const hasMoreItems = items.length > initialDisplayCount;

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return {
    showAll,
    displayedItems,
    hasMoreItems,
    toggleShowAll,
    setShowAll,
  };
}
