import { useEffect, useRef } from "react";

export interface UseInfiniteScrollOptions {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  disabled?: boolean;
}

export const useInfiniteScroll = ({
  hasMore,
  loading,
  onLoadMore,
  disabled = false,
}: UseInfiniteScrollOptions) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  
  const stateRef = useRef({ hasMore, loading, disabled });
  useEffect(() => {
    stateRef.current = { hasMore, loading, disabled };
  }, [hasMore, loading, disabled]);

  useEffect(() => {
    if (disabled || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !stateRef.current.loading) {
          onLoadMore();
        }
      },
      {
        rootMargin: "300px",
        threshold: 0.1,
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [onLoadMore, disabled, hasMore]);

  return sentinelRef;
};