import { makeAutoObservable, runInAction } from "mobx";
import { api } from "@/api";
import type { Movie, ApiFilters, ApiResponse } from "@/types";
import type { AxiosResponse } from "axios";

export class MoviesStore {
  movies: Movie[] = [];
  popularMovies: Movie[] = [];
  popularSlides: Movie[] = [];
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

  private async executeRequest<T>(
    requestId: string,
    apiCall: () => Promise<AxiosResponse<T>>,
    onSuccess: (data: T) => void,
    errorMessage: string
  ): Promise<void> {
    if (this.lastRequestId === requestId && this.loading) {
      return;
    }

    runInAction(() => {
      this.setLoading(true);
      this.setError(null);
      this.lastRequestId = requestId;
    });

    try {
      const response = await apiCall();

      if (this.lastRequestId !== requestId) {
        return;
      }

      runInAction(() => {
        onSuccess(response.data);
      });
    } catch (error) {
      if (this.lastRequestId !== requestId) {
        return;
      }

      this.setError(error instanceof Error ? error.message : errorMessage);
    } finally {
      if (this.lastRequestId === requestId) {
        this.setLoading(false);
      }
    }
  }

  private handleFiltersChange(filters: ApiFilters): boolean {
    const filtersChanged =
      JSON.stringify(this.filters) !== JSON.stringify(filters);

    if (filtersChanged) {
      runInAction(() => {
        this.movies = [];
        this.currentPage = 1;
        this.hasMore = true;
      });
    }

    return filtersChanged;
  }

  private updateMoviesData(
    data: ApiResponse<Movie>,
    filters: ApiFilters
  ): void {
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
  }

  private appendMoviesData(data: ApiResponse<Movie>, nextPage: number): void {
    this.movies = [...this.movies, ...(data?.docs || [])];
    this.currentPage = data?.page || nextPage;
    this.hasMore = (data?.page || nextPage) < (data?.pages || 0);
  }

  loadMovies = async (filters: ApiFilters = {}): Promise<void> => {
    const requestId = this.generateRequestId(filters, 1);
    this.handleFiltersChange(filters);

    await this.executeRequest<ApiResponse<Movie>>(
      requestId,
      () =>
        api.getMovies({
          ...filters,
          page: 1,
          limit: filters.limit || this.limit,
        }),
      (data) => this.updateMoviesData(data, filters),
      "Ошибка загрузки фильмов"
    );
  };

loadPopularContent = async (): Promise<void> => {
  if (this.popularMovies.length > 0 && this.popularSlides.length > 0) {
    return;
  }

  const popularPreset = {
    limit: 10,
    lists: "top10-hd",
  };

  const slidesPreset = {
    limit: 10,
    lists: 'popular-films',
    'rating.kp': '7-10',
    notNullFields: 'backdrop.url'
  };

  const requestId = JSON.stringify({ popularPreset, slidesPreset });

  runInAction(() => {
    this.loading = true;
    this.error = null;
    this.lastRequestId = requestId;
  });

  try {
    const [popularResponse, slidesResponse] = await Promise.all([
      api.getMovies(popularPreset),
      api.getMovies(slidesPreset)
    ]);

    // Проверяем, не устарел ли запрос
    if (this.lastRequestId !== requestId) return;

    runInAction(() => {
      this.popularMovies = popularResponse.data.docs || [];
      this.popularSlides = slidesResponse.data.docs || [];
      this.loading = false;
    });
  } catch (error) {
    if (this.lastRequestId !== requestId) return;

    runInAction(() => {
      this.error = error instanceof Error 
        ? error.message 
        : "Ошибка загрузки популярного контента";
      this.loading = false;
    });
  }
};


  searchMovies = async (
    query: string,
    filters: ApiFilters = {}
  ): Promise<void> => {
    if (!query.trim()) {
      this.loadMovies(filters);
      return;
    }

    const searchFilters: ApiFilters = { ...filters, query };
    const requestId = this.generateRequestId(searchFilters, 1);
    this.handleFiltersChange(searchFilters);

    await this.executeRequest<ApiResponse<Movie>>(
      requestId,
      () =>
        api.searchMovies(query, {
          ...filters,
          page: 1,
          limit: this.limit,
        }),
      (data) => {
        this.movies = data?.docs || [];
        this.currentPage = data?.page || 1;
        this.totalPages = data?.pages || 0;
        this.total = data?.total || 0;
        this.hasMore = (data?.page || 1) < (data?.pages || 0);
        this.filters = searchFilters;
      },
      "Ошибка поиска фильмов"
    );
  };

  loadMoreMovies = async (): Promise<void> => {
    if (!this.hasMore || this.loading) return;

    const nextPage = this.currentPage + 1;
    const requestId = this.generateRequestId(this.filters, nextPage);

    await this.executeRequest<ApiResponse<Movie>>(
      requestId,
      () =>
        api.getMovies({
          ...this.filters,
          page: nextPage,
          limit: this.limit,
        }),
      (data) => this.appendMoviesData(data, nextPage),
      "Ошибка загрузки фильмов"
    );
  };

  reset = (): void => {
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

  private setLoading = (loading: boolean): void => {
    this.loading = loading;
  };

  private setError = (error: string | null): void => {
    this.error = error;
  };

  get isEmpty(): boolean {
    return this.movies.length === 0 && !this.loading;
  }

  get isFirstLoad(): boolean {
    return this.movies.length === 0;
  }

  get isLoadingMore(): boolean {
    return this.loading && this.movies.length > 0;
  }
}
