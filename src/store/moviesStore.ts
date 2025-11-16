import { makeAutoObservable, runInAction } from "mobx";
import { api } from "@/api";
import type { Movie, ApiFilters, ApiResponse } from "@/types";

export class MoviesStore {
  movies: Movie[] = [];
  popularMovies: Movie[] = [];
  popularSlides: Movie[] = [];

  loading = false;
  loadingMore = false;
  error: string | null = null;
  hasMore = true;

  currentPage = 1;
  totalPages = 0;
  total = 0;
  limit = 50;

  filters: ApiFilters = {};

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  //
  // ============= UTILITIES =============
  //

  private resetPagination() {
    this.movies = [];
    this.currentPage = 1;
    this.hasMore = true;
  }

  private handleFiltersChange(nextFilters: ApiFilters) {
    const changed =
      JSON.stringify(this.filters) !== JSON.stringify(nextFilters);

    if (changed) {
      this.filters = nextFilters;
      this.resetPagination();
    }

    return changed;
  }

  private applyInitialData(data: ApiResponse<Movie>) {
    this.movies = data.docs || [];
    this.currentPage = data.page || 1;
    this.totalPages = data.pages || 0;
    this.total = data.total || 0;
    this.hasMore = this.currentPage < this.totalPages;
  }

  private appendMovies(data: ApiResponse<Movie>) {
    if (data.docs && data.docs.length > 0) {
      this.movies.push(...data.docs);
    }

    this.currentPage = data.page || this.currentPage + 1;
    this.hasMore = this.currentPage < (data.pages || this.totalPages);
  }

  //
  // ============= LOAD MOVIES (first load) =============
  //

  async loadMovies(filters: ApiFilters = {}) {
    this.handleFiltersChange(filters);

    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await api.getMovies({
        ...filters,
        page: 1,
        limit: filters.limit || this.limit,
      });

      runInAction(() => {
        this.applyInitialData(response.data);
      });
    } catch (e: unknown) {
      runInAction(() => {
        this.error =
          e instanceof Error ? e.message : "Ошибка загрузки фильмов";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  //
  // ============= LOAD MORE (pagination) =============
  //

  async loadMoreMovies() {
    if (!this.hasMore || this.loadingMore) return;

    const nextPage = this.currentPage + 1;

    runInAction(() => {
      this.loadingMore = true;
    });

    try {
      const response = await api.getMovies({
        ...this.filters,
        page: nextPage,
        limit: this.limit,
      });

      runInAction(() => {
        this.appendMovies(response.data);
      });
    } catch {
      /* ошибки догрузки не критичны */
    } finally {
      runInAction(() => {
        this.loadingMore = false;
      });
    }
  }

  //
  // ============= SEARCH =============
  //

  async searchMovies(query: string, filters: ApiFilters = {}) {
    if (!query.trim()) {
      return this.loadMovies(filters);
    }

    const searchFilters = { ...filters, query };

    this.handleFiltersChange(searchFilters);

    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await api.searchMovies(query, {
        ...filters,
        page: 1,
        limit: this.limit,
      });

      runInAction(() => {
        this.applyInitialData(response.data);
        this.filters = searchFilters;
      });
    } catch (e: unknown) {
      runInAction(() => {
        this.error =
          e instanceof Error ? e.message : "Ошибка поиска фильмов";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  //
  // ============= POPULAR CONTENT =============
  //

  async loadPopularContent() {
    if (this.popularMovies.length > 0 && this.popularSlides.length > 0) {
      return;
    }

    runInAction(() => {
      this.error = null;
      this.loading = true;
    });

    try {
      const popularPreset = {
        limit: 10,
        lists: "top10-hd",
      };

      const slidesPreset = {
        limit: 10,
        lists: "popular-films",
        "rating.kp": "7-10",
        notNullFields: "backdrop.url",
      };

      const [popularRes, slidesRes] = await Promise.all([
        api.getMovies(popularPreset),
        api.getMovies(slidesPreset),
      ]);

      runInAction(() => {
        this.popularMovies = popularRes.data.docs || [];
        this.popularSlides = slidesRes.data.docs || [];
      });
    } catch (e: unknown) {
      runInAction(() => {
        this.error =
          e instanceof Error
            ? e.message
            : "Ошибка загрузки популярного контента";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  //
  // ============= RESET STORE =============
  //

  reset() {
    runInAction(() => {
      this.movies = [];
      this.popularMovies = [];
      this.popularSlides = [];
      this.filters = {};

      this.currentPage = 1;
      this.totalPages = 0;
      this.total = 0;

      this.hasMore = true;
      this.loading = false;
      this.loadingMore = false;
      this.error = null;
    });
  }

  //
  // ============= COMPUTED =============
  //

  get isEmpty() {
    return this.movies.length === 0 && !this.loading;
  }

  get isFirstLoad() {
    return this.movies.length === 0;
  }
}
