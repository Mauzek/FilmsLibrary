export interface UseInfiniteScrollProps {
    hasMore: boolean;
    loading: boolean;
    onLoadMore: () => void;
    threshold?: number;
}