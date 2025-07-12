import type { Movie } from "@/types";

export interface MoviesGridProps {
    movies: Movie[];
    columns?: number;
    gap?: number;
}