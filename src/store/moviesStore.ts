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
  lastRequestId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private generateRequestId(filters: ApiFilters, page: number = 1): string {
    return JSON.stringify({ ...filters, page });
  }

  loadMovies = async (filters: ApiFilters = {}) => {
    const requestId = this.generateRequestId(filters, 1);

    if (this.lastRequestId === requestId && this.loading) {
      return;
    }

    const filtersChanged =
      JSON.stringify(this.filters) !== JSON.stringify(filters);

    if (filtersChanged) {
      runInAction(() => {
        this.movies = [];
        this.currentPage = 1;
        this.hasMore = true;
      });
    }

    runInAction(() => {
      this.setLoading(true);
      this.setError(null);
      this.lastRequestId = requestId;
    });

    try {
      const response = await api.getMovies({
        ...filters,
        page: 1,
        limit: filters.limit || this.limit,
      });

      if (this.lastRequestId !== requestId) {
        return;
      }

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
      if (this.lastRequestId !== requestId) {
        return;
      }

      this.setError(
        error instanceof Error ? error.message : "Ошибка загрузки фильмов"
      );
    } finally {
      if (this.lastRequestId === requestId) {
        this.setLoading(false);
      }
    }
  };

  searchMovies = async (query: string, filters: ApiFilters = {}) => {
    if (!query.trim()) {
      this.loadMovies(filters);
      return;
    }

    const searchFilters = { ...filters, query };
    const requestId = this.generateRequestId(searchFilters, 1);

    if (this.lastRequestId === requestId && this.loading) {
      return;
    }

    const filtersChanged =
      JSON.stringify(this.filters) !== JSON.stringify(searchFilters);

    if (filtersChanged) {
      runInAction(() => {
        this.movies = [];
        this.currentPage = 1;
        this.hasMore = true;
      });
    }

    runInAction(() => {
      this.setLoading(true);
      this.setError(null);
      this.lastRequestId = requestId;
    });

    try {
      const response = await api.searchMovies(query, {
        ...filters,
        page: 1,
        limit: this.limit,
      });

      if (this.lastRequestId !== requestId) {
        return;
      }

      runInAction(() => {
        const data = response.data;
        this.movies = data?.docs || [];
        this.currentPage = data?.page || 1;
        this.totalPages = data?.pages || 0;
        this.total = data?.total || 0;
        this.hasMore = (data?.page || 1) < (data?.pages || 0);
        this.filters = searchFilters;
      });
    } catch (error) {
      if (this.lastRequestId !== requestId) {
        return;
      }

      console.error("Error searching movies:", error);
      this.setError(
        error instanceof Error ? error.message : "Ошибка поиска фильмов"
      );
    } finally {
      if (this.lastRequestId === requestId) {
        this.setLoading(false);
      }
    }
  };

  loadMoreMovies = async () => {
    if (!this.hasMore || this.loading) return;

    const nextPage = this.currentPage + 1;
    const requestId = this.generateRequestId(this.filters, nextPage);

    this.setLoading(true);
    this.lastRequestId = requestId;

    try {
      const response = await api.getMovies({
        ...this.filters,
        page: nextPage,
        limit: this.limit,
      });

      if (this.lastRequestId !== requestId) {
        return;
      }

      runInAction(() => {
        const data = response.data;
        this.movies = [...this.movies, ...(data?.docs || [])];
        this.currentPage = data?.page || nextPage;
        this.hasMore = (data?.page || nextPage) < (data?.pages || 0);
      });
    } catch (error) {
      if (this.lastRequestId !== requestId) {
        return;
      }

      console.error("Error loading more movies:", error);
      this.setError(
        error instanceof Error ? error.message : "Ошибка загрузки фильмов"
      );
    } finally {
      if (this.lastRequestId === requestId) {
        this.setLoading(false);
      }
    }
  };

  reset = () => {
    runInAction(() => {
      this.movies = [];
      this.currentPage = 1;
      this.totalPages = 0;
      this.total = 0;
      this.hasMore = true;
      this.filters = {};
      this.error = null;
      this.loading = false;
      this.lastRequestId = null;
    });
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
    return this.movies.length === 0;
  }

  get isLoadingMore() {
    return this.loading && this.movies.length > 0;
  }
}
