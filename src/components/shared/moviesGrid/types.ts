import type { Movie, SimilarMovie } from "@/types";

export interface MoviesGridProps {
    movies: Movie[] | SimilarMovie[];
    columns?: number;
    gap?: number;
    loading?: boolean;
    isLoadingMore?: boolean;
}