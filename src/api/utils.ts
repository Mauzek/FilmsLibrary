import type { ApiFilters, ApiResponse, Movie, Person, FilterOption } from "@/types";
import { apiClient } from "./config";
import type { AxiosResponse } from "axios";

export const buildQuery = (filters: ApiFilters = {}): string => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item.toString()));
      } else {
        params.append(key, value.toString());
      }
    }
  });

  return params.toString();
};

export const api = {
  getMovies: async (
    filters: ApiFilters = {}
  ): Promise<AxiosResponse<ApiResponse<Movie>>> => {
    const query = buildQuery(filters);
    return apiClient.get(`/movie${query ? `?${query}` : ""}`);
  },

  searchMovies: async (
    searchQuery: string,
    filters: Omit<ApiFilters, "query"> = {}
  ): Promise<AxiosResponse<ApiResponse<Movie>>> => {
    const allFilters = { query: searchQuery, ...filters };
    const query = buildQuery(allFilters);
    return apiClient.get(`/movie/search?${query}`);
  },

  getMovieById: async (id: string | number): Promise<AxiosResponse<Movie>> => {
    return apiClient.get(`/movie/${id}`);
  },

  getRandomMovie: async (
    filters: ApiFilters = {}
  ): Promise<AxiosResponse<Movie>> => {
    const query = buildQuery(filters);
    return apiClient.get(`/movie/random${query ? `?${query}` : ""}`);
  },

  getPersons: async (
    filters: ApiFilters = {}
  ): Promise<AxiosResponse<ApiResponse<Person>>> => {
    const query = buildQuery(filters);
    return apiClient.get(`/person${query ? `?${query}` : ""}`);
  },

  getPersonById: async (
    id: string | number
  ): Promise<AxiosResponse<Person>> => {
    return apiClient.get(`/person/${id}`);
  },

  getPosibleValues: async (
    field: string
  ): Promise<AxiosResponse<FilterOption[]>> => {
    return apiClient.get(`/movie/possible-values-by-field?field=${field}`);
  }
};

export const presets: Record<string, ApiFilters> = {
  popular: { "rating.kp": "7-10", sortField: ["rating.kp"], sortType: "-1" },
  recent: {
    year: new Date().getFullYear(),
    sortField: ["year"],
    sortType: "-1",
  },
  movies: { type: "movie" },
  series: { type: "tv-series" },
  cartoons: { type: "cartoon" },
  animated_series: { type: "animated-series" },
  anime: { type: "anime" },
};
