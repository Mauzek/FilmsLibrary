import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useFiltersStore, useMoviesStore } from "@/store";

export const useMovieFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filtersStore = useFiltersStore();
  const moviesStore = useMoviesStore();

  useEffect(() => {
    filtersStore.deserializeFilters(searchParams);
  }, [searchParams, filtersStore]);

  useEffect(() => {
    const query = searchParams.get("query");
    if (query && query.trim()) {
      return;
    }

    const apiFilters = filtersStore.getApiFilters();
    if (filtersStore.hasActiveFilters) {
      moviesStore.loadMovies(apiFilters);
    }
  }, [searchParams, filtersStore, moviesStore]);

  const updateURL = useCallback(() => {
    const currentParams = new URLSearchParams(searchParams);
    const filterParams = filtersStore.serializeFilters();
    const query = currentParams.get("query");

    currentParams.delete("genres");
    currentParams.delete("countries");
    currentParams.delete("rating");
    currentParams.delete("year");

    filterParams.forEach((value, key) => {
      currentParams.set(key, value);
    });

    if (query) {
      currentParams.set("query", query);
    }

    setSearchParams(currentParams);
  }, [searchParams, filtersStore, setSearchParams]);

  const updateGenres = useCallback(
    (genres: string[]) => {
      filtersStore.setGenres(genres);
      updateURL();
    },
    [filtersStore, updateURL]
  );

  const updateCountries = useCallback(
    (countries: string[]) => {
      filtersStore.setCountries(countries);
      updateURL();
    },
    [filtersStore, updateURL]
  );

  const updateRating = useCallback(
    (rating: [number, number]) => {
      filtersStore.setRating(rating);
      updateURL();
    },
    [filtersStore, updateURL]
  );

  const updateYear = useCallback(
    (year: [number, number]) => {
      filtersStore.setYear(year);
      updateURL();
    },
    [filtersStore, updateURL]
  );

  const clearFilters = useCallback(() => {
    filtersStore.clearActiveFilters();
    moviesStore.loadMovies();
    const currentParams = new URLSearchParams(searchParams);
    const query = currentParams.get("query");

    currentParams.delete("genres");
    currentParams.delete("countries");
    currentParams.delete("rating");
    currentParams.delete("year");

    if (query) {
      setSearchParams({ query });
    } else {
      setSearchParams({});
    }
  }, [filtersStore, searchParams, setSearchParams]);

  return {
    genres: filtersStore.genres,
    countries: filtersStore.countries,
    activeFilters: filtersStore.activeFilters,
    apiFilters: filtersStore.getApiFilters(),
    hasActiveFilters: filtersStore.hasActiveFilters,

    updateGenres,
    updateCountries,
    updateRating,
    updateYear,
    clearFilters,

    filtersStore,
  };
};
