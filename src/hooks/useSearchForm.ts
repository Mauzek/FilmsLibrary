import { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMoviesStore, useFiltersStore } from "@/store";

export const useSearchForm = () => {
  const [query, setQuery] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const moviesStore = useMoviesStore();
  const filtersStore = useFiltersStore();
  const navigate = useNavigate();

  useEffect(() => {
    const urlQuery = searchParams.get("query") || "";
    setQuery(urlQuery);
  }, [searchParams]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!query.trim()) {
        return false;
      }

      filtersStore.clearActiveFilters();
      navigate(`/movies/search?query=${encodeURIComponent(query.trim())}`);
      moviesStore.searchMovies(query.trim(), {});

      return true;
    },
    [query, navigate, filtersStore, moviesStore]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    setSearchParams({});
    navigate("/");
    filtersStore.clearActiveFilters();
    moviesStore.reset();
  }, [setSearchParams, filtersStore, moviesStore, navigate]);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  return {
    query,
    hasActiveSearch: Boolean(query.trim()),
    loading: moviesStore.loading,

    handleSubmit,
    handleClear,
    handleQueryChange,
  };
};
