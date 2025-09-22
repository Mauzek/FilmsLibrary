import type { Movie, CollectionMovie, SavedMovie } from "@/types";

export interface MovieCardProps<T = Movie | CollectionMovie | SavedMovie> {
    movie: T;
}
