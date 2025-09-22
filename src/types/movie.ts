import type { ListType } from "@/services";
import type { MovieType } from "./common";
import type { FieldValue, Timestamp } from "firebase/firestore";

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
  rating: Rating;
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
  poster?: Poster
  backdrop?: Poster
  persons?: Person[];
  ageRating?: number;
  releaseYears?: ReleaseYear[];
  similarMovies?: CollectionMovie[];
  sequelsAndPrequels?: CollectionMovie[];
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

export interface CollectionMovie {
  id: number;
  name?: string;
  alternativeName?: string;
  type: MovieType;
  rating: Rating;
  poster: Poster;
  year: number;
}

export interface Rating {
  kp?: number;
  imdb?: number;
  filmCritics?: number;
  russianFilmCritics?: number;
}

export interface Poster {
  url?: string;
  previewUrl?: string;
}

export interface SavedMovie {
  id: number;
  name?: string;
  alternativeName?: string;
  poster?: Poster;
  rating?: Rating;
  year?: number;
  countries?: Country[];
  genres?: Genre[];
  list: ListType;
  addedAt: Timestamp | FieldValue;
}