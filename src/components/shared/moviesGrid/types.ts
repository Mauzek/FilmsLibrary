import type { Movie, CollectionMovie } from "@/types";

export interface MoviesGridProps {
    movies: Movie[] | CollectionMovie[];
    columns?: number;
    gap?: number;
    loading?: boolean;
    isLoadingMore?: boolean;
}