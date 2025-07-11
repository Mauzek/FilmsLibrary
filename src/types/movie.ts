import type { MovieType } from "./common";

export interface Movie {
  id: number;
  name?: string;
  alternativeName?: string;
  enName?: string;
  type: MovieType;
  year?: number;
  description?: string;
  shortDescription?: string;
  status?: string;
  rating: {
    kp?: number;
    imdb?: number;
    filmCritics?: number;
    russianFilmCritics?: number;
  };
  votes: {
    kp?: number;
    imdb?: number;
    filmCritics?: number;
    russianFilmCritics?: number;
  };
  movieLength?: number;
  genres: Genre[];
  countries: Country[];
  poster?: {
    url?: string;
    previewUrl?: string;
  };
  backdrop?: {
    url?: string;
    previewUrl?: string;
  };
  persons?: Person[];
  ageRating?: number;
  releaseYears?: ReleaseYear[];
}

export interface Genre {
  name: string;
}

export interface Country {
  name: string;
}

export interface Person {
  id: number;
  name?: string;
  enName?: string;
  description?: string;
  profession?: string;
  enProfession?: string;
}

export interface ReleaseYear {
  start?: number;
  end?: number;
}
