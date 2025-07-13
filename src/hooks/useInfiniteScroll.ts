import { useEffect, useCallback } from 'react';
import type { UseInfiniteScrollProps } from './types';

export const useInfiniteScroll = ({
    hasMore,
    loading,
    onLoadMore,
    threshold = 200
}: UseInfiniteScrollProps) => {
    const handleScroll = useCallback(() => {
        if (loading || !hasMore) {
            console.log('Scroll blocked:', { loading, hasMore });
            return;
        }

        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        const shouldLoadMore = scrollTop + clientHeight >= scrollHeight - threshold;
        
        if (shouldLoadMore) {
            console.log('Loading more triggered');
            onLoadMore();
        }
    }, [loading, hasMore, onLoadMore, threshold]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        
        const throttledHandleScroll = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            
            timeoutId = setTimeout(handleScroll, 100);
        };

        window.addEventListener('scroll', throttledHandleScroll);
        
        return () => {
            window.removeEventListener('scroll', throttledHandleScroll);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [handleScroll]);
};
