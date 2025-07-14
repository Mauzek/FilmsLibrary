import type { MovieType } from "./common";

export interface Movie {
  id: number;
  name?: string;
  alternativeName?: string;
  enName?: string;
  externalId: {
    imdb?: string;
  }
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
  seriesLength?: number;
  genres: Genre[];
  videos?: Videos;
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
  similarMovies?: SimilarMovie[];
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
  photo?: string;
  enName?: string;
  description?: string;
  profession?: string;
  enProfession?: string;
}

export interface Videos{
  trailers?: Trailer[];
}

export interface Trailer{
  url: string;
  name: string;
  site: string;
  type: string;
}

export interface ReleaseYear {
  start?: number;
  end?: number;
}

export interface SimilarMovie {
  id: number;
  name?: string;
  alternativeName?: string;
  type: MovieType;
  rating: {
    kp: number;
  };
  poster: {
    url: string;
    previewUrl: string;
  };
  year: number;
}