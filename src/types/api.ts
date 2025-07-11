import type{ FilterValue, PaginationParams, SortParams, MovieType } from "./common";

export interface ApiFilters
  extends Record<string, FilterValue>,
    PaginationParams,
    SortParams {
  query?: string;
  year?: string | number;
  "rating.kp"?: string;
  "rating.imdb"?: string;
  "votes.kp"?: string;
  "votes.imdb"?: string;
  genres?: string[];
  countries?: string[];
  type?: MovieType;
  status?: string;
  ageRating?: string;
  movieLength?: string;
}

export interface PersonFilters
  extends Record<string, FilterValue>,
    PaginationParams,
    SortParams {
  query?: string;
  name?: string;
  profession?: string[];
  age?: string;
  "movies.id"?: string | number;
}

export interface ApiResponse<T> {
  docs: T[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}
