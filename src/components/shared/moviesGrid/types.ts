import type { Movie, CollectionMovie, SavedMovie } from "@/types";

export interface MoviesGridProps {
    movies: Movie[] | CollectionMovie[] | SavedMovie[];
    columns?: number;
    gap?: number;
    loading?: boolean;
    isLoadingMore?: boolean;
    className?: string;
    scrollable?: 'none' | 'all' | 'mobile' | 'desktop';
    skeletonCount?: number;
}