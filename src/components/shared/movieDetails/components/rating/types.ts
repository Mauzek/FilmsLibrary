import type { Movie } from "@/types";

export interface RatingProps {
  rating: Movie['rating'];
  votes: Movie['votes'];
  className?: string;
  externalId?: {
    imdbId?: string;
    kpId?: number;
  };
}