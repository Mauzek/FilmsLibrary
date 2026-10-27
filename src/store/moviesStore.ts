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
  loadingMoreError: string | null = null;
  popularLoading = false;
  popularError: string | null = null;
  hasMore = true;

  currentPage = 1;
  totalPages = 0;
  total = 0;
  limit = 50;
  filters: ApiFilters = {};
  searchQuery = "";
  private requestId = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  private applyInitialData(data: ApiResponse<Movie>) {
    this.movies = data.docs || [];
    this.currentPage = data.page || 1;
    this.totalPages = data.pages || 0;
    this.total = data.total || 0;
    this.hasMore = this.currentPage < this.totalPages;
  }

  private async loadInitial(filters: ApiFilters, query: string) {
    if (
      this.loading && this.searchQuery === query &&
      JSON.stringify(this.filters) === JSON.stringify(filters)
    ) return;

    const requestId = ++this.requestId;
    this.filters = { ...filters };
    this.searchQuery = query;
    this.movies = [];
    this.currentPage = 1;
    this.totalPages = 0;
    this.total = 0;
    this.hasMore = true;
    this.loading = true;
    this.loadingMore = false;
    this.loadingMoreError = null;
    this.error = null;

    try {
      const params = { ...filters, page: 1, limit: filters.limit || this.limit };
      const response = query
        ? await api.searchMovies(query, params)
        : await api.getMovies(params);

      if (requestId !== this.requestId) return;
      runInAction(() => this.applyInitialData(response.data));
    } catch (error: unknown) {
      if (requestId !== this.requestId) return;
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Ошибка загрузки фильмов";
      });
    } finally {
      if (requestId === this.requestId) {
        runInAction(() => { this.loading = false; });
      }
    }
  }

  loadMovies(filters: ApiFilters = {}) {
    return this.loadInitial(filters, "");
  }

  searchMovies(query: string, filters: ApiFilters = {}) {
    return this.loadInitial(filters, query.trim());
  }

  async loadMoreMovies() {
    if (!this.hasMore || this.loading || this.loadingMore || this.error) return;

    const requestId = this.requestId;
    const nextPage = this.currentPage + 1;
    const params = {
      ...this.filters,
      page: nextPage,
      limit: this.filters.limit || this.limit,
    };
    this.loadingMore = true;
    this.loadingMoreError = null;

    try {
      const response = this.searchQuery
        ? await api.searchMovies(this.searchQuery, params)
        : await api.getMovies(params);

      if (requestId !== this.requestId) return;
      runInAction(() => {
        const ids = new Set(this.movies.map(movie => movie.id));
        this.movies.push(...(response.data.docs || []).filter(movie => !ids.has(movie.id)));
        this.currentPage = response.data.page || nextPage;
        this.totalPages = response.data.pages ?? this.totalPages;
        this.hasMore = this.currentPage < this.totalPages;
      });
    } catch (error: unknown) {
      if (requestId !== this.requestId) return;
      runInAction(() => {
        this.loadingMoreError = error instanceof Error ? error.message : "Не удалось загрузить ещё фильмы";
      });
    } finally {
      if (requestId === this.requestId) {
        runInAction(() => { this.loadingMore = false; });
      }
    }
  }

  async loadPopularContent() {
    if (this.popularLoading || (this.popularMovies.length && this.popularSlides.length)) return;

    this.popularError = null;
    this.popularLoading = true;

    try {
      const [popularRes, slidesRes] = await Promise.all([
        api.getMovies({ limit: 10, lists: "top10-hd" }),
        api.getMovies({
          limit: 10, lists: "popular-films", "rating.kp": "7-10",
          notNullFields: "backdrop.url",
        }),
      ]);
      runInAction(() => {
        this.popularMovies = popularRes.data.docs || [];
        this.popularSlides = slidesRes.data.docs || [];
      });
    } catch (error: unknown) {
      runInAction(() => {
        this.popularError = error instanceof Error ? error.message : "Ошибка загрузки популярного контента";
      });
    } finally {
      runInAction(() => { this.popularLoading = false; });
    }
  }

  reset() {
    this.requestId++;
    this.movies = [];
    this.popularMovies = [];
    this.popularSlides = [];
    this.filters = {};
    this.searchQuery = "";
    this.currentPage = 1;
    this.totalPages = 0;
    this.total = 0;
    this.hasMore = true;
    this.loading = false;
    this.loadingMore = false;
    this.error = null;
    this.loadingMoreError = null;
    this.popularLoading = false;
    this.popularError = null;
  }

  get isEmpty() {
    return this.movies.length === 0 && !this.loading;
  }

  get isFirstLoad() {
    return this.movies.length === 0;
  }
}
