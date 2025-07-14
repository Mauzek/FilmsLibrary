import type { Movie } from "@/types";

export interface PosterProps {
  poster?: {
    url?: string;
    previewUrl?: string;
  };
  title?: string;
  movie: Movie;
}