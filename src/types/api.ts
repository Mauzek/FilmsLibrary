import type{ FilterValue, PaginationParams, SortParams } from "./common";

export interface ApiFilters {
  'genres.name'?: string[]; 
  'countries.name'?: string[]; 
  'rating.kp'?: string;
  'votes.kp'?: string;
  year?: string;
  page?: number;
  limit?: number;
  query?: string;
  lists?: string;
  sortField?: string;
  sortType?: '1' | '-1';
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
