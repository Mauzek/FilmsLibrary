export type SortType = "1" | "-1";

export type MovieType =
  | "movie"
  | "tv-series"
  | "tv-show"
  | "cartoon"
  | "anime"
  | "animated-series";

export type FilterValue = string | number | string[] | undefined;

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortField?: string[];
  sortType?: SortType;
}
