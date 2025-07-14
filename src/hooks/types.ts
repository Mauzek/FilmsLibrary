export interface UseInfiniteScrollProps {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export interface UseModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnEscape?: boolean;
  animationDuration?: number;
}

export interface UseDragToCloseProps {
  onClose: () => void;
  threshold?: number;
}
