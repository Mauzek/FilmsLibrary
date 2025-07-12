import { makeAutoObservable, runInAction } from "mobx";
import { api } from "@/api";
import type { Movie, ApiFilters } from "@/types";

export class MoviesStore {
  movies: Movie[] = [];
  loading = false;
  error: string | null = null;
  hasMore = true;

  currentPage = 1;
  totalPages = 0;
  total = 0;
  limit = 50;

  filters: ApiFilters = {};

  constructor() {
    makeAutoObservable(this);
  }

  loadMovies = async (filters: ApiFilters = {}) => {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await api.getMovies({
        ...filters,
        page: 1,
        limit: this.limit,
      });

      console.log("API Response:", response);

      runInAction(() => {
        const data = response.data;
        if (data && data.docs) {
          this.movies = data.docs;
          this.currentPage = data.page || 1;
          this.totalPages = data.pages || 0;
          this.total = data.total || 0;
          this.hasMore = (data.page || 1) < (data.pages || 0);
          this.filters = filters;
        } else {
          this.movies = [];
        }
      });
    } catch (error) {
      console.error("Error loading movies:", error);
      this.setError(
        error instanceof Error ? error.message : "Ошибка загрузки фильмов"
      );
    } finally {
      this.setLoading(false);
    }
  };

  loadMoreMovies = async () => {
    if (!this.hasMore || this.loading) return;

    this.setLoading(true);

    try {
      const nextPage = this.currentPage + 1;
      const response = await api.getMovies({
        ...this.filters,
        page: nextPage,
        limit: this.limit,
      });

      runInAction(() => {
        const data = response.data;
        this.movies = [...this.movies, ...(data?.docs || [])];
        this.currentPage = data?.page || nextPage;
        this.hasMore = (data?.page || nextPage) < (data?.pages || 0);
      });
    } catch (error) {
      console.error("Error loading more movies:", error);
      this.setError(
        error instanceof Error ? error.message : "Ошибка загрузки фильмов"
      );
    } finally {
      this.setLoading(false);
    }
  };

  searchMovies = async (query: string, filters: ApiFilters = {}) => {
    if (!query.trim()) {
      this.loadMovies(filters);
      return;
    }

    this.setLoading(true);
    this.setError(null);

    try {
      const response = await api.searchMovies(query, {
        ...filters,
        page: 1,
        limit: this.limit,
      });

      runInAction(() => {
        const data = response.data;
        this.movies = data?.docs || [];
        this.currentPage = data?.page || 1;
        this.totalPages = data?.pages || 0;
        this.total = data?.total || 0;
        this.hasMore = (data?.page || 1) < (data?.pages || 0);
        this.filters = { ...filters, query };
      });
    } catch (error) {
      console.error("Error searching movies:", error);
      this.setError(
        error instanceof Error ? error.message : "Ошибка поиска фильмов"
      );
    } finally {
      this.setLoading(false);
    }
  };

  loadRandomMovie = async (filters: ApiFilters = {}) => {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await api.getRandomMovie(filters);

      runInAction(() => {
        this.movies = response.data ? [response.data] : [];
        this.currentPage = 1;
        this.totalPages = 1;
        this.total = 1;
        this.hasMore = false;
        this.filters = filters;
      });
    } catch (error) {
      console.error("Error loading random movie:", error);
      this.setError(
        error instanceof Error
          ? error.message
          : "Ошибка загрузки случайного фильма"
      );
    } finally {
      this.setLoading(false);
    }
  };

  reset = () => {
    this.movies = [];
    this.currentPage = 1;
    this.totalPages = 0;
    this.total = 0;
    this.hasMore = true;
    this.filters = {};
    this.error = null;
    this.loading = false;
  };

  private setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  private setError = (error: string | null) => {
    this.error = error;
  };

  get isEmpty() {
    return this.movies.length === 0 && !this.loading;
  }

  get isFirstLoad() {
    return this.loading && this.movies.length === 0;
  }

  get isLoadingMore() {
    return this.loading && this.movies.length > 0;
  }
}
