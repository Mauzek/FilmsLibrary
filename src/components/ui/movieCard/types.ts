import type { Movie, CollectionMovie } from "@/types";

export interface MovieCardProps<T = Movie | CollectionMovie> {
    movie: T;
}

export interface BaseMovieData {
    id: number;
    name?: string;
    alternativeName?: string;
    poster?: {
        url?: string;
        previewUrl?: string;
    };
    rating?: {
        kp?: number;
        imdb?: number;
    };
    year?: number;
    countries?: Array<{ name: string }>;
    genres?: Array<{ name: string }>;
}
