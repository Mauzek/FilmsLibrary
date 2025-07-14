import type { Movie } from "@/types";

export interface MetaProps {
  year?: number;
  countries: Movie["countries"];
  genres: Movie["genres"];
  movieLength?: number;
  ageRating?: number;
  type?: Movie["type"];
}
